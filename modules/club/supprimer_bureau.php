<?php
require_once '../commun/config.php';

$id = $_POST['id'] ?? null;

if (!$id || !is_numeric($id)) {
    http_response_code(400);
    echo "❌ ID invalide.";
    exit;
}

try {
    // Récupérer le chemin de l'image (si existante)
    $stmt = $pdo->prepare("SELECT photo FROM bureau WHERE id = ?");
    $stmt->execute([$id]);
    $photo = $stmt->fetchColumn();

    // Supprimer la photo physique si elle existe
    if ($photo) {
        $chemin = '../../' . $photo;
        if (file_exists($chemin)) {
            unlink($chemin);
        }
    }

    // Supprimer le membre
    $stmt = $pdo->prepare("DELETE FROM bureau WHERE id = ?");
    $stmt->execute([$id]);

    echo "✅ Membre supprimé.";
} catch (PDOException $e) {
    http_response_code(500);
    echo "❌ Erreur SQL : " . $e->getMessage();
}