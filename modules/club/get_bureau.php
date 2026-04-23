<?php
header('Content-Type: application/json');
require_once '../commun/config.php'; 

try {
    $stmt = $pdo->prepare("
        SELECT b.id, b.id_joueur, b.role, b.photo, j.nom, j.prenom
        FROM bureau b
        JOIN joueur j ON b.id_joueur = j.id_joueur
        ORDER BY b.role ASC
    ");
    $stmt->execute();
    $bureau = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($bureau);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur : ' . $e->getMessage()]);
}