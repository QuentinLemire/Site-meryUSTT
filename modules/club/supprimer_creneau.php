<?php
require_once '../commun/config.php';

$id = $_POST['id'] ?? null;
if (!$id) {
    http_response_code(400);
    echo "❌ ID manquant.";
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM creneau WHERE id = ?");
    $stmt->execute([$id]);
    echo "✅ Créneau supprimé.";
} catch (PDOException $e) {
    http_response_code(500);
    echo "❌ Erreur DB : " . $e->getMessage();
}