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
            $nouvelleQuantite = $stock["quantite"] - $quantite;
            
            if ($nouvelleQuantite > 0) {
                // Mettre à jour le stock existant
                $stmt = $pdo->prepare("UPDATE stocks SET quantite = ? WHERE id_stock = ?");
                $stmt->execute([$nouvelleQuantite, $stock["id_stock"]]);

                echo json_encode(["success" => "Stock mis à jour avec succès !"]);
            } else {
                // Supprimer le stock si la quantité devient 0 ou négative
                $stmt = $pdo->prepare("DELETE FROM stocks WHERE id_stock = ?");
                $stmt->execute([$stock["id_stock"]]);

                echo json_encode(["success" => "Stock supprimé car quantité épuisée !"]);
            }
        } else {
            echo json_encode(["error" => "Aucun stock trouvé pour ce produit et cette taille !"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "Erreur SQL : " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Méthode non autorisée !"]);
}
?>