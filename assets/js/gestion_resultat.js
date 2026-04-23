document.addEventListener("DOMContentLoaded", function () {
    fetchPoules();

    function fetchPoules() {
        fetch('../modules/poule/fetch_poules.php')
            .then(response => response.text())
            .then(data => {
                document.getElementById("poules").innerHTML = data;
                attachPouleClickListeners();
            })
            .catch(error => console.error('Erreur lors du chargement des poules:', error));
    }

    function attachPouleClickListeners() {
        document.querySelectorAll(".poule-box").forEach(poule => {
            poule.addEventListener("click", function () {
                let pouleId = this.dataset.id;
                afficherPouleSelectionnee(pouleId);
            });
        });
    }

    function afficherPouleSelectionnee(pouleId) {
        let poulesDiv = document.getElementById("poules-container");
        let rencontresDiv = document.getElementById("rencontres-container");
        let btnRetour = document.getElementById("btnRetour");

        if (pouleId) {
            fetch('../modules/rencontres/fetch_rencontres.php?poule_id=' + pouleId)
                .then(response => response.text())
                .then(data => {
                    poulesDiv.style.display = "none";
                    rencontresDiv.style.display = "block";
                    btnRetour.style.display = "block";
                    document.getElementById("rencontres").innerHTML = data;
                    rencontresDiv.dataset.pouleId = pouleId; 
                    attachEventListeners();

                    btnRetour.addEventListener("click", function () {
                        rencontresDiv.style.display = "none";
                        btnRetour.style.display = "none";
                        poulesDiv.style.display = "block";
                    });
                })
                .catch(error => console.error('Erreur lors du chargement des rencontres:', error));
        }
    }

    function attachEventListeners() {
        document.querySelectorAll(".enregistrer-score").forEach(button => {
            button.addEventListener("click", function () {
                let idRencontre = this.dataset.id;
                let isMery = this.dataset.mery === "true";
                let scoreDomicile = document.getElementById('score_domicile_' + idRencontre).value;
                let scoreExterieur = document.getElementById('score_exterieur_' + idRencontre).value;

                let formData = new FormData();
                formData.append("id_rencontre", idRencontre);
                formData.append("score_domicile", scoreDomicile);
                formData.append("score_exterieur", scoreExterieur);

                if (isMery) {
                    afficherPopupJoueursMery(idRencontre, formData);
                } else {
                    envoyerScore(formData);
                }
            });
        });
    }

    function afficherPopupJoueursMery(idRencontre, formData) {
        fetch(`../modules/rencontres/get_nb_joueurs.php?id_rencontre=${idRencontre}`)
            .then(res => res.json())
            .then(({ nb_joueurs }) => {
                let joueursSelectionnes = new Set();
                const modal = document.createElement("div");
                modal.classList.add("modal");
                modal.innerHTML = `
                    <div class="modal-content">
                        <button class="modal-close">&times;</button>
                        <h2>Sélectionnez les ${nb_joueurs} joueurs de MERY ayant participé</h2>
                        <input type="text" id="searchJoueur" placeholder="Rechercher un joueur..." />
                        <div id="listeJoueurs"></div>
                        <p><span id="joueurs-restants">${nb_joueurs}</span> joueurs restants à sélectionner</p>
                        <button id="validerJoueurs" disabled>Valider</button>
                    </div>
                `;
                document.body.appendChild(modal);
    
                const listeJoueursDiv = document.getElementById("listeJoueurs");
                const searchInput = document.getElementById("searchJoueur");
                const submitButton = document.getElementById("validerJoueurs");
                const joueursRestants = document.getElementById("joueurs-restants");
    
                function renderJoueurs(joueursList) {
                    listeJoueursDiv.innerHTML = joueursList.map(joueur => {
                        const checked = joueursSelectionnes.has(String(joueur.id_joueur)) ? 'checked' : '';
                        return `<label>
                            <input type="checkbox" name="joueurs" value="${joueur.id_joueur}" ${checked}>
                            ${joueur.nom} ${joueur.prenom}
                        </label>`;
                    }).join("");
                    attachCheckboxListeners();
                }
    
                function attachCheckboxListeners() {
                    document.querySelectorAll('input[name="joueurs"]').forEach(checkbox => {
                        checkbox.addEventListener("change", function () {
                            if (checkbox.checked) {
                                joueursSelectionnes.add(checkbox.value);
                            } else {
                                joueursSelectionnes.delete(checkbox.value);
                            }
                            joueursRestants.textContent = nb_joueurs - joueursSelectionnes.size;
                            submitButton.disabled = joueursSelectionnes.size !== nb_joueurs;
                        });
    
                        if (joueursSelectionnes.has(checkbox.value)) {
                            checkbox.checked = true;
                        }
                    });
                    joueursRestants.textContent = nb_joueurs - joueursSelectionnes.size;
                    submitButton.disabled = joueursSelectionnes.size !== nb_joueurs;
                }
    
                searchInput.addEventListener("input", function () {
                    fetch(`../modules/rencontres/fetch_joueurs_mery.php?search=${this.value}`)
                        .then(response => response.json())
                        .then(renderJoueurs);
                });
    
                fetch('../modules/rencontres/fetch_joueurs_mery.php')
                    .then(response => response.json())
                    .then(renderJoueurs);
    
                submitButton.addEventListener("click", function () {
                    formData.append("joueurs", JSON.stringify([...joueursSelectionnes]));
                    modal.remove();
                    envoyerScore(formData);
                });
    
                document.querySelector(".modal-close").addEventListener("click", () => modal.remove());
            })
            .catch(err => console.error("Erreur récupération nb_joueurs :", err));
    }

    function envoyerScore(formData) {
        fetch('../modules/rencontres/update_score.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);

            let rencontresContainer = document.getElementById("rencontres-container");
            if (rencontresContainer.style.display !== "block") return;

            let pouleId = rencontresContainer.dataset.pouleId; // Récupérer l'ID de la poule active

            // Rafraîchir le classement et les rencontres
            fetchRencontresEtClassement(pouleId);
        })
        .catch(error => console.error('Erreur lors de l\'enregistrement du score:', error));
    }

    function fetchRencontresEtClassement(pouleId) {
        Promise.all([
            fetch('../modules/rencontres/fetch_rencontres.php?poule_id=' + pouleId),
            fetch('../modules/poule/fetch_poules.php?poule_id=' + pouleId) // Charger uniquement cette poule
        ])
        .then(responses => Promise.all(responses.map(res => res.text())))
        .then(([rencontresData, classementData]) => {
            document.getElementById("rencontres").innerHTML = rencontresData; // Met à jour les rencontres
            fetchPoules();
            attachEventListeners(); 
        })
        .catch(error => console.error('Erreur lors du rafraîchissement des données:', error));
    }
});