<?php
require_once '../commun/config.php';

$jour = $_POST['jour'] ?? '';
$heure_debut = $_POST['heure_debut'] ?? '';
$heure_fin = $_POST['heure_fin'] ?? '';
$public = $_POST['public'] ?? '';

if (!$jour || !$heure_debut || !$heure_fin || !$public) {
    http_response_code(400);
    echo "❌ Données manquantes.";
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO creneau (jour, heure_debut, heure_fin, public)
                           VALUES (?, ?, ?, ?)");
    $stmt->execute([$jour, $heure_debut, $heure_fin, $public]);
    echo "✅ Créneau ajouté avec succès.";
} catch (PDOException $e) {
    http_response_code(500);
    echo "❌ Erreur DB : " . $e->getMessage();
}