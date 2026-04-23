function ajouterAuPanier(idProduit) {
    let tailleSelect = document.getElementById(`taille-${idProduit}`);
    let tailleChoisie = tailleSelect ? tailleSelect.value : null;

    // Vérifier si une taille est sélectionnée
    if (!tailleChoisie) {
        alert("Veuillez sélectionner une taille avant d'ajouter au panier !");
        return;
    }

    // Récupérer la quantité sélectionnée
    let quantiteSelect = document.getElementById(`quantite-${idProduit}`);
    let quantiteChoisie = quantiteSelect ? parseInt(quantiteSelect.value) : 1; // Conversion de la quantité en nombre entier

    // Faire une requête à l'API pour récupérer le nom, l'image, et le prix du produit
    let url = `../modules/boutique/get_produits_boutique.php?id_produit=${idProduit}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                // Récupérer les informations du produit
                let produit = data[0];
                let nomProduit = produit.nom;
                let imageProduit = produit.images.length > 0 ? produit.images[0] : 'Image non disponible';
                let prixProduit = produit.prix;  // Récupérer le prix

                // Calculer le total (prix * quantité)
                let totalPrix = prixProduit * quantiteChoisie;

                // Envoyer les données au serveur pour les insérer dans la base de données
                let formData = new FormData();
                formData.append('id_produit', idProduit);
                formData.append('taille', tailleChoisie);
                formData.append('quantite', quantiteChoisie);

                fetch('../modules/panier/ajouter_panier.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert(`Ajouté au panier avec succés! 🏓 `);
                        location.reload()
                    } else {
                        alert("Une erreur est survenue lors de l'ajout au panier.");
                        console.error('Erreur détaillée du serveur:', data.message);  // Affichage du message d'erreur détaillé
                    }
                })
                .catch(error => {
                    console.error("Erreur lors de l'ajout au panier :", error);  // Détails de l'erreur
                    alert("Erreur lors de l'ajout du produit au panier.");
                });
            } else {
                console.error(`Aucun produit trouvé pour l'ID ${idProduit}`);
                alert("Produit non trouvé !");
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des informations du produit :", error);
            alert("Erreur lors de l'ajout du produit au panier.");
        });
}