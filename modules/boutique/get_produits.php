<?php
include("../commun/config.php");

// Récupérer tous les produits avec leurs images associées
$sql = "SELECT p.*, 
               (SELECT GROUP_CONCAT(image) FROM produit_images WHERE id_produit = p.id_produit) AS images 
        FROM produits p";

$stmt = $pdo->query($sql);
$produits = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($produits as &$produit) {
    // Convertir les images en tableau si elles existent
    if (!empty($produit['images'])) {
        $produit['images'] = array_map(fn($img) => "../modules/boutique/" . trim($img), explode(",", $produit['images']));
    } else {
        $produit['images'] = [];
    }
}

echo json_encode($produits);
?> 