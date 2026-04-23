<?php
session_start();
require_once '../commun/config.php';

if (!isset($_SESSION['user_id'])) {
  http_response_code(403);
  exit('Utilisateur non connecté');
}

$expediteur_id = $_SESSION['user_id'];
$destinataire_id = $_POST['destinataire_id'] ?? null;
$contenu = $_POST['contenu'] ?? null;

if (!$destinataire_id || !$contenu) {
  http_response_code(400);
  exit('Données incomplètes');
}

try {
  $stmt = $pdo->prepare("INSERT INTO message (expediteur_id, destinataire_id, contenu) VALUES (?, ?, ?)");
  $stmt->execute([$expediteur_id, $destinataire_id, $contenu]);
  echo "Message envoyé";
} catch (PDOException $e) {
  http_response_code(500);
  echo "Erreur lors de l'envoi : " . $e->getMessage();
}