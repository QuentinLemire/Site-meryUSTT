<?php
include("../commun/config.php");

try {
    // Récupérer toutes les catégories et leurs sous-catégories associées
    $sql = "SELECT DISTINCT categorie, sous_categorie FROM produits ORDER BY categorie, sous_categorie";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $categories = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $categorie = $row['categorie'];
        $sous_categorie = $row['sous_categorie'];

        if (!isset($categories[$categorie])) {
            $categories[$categorie] = [];
        }
        if (!empty($sous_categorie) && !in_array($sous_categorie, $categories[$categorie])) {
            $categories[$categorie][] = $sous_categorie;
        }
    }

    echo json_encode(["categories" => array_keys($categories), "sous_categories" => $categories]);

} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur lors de la récupération des catégories : " . $e->getMessage()]);
}
?>