<?php
include("../commun/config.php");

$categorie = isset($_GET['categorie']) ? $_GET['categorie'] : "";
$sous_categorie = isset($_GET['sous_categorie']) ? $_GET['sous_categorie'] : "";

$sql = "SELECT p.*, 
               (SELECT GROUP_CONCAT(DISTINCT s.taille SEPARATOR ', ') 
                FROM stocks s WHERE s.id_produit = p.id_produit) AS tailles_disponibles,
               (SELECT GROUP_CONCAT(DISTINCT pi.image SEPARATOR ', ') 
                FROM produit_images pi WHERE pi.id_produit = p.id_produit) AS images
        FROM produits p";

$conditions = [];
$params = [];

if (!empty($categorie)) {
    $conditions[] = "p.categorie = :categorie";
    $params[':categorie'] = $categorie;
}

if (!empty($sous_categorie)) {
    $conditions[] = "p.sous_categorie = :sous_categorie";
    $params[':sous_categorie'] = $sous_categorie;
}

if (!empty($conditions)) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$produits = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($produits as &$produit) {
    // Conversion des tailles en tableau
    $produit['tailles_disponibles'] = !empty($produit['tailles_disponibles']) ? explode(", ", $produit['tailles_disponibles']) : [];

    // Vérification et correction des images
    if (!empty($produit['images'])) {
        $images = explode(",", $produit['images']);

        // Prioriser l'image contenant "face"
        usort($images, function ($a, $b) {
            return (strpos($b, 'face') !== false) - (strpos($a, 'face') !== false);
        });

        // Ajoute le bon chemin où les images sont stockées
        $produit['images'] = array_map(fn($img) => "../modules/boutique/" . trim($img), $images);
    } else {
        $produit['images'] = [];
    }
}

header("Content-Type: application/json");
echo json_encode($produits);
?>