document.addEventListener("DOMContentLoaded", function () {
    chargerCategories();
    chargerProduits(); 

    let searchBar = document.getElementById("search-bar");
    if (searchBar) {
        searchBar.addEventListener("input", filtrerProduits);
    }
});

function chargerCategories() {
    fetch("../modules/boutique/get_categories_boutique.php")
        .then(response => response.json())
        .then(data => {
            let categoriesMenu = document.getElementById("categories-menu");
            categoriesMenu.innerHTML = "";

            Object.keys(data).forEach(categorie => {
                let categorieItem = document.createElement("div");
                categorieItem.classList.add("categorie-item");
                categorieItem.innerHTML = `<strong>${categorie} ⬇️</strong>`;

                // Bouton "Afficher tout"
                let afficherTout = document.createElement("button");
                afficherTout.classList.add("afficher-tout");
                afficherTout.innerText = "Afficher tout";
                afficherTout.onclick = () => chargerProduits(categorie);

                // Sous-catégories (initialement caché)
                let sousCategorieContainer = document.createElement("div");
                sousCategorieContainer.classList.add("sous-categories");

                // Ajout des sous-catégories
                data[categorie].forEach(sousCategorie => {
                    let sousCategorieItem = document.createElement("div");
                    sousCategorieItem.classList.add("sous-categorie-item");
                    sousCategorieItem.innerText = sousCategorie;
                    sousCategorieItem.onclick = (event) => {
                        event.stopPropagation();
                        chargerProduits(categorie, sousCategorie);
                    };
                    sousCategorieContainer.appendChild(sousCategorieItem);
                });

                // Afficher/masquer les sous-catégories
                categorieItem.onclick = function (event) {
                    event.stopPropagation();
                    let isOpen = this.classList.contains("open");
                    document.querySelectorAll(".categorie-item").forEach(item => item.classList.remove("open"));
                    document.querySelectorAll(".sous-categories").forEach(sub => sub.style.display = "none");

                    if (!isOpen) {
                        this.classList.add("open");
                        sousCategorieContainer.style.display = "block";
                    }
                };

                categoriesMenu.appendChild(categorieItem);
                categoriesMenu.appendChild(sousCategorieContainer);
            });
        })
        .catch(error => console.error("❌ [ERREUR] lors du chargement des catégories :", error));
}

let produitsData = []; 
let produitsParPage = 12;
let pageActuelle = 1;

