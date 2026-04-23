<?php
include("../commun/config.php");

$sql = "SELECT DISTINCT categorie, sous_categorie FROM produits";
$stmt = $pdo->query($sql);
$categories = [];

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $categories[$row['categorie']][] = $row['sous_categorie'];
}

echo json_encode($categories);
?>