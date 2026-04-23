<?php
session_start();
require '../commun/config.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    echo "Accès refusé (non connecté)";
    exit;
}

// Vérification du rôle admin
$stmt = $pdo->prepare("SELECT role FROM utilisateurs WHERE id_utilisateur = ?");
$stmt->execute([$_SESSION['id_utilisateur']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || $user['role'] !== 'admin') {
    http_response_code(403);
    echo "Accès refusé (réservé aux administrateurs)";
    exit;
}

// Insertion dans la BDD
$stmt = $pdo->prepare("
    INSERT INTO Evenements (titre, description, date, lieu, type, id_equipe)
    VALUES (:titre, :description, :date, :lieu, :type, :id_equipe)
");

$stmt->execute([
    'titre' => $_POST['titre'],
    'description' => $_POST['description'] ?? null,
    'date' => $_POST['date'],
    'lieu' => $_POST['lieu'] ?? null,
    'type' => $_POST['type'],
    'id_equipe' => $_POST['id_equipe'] ?: null
]);

echo "ok";
?>