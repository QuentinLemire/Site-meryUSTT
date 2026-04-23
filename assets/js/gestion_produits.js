document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Page Produits & Stocks chargée");

    chargerProduits();
    chargerStocks();
    chargerCategories();

    let produitForm = document.getElementById("produitForm");
    if (produitForm) {
        produitForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(this);
    fetch("../modules/boutique/save_produit.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        location.reload(); // Recharge la page après soumission
    })
    .catch(error => console.error("❌ Erreur :", error));
});
    } else {
        console.error("❌ ERREUR : Le formulaire produitForm est introuvable !");
    }
});

let sousCategoriesParCategorie = {}; // Stocke les sous-catégories liées à chaque catégorie

function chargerCategories() {
    console.log("📢 [INFO] Chargement des catégories...");

    fetch("../modules/boutique/get_categories.php")
        .then(response => response.json())
        .then(data => {
            let categoriesList = document.getElementById("categories");
            let sousCategoriesList = document.getElementById("sous_categories");

            if (!categoriesList || !sousCategoriesList) {
                console.error("❌ [ERREUR] Listes de catégories introuvables !");
                return;
            }

            categoriesList.innerHTML = "";
            sousCategoriesList.innerHTML = "";
            sousCategoriesParCategorie = data.sous_categories; // Stocke les sous-catégories associées

            // Ajouter les catégories existantes dans la liste
            data.categories.forEach(categorie => {
                let option = document.createElement("option");
                option.value = categorie;
                categoriesList.appendChild(option);
            });

            console.log("✅ Catégories et sous-catégories chargées avec succès !");
        })
        .catch(error => console.error("❌ [ERREUR] lors du chargement des catégories :", error));
}

document.getElementById("categorie").addEventListener("input", function () {
    let selectedCategorie = this.value.trim();
    let sousCategoriesList = document.getElementById("sous_categories");

    // Vide la liste actuelle
    sousCategoriesList.innerHTML = "";

    if (sousCategoriesParCategorie[selectedCategorie]) {
        // Si la catégorie existe, on affiche seulement ses sous-catégories associées
        sousCategoriesParCategorie[selectedCategorie].forEach(sousCategorie => {
            let option = document.createElement("option");
            option.value = sousCategorie;
            sousCategoriesList.appendChild(option);
        });
    }
});

let produitsAffiches = [];
let pageActuelle = 1;
const produitsParPage = 12;
let produitsFiltres = [];

function chargerProduits() {
    console.log("📢 [INFO] Chargement des produits...");

    fetch("../modules/boutique/get_produits.php")
        .then(response => response.json())
        .then(data => {
            if (!data || !Array.isArray(data)) {
                console.error("❌ [ERREUR] Données de produits invalides :", data);
                return;
            }

            produitsAffiches = data;
            produitsFiltres = [...produitsAffiches]; 
            pageActuelle = 1;
            afficherProduitsTries();
            afficherPagination();
        })
        .catch(error => console.error("❌ [ERREUR] lors du chargement des produits :", error));
}

function filtrerProduits() {
    let searchValue = document.getElementById("search-bar").value.toLowerCase();
    produitsFiltres = produitsAffiches.filter(produit => {
        let nom = produit.nom.toLowerCase();
        let description = produit.description.toLowerCase();
        let prix = produit.prix.toString().toLowerCase();
        return nom.includes(searchValue) || description.includes(searchValue) || prix.includes(searchValue);
    });
    pageActuelle = 1;
    afficherProduitsTries();
    afficherPagination();
}

