document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script main.js chargé");

    fetch("../modules/utilisateur/get_user_info.php")
        .then(response => response.json())
        .then(data => {
            console.log("✅ Réponse du serveur :", data);

            let nomJoueurElement = document.getElementById("nom_joueur");
            if (nomJoueurElement) {
                nomJoueurElement.textContent = data.prenom || "Utilisateur";
                console.log("✅ Prénom affiché :", data.prenom);
            } else {
                console.error("❌ Élément #nom_joueur introuvable !");
            }

            let userActions = document.getElementById("user-actions");
            let userName = document.getElementById("user-name");

            if (data.logged_in) {
                if (userName) {
                    userName.textContent = "Bonjour, " + data.prenom;
                }
                if (userActions) {
                    userActions.style.display = "flex";
                }

                let adminSection = document.getElementById("admin-section");
                if (data.role === "admin" && adminSection) {
                    adminSection.style.display = "block";
                    console.log("🔓 Section administrateur affichée !");
                } else if (!adminSection) {
                    console.error("❌ admin-section introuvable !");
                }
            }
        })
        .catch(error => console.error("❌ Erreur récupération utilisateur :", error));

    document.getElementById("utilisateurs-container").addEventListener("click", function (event) {
        if (event.target.classList.contains("modifier-btn")) {
            let userId = event.target.getAttribute("data-id");
            console.log("✏️ Modification de l'utilisateur :", userId);
            modifierUtilisateur(userId);
        }
    });

    function modifierUtilisateur(userId) {
        console.log("✏️ Récupération des données pour l'utilisateur :", userId);

        let row = document.querySelector(`tr[data-id='${userId}']`);
        if (!row) {
            console.error("❌ Impossible de trouver la ligne de l'utilisateur !");
            return;
        }

        console.log("🔹 Ligne trouvée :", row);

        let cellules = row.children;
        
        let sexe = cellules[0].innerText.trim();
        let nom = cellules[1].innerText.trim();
        let prenom = cellules[2].innerText.trim();
        let date_naissance = cellules[3].innerText.trim();
        let email = cellules[4].innerText.trim();
        let telephone = cellules[5].innerText.trim();
        let adresse = cellules[6].innerText.trim();
        let code_postal = cellules[7].innerText.trim();
        let ville = cellules[8].innerText.trim();
        let role = cellules[9].innerText.trim();

        row.innerHTML = `
            <td>
                <select name="sexe">
                    <option value="Homme" ${sexe === "Homme" ? "selected" : ""}>Homme</option>
                    <option value="Femme" ${sexe === "Femme" ? "selected" : ""}>Femme</option>
                </select>
            </td>
            <td><input type="text" name="nom" value="${nom}"></td>
            <td><input type="text" name="prenom" value="${prenom}"></td>
            <td><input type="date" name="date_naissance" value="${date_naissance}"></td>
            <td><input type="email" name="email" value="${email}"></td>
            <td><input type="text" name="telephone" value="${telephone}"></td>
            <td><input type="text" name="adresse" value="${adresse}"></td>
            <td><input type="text" name="code_postal" value="${code_postal}"></td>
            <td><input type="text" name="ville" value="${ville}"></td>
            <td>
                <select name="role">
                    <option value="admin" ${role === "admin" ? "selected" : ""}>Admin</option>
                    <option value="utilisateur" ${role === "utilisateur" ? "selected" : ""}>Utilisateur</option>
                </select>
            </td>
            <td>
                <button class="btn-action save-btn" data-id="${userId}">✅ Sauvegarder</button>
                <button class="btn-action delete-btn" data-id="${userId}">🗑️ Supprimer</button>
                <button class="btn-action cancel-btn" data-id="${userId}">❌ Annuler</button>
            </td>`;

        console.log("✅ Formulaire affiché pour l'utilisateur :", userId);

        document.querySelector(`.save-btn[data-id='${userId}']`).addEventListener("click", function () {
            sauvegarderModification(userId);
        });

        document.querySelector(`.delete-btn[data-id='${userId}']`).addEventListener("click", function () {
            if (confirm("⚠️ Voulez-vous vraiment supprimer cet utilisateur ?")) {
                supprimerUtilisateur(userId);
            }
        });

        document.querySelector(`.cancel-btn[data-id='${userId}']`).addEventListener("click", function () {
            rechargerUtilisateurs();
        });
    }

    function sauvegarderModification(userId) {
        let row = document.querySelector(`button.save-btn[data-id='${userId}']`).closest("tr");
        let formData = new FormData();

        formData.append("id", userId);
        formData.append("sexe", row.querySelector("select[name='sexe']").value);
        formData.append("nom", row.querySelector("input[name='nom']").value);
        formData.append("prenom", row.querySelector("input[name='prenom']").value);
        formData.append("date_naissance", row.querySelector("input[name='date_naissance']").value);
        formData.append("email", row.querySelector("input[name='email']").value);
        formData.append("telephone", row.querySelector("input[name='telephone']").value);
        formData.append("adresse", row.querySelector("input[name='adresse']").value);
        formData.append("code_postal", row.querySelector("input[name='code_postal']").value);
        formData.append("ville", row.querySelector("input[name='ville']").value);
        formData.append("role", row.querySelector("select[name='role']").value);

        fetch("../modules/utilisateur/modifier_utilisateur.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json()) 
        .then(data => {
            if (data.success) {
                console.log("✅ Modification enregistrée !");
                rechargerUtilisateurs();
            } else {
                console.error("❌ Erreur lors de la modification :", data.message);
                alert("⚠️ Erreur : " + data.message);
            }
        })
        .catch(error => console.error("❌ Erreur serveur :", error));
    }

    function supprimerUtilisateur(userId) {
        fetch("../modules/utilisateur/supprimer_utilisateur.php?id=" + userId, { method: "GET" })
        .then(response => response.json()) 
        .then(data => {
            if (data.success) {
                console.log("✅ Utilisateur supprimé !");
                rechargerUtilisateurs();
            } else {
                console.error("❌ Erreur suppression :", data.message);
                alert("⚠️ Erreur : " + data.message);
            }
        })
        .catch(error => console.error("❌ Erreur serveur :", error));
    }

    function rechargerUtilisateurs() {
        fetch("../modules/utilisateur/get_utilisateurs.php")
        .then(response => response.text())
        .then(data => {
            document.getElementById("utilisateurs-container").innerHTML = data;
        })
        .catch(error => console.error("❌ Erreur chargement utilisateurs :", error));
    }
});