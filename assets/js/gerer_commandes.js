document.addEventListener("DOMContentLoaded", function () {
    afficherCommandes(); 
});

function afficherCommandes() {
    fetch('../modules/panier/get_commandes.php')  
        .then(response => response.json())
        .then(data => {
            const commandesList = document.getElementById('commandes-list');

            // Si aucune commande n'est retournée
            if (!data.success || data.commandes.length === 0) {
                commandesList.innerHTML = "<tr><td colspan='5'>Aucune commande trouvée.</td></tr>";
            } else {
                let commandesHtml = "";

                // Afficher chaque commande
                data.commandes.forEach(command => {
                    commandesHtml += `
                        <tr>
                            <td>${command.id_commande}</td>
                            <td>${command.adresse_livraison}</td>
                            <td>${command.total}€</td>
                            <td>${command.date_commande}</td>
                            <td>
                                <button onclick="voirDetailsCommande(${command.id_commande})">👀 Voir détails</button>
                                <button onclick="annulerCommande(${command.id_commande})">🗑️ Annuler</button>
                            </td>
                        </tr>
                    `;
                });

                commandesList.innerHTML = commandesHtml;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des commandes:', error);
            alert('Erreur lors de l\'affichage des commandes.');
        });
}

function voirDetailsCommande(id_commande) {
    fetch(`../modules/panier/get_details_commande.php?id_commande=${id_commande}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);  
        if (data.success) {
            const detailsPopup = document.getElementById("details-commande");
            let produitsHtml = "<ul>";
            let totalCommande = 0;

            // Informations de la commande avec le titre
            let headerHtml = `
                <h3>Commande de ${data.produits[0].nom_utilisateur} ${data.produits[0].prenom_utilisateur}</h3>
                <p><strong>Adresse de livraison :</strong> ${data.produits[0].adresse_livraison}</p>+
                <p><strong>Date de la commande :</strong> ${data.produits[0].date_commande}</p>
                <hr/>
                <h4>Produits :</h4>
            `;
            detailsPopup.innerHTML = headerHtml;

            // Parcours des produits et affichage des détails
            data.produits.forEach(item => {
                produitsHtml += `
                    <li>
                        <img src="${item.image}" alt="${item.nom_produit}" style="width: 50px; height: 50px;">
                        <span><strong>Nom :</strong> ${item.nom_produit}</span> -
                        <span><strong>Prix unitaire :</strong> ${item.prix_unitaire}€</span> -
                        <span><strong>Quantité :</strong> ${item.quantite}</span> -
                        <span><strong>Total :</strong> ${(item.quantite * item.prix_unitaire).toFixed(2)}€</span>
                    </li>
                `;
                totalCommande += item.quantite * item.prix_unitaire; // Calcul du total de la commande
            });

            produitsHtml += "</ul>";
            produitsHtml += `<p><strong>Total de la commande : ${totalCommande.toFixed(2)}€</strong></p>`;

            // Ajouter la liste des produits au popup
            detailsPopup.innerHTML += produitsHtml;

            // Afficher le popup de détails
            document.getElementById("details-commande-popup").style.display = "flex";

            // Ajouter un gestionnaire pour le bouton "Fermer"
            document.getElementById('closePopupBtn').addEventListener('click', fermerPopupDetails);
        } else {
            alert(data.message);  // Si l'id_commande ne correspond à rien
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert("Erreur lors de la récupération des détails de la commande.");
    });
}

// Fonction pour fermer le pop-up
function fermerPopupDetails() {
    document.getElementById("details-commande-popup").style.display = "none"; // Cache le pop-up
}

// Fonction pour annuler une commande
function annulerCommande(id_commande) {
    fetch('../modules/panier/annuler_commande.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id_commande=${id_commande}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            location.reload();  // Réactualiser la page pour afficher les changements
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'annulation de la commande.');
    });
}