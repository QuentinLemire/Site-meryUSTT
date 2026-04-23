<?php
include("../commun/config.php");

$imagePath = $_POST['image'] ?? '';

if (!empty($imagePath)) {
    // Supprimer l'entrée de la base de données
    $sql = "DELETE FROM produit_images WHERE image = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$imagePath]);

    // Supprimer physiquement l'image du dossier
    if (file_exists($imagePath)) {
        unlink($imagePath);
    }

    echo "✅ Image supprimée avec succès.";
} else {
    echo "❌ Aucune image spécifiée.";
}
?>