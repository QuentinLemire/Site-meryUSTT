document.addEventListener("DOMContentLoaded", function () {
    afficherMonPanier(); 
});

function afficherMonPanier() {
    fetch('../modules/panier/get_panier.php') 
        .then(response => response.json())
        .then(data => {
            const panierContent = document.getElementById("panier-content");
            let totalCommande = 0; 

            // Si le panier est vide
            if (!data.success || data.panier.length === 0) {
                panierContent.innerHTML = "<p>Votre panier est vide.</p>";
            } else {
                let panierHtml = "<ul>";

                // Afficher chaque produit du panier (image, nom, taille, prix, quantité, et prix total)
                data.panier.forEach(item => {
                    const totalLigne = (item.prix * item.quantite).toFixed(2); // Calcul du prix total pour chaque ligne
                    totalCommande += parseFloat(totalLigne); // Ajouter le total de la ligne au total de la commande

                    panierHtml += `
                        <li>
                            <img src="../modules/boutique/${item.image}" alt="${item.nom}" style="width: 50px; height: 50px;">
                            <span><strong>Nom:</strong> ${item.nom}</span> -
                            <span><strong>Taille:</strong> ${item.taille}</span> -
                            <span><strong>Prix:</strong> ${item.prix}€</span> -
                            <span><strong>Total:</strong> ${totalLigne}€</span>
                                <button onclick="modifierQuantite(${item.id_produit}, 'minus')">-</button>
                                <span id="quantite_${item.id_produit}">${item.quantite}</span>
                                <button onclick="modifierQuantite(${item.id_produit}, 'plus')">+</button>
                            <button onclick="supprimerProduit(${item.id_produit})">Supprimer</button> <!-- Bouton pour supprimer -->
                        </li>
                    `;
                });

                panierHtml += "</ul>";

                // Ajouter une ligne pour afficher le total de la commande
                panierHtml += `<p><strong>Total de la commande :</strong> ${totalCommande.toFixed(2)}€</p>`;

                panierContent.innerHTML = panierHtml;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération du panier:', error);
            alert('Erreur lors de l\'affichage du panier.');
        });
}

function modifierQuantite(idProduit, action) {
    // Récupérer la quantité actuelle
    const quantiteElement = document.getElementById(`quantite_${idProduit}`);
    let quantite = parseInt(quantiteElement.textContent);

    // Modifier la quantité en fonction de l'action (plus ou moins)
    if (action === 'plus') {
        quantite++;
        
    } else if (action === 'minus' && quantite > 1) {
        quantite--;
    }

    // Mettre à jour la quantité dans l'interface utilisateur
    quantiteElement.textContent = quantite;

    // Envoyer la nouvelle quantité au serveur pour mise à jour dans la base de données
    fetch('../modules/panier/update_quantity.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id_produit=${idProduit}&quantite=${quantite}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de la mise à jour de la quantité.');
    });
}

// Fonction pour supprimer un produit du panier
function supprimerProduit(idProduit) {
    fetch('../modules/boutique/delete_product.php', {  // Le fichier PHP qui supprime le produit
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id_produit=${idProduit}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            location.reload()
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression.');
    });
}

 function viderPanier() {
    fetch('../modules/panier/clear_panier.php', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: ''  // Pas besoin d'envoyer de données, on vide tout
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload()
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression du panier.');
    });
}

function afficherPopupPaiement() {
    fetch('../modules/panier/get_panier.php')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.panier.length > 0) {
                // Pré-remplir l'adresse de l'utilisateur et afficher le pop-up
                fetch('../modules/utilisateur/get_user_address.php')
                    .then(response => response.json())
                    .then(addressData => {
                        if (addressData.success) {
                            // Pré-remplir le champ "Adresse" avec l'adresse complète de l'utilisateur
                            document.getElementById('adresse').value = addressData.adresse;
                            document.getElementById('code_postal').value = addressData.code_postal;
                            document.getElementById('ville').value = addressData.ville;

                            // Afficher le pop-up de paiement
                            document.getElementById('payment-popup').style.display = 'block';
                        } else {
                            alert("Erreur lors de la récupération de l'adresse.");
                        }
                    })
                    .catch(error => {
                        console.error('Erreur:', error);
                        alert('Erreur lors de la récupération de l\'adresse.');
                    });
            } else {
                // Afficher l'alerte si le panier est vide
                alert("Votre panier est vide.");
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Erreur lors de la récupération du panier.');
        });
}

