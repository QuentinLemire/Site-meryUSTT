document.addEventListener("DOMContentLoaded", function () {

    let tousLesArticles = [];
    let articlesParPage = 4;
    let pageActuelle = 1;

    window.chargerArticles = function () {
        console.log("📢 Chargement des articles...");
        fetch("../modules/articles/get_articles.php")
            .then(response => response.json())
            .then(data => {
                tousLesArticles = data;
                pageActuelle = 1;
                afficherPageArticles(pageActuelle);
            })
            .catch(error => console.error("❌ Erreur lors du chargement des articles :", error));
    }

    function afficherPageArticles(page) {
        const articlesContainer = document.getElementById("articlesContainer");
        articlesContainer.innerHTML = "";

        const debut = (page - 1) * articlesParPage;
        const fin = debut + articlesParPage;
        const articlesPage = tousLesArticles.slice(debut, fin);

        articlesPage.forEach(article => {
            const articleDiv = document.createElement("div");
            articleDiv.classList.add("article-card");
            articleDiv.setAttribute("data-id", article.id_article);

            articleDiv.innerHTML = `
                <h3>${article.titre}</h3>
                <p>${article.contenu}</p>
                <p><strong>Auteur:</strong> ${article.auteur_nom} ${article.auteur_prenom}</p>
                <p><strong>Publié le:</strong> ${article.date_publication}</p>
                ${article.image ? `<img src="../${article.image}" alt="Image de l'article">` : ""}
                <div class="article-actions">
                    <button class="edit-btn" data-id="${article.id_article}">✏️ Modifier</button>
                    <button class="delete-btn" data-id="${article.id_article}">🗑️ Supprimer</button>
                </div>
                <div id="edit-article-${article.id_article}" class="edit-form" style="display: none;">
                    <input type="text" id="edit-titre-${article.id_article}" value="${article.titre}">
                    <textarea id="edit-contenu-${article.id_article}">${article.contenu}</textarea>
                    <input type="file" id="edit-image-${article.id_article}">
                    <button class="save-btn" data-id="${article.id_article}">💾 Sauvegarder</button>
                    <button class="cancel-btn" data-id="${article.id_article}">❌ Annuler</button>
                </div>
            `;

            articlesContainer.appendChild(articleDiv);
        });

        activerEvenementsArticles();
        afficherPagination();
    }

function afficherPagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(tousLesArticles.length / articlesParPage);
    console.log("🧮 Pagination — totalArticles:", tousLesArticles.length, "| articlesParPage:", articlesParPage, "| totalPages:", totalPages);

    if (totalPages <= 1) return;

    // Bouton précédent
    if (pageActuelle > 1) {
        const prevBtn = document.createElement("button");
        prevBtn.textContent = "⬅️ Page précédente";
        prevBtn.onclick = () => {
            pageActuelle--;
            afficherPageArticles(pageActuelle);
        };
        paginationContainer.appendChild(prevBtn);
    }

    // Bouton suivant
    if (pageActuelle < totalPages) {
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Page suivante ➡️";
        nextBtn.onclick = () => {
            pageActuelle++;
            afficherPageArticles(pageActuelle);
        };
        paginationContainer.appendChild(nextBtn);
    }
}

    function activerEvenementsArticles() {
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", function () {
                const id = this.getAttribute("data-id");
                console.log(`✏️ Modifier article ${id}`);
                document.getElementById(`edit-article-${id}`).style.display = "block";
            });
        });

        document.querySelectorAll(".cancel-btn").forEach(button => {
            button.addEventListener("click", function () {
                const id = this.getAttribute("data-id");
                console.log(`❌ Annuler modification article ${id}`);
                document.getElementById(`edit-article-${id}`).style.display = "none";
            });
        });

        document.querySelectorAll(".save-btn").forEach(button => {
            button.addEventListener("click", function () {
                const id = this.getAttribute("data-id");
                sauvegarderArticle(id);
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                const id = this.getAttribute("data-id");
                supprimerArticle(id);
            });
        });
    }

    function sauvegarderArticle(id) {
        console.log(`💾 Sauvegarde de l'article ${id}`);

        const formData = new FormData();
        formData.append("id_article", id);
        formData.append("titre", document.getElementById(`edit-titre-${id}`).value);
        formData.append("contenu", document.getElementById(`edit-contenu-${id}`).value);

        const imageInput = document.getElementById(`edit-image-${id}`);
        if (imageInput.files.length > 0) {
            formData.append("image", imageInput.files[0]);
        }

        fetch("../modules/articles/update_article.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("✅ Article mis à jour !");
                    chargerArticles();
                } else {
                    alert("❌ Erreur : " + data.message);
                }
            })
            .catch(error => console.error("❌ Erreur lors de la mise à jour de l'article :", error));
    }

    function supprimerArticle(id) {
        if (!confirm("⚠️ Voulez-vous vraiment supprimer cet article ?")) return;

        fetch("../modules/articles/delete_article.php?id=" + id, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("✅ Article supprimé !");
                    chargerArticles();
                } else {
                    alert("❌ Erreur : " + data.message);
                }
            })
            .catch(error => console.error("❌ Erreur lors de la suppression :", error));
    }

    document.getElementById("articleForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch("../modules/articles/add_article.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("✅ Article ajouté avec succès !");
                    this.reset();
                    chargerArticles();
                } else {
                    alert("❌ Erreur : " + data.message);
                }
            })
            .catch(error => console.error("❌ Erreur lors de l'ajout de l'article :", error));
    });

    chargerArticles();
});