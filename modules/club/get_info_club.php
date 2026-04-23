<?php
header('Content-Type: application/json');

require_once '../commun/config.php'; 

try {
    $stmt = $pdo->query("SELECT * FROM info_club");
    $infos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Transformer en format { prix_licence: '...', adresse: '...', etc. }
    $result = [];
    foreach ($infos as $info) {
        $result[$info['nom_info']] = $info['valeur'];
    }

    echo json_encode($result);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur : ' . $e->getMessage()]);
}