function fermerPopup() {
    document.getElementById("payment-popup").style.display = "none";  
}

function validerCommande() {
    // Récupérer les valeurs des champs
    const adresse = document.getElementById('adresse').value;  
    const codePostal = document.getElementById('code_postal').value;
    const ville = document.getElementById('ville').value;
    const moyenPaiement = document.getElementById('moyen_paiement').value;

    // Vérifier si tous les champs sont remplis
    if (!adresse || !codePostal || !ville || !moyenPaiement) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Concaténer l'adresse complète pour la base de données
    const adresseLivraison = `${adresse}, ${codePostal} ${ville}`;

    // Récupérer les informations du panier
    fetch('../modules/panier/get_panier.php')
        .then(response => response.json())
        .then(data => {
            const panier = data.panier;
            const totalPanier = panier.reduce((total, item) => total + (item.prix * item.quantite), 0);

            // Vérification du total de la commande
            if (isNaN(totalPanier) || totalPanier <= 0) {
                alert("Erreur de calcul du total.");
                return;
            }

            // Envoyer les données pour insérer la commande
            fetch('../modules/panier/create_commande.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `id_utilisateur=${encodeURIComponent(data.user_id)}&adresse_livraison=${encodeURIComponent(adresseLivraison)}&total=${totalPanier.toFixed(2)}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    updateStock(panier);

                    // Récupérer l'ID de la commande créée
                    const id_commande = data.id_commande;  
                    // Maintenant insérer les produits dans la table 'commande_produits'
                    insertCommandeProduits(id_commande, panier);  
                    alert(data.message);
                    // Fermer le pop-up
                    document.getElementById('payment-popup').style.display = 'none';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Erreur lors de la validation de la commande.');
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Erreur lors de la récupération du panier.');
        });
}

function updateStock(panier) {
    panier.forEach(item => {
        const idStock = item.id_stock;
        const quantite = item.quantite;

        // Afficher les informations dans la console (pour déboguer)
        console.log(`id_stock: ${idStock}, Quantité: ${quantite}`);

        // Envoi des données à update_stock.php via fetch
        fetch('../modules/boutique/update_stock.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `id_stock=${idStock}&quantite=${quantite}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data.message); 
            } else {
                console.error(data.message); 
            }
        })
        .catch(error => {
            console.error('Erreur lors de la mise à jour du stock:', error);
        });
    });
}

function insertCommandeProduits(id_commande, panier) {
    const promises = panier.map(item => {
        return new Promise((resolve, reject) => {
            // Calcul du totalLigne (prix * quantité)
            const totalLigne = parseFloat((item.prix * item.quantite).toFixed(2));

            // Envoi simplifié avec id_commande, id_produit, quantite, et totalLigne
            console.log('Insertion produit:', {
                id_commande: id_commande,
                id_produit: item.id_produit,
                quantite: item.quantite,
                totalLigne: totalLigne
            });

            fetch('../modules/panier/insert_commande_produit.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `id_commande=${encodeURIComponent(id_commande)}&id_produit=${encodeURIComponent(item.id_produit)}&quantite=${encodeURIComponent(item.quantite)}&totalLigne=${encodeURIComponent(totalLigne)}`
            })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    console.error("Erreur lors de l'insertion du produit:", data.message);
                    reject(data.message); 
                } else {
                    resolve(); 
                }
            })
            .catch(error => {
                console.error('Erreur lors de l\'insertion des produits:', error);
                reject(error); 
            });
        });
    });

    Promise.all(promises)
        .then(() => {
            // Appeler viderPanier uniquement si toutes les requêtes réussissent
            viderPanier();
        })
        .catch(error => {
            console.error('Une erreur est survenue lors de l\'insertion de l\'une des commandes:', error);
        });
}
