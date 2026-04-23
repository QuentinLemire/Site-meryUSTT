<?php
require_once '../commun/config.php';

$id = $_POST['id'] ?? '';
if (!$id) {
    http_response_code(400);
    echo "❌ ID manquant.";
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM info_club WHERE id = ?");
    $stmt->execute([$id]);
    echo "✅ Information supprimée.";
} catch (PDOException $e) {
    http_response_code(500);
    echo "❌ Erreur SQL : " . $e->getMessage();
}