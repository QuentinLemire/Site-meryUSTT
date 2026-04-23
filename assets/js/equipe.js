document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("poules");

    // Étape 1 : charger les classements
    fetch("../modules/poule/recup_poules.php")
        .then(res => res.text())
        .then(htmlClassements => {
            container.innerHTML = htmlClassements;

            // Étape 2 : charger les rencontres
            fetch("../modules/rencontres/rencontres_mery.php")
                .then(res => res.text())
                .then(htmlRencontres => {
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = htmlRencontres;

                    const blocsRencontres = tempDiv.querySelectorAll(".bloc-rencontres");

                    blocsRencontres.forEach(bloc => {
                        const equipeRencontre = bloc.getAttribute("data-equipe")?.trim();
                        if (!equipeRencontre) return;

                        const selector = `.poule-box[data-equipe="${equipeRencontre}"]`;
                        const ciblePoule = document.querySelector(selector);

                        if (ciblePoule) {
                            ciblePoule.appendChild(bloc);
                        } else {
                            console.warn(`❌ Aucun bloc trouvé pour "${equipeRencontre}"`);
                        }
                    });
                })
                .catch(err => console.error("❌ Erreur chargement rencontres :", err));
        })
        .catch(err => console.error("❌ Erreur chargement poules :", err));
});