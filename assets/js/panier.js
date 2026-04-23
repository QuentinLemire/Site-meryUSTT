function activerSurvolPanier() {
    let cartContainer = document.querySelector(".cart-container");
    let cartPreview = document.getElementById("panier-dropdown");

    if (!cartContainer || !cartPreview) return;

    cartContainer.addEventListener("mouseenter", () => {
        cartPreview.style.display = "block"; // Affichage au survol
    });

    cartContainer.addEventListener("mouseleave", () => {
        cartPreview.style.display = "none"; // Cacher quand la souris sort
    });
}

function afficherPanier() {
    fetch('../modules/panier/get_panier.php')
    .then(response => response.json())
    .then(data => {
        try {
            const panierContent = document.querySelector('.panier-dropdown');

            if (data.success && data.panier && data.panier.length > 0) {
                let panierHtml = '<ul>';
                let total = 0;

                data.panier.forEach(item => {
                    const totalItemPrice = item.prix * item.quantite;
                    total += totalItemPrice;

                    panierHtml += `
                        <li>
                            <img src="../modules/boutique/${item.image}" alt="${item.nom}" class="cart-item-image" style="width: 50px; height: 50px;">
                            <span><strong>Taille:</strong> ${item.taille}</span> -
                            <span><strong>Quantité:</strong> ${item.quantite}</span> -
                            <span><strong>Prix :</strong> ${totalItemPrice.toFixed(2)}€</span>
                        </li>
                    `;
                });

                panierHtml += `</ul><p><strong>Total du panier:</strong> ${total.toFixed(2)}€</p>`;
                panierContent.innerHTML = panierHtml;
            } else {
                panierContent.innerHTML = '<p>Votre panier est vide.</p>';
            }
        } catch (error) {
            console.log("Erreur cachée : ", error);  
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération du panier:', error);
    });
}

function mettreAJourBadgePanier() {
    const cartBadge = document.getElementById("cart-count");

    fetch('../modules/panier/get_panier.php')
        .then(response => response.json())
        .then(data => {
            if (data && data.panier && data.panier.length > 0) {
                let totalArticles = 0;

                // Calculer le nombre total d'articles dans le panier
                data.panier.forEach(item => {
                    totalArticles += item.quantite;  // On ajoute la quantité de chaque produit
                });

                // Mettre à jour le badge avec le nombre total d'articles
                cartBadge.textContent = totalArticles;
                cartBadge.style.display = totalArticles > 0 ? "flex" : "none";  // Afficher ou cacher le badge
            } else {
                cartBadge.textContent = '0';
                cartBadge.style.display = "none";  // Cacher le badge si le panier est vide
            }
        })

}

function initPanierScripts() {
    activerSurvolPanier();

    // Charger le panier et mettre à jour le badge du panier
    afficherPanier();
    mettreAJourBadgePanier();
}

document.addEventListener("DOMContentLoaded", function() {
    initPanierScripts();  
});