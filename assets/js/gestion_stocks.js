document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Page Gestion des Stocks chargée !");
    chargerProduitsStocks();
    chargerStocks();

    document.getElementById("ajouter-stock").addEventListener("click", function () {
        modifierStock("ajouter");
    });

    document.getElementById("soustraire-stock").addEventListener("click", function () {
        modifierStock("soustraire");
    });
});

function chargerProduitsStocks() {
    fetch("../modules/boutique/get_produits.php")
        .then(response => response.json())
        .then(data => {
            console.log("📢 [DEBUG] Produits reçus :", data);

            let listeProduits = document.getElementById("liste-produits");
            if (!listeProduits) {
                console.error("❌ [ERREUR] Élément 'liste-produits' introuvable !");
                return;
            }

            listeProduits.innerHTML = ""; 

            if (!Array.isArray(data) || data.length === 0) {
                listeProduits.innerHTML = `<tr><td colspan="6">Aucun produit trouvé.</td></tr>`;
                return;
            }

            // Ajout des produits au tableau
            data.forEach(produit => {
                let row = `
                    <tr onclick="selectionnerProduit(${produit.id_produit}, '${produit.nom}', '${produit.description}', '${produit.categorie}', '${produit.sous_categorie}')">
                        <td>${produit.id_produit}</td>
                        <td>${produit.nom}</td>
                        <td>${produit.description}</td>
                        <td>${produit.categorie}</td>
                        <td>${produit.sous_categorie}</td>
                        <td>
                            <button onclick="selectionnerProduit(${produit.id_produit}, '${produit.nom}', '${produit.description}', '${produit.categorie}', '${produit.sous_categorie}')">
                                📌 Sélectionner
                            </button>
                        </td>
                    </tr>
                `;
                listeProduits.innerHTML += row;
            });
        })
        .catch(error => console.error("❌ [ERREUR] lors du chargement des produits :", error));
}

function filtrerProduits() {
    let recherche = document.getElementById("search-produits").value.toLowerCase();
    let lignes = document.querySelectorAll("#liste-produits tr");

    lignes.forEach(ligne => {
        let nomProduit = ligne.cells[1]?.innerText.toLowerCase() || "";
        let description = ligne.cells[2]?.innerText.toLowerCase() || "";
        let categorie = ligne.cells[3]?.innerText.toLowerCase() || "";
        let sousCategorie = ligne.cells[4]?.innerText.toLowerCase() || "";

        if (
            nomProduit.includes(recherche) || 
            description.includes(recherche) || 
            categorie.includes(recherche) || 
            sousCategorie.includes(recherche)
        ) {
            ligne.style.display = "";
        } else {
            ligne.style.display = "none";
        }
    });
}

function selectionnerProduit(id, nom, description, categorie, sousCategorie) {
    document.getElementById("id_produit_stock").value = id;
    document.getElementById("produit-selectionne").innerHTML = `
        <strong>Produit sélectionné :</strong> ${nom} - ${description} (${categorie} > ${sousCategorie})
    `;
}

function chargerStocks() {
    fetch("../modules/boutique/get_stocks.php")
        .then(response => response.json())
        .then(data => {
            console.log("📢 [DEBUG] Stocks reçus :", data);

            let listeStocks = document.getElementById("liste-stocks");
            if (!listeStocks) {
                console.error("❌ [ERREUR] Élément 'liste-stocks' introuvable !");
                return;
            }

            listeStocks.innerHTML = ""; 

            if (!Array.isArray(data.stocks) || data.stocks.length === 0) {
                listeStocks.innerHTML = `<tr><td colspan="5">Aucun stock trouvé.</td></tr>`;
                return;
            }

            data.stocks.forEach(stock => {
                let row = `
                    <tr>
                        <td>${stock.id_produit}</td>
                        <td>${stock.nom}</td>
                        <td colspan="2">${stock.stock_details}</td>
                    </tr>
                `;
                listeStocks.innerHTML += row;
            });
        })
        .catch(error => console.error("❌ [ERREUR] lors du chargement des stocks :", error));
}

function modifierStock(action) {
    let idProduit = document.getElementById("id_produit_stock").value;
    let taille = document.getElementById("taille-stock").value.trim();
    let quantite = document.getElementById("quantite-stock").value.trim();

    if (!idProduit || !taille || !quantite || isNaN(quantite) || quantite <= 0) {
        alert("❌ Veuillez remplir tous les champs correctement !");
        return;
    }

    let endpoint = action === "ajouter" ? "../modules/boutique/add_stock.php" : "../modules/boutique/remove_stock.php";

    let formData = new FormData();
    formData.append("id_produit", idProduit);
    formData.append("taille", taille);
    formData.append("quantite", quantite);

    fetch(endpoint, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.success);
        } else {
            alert(data.error);
        }
        chargerStocks();
    })
    .catch(error => console.error(`❌ [ERREUR] lors de la modification du stock (${action}) :`, error));
}