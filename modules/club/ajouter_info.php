<?php
require_once '../commun/config.php';

$nom_info = $_POST['nom_info'] ?? '';
$valeur = $_POST['valeur'] ?? '';

if (!$nom_info || !$valeur) {
    http_response_code(400);
    echo "❌ Données incomplètes.";
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO info_club (nom_info, valeur) VALUES (?, ?)");
    $stmt->execute([$nom_info, $valeur]);
    echo "✅ Information ajoutée.";
} catch (PDOException $e) {
    http_response_code(500);
    echo "❌ Erreur SQL : " . $e->getMessage();
}