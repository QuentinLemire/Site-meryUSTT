<?php
header('Content-Type: application/json');

require_once '../commun/config.php'; 

try {
    $stmt = $pdo->prepare("SELECT id, jour, heure_debut, heure_fin, public FROM creneau ORDER BY FIELD(jour, 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche')");
    $stmt->execute();
    $creneaux = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($creneaux);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur : ' . $e->getMessage()]);
}