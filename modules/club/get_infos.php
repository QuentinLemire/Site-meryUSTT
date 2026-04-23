<?php
header('Content-Type: application/json');
require_once '../commun/config.php';

try {
    $stmt = $pdo->query("SELECT id, nom_info, valeur FROM info_club ORDER BY id ASC");
    $infos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($infos);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur : ' . $e->getMessage()]);
}