function afficherProduitsTries() {
    let container = document.getElementById("produits-container");
    if (!container) {
        console.error("❌ ERREUR : 'produits-container' introuvable !");
        return;
    }

    container.innerHTML = "";

    let debut = (pageActuelle - 1) * produitsParPage;
    let fin = debut + produitsParPage;
    let produitsPage = produitsFiltres.slice(debut, fin);

    let categoriesTriees = {};
    produitsPage.forEach(produit => {
        if (!categoriesTriees[produit.categorie]) {
            categoriesTriees[produit.categorie] = {};
        }
        if (!categoriesTriees[produit.categorie][produit.sous_categorie]) {
            categoriesTriees[produit.categorie][produit.sous_categorie] = [];
        }
        categoriesTriees[produit.categorie][produit.sous_categorie].push(produit);
    });

    Object.keys(categoriesTriees).forEach(categorie => {
        let categorieSection = document.createElement("div");
        categorieSection.classList.add("categorie-section");
        categorieSection.innerHTML = `<h2 class="categorie-header">${categorie}</h2>`;

        let sousCategorieContainer = document.createElement("div"); 
        sousCategorieContainer.classList.add("sous-categorie-container");

        Object.keys(categoriesTriees[categorie]).forEach(sousCategorie => {
            let sousCategorieSection = document.createElement("div");
            sousCategorieSection.classList.add("sous-categorie-section");
            sousCategorieSection.innerHTML = `<h3 class="sous-categorie-header">${sousCategorie}</h3>`;

            let gridContainer = document.createElement("div");
            gridContainer.classList.add("grid-container");

            categoriesTriees[categorie][sousCategorie].forEach(produit => {
                let produitHTML = `
                    <div class="produit-card">
                        <h3>${produit.nom}</h3>
                        <p>${produit.description}</p>
                        <p><strong>${produit.prix}€</strong></p>
                        <div class="image-container">
                            ${produit.images.map(img => `<img src="${img.trim()}" width="100">`).join(" ") || "Aucune image"}
                        </div>
                        <div class="button-group">
                            <button class="modify" onclick="ouvrirFormulaireProduit(${produit.id_produit})">✏️ Modifier</button>
                            <button class="delete" onclick="supprimerProduit(${produit.id_produit})">🗑️ Supprimer</button>
                        </div>
                    </div>
                `;
                gridContainer.innerHTML += produitHTML;
            });

            sousCategorieSection.appendChild(gridContainer);
            sousCategorieContainer.appendChild(sousCategorieSection);
        });

        categorieSection.appendChild(sousCategorieContainer);
        container.appendChild(categorieSection);
    });
}

function afficherPagination() {
    let pagination = document.getElementById("pagination-produits");
    if (!pagination) {
        pagination = document.createElement("div");
        pagination.id = "pagination-produits";
        pagination.classList.add("pagination");
        document.getElementById("produits-content").appendChild(pagination);
    }

    const maxPage = Math.ceil(produitsFiltres.length / produitsParPage);
    pagination.innerHTML = `
        <button onclick="changerPageProduits(-1)" ${pageActuelle === 1 ? 'disabled' : ''}>⬅️ Précédent</button>
        <span>Page ${pageActuelle} / ${maxPage}</span>
        <button onclick="changerPageProduits(1)" ${pageActuelle === maxPage ? 'disabled' : ''}>➡️ Suivant</button>
    `;
}

function changerPageProduits(direction) {
    const maxPage = Math.ceil(produitsFiltres.length / produitsParPage);
    pageActuelle += direction;
    if (pageActuelle < 1) pageActuelle = 1;
    if (pageActuelle > maxPage) pageActuelle = maxPage;
    afficherProduitsTries();
    afficherPagination();
}

function afficherPage(numPage) {
    let container = document.getElementById("produits-container");
    if (!container) {
        console.error("❌ ERREUR : 'produits-container' introuvable !");
        return;
    }

    container.innerHTML = ""; // Vide le container avant d'afficher les produits

    let debut = (numPage - 1) * produitsParPage;
    let fin = debut + produitsParPage;
    let produitsPage = produitsAffiches.slice(debut, fin);

    produitsPage.forEach(produit => {
        let produitHTML = `
            <div class="produit-card">
                <h3>${produit.nom}</h3>
                <p>${produit.description}</p>
                <p><strong>${produit.prix}€</strong></p>
                <div class="image-container">
                    ${produit.images.map(img => `<img src="${img.trim()}" width="100">`).join(" ") || "Aucune image"}
                </div>
                <button onclick="ouvrirFormulaireProduit(${produit.id_produit})">✏️ Modifier</button>
                <button class="delete" onclick="supprimerProduit(${produit.id_produit})">🗑️ Supprimer</button>
            </div>
        `;
        container.innerHTML += produitHTML;
    });

    document.getElementById("page-num").innerText = `Page ${numPage}`;
    pageActuelle = numPage;
}

