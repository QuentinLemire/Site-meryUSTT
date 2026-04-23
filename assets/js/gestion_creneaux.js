document.addEventListener("DOMContentLoaded", () => {
    console.log("📦 JS Gestion créneaux chargé");
    chargerCreneaux();

    const form = document.getElementById("form-ajout-creneau");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("../modules/club/ajouter_creneau.php", {
            method: "POST",
            body: formData
        })
        .then(r => r.text())
        .then(msg => {
            alert("✅ Créneau ajouté !");
            form.reset();
            chargerCreneaux();
        })
        .catch(err => {
            alert("❌ Erreur lors de l'ajout.");
            console.error(err);
        });
    });
});

function chargerCreneaux() {
    fetch("../modules/club/get_creneaux.php")
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector("#table-creneaux tbody");
            tbody.innerHTML = "";

            data.forEach(creneau => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${creneau.jour}</td>
                    <td>${creneau.heure_debut.slice(0, 5)}</td>
                    <td>${creneau.heure_fin.slice(0, 5)}</td>
                    <td>${creneau.public}</td>
                    <td>
                        <button onclick="supprimerCreneau(${creneau.id})">🗑️</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(err => {
            console.error("❌ Erreur chargement créneaux :", err);
        });
}

function supprimerCreneau(id) {
    if (!confirm("❗ Supprimer ce créneau ?")) return;

    fetch("../modules/club/supprimer_creneau.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "id=" + encodeURIComponent(id)
    })
    .then(r => r.text())
    .then(msg => {
        alert("🗑️ " + msg.trim());
        chargerCreneaux();
    })
    .catch(err => {
        alert("❌ Erreur lors de la suppression.");
        console.error(err);
    });
}
