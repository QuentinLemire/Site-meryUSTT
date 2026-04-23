document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM chargé");

    const ajoutJoueurForm = document.getElementById("ajout-joueur-form");
    const deleteButton = document.getElementById("delete-selected");
    const tbody = document.querySelector("#table-joueurs tbody");
    const statsJoueurs = document.getElementById("stats-joueurs");

    function chargerJoueurs() {
        fetch("../modules/rencontres/get_joueurs.php")
            .then(response => response.json())
            .then(data => {
                console.log("📢 Données reçues :", data); 

                if (!data.joueurs || !Array.isArray(data.joueurs)) {
                    console.error("❌ Erreur : la clé 'joueurs' est manquante ou invalide !");
                    return;
                }

                let tbody = document.querySelector("#table-joueurs tbody");
                tbody.innerHTML = ""; 

                data.joueurs.forEach(joueur => {
                    console.log(`📢 Joueur reçu : ${joueur.prenom} ${joueur.nom} - ID: ${joueur.id_joueur}`); 
                    let row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${joueur.prenom}</td>
                        <td>${joueur.nom}</td>
                        <td>${joueur.sexe}</td>
                        <td><input type="checkbox" class="joueur-checkbox" value="${joueur['id_joueur']}"></td>
                    `;
                    tbody.appendChild(row);
                });

                console.log("✅ Liste des joueurs mise à jour !");

                // Mise à jour des statistiques
                document.getElementById("stats-joueurs").innerHTML = `
                    <p>🔢 Nombre total de joueurs : <strong>${data.stats.total}</strong></p>
                    <p>👨 Nombre d'hommes : <strong>${data.stats.hommes}</strong></p>
                    <p>👩 Nombre de femmes : <strong>${data.stats.femmes}</strong></p>
                `;
            })
            .catch(error => console.error("❌ Erreur JS :", error));
    }

    // Gérer l'ajout d'un joueur
    if (ajoutJoueurForm) {
        ajoutJoueurForm.addEventListener("submit", function (event) {
            event.preventDefault();
        
            let formData = new FormData(this);
        
            console.log("📢 Données envoyées :", Object.fromEntries(formData));
        
            fetch("../modules/rencontres/ajouter_joueur.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log("📢 Réponse serveur :", data); 
                if (data.success) {
                    alert("✅ Joueur ajouté avec succès !");
                    ajoutJoueurForm.reset();
                    chargerJoueurs();
                } else {
                    alert("❌ Erreur : " + data.error);
                }
            })
            .catch(error => console.error("❌ Erreur lors de l'ajout :", error));
        });
    }

    // Gérer la suppression des joueurs cochés
    if (deleteButton) {
        deleteButton.addEventListener("click", function () {
            let checkboxes = document.querySelectorAll(".joueur-checkbox:checked");
            let joueursASupprimer = Array.from(checkboxes)
                .map(cb => cb.value) // Récupérer les valeurs
                .filter(id => id && id !== "undefined" && id !== "null"); // Filtrer les valeurs invalides

            console.log("📢 Avant encodage : joueursASupprimer =", joueursASupprimer);

            if (joueursASupprimer.length === 0) {
                alert("⚠️ Sélectionnez au moins un joueur à supprimer !");
                return;
            }

            console.log("📢 IDs envoyés au serveur :", joueursASupprimer); 

            let formData = new FormData();
            formData.append("joueurs", JSON.stringify(joueursASupprimer));

            fetch("../modules/rencontres/supprimer_joueur.php", {
                method: "POST",
                body: formData // Envoi des données 
            })
            .then(response => response.text()) 
            .then(text => {
                console.log("📢 Réponse brute du serveur :", text); 

                try {
                    let data = JSON.parse(text); 
                    console.log("📢 Réponse suppression :", data); 

                    if (data.success) {
                        alert("✅ Joueurs supprimés avec succès !");
                        chargerJoueurs(); // 🔄 Rafraîchir la liste
                    } else {
                        alert("❌ Erreur : " + data.error);
                    }
                } catch (e) {
                    console.error("❌ Erreur JSON :", e, "Réponse brute :", text);
                    alert("❌ Erreur inattendue. Vérifiez la console.");
                }
            })
            .catch(error => console.error("❌ Erreur lors de la suppression :", error));
        });
    }

    chargerJoueurs();
});