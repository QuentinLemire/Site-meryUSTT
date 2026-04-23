<?php
require '../commun/config.php'; 

header('Content-Type: application/json');

try {

    // Requête : Regrouper les stocks par produit avec tri intelligent des tailles
    $stmt = $pdo->query("
        SELECT 
            p.id_produit,
            p.nom,
            GROUP_CONCAT(
                CONCAT(
                    CASE 
                        WHEN s.taille = 'unique' THEN 'Taille unique'
                        ELSE s.taille
                    END,
                    ': ',
                    s.quantite
                )
                ORDER BY FIELD(
                    s.taille,
                    'U', 'unique', 'Taille unique',
                    'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL',
                    '36-39', '39-42', '39-44', '43-46', '44-47'
                )
                SEPARATOR ' / '
            ) AS stock_details
        FROM Stocks s
        JOIN Produits p ON s.id_produit = p.id_produit
        GROUP BY p.id_produit, p.nom
    ");
    $stocks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Requête : Produits sans stock
    $stmt = $pdo->query("
        SELECT p.id_produit, p.nom 
        FROM Produits p 
        LEFT JOIN Stocks s ON p.id_produit = s.id_produit
        WHERE s.id_stock IS NULL
    ");
    $produitsSansStock = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "stocks" => $stocks,
        "produits_sans_stock" => $produitsSansStock
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "error" => "Erreur lors de la récupération des stocks : " . $e->getMessage()
    ]);
}