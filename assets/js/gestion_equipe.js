$(document).ready(function () {
    console.log("✅ script.js est bien chargé !");

    const numeroEquipeInput = $("#numero_equipe");
    const nomEquipeInput = $("#nom_equipe");
    const championnatSelect = $("#championnat");
    const divisionSelect = $("#division");
    const nombreJoueursInput = $("#nombre_joueurs");
    const numeroPouleSelect = $("#numero_poule");
    const formEquipe = $("#form-creation-equipe");
    const messageEquipe = $("#message-equipe");
    const poulesContainer = $("#poules-container");

    // divisions et nombre de joueurs en fonction du championnat
    const divisions = {
        "1": [ // Championnat de France
            { nom: "PRO A", joueurs: 4, poules: 1 },
            { nom: "PRO B", joueurs: 4, poules: 1 },
            { nom: "National 1", joueurs: 4, poules: 2 },
            { nom: "National 2", joueurs: 4, poules: 8 },
            { nom: "National 3", joueurs: 4, poules: 16 },
            { nom: "Pré-National", joueurs: 4, poules: 2 },
            { nom: "Régional 1", joueurs: 4, poules: 4 },
            { nom: "Régional 2", joueurs: 4, poules: 8 },
            { nom: "Régional 3", joueurs: 4, poules: 16 },
            { nom: "Pré-Régional", joueurs: 4, poules: 4 },
            { nom: "Départemental 1", joueurs: 4, poules: 4 },
            { nom: "Départemental 2", joueurs: 4, poules: 8 },
            { nom: "Départemental 3", joueurs: 4, poules: 9 }
        ],
        "2": [ // Championnat de Paris
            { nom: "EXCELLENCE", joueurs: 9, poules: 2 },
            { nom: "PROMO EXCELLENCE", joueurs: 9, poules: 5 },
            { nom: "HONNEUR", joueurs: 9, poules: 9 },
            { nom: "DIVISION 1", joueurs: 6, poules: 10 },
            { nom: "DIVISION 2", joueurs: 3, poules: 19 }
        ]
    };

    // Mise à jour automatique du nom de l'équipe basé sur le numéro
    numeroEquipeInput.on("input", function () {
        nomEquipeInput.val("MERY " + $(this).val());
    });

    // Mettre à jour les divisions en fonction du championnat sélectionné
    function mettreAJourDivisions() {
        const selectedChampionnat = championnatSelect.val();
        divisionSelect.empty();

        if (divisions[selectedChampionnat]) {
            divisions[selectedChampionnat].forEach(division => {
                divisionSelect.append(new Option(division.nom, division.nom));
            });

            divisionSelect.val(divisions[selectedChampionnat][0].nom).trigger("change");
        }
    }

    // Mettre à jour le nombre de joueurs et les poules
    function mettreAJourInfosDivision() {
        const selectedChampionnat = championnatSelect.val();
        const selectedDivision = divisionSelect.val();
        const foundDivision = divisions[selectedChampionnat].find(div => div.nom === selectedDivision);

        if (foundDivision) {
            nombreJoueursInput.val(foundDivision.joueurs);
            afficherPoules(foundDivision.poules);
        }
    }

    // Afficher les poules disponibles
    function afficherPoules(nombreDePoules) {
        numeroPouleSelect.empty();
        for (let i = 1; i <= nombreDePoules; i++) {
            numeroPouleSelect.append(new Option(`Poule ${i}`, i));
        }
    }

    // Attacher les événements de mise à jour
    championnatSelect.on("change", mettreAJourDivisions);
    divisionSelect.on("change", mettreAJourInfosDivision);
    mettreAJourDivisions();

    // Gestion de l'ajout d'équipe
    formEquipe.on("submit", function (event) {
        event.preventDefault();
    
        let formData = new FormData(this);
        formData.append("division", divisionSelect.val());
    
        fetch("../modules/equipe/ajouter_equipe.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                alert("✅ Équipe créée avec succès !");
                location.reload()
            } else {
                messageEquipe.html("❌ Erreur : " + data.error);
            }

        })
        .catch(error => console.error("❌ Erreur JS :", error));
    });

    $(document).ready(function () {
        // Charger les équipes de Méry dans la liste déroulante
        $.get("../modules/equipe/get_equipes_mery.php", function (data) {
            console.log("📥 Données reçues de get_equipes_mery.php :", data);
            $("#selectEquipe").html(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("❌ Erreur AJAX :", textStatus, errorThrown);
        });
    
        $("#btnCreerRencontres").on("click", function () {
            console.log("✅ Bouton 'Créer les rencontres' cliqué !");
            creerRencontres();
        });
    });
    
    // Gestion du formulaire de création des rencontres
    function creerRencontres() {
        let equipes = [];
        for (let i = 1; i <= 8; i++) {
            let nomEquipe = $(`#team${i}`).val().trim();
            if (!nomEquipe) {
                alert("Veuillez remplir toutes les équipes.");
                return;
            }
            equipes.push(nomEquipe);
        }
    
        let idEquipeMery = $("#selectEquipe").val();
        if (!idEquipeMery) {
            alert("Veuillez sélectionner une équipe de Méry.");
            return;
        }
    
        let datesJournees = [];
        for (let i = 1; i <= 7; i++) {
            let date = $(`#journee${i}`).val();
            if (!date) {
                alert("Veuillez renseigner toutes les dates des journées.");
                return;
            }
            datesJournees.push(date);
        }
    
        $.post("../modules/rencontres/save_rencontres.php", {
            idEquipeMery,
            equipes,
            datesJournees
        }, function (response) {
            alert(response);
            location.reload()
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("Erreur lors de l'enregistrement : " + textStatus);
            console.error("❌ Erreur AJAX :", textStatus, errorThrown);
        });
    }

function chargerPoules() {
    console.log("📡 Envoi de la requête à get_poules.php...");

    fetch("../modules/poule/get_poules.php")
        .then(response => response.json())
        .then(data => {
            console.log("📥 Réponse reçue de get_poules.php :", data);

            if (data.success && data.poules.length > 0) {
                poulesContainer.empty();

                data.poules.forEach(poule => {
                    const pouleDiv = $("<div>")
                        .addClass("poule")
                        .attr("data-id-poule", poule.id_poule); // <-- ici le fix
                
                    const pouleHTML = `
                        <h3>${poule.championnat} - ${poule.division} - Poule ${poule.n_poule}</h3>
                        <ul>${poule.equipes.split(",").map(equipe => `<li>${equipe}</li>`).join("")}</ul>
                        <button class="btnSupprimerPoule">🗑️ Supprimer la poule</button>
                    `;
                    pouleDiv.html(pouleHTML);
                    poulesContainer.append(pouleDiv);
                });
            } else {
                poulesContainer.html("<p>Aucune poule disponible.</p>");
            }
        })
        .catch(error => {
            console.error("❌ Erreur lors de la récupération des poules :", error);
            poulesContainer.html("<p>Une erreur s'est produite.</p>");
        });
} 

// Suppression d'une poule
$(document).on("click", ".btnSupprimerPoule", function () {
    const pouleDiv = $(this).closest(".poule");
    const idPoule = pouleDiv.data("id-poule");

    if (confirm("❗ Cette action supprimera la poule, ses équipes et toutes ses rencontres. Continuer ?")) {
        $.ajax({
            url: "../modules/poule/supprimer_poule.php",
            method: "POST",
            data: { id_poule: idPoule },
            success: function (response) {
                try {
                    const res = JSON.parse(response);
                    if (res.success) {
                        alert("✅ Poule supprimée avec succès !");
                        chargerPoules();
                    } else {
                        alert("❌ Erreur : " + res.message);
                    }
                } catch (e) {
                    console.error("❌ Erreur de parsing JSON :", e);
                    alert("Une erreur est survenue.");
                }
            },
            error: function () {
                alert("❌ Échec de la suppression.");
            }
        });
    }
});

chargerPoules(); 
});