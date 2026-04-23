        document.addEventListener("DOMContentLoaded", function () {
            fetch("../modules/articles/get_articles.php")
                .then(response => response.json())
                .then(articles => {
                    const featuredArticle = document.getElementById("featured-article");
                    const articlesGrid = document.getElementById("articles-grid");

                    articlesGrid.innerHTML = "";

                    // Article principal (mis en avant)
                    featuredArticle.innerHTML = `
                    <div class="featured-article">
                        <img src="../${articles[0].image}" alt="${articles[0].titre}">
                        <div class="text">
                            <h2>${articles[0].titre}</h2>
                            <p>${articles[0].contenu}</p>
                            <p class="article-meta">Publié le ${new Date(articles[0].date_publication).toLocaleDateString("fr-FR")} par ${articles[0].auteur_prenom} ${articles[0].auteur_nom}</p>
                        </div>
                    </div>`;
    
                // Autres articles (maximum 3 affichés)
                articles.slice(1, 4).forEach(article => {
                    articlesGrid.innerHTML += `
                        <div class="article-card">
                            <img src="../${article.image}" alt="${article.titre}">
                            <h3>${article.titre}</h3>
                            <p>${article.contenu}</p>
                            <p class="article-meta">Publié le ${new Date(article.date_publication).toLocaleDateString("fr-FR")} par ${article.auteur_prenom} ${article.auteur_nom}</p>
                        </div>`;
                });
                });

                fetch("../modules/evenement/get_evenements.php")
                .then(response => response.json())
                .then(evenements => {
                    if (!Array.isArray(evenements)) {
                        console.error("Données reçues non valides :", evenements);
                        return;
                    }
            
                    const evenementsGrid = document.getElementById("evenements-grid");
                    evenementsGrid.innerHTML = "";
            
                    const vus = new Set();
                    const blocsAAfficher = [];
            
                    for (let i = 0; i < evenements.length && blocsAAfficher.length < 4; i++) {
                        const event = evenements[i];
                        const dateSansHeure = event.date_fr.split(" à ")[0];
                        const key = `${event.titre}_${dateSansHeure}_${event.type}`;
            
                        if (!vus.has(key)) {
                            vus.add(key);
            
                            const isDuplicate = evenements.some((e, idx) =>
                                idx !== i &&
                                e.titre === event.titre &&
                                e.date_fr.split(" à ")[0] === dateSansHeure &&
                                e.type === event.type
                            );
            
                            blocsAAfficher.push({
                                ...event,
                                date_fr: dateSansHeure,
                                showDetails: !isDuplicate
                            });
                        }
                    }
            
                    blocsAAfficher.forEach(event => {
                        evenementsGrid.innerHTML += `
                            <div class="evenement-card">
                                <h3 class="evenement-titre">${event.titre}</h3>
                                <p class="evenement-date">📅 ${event.date_fr}</p>
                                <p class="evenement-type">🔖 Type : ${event.type}</p>
                                ${event.showDetails && event.lieu ? `<p class="evenement-lieu">📍 Lieu : ${event.lieu}</p>` : ""}
                                ${event.showDetails && event.description ? `<p class="evenement-desc">${event.description}</p>` : ""}
                            </div>`;
                    });
                })
                .catch(error => {
                    console.error("Erreur lors du chargement des événements :", error);
                });
});