function chargerProduits(categorie = "", sousCategorie = "") {
    const productsGrid = document.getElementById("productsGrid");
    const paginationContainer = document.getElementById("pagination");

    if (!productsGrid || !paginationContainer) {
        console.error("❌ Élément manquant pour afficher les produits.");
        return;
    }

    productsGrid.innerHTML = "<p>🔄 Chargement des produits...</p>";
    paginationContainer.innerHTML = "";

    const url = `../modules/boutique/get_produits_boutique.php?categorie=${encodeURIComponent(categorie)}&sous_categorie=${encodeURIComponent(sousCategorie)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            produitsData = data;
            pageActuelle = 1;
            afficherProduitsParPage();
        })
        .catch(error => {
            console.error("❌ Erreur lors du chargement des produits :", error);
            productsGrid.innerHTML = "<p>Erreur lors du chargement des produits.</p>";
        });
}

function afficherProduitsParPage(produits = produitsData) {
    const productsGrid = document.getElementById("productsGrid");
    const paginationContainer = document.getElementById("pagination");

    productsGrid.innerHTML = "";
    paginationContainer.innerHTML = "";

    if (!Array.isArray(produits) || produits.length === 0) {
        productsGrid.innerHTML = "<p>Aucun produit trouvé.</p>";
        return;
    }

    const debut = (pageActuelle - 1) * produitsParPage;
    const fin = debut + produitsParPage;
    const produitsAffiches = produits.slice(debut, fin);

    produitsAffiches.forEach(produit => {
        let produitCard = document.createElement("div");
        produitCard.classList.add("produit-card");

        let imageContainerId = `image-container-${produit.id_produit}`;
        window["productImages_" + produit.id_produit] = produit.images;
        window["currentImageIndex_" + produit.id_produit] = 0;

        let imagesHtml = produit.images.length > 0
            ? `<div class="image-slider">
                    <img id="${imageContainerId}" src="${produit.images[0]}" alt="${produit.nom}" class="produit-image">
                    ${produit.images.length > 1 ? `
                        <button class="prev-img" onclick="changeImage(${produit.id_produit}, -1)">⬅️</button>
                        <button class="next-img" onclick="changeImage(${produit.id_produit}, 1)">➡️</button>
                    ` : ""}
               </div>`
            : `<img src="../modules/boutique/uploads/placeholder.jpg" alt="Image non disponible" class="produit-image">`;

        fetch(`../modules/boutique/get_product_stock.php?id_produit=${produit.id_produit}`)
            .then(response => response.json())
            .then(stockData => {
                let stockHtml = "";
                let disableAddToCart = false;
                let maxQuantities = {};

                if (stockData.success) {
                    const stocks = stockData.stocks;
                    // Tri personnalisé des tailles
                    const ordreTailles = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

                    const taillesTriees = [...produit.tailles_disponibles].sort((a, b) => {
                        const indexA = ordreTailles.indexOf(a);
                       const indexB = ordreTailles.indexOf(b);

                        if (indexA === -1 && indexB === -1) {
                            return a.localeCompare(b); // tailles inconnues → tri alphabétique
                        } else if (indexA === -1) {
                            return 1;
                        } else if (indexB === -1) {
                            return -1;
                        } else {
                            return indexA - indexB;
                        }
                    });
                    stockHtml = produit.tailles_disponibles.length > 0
                        ? `<label for="taille-${produit.id_produit}"><strong>Tailles :</strong>
                           <select id="taille-${produit.id_produit}" onchange="updateQuantityOptions(${produit.id_produit}, this.value)"> </label>
                              ${taillesTriees.map(taille => {
                                  const stockItem = stocks.find(stock => stock.taille === taille);
                                  const isOutOfStock = !stockItem || stockItem.quantite <= 0;
                                  maxQuantities[taille] = stockItem ? stockItem.quantite : 0;
                                  return `<option value="${taille}" ${isOutOfStock ? 'disabled' : ''}>
                                          ${taille} ${isOutOfStock ? '(Rupture)' : ''}
                                          </option>`;
                              }).join("")}
                           </select>`
                        : `<p class="rupture">❌ Rupture de stock</p>`;

                    if (stocks.every(stock => stock.quantite <= 0)) {
                        disableAddToCart = true;
                    }
                }

                produitCard.innerHTML = `
                    ${imagesHtml}
                    <h3>${produit.nom}</h3>
                    <p>${produit.description}</p>
                    <p class="prix">${produit.prix} €</p>
                    ${stockHtml}
                    <p><label for="quantite-${produit.id_produit}"><strong>Quantité :</strong>
                    <select id="quantite-${produit.id_produit}"></label></p>
                        ${[1, 2, 3, 4, 5].filter(q => q <= maxQuantities[produit.tailles_disponibles[0]]).map(q => `<option value="${q}">${q}</option>`).join('')}
                    </select>
                    <button class="ajouter-panier" onclick="ajouterAuPanier(${produit.id_produit})" ${disableAddToCart ? 'disabled' : ''}>🛒 Ajouter au panier</button>
                `;

                productsGrid.appendChild(produitCard);
            })
            .catch(error => console.error("❌ Erreur lors de la récupération du stock :", error));
    });

    // Ajout pagination
    const totalPages = Math.ceil(produitsData.length / produitsParPage);
    if (totalPages > 1) {
        if (pageActuelle > 1) {
            const prevBtn = document.createElement("button");
            prevBtn.textContent = "⬅️ Précédent";
            prevBtn.onclick = () => {
                pageActuelle--;
                afficherProduitsParPage();
            };
            paginationContainer.appendChild(prevBtn);
        }

        paginationContainer.appendChild(document.createTextNode(` Page ${pageActuelle} sur ${totalPages} `));

        if (pageActuelle < totalPages) {
            const nextBtn = document.createElement("button");
            nextBtn.textContent = "Suivant ➡️";
            nextBtn.onclick = () => {
                pageActuelle++;
                afficherProduitsParPage();
            };
            paginationContainer.appendChild(nextBtn);
        }
    }
} 

function updateQuantityOptions(productId, taille) {
    let quantitySelect = document.getElementById(`quantite-${productId}`);
    fetch(`../modules/boutique/get_product_stock.php?id_produit=${productId}`)
        .then(response => response.json())
        .then(data => {
            let stockItem = data.stocks.find(stock => stock.taille === taille);
            let maxQuantity = stockItem ? stockItem.quantite : 0;

            for (let i = 0; i < quantitySelect.options.length; i++) {
                let option = quantitySelect.options[i];
                option.disabled = parseInt(option.value) > maxQuantity;
            }
        })
        .catch(error => console.error("❌ Erreur lors de la mise à jour des options de quantité :", error));
}

function changeImage(productId, direction) {
    let imageContainer = document.getElementById(`image-container-${productId}`);
    let images = window["productImages_" + productId];
    let currentIndex = window["currentImageIndex_" + productId];

    if (!images || images.length <= 1) return;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    window["currentImageIndex_" + productId] = currentIndex;
    imageContainer.src = images[currentIndex];
}

function filtrerProduits() {
    let recherche = document.getElementById("search-bar").value.toLowerCase();

    // Filtrage directement sur tous les produits reçus
    const produitsFiltres = produitsData.filter(produit => {
        return (
            produit.nom.toLowerCase().includes(recherche) ||
            produit.description.toLowerCase().includes(recherche)
        );
    });

    // Masquer ou afficher la pagination selon si on recherche ou non
    const paginationContainer = document.getElementById("pagination");
    if (recherche.length > 0) {
        paginationContainer.style.display = "none";
    } else {
        paginationContainer.style.display = "block";
    }

    pageActuelle = 1;
    afficherProduitsParPage(produitsFiltres);
}