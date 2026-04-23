<?php
include '../commun/config.php';

$query = "
    SELECT 
        p.nom AS produit,
        SUM(cp.quantite) AS quantite_vendue
    FROM 
        commande_produit cp
    JOIN 
        Produits p ON cp.id_produit = p.id_produit
    GROUP BY 
        p.nom
    ORDER BY 
        quantite_vendue DESC
    LIMIT 10
";

$stmt = $pdo->prepare($query);
$stmt->execute();

$popularProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['products' => $popularProducts]);
?>