<?php
require_once '../commun/config.php';

$id = $_GET['id'] ?? '';
if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'ID manquant']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT 
            b.id,
            b.role,
            b.photo,
            j.id_joueur,
            j.nom,
            j.prenom
        FROM bureau b
        JOIN joueur j ON b.id_joueur = j.id_joueur
        WHERE b.id = ?
    ");
    $stmt->execute([$id]);
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}