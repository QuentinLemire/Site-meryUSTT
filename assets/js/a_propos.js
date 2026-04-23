// Infos pratiques
fetch('../modules/club/get_info_club.php')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('infos-dynamiques');
        if (!container) return;

        Object.entries(data).forEach(([cle, valeur]) => {
            const label = cle
                .replace(/_/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
            const li = document.createElement('li');
            li.innerHTML = `<strong>${label} :</strong> ${valeur}`;
            container.appendChild(li);
        });
    })
    .catch(error => console.error('Erreur lors du chargement des infos pratiques :', error));

// Planning façon emploi du temps
const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

// Génère les horaires de 10h00 à 23h30 par pas de 30 min
function generateHours() {
    const hoursContainer = document.querySelector('.planning-hours');
    for (let h = 10; h <= 23; h++) {
        const hour = `${h.toString().padStart(2, '0')}:00`;
        const div = document.createElement('div');
        div.className = 'hour';
        div.innerText = hour;
        hoursContainer.appendChild(div);
    }
}

// Convertit une heure "HH:MM" en pixels (1h = 80px, 30min = 40px)
function heureToPixels(heure) {
    const [h, m] = heure.split(':').map(Number);
    const totalMinutes = (h - 10) * 60 + m;
    return (totalMinutes * (40 / 60)); // 1h = 40px 
}

fetch('../modules/club/get_creneaux.php')
    .then(response => response.json())
    .then(data => {
        generateHours();
            
        const planning = document.getElementById('planning-grille');
        if (!planning) return;

        joursSemaine.forEach(jour => {
            const column = document.createElement('div');
            column.className = 'day-column';

            const header = document.createElement('div');
            header.className = 'day-header';
            header.innerText = jour;
            column.appendChild(header);

            const creneauxDuJour = data.filter(c => c.jour === jour);

            creneauxDuJour.forEach(c => {
                const bloc = document.createElement('div');
                bloc.classList.add('creneau-block');

                // Détection du type de public pour couleur
                const publicLower = c.public.toLowerCase();
                if (publicLower.includes('jeune')) {
                    bloc.classList.add('creneau-jeune');
                } else if (publicLower.includes('adulte')) {
                    bloc.classList.add('creneau-adulte');
                } else {
                    bloc.classList.add('creneau-libre');
                }

                // Position et taille
                const top = heureToPixels(c.heure_debut);
                const height = heureToPixels(c.heure_fin) - top;

                bloc.style.top = `${top + 40}px`;
                bloc.style.height = `${height}px`;

                bloc.innerHTML = `
                    <strong>${c.public}</strong><br>
                    ${c.heure_debut.slice(0, 5)} – ${c.heure_fin.slice(0, 5)}<br>
                `;

                column.appendChild(bloc);
            });

            planning.appendChild(column);
        });
    })
    .catch(error => console.error('Erreur lors du chargement du planning :', error));

// Charger les membres du bureau
fetch('../modules/club/get_bureau.php')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('cartes-bureau');
        if (!container) return;

        data.forEach(membre => {
            const card = document.createElement('div');
            card.className = 'bureau-card';
            card.innerHTML = `
                <img src="../${membre.photo}" alt="${membre.nom}" class="photo">
                <h3>${membre.prenom} ${membre.nom}</h3>
                <p>${membre.role}</p>
            `;
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Erreur lors du chargement du bureau :', error));