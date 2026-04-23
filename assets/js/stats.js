document.addEventListener("DOMContentLoaded", function() {
    fetch('../modules/panier/get_sales_data.php')
        .then(response => response.json())
        .then(data => {
            // Fonction pour convertir le format 'YYYY-MM' en 'Mois YYYY'
            function formatMonth(monthString) {
                const monthNames = [
                    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
                ];
                const [year, month] = monthString.split('-');
                return `${monthNames[parseInt(month) - 1]} ${year}`;
            }

            // Préparer le tableau HTML pour les ventes récentes
            const salesTable = document.getElementById('sales-table');
            let tableContent = `<table><tr><th>Mois</th><th>Total des ventes</th></tr>`;

            // Remplir le tableau avec les données
            data.sales.forEach(sale => {
                tableContent += `
                    <tr>
                        <td>${formatMonth(sale.mois)}</td>  <!-- Affichage du mois sous forme lisible -->
                        <td>${parseFloat(sale.total_ventes).toFixed(2)}</td> <!-- Formatage des ventes -->
                    </tr>
                `;
            });
            tableContent += `</table>`;
            
            // Insérer le tableau dans le DOM
            salesTable.innerHTML = tableContent;

            // Graphique des ventes
            const ctx = document.getElementById('salesChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.sales.map(sale => formatMonth(sale.mois)),  // Affichage du mois avec le nom
                    datasets: [{
                        label: 'Total des ventes',
                        data: data.sales.map(sale => parseFloat(sale.total_ventes).toFixed(2)),  // Ventes par mois
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            ticks: {
                                autoSkip: true, 
                                maxRotation: 90,
                                minRotation: 45
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.log('Error fetching sales data:', error));

    // Fonction pour charger les produits populaires
    fetch('../modules/boutique/get_popular_products.php')
        .then(response => response.json())
        .then(data => {
            const popularProductsList = document.getElementById('popular-products-list');
            popularProductsList.innerHTML = '<ul>'; 

            // Ajouter les produits populaires à la liste
            data.products.forEach(product => {
                popularProductsList.innerHTML += `
                    <li>${product.produit} - ${product.quantite_vendue} ventes</li>
                `;
            });

            popularProductsList.innerHTML += '</ul>';
        })
        .catch(error => console.log('Error fetching popular products data:', error));

    // Fonction pour charger les produits en stock faible
    fetch('../modules/boutique/get_low_stock.php')
        .then(response => response.json())
        .then(data => {
            const lowStockProducts = document.getElementById('low-stock-products');
            lowStockProducts.innerHTML = '<ul>'; 

            // Ajouter les produits en stock faible à la liste
            data.products.forEach(product => {
                lowStockProducts.innerHTML += `
                    <li>${product.produit} - ${product.stock_restants} unités restantes${product.taille ? " (taille: " + product.taille + ")" : ""}</li>
                `;
            });

            lowStockProducts.innerHTML += '</ul>'; // Fermer la liste
        })
        .catch(error => console.log('Error fetching low stock products data:', error));
});