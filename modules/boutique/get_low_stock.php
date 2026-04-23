<?php
include '../commun/config.php';

$seuil_stock = 5;  
$query = "
    SELECT 
        p.nom AS produit,
        s.quantite AS stock_restants,
        s.taille AS taille
    FROM 
        Stocks s
    JOIN 
        Produits p ON s.id_produit = p.id_produit
    WHERE 
        s.quantite < :seuil_stock
    ORDER BY 
        s.quantite ASC
";

// Exécuter la requête
$stmt = $pdo->prepare($query);
$stmt->bindParam(':seuil_stock', $seuil_stock, PDO::PARAM_INT);
$stmt->execute();

$lowStockProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['products' => $lowStockProducts]);
?>