<?php
include("../commun/config.php");

$id_produit = $_GET['id'] ?? 0;

$sql = "SELECT p.*, 
               (SELECT GROUP_CONCAT(image) FROM produit_images WHERE id_produit = p.id_produit) AS images 
        FROM produits p 
        WHERE p.id_produit = ?";

$stmt = $pdo->prepare($sql);
$stmt->execute([$id_produit]);
$produit = $stmt->fetch(PDO::FETCH_ASSOC);

if ($produit) {
    // Convertir les images en tableau si elles existent
    if (!empty($produit['images'])) {
        $produit['images'] = explode(",", $produit['images']);
    } else {
        $produit['images'] = [];
    }
}

echo json_encode($produit);
?>