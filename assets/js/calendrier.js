document.addEventListener("DOMContentLoaded", () => {
    const calendrier = document.getElementById("calendrier");
    const moisAnnee = document.getElementById("mois-annee");
    const btnPrev = document.getElementById("prev-month");
    const btnNext = document.getElementById("next-month");

    let date = new Date();

    function renderCalendar() {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDay = (firstDay.getDay() + 6) % 7; 
    
        calendrier.innerHTML = "";
        moisAnnee.textContent = firstDay.toLocaleString("fr-FR", { month: "long", year: "numeric" });
    
     
        for (let i = 0; i < startDay; i++) {
            const empty = document.createElement("div");
            empty.classList.add("jour");
            calendrier.appendChild(empty);
        }
    
        const aujourdHui = new Date();
    
        for (let d = 1; d <= lastDay.getDate(); d++) {
            const jour = document.createElement("div");
            jour.classList.add("jour");
    
            // Vérifier si c'est aujourd'hui
            const isToday =
                aujourdHui.getFullYear() === year &&
                aujourdHui.getMonth() === month &&
                aujourdHui.getDate() === d;
    
            if (isToday) {
                jour.classList.add("aujourd-hui");
            }
    
            const num = document.createElement("div");
            num.classList.add("numero");
            num.textContent = d;
            jour.appendChild(num);
    
            jour.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            calendrier.appendChild(jour);
        }
    
        chargerEvenements(year, month + 1);
    }

    function chargerEvenements(annee, mois) {
        fetch(`../modules/evenement/recup_evenements.php?annee=${annee}&mois=${mois}`)
            .then(res => res.json())
            .then(data => {
                data.forEach(evenement => {
                    const dateFormatee = evenement.date;
                    const caseJour = document.querySelector(`.jour[data-date="${dateFormatee}"]`);
                    
                    if (caseJour) {
                        const ev = document.createElement("div");
                        ev.classList.add("evenement");
    
                        // CSS selon le type (sportif, réunion, etc.)
                        if (evenement.type) {
                            ev.classList.add(evenement.type.toLowerCase()); 
                        }
    
                        // Affichage complet : titre + lieu + description
                        ev.innerHTML = `
                            <strong>${evenement.titre}</strong>
                            ${evenement.lieu ? `<br><small>📍 ${evenement.lieu}</small>` : ""}
                            ${evenement.description ? `<br><small>${evenement.description}</small>` : ""}
                        `;
    
                        caseJour.appendChild(ev);
                    }
                });
            })
            .catch(err => {
                console.error("Erreur lors du chargement des événements :", err);
            });
    }

    btnPrev.addEventListener("click", () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    });

    btnNext.addEventListener("click", () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});

