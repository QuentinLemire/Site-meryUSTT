<?php
include("../commun/config.php");

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id_produit = $_POST["id_produit"] ?? null;
    $taille = $_POST["taille"] ?? null;
    $quantite = $_POST["quantite"] ?? null;

    // Vérifier que toutes les valeurs sont présentes
    if (!$id_produit || !$taille || !$quantite || !is_numeric($quantite) || $quantite <= 0) {
        echo json_encode(["error" => "Données invalides !"]);
        exit;
    }

    try {
        // Vérifier si un stock existe déjà pour ce produit et cette taille
        $stmt = $pdo->prepare("SELECT id_stock, quantite FROM stocks WHERE id_produit = ? AND taille = ?");
        $stmt->execute([$id_produit, $taille]);
        $stock = $stmt->fetch();

        if ($stock) {
            // Mettre à jour le stock existant
            $nouvelleQuantite = $stock["quantite"] + $quantite;
            $stmt = $pdo->prepare("UPDATE stocks SET quantite = ? WHERE id_stock = ?");
            $stmt->execute([$nouvelleQuantite, $stock["id_stock"]]);

            echo json_encode(["success" => "Stock mis à jour avec succès !"]);
        } else {
            // Ajouter un nouveau stock
            $stmt = $pdo->prepare("INSERT INTO stocks (id_produit, taille, quantite) VALUES (?, ?, ?)");
            $stmt->execute([$id_produit, $taille, $quantite]);

            echo json_encode(["success" => "Stock ajouté avec succès !"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "Erreur SQL : " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Méthode non autorisée !"]);
}
?>