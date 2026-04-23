document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM chargé");

    let derniereAction = 0; 

    function cacherToutesLesSections() {
        let sections = [
            // Admin
            "gestion-utilisateurs", 
            "gestion-resultats",
            "gestion-articles",
            "gestion-boutique",
            "gestion-evenements",
            "gestion-club",
            // Joueur
            "mes-equipes",
            "mes-commandes",
            "modifier-profil"
        ];

        sections.forEach(id => {
            let section = document.getElementById(id);
            if (section) section.style.display = "none";
        });
    }

    function preventDoubleClick() {
        const maintenant = Date.now();
        if (maintenant - derniereAction < 300) {
            console.log("⏳ Action ignorée (clic trop rapide)");
            return true;
        }
        derniereAction = maintenant;
        return false;
    }

    window.afficherUtilisateurs = function () {
        if (preventDoubleClick()) return;
        console.log("📢 Affichage de la Gestion des Utilisateurs...");
        cacherToutesLesSections();
        document.getElementById("gestion-utilisateurs").style.display = "block";
        chargerUtilisateurs();
    };

    function chargerUtilisateurs() {
        console.log("📢 Chargement des utilisateurs...");
        fetch("../modules/utilisateur/get_utilisateurs.php")
            .then(response => response.text())
            .then(data => {
                const utilisateursContainer = document.getElementById("utilisateurs-container");
                if (!utilisateursContainer) {
                    console.error("❌ ERREUR : 'utilisateurs-container' introuvable !");
                    return;
                }
                utilisateursContainer.innerHTML = data;
            })
            .catch(error => console.error("❌ Erreur lors du chargement des utilisateurs :", error));
    }

    window.afficherGestionResultats = function () {
        if (preventDoubleClick()) return;
        console.log("📢 Affichage de la Gestion des Résultats...");
        cacherToutesLesSections();
        document.getElementById("gestion-resultats").style.display = "block";
    };

    window.afficherGestionArticles = function () {
        if (preventDoubleClick()) return;
        console.log("📢 Affichage de la Gestion des Articles...");
        cacherToutesLesSections();
        document.getElementById("gestion-articles").style.display = "block";
        chargerArticles();
    };
 

    window.afficherGestionBoutique = function () {  
        if (preventDoubleClick()) return;
        console.log("📢 Affichage de la Gestion de la Boutique...");
        cacherToutesLesSections();
        let boutiqueSection = document.getElementById("gestion-boutique");

        if (boutiqueSection) {
            boutiqueSection.style.display = "block";
            console.log("✅ Gestion de la boutique affichée !");
        } else {
            console.error("❌ ERREUR : La section 'gestion-boutique' n'existe pas !");
        }
    };

    window.afficherMesEquipes = function () {
        if (preventDoubleClick()) return;
        console.log("📢 Affichage de mes équipes...");
        cacherToutesLesSections();
        document.getElementById("mes-equipes").style.display = "block";
        chargerEquipes();
    };

    function chargerEquipes() {
        fetch('../modules/equipe/charger_equipes.php')
            .then(response => response.text())
            .then(html => {
                const container = document.getElementById('equipes-container');
                if (container) container.innerHTML = html;
                else console.error("❌ ERREUR : 'equipes-container' introuvable !");
            });
    }

    window.afficherMesCommandes = function () {
        if (preventDoubleClick()) return;
        console.log("📢 Affichage de mes commandes...");
        cacherToutesLesSections();
        document.getElementById("mes-commandes").style.display = "block";
        chargerCommandes();
    };

    function chargerCommandes() {
        fetch('../modules/panier/charger_commandes.php')
            .then(response => response.text())
            .then(html => {
                const container = document.getElementById('commandes-container');
                if (container) container.innerHTML = html;
                else console.error("❌ ERREUR : 'commandes-container' introuvable !");
            });
    }

