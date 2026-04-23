document.addEventListener("DOMContentLoaded", () => {
    console.log("📦 JS Infos pratiques chargé");
    chargerInfos();

    const form = document.getElementById("form-ajout-info");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        fetch("../modules/club/ajouter_info.php", {
            method: "POST",
            body: formData
        })
        .then(r => r.text())
        .then(msg => {
            alert(msg);
            form.reset();
            chargerInfos();
        })
        .catch(err => {
            alert("❌ Erreur ajout.");
            console.error(err);
        });
    });
});

function chargerInfos() {
    fetch("../modules/club/get_infos.php")
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector("#table-infos tbody");
            tbody.innerHTML = "";

            data.forEach(info => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${info.nom_info}</td>
                    <td>${info.valeur}</td>
                    <td>
                        <button onclick="modifierInfo(${info.id}, '${info.nom_info.replace(/'/g, "\\'")}', '${info.valeur.replace(/'/g, "\\'")}')">✏️</button>
                        <button onclick="supprimerInfo(${info.id})">🗑️</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(err => {
            console.error("❌ Erreur chargement infos :", err);
        });
}

function supprimerInfo(id) {
    if (!confirm("❗ Supprimer cette information ?")) return;

    fetch("../modules/club/supprimer_info.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "id=" + encodeURIComponent(id)
    })
    .then(r => r.text())
    .then(msg => {
        alert(msg);
        chargerInfos();
    })
    .catch(err => {
        alert("❌ Erreur suppression.");
        console.error(err);
    });
}

function modifierInfo(id, nom, valeur) {
    const zone = document.getElementById("zone-modification");
    zone.innerHTML = `
        <h3>✏️ Modifier "${nom}"</h3>
        <form id="form-modif-info">
            <input type="hidden" name="id" value="${id}">
            <label>Nom : <input type="text" name="nom_info" value="${nom}" required></label>
            <label>Valeur : <input type="text" name="valeur" value="${valeur}" required></label>
            <button type="submit">💾 Enregistrer</button>
            <button type="button" onclick="annulerModification()">Annuler</button>
        </form>
    `;
    zone.style.display = "block";

    document.getElementById("form-modif-info").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch("../modules/club/update_info.php", {
            method: "POST",
            body: formData
        })
        .then(r => r.text())
        .then(msg => {
            alert(msg);
            annulerModification();
            chargerInfos();
        })
        .catch(err => {
            alert("❌ Erreur mise à jour.");
            console.error(err);
        });
    });
}

function annulerModification() {
    const zone = document.getElementById("zone-modification");
    zone.innerHTML = "";
    zone.style.display = "none";
}