document.addEventListener("DOMContentLoaded", () => {
    console.log("📦 JS Bureau chargé");
    chargerBureau();
    chargerListeJoueurs();

    // Ajout d’un membre
    const form = document.getElementById("form-ajout-bureau");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
 
        fetch("../modules/club/ajouter_bureau.php", {
            method: "POST",
            body: formData
        })
        .then(r => r.text())
        .then(msg => {
            alert("✅ Membre ajouté !");
            form.reset();
            chargerBureau();
        })
        .catch(err => {
            alert("❌ Erreur ajout membre.");
            console.error(err);
        });
    });
});

function chargerBureau() {
    fetch("../modules/club/get_bureau.php")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("cartes-bureau");
            container.innerHTML = "";

            data.forEach(membre => {
                const card = document.createElement("div");
                card.className = "bureau-card";
                card.innerHTML = `
                    <img src="../${membre.photo}" alt="${membre.nom}" class="photo">
                    <h3>${membre.prenom} ${membre.nom}</h3>
                    <p>${membre.role}</p>
                    <div class="actions">
                        <button onclick="modifierMembre(${membre.id})">✏️</button>
                        <button onclick="supprimerMembre(${membre.id})">🗑️</button>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error("❌ Erreur chargement bureau :", err);
        });
}

function supprimerMembre(id) {
    console.log("🔍 ID reçu :", id);

    if (!id || isNaN(id)) {
        alert("❌ ID de membre invalide !");
        return;
    }

    if (!confirm("❗ Supprimer ce membre ?")) return;

    fetch("../modules/club/supprimer_bureau.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "id=" + encodeURIComponent(id)
    })
    .then(r => r.text())
    .then(msg => {
        alert(msg.trim());
        chargerBureau();
    })
    .catch(err => {
        alert("❌ Erreur suppression membre.");
        console.error(err);
    });
}

function modifierMembre(id) {
    fetch(`../modules/club/get_bureau_by_id.php?id=${id}`)
        .then(r => r.json())
        .then(membre => {
            const zone = document.getElementById("zone-modification");
            zone.style.display = "block";
            zone.innerHTML = `
                <h3>✏️ Modifier ${membre.prenom} ${membre.nom}</h3>
                <form id="form-modifier-bureau" enctype="multipart/form-data">
                    <input type="hidden" name="id" value="${membre.id}">
                    <input type="hidden" name="id_joueur" value="${membre.id_joueur}">
                    <label>Prénom :
                        <input type="text" name="prenom" value="${membre.prenom}" required>
                    </label>
                    <label>Nom :
                        <input type="text" name="nom" value="${membre.nom}" required>
                    </label>
                    <label>Rôle :
                        <input type="text" name="role" value="${membre.role}" required>
                    </label>
                    <label>Photo (laisser vide pour ne pas changer) :
                        <input type="file" name="photo" accept="image/*">
                   </label>
                    <button type="submit">💾 Enregistrer</button>
                    <button type="button" onclick="annulerModification()">Annuler</button>
                </form>
            `;

            // Soumission de la modif
            document.getElementById("form-modifier-bureau").addEventListener("submit", function (e) {
                e.preventDefault();
                const formData = new FormData(this);

                fetch("../modules/club/update_bureau.php", {
                    method: "POST",
                    body: formData
                })
                .then(r => r.text())
                .then(msg => {
                    alert("✅ Modifié !");
                    annulerModification();
                    chargerBureau();
                })
                .catch(err => {
                    alert("❌ Erreur mise à jour membre.");
                    console.error(err);
                });
            });
        });
}

function annulerModification() {
    const zone = document.getElementById("zone-modification");
    zone.innerHTML = "";
    zone.style.display = "none";
}

function chargerListeJoueurs() {
    fetch("../modules/rencontres/get_joueurs.php")
        .then(response => response.json())
        .then(data => {
            const joueurs = data.joueurs;
            const datalist = document.getElementById("liste-joueurs");
            datalist.innerHTML = "";

            joueurs.forEach(joueur => {
                const option = document.createElement("option");
                option.value = `${joueur.prenom} ${joueur.nom}`;
                datalist.appendChild(option);
            });

            // Associer champ visible (nom) au champ caché (id)
            const input = document.getElementById("champ-joueur");
            const champId = document.getElementById("id_joueur");

            input.addEventListener("input", () => {
                const valeur = input.value.toLowerCase();
                const match = joueurs.find(j =>
                    (`${j.prenom} ${j.nom}`).toLowerCase() === valeur
                );
                if (match) {
                    champId.value = match.id_joueur; 
                } else {
                    champId.value = "";
                }
            });
        })
        .catch(err => {
            console.error("❌ Erreur chargement joueurs :", err);
        });
}