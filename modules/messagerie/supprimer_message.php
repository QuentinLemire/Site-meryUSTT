<?php
require_once '../commun/config.php';
session_start();

$id_utilisateur = $_SESSION['id_utilisateur'] ?? null;

if (!$id_utilisateur || !isset($_POST['id'])) {
    http_response_code(400);
    exit("Requête invalide.");
}

$id_message = (int) $_POST['id'];

// Supprime uniquement si le message appartient à l'utilisateur connecté
$stmt = $pdo->prepare("DELETE FROM messages WHERE id = ? AND id_destinataire = ?");
$stmt->execute([$id_message, $id_utilisateur]);

echo "✅ Message supprimé";