function ouvrirFormulaireProduit(id = null) {
    console.log(`📢 [INFO] Ouverture du formulaire produit (ID: ${id || "NOUVEAU"})`);
    
    let formProduit = document.getElementById("form-produit");
    let imagePreviewContainer = document.getElementById("image-preview");
    let categorieInput = document.getElementById("categorie");
    let sousCategorieInput = document.getElementById("sous_categorie");

    if (!formProduit) {
        console.error("❌ [ERREUR] Formulaire produit introuvable !");
        return;
    }

    formProduit.style.display = "block";
    document.getElementById("produitForm").reset(); // Réinitialiser tous les champs
    document.getElementById("id_produit").value = ""; // Remettre l'ID à vide pour un nouvel ajout
    imagePreviewContainer.innerHTML = ""; // Vider l'aperçu des images

    if (id) {
        // MODIFICATION : Charger les données du produit
        document.getElementById("form-title").innerText = "✏️ Modifier un Produit";
        fetch(`../modules/boutique/get_produit.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("id_produit").value = data.id_produit;
                document.getElementById("nom").value = data.nom;
                document.getElementById("description").value = data.description;
                document.getElementById("prix").value = data.prix;
                categorieInput.value = data.categorie;
                sousCategorieInput.value = data.sous_categorie;

                // Gestion des images existantes
                if (data.images.length > 0) {
                    data.images.forEach(img => {
                        let imgElement = document.createElement("div");
                        imgElement.classList.add("image-container");
                        imgElement.innerHTML = `
                            <img src="../modules/boutique/${img.trim()}" width="100">
                            <button type="button" class="delete-image" onclick="supprimerImage('${img.trim()}')">❌</button>
                        `;
                        imagePreviewContainer.appendChild(imgElement);
                    });
                } else {
                    imagePreviewContainer.innerHTML = "<p>Aucune image pour ce produit.</p>";
                }
            })
            .catch(error => console.error("❌ [ERREUR] lors du chargement du produit :", error));
    } else {
        // AJOUT : Réinitialisation complète
        document.getElementById("form-title").innerText = "➕ Ajouter un Produit";
        categorieInput.value = "";  // Vider la catégorie
        sousCategorieInput.value = ""; // Vider la sous-catégorie
    }
}

function supprimerImage(imagePath) {
    if (confirm("Voulez-vous vraiment supprimer cette image ?")) {
        fetch("../modules/boutique/delete_image.php", {
            method: "POST",
            body: new URLSearchParams({ image: imagePath })
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            chargerProduits();
        })
        .catch(error => console.error("❌ Erreur :", error));
    }
}

function supprimerProduit(id) {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
        fetch("../modules/boutique/delete_produit.php", {
            method: "POST",
            body: new URLSearchParams({ id_produit: id })
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            chargerProduits();
        })
        .catch(error => console.error("❌ [ERREUR] lors de la suppression du produit :", error));
    }
}

function afficherOnglet(onglet) {
    console.log(`📢 [INFO] Affichage de l'onglet ${onglet}...`);

    document.getElementById("produits-content").style.display = onglet === 'produits' ? "block" : "none";
    document.getElementById("stocks-content").style.display = onglet === 'stocks' ? "block" : "none";

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tab-btn[onclick="afficherOnglet('${onglet}')"]`).classList.add('active');
} 

function fermerFormulaireProduit() {
    console.log("📢 [INFO] Fermeture du formulaire produit.");
    let formProduit = document.getElementById("form-produit");
    if (formProduit) {
        formProduit.style.display = "none";
    } else {
        console.error("❌ [ERREUR] Impossible de fermer le formulaire, élément introuvable !");
    }
}