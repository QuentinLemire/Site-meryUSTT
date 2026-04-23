<?php
require_once '../commun/config.php';

$id = $_POST['id'] ?? '';
$valeur = $_POST['valeur'] ?? '';

if (!$id || !$valeur) {
    http_response_code(400);
    echo "❌ Données incomplètes.";
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE info_club SET valeur = ? WHERE id = ?");
    $stmt->execute([$valeur, $id]);
    echo "✅ Information mise à jour.";
} catch (PDOException $e) {
    http_response_code(500);
    echo "❌ Erreur SQL : " . $e->getMessage();
}