window.afficherModifierProfil = function () {
    if (preventDoubleClick()) return;
    console.log("📢 Affichage de la modification de profil...");
    cacherToutesLesSections();

    fetch("../modules/utilisateur/get_profil.php")
        .then(response => response.json())
        .then(data => {
            if (data.erreur) {
                document.getElementById("formulaire-profil").innerHTML = "<p>❌ Erreur de chargement du profil.</p>";
                return;
            }

            let html = `
                <form id="form-profil" novalidate>
                    <label>Nom : <input type="text" name="nom" value="${data.nom}" required></label><br>
                    <label>Prénom : <input type="text" name="prenom" value="${data.prenom}" required></label><br>
                    <label>Adresse : <input type="text" name="adresse" value="${data.adresse ?? ''}"></label><br>
                    <label>Code postal : <input type="text" name="code_postal" value="${data.code_postal ?? ''}"></label><br>
                    <label>Ville : <input type="text" name="ville" value="${data.ville ?? ''}"></label><br>
                    <label>Email : <input type="email" name="email" value="${data.email}" required></label><br>
                    <label>Téléphone : <input type="text" name="telephone" value="${data.telephone ?? ''}"></label><br>
                    <label>Nouveau mot de passe : <input type="password" name="mot_de_passe" placeholder="Laisser vide si inchangé"></label><br>
                    <button type="submit">💾 Enregistrer</button>
                </form>
            `;
            document.getElementById("formulaire-profil").innerHTML = html;
            document.getElementById("modifier-profil").style.display = "block";

            const form = document.getElementById("form-profil");
            form.addEventListener("submit", function (e) {
                e.preventDefault();

                const formData = new FormData(form);
                const email = formData.get("email");
                const codePostal = formData.get("code_postal");
                const telephone = formData.get("telephone");

                // 🔍 Vérification email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert("❌ Email invalide !");
                    return;
                }

                // 🔍 Vérification code postal
                const cpRegex = /^\d{5}$/;
                if (codePostal && !cpRegex.test(codePostal)) {
                    alert("❌ Code postal invalide !");
                    return;
                }

                // 🔍 Vérification téléphone
                const telRegex = /^(0|\+33)[1-9](\d{2}){4}$/;
                if (telephone && !telRegex.test(telephone)) {
                    alert("❌ Numéro de téléphone invalide !");
                    return;
                }

                // 🆙 Formatage nom en majuscules
                formData.set("nom", formData.get("nom").toUpperCase());

                // 🧼 Formatage prénom (1re lettre majuscule)
                const prenom = formData.get("prenom");
                const prenomFormate = prenom.charAt(0).toUpperCase() + prenom.slice(1).toLowerCase();
                formData.set("prenom", prenomFormate);

                // ✅ Envoi AJAX
                fetch("../modules/utilisateur/update_profil.php", {
                    method: "POST",
                    body: formData
                })
                    .then(r => r.text())
                    .then(txt => {
                        alert("✅ Mise à jour du profil validée !");
                    })
                    .catch(err => {
                        alert("❌ Une erreur est survenue.");
                        console.error("Erreur lors de la mise à jour :", err);
                    });
            });
        })
        .catch(error => {
            console.error("❌ Erreur AJAX :", error);
            document.getElementById("formulaire-profil").innerHTML = "<p>❌ Impossible de charger les données.</p>";
        });
};

window.afficherGestionEvenements = function () {
    if (preventDoubleClick()) return;
    console.log("📅 Accès à la gestion des événements...");
    cacherToutesLesSections();
    document.getElementById("gestion-evenements").style.display = "block";
    chargerEvenements();
};

function chargerEvenements() {
    fetch("../modules/evenement/evenements.php")
        .then(response => response.text())
        .then(data => {
            document.getElementById("liste-evenements").innerHTML = data;
        })
        .catch(error => console.error("❌ Erreur chargement événements :", error));
}

window.supprimerEvenement = function(id) {
    if (!confirm("❗ Confirmer la suppression de cet événement ?")) return;

    fetch("../modules/evenement/supprimer_evenement.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "id_evenement=" + encodeURIComponent(id)
    })
    .then(r => r.text())
    .then(txt => {
        alert(txt.trim());
        chargerEvenements(); 
    })
    .catch(err => {
        console.error("❌ Erreur suppression :", err);
        alert("❌ Une erreur est survenue.");
    });
};

document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "form-ajout-evenement") {
        e.preventDefault();
        const formData = new FormData(e.target);

        fetch("../modules/evenement/ajouter_evenement.php", {
            method: "POST",
            body: formData
        })
            .then(r => r.text())
            .then(msg => {
                alert("✅ Événement ajouté !");
                e.target.reset();
                chargerEvenements();
            })
            .catch(err => {
                console.error("❌ Erreur ajout événement :", err);
                alert("❌ Erreur lors de l'ajout.");
            });
    }
});

window.afficherGestionClub = function () {
    if (preventDoubleClick()) return;
    console.log("🏠 Affichage de la Gestion du Club...");
    cacherToutesLesSections();
    document.getElementById("gestion-club").style.display = "block";
};

});