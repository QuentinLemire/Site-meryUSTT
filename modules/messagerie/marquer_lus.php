<?php
session_start();
require_once '../commun/config.php';

if (!isset($_SESSION['user_id'])) {
  http_response_code(403);
  exit('Utilisateur non connecté');
}

$mon_id       = $_SESSION['user_id'];
$expediteur_id = $_POST['expediteur_id'] ?? null;
$email_invite = $_POST['email_invite']   ?? null;

if (!$expediteur_id && !$email_invite) {
  http_response_code(400);
  exit('Paramètre expediteur_id ou email_invite manquant');
}

try {
  if ($expediteur_id) {
    // Cas 1: expéditeur enregistré
    $sql = "
      UPDATE message
      SET lu = 1
      WHERE expediteur_id   = :expediteur_id
        AND destinataire_id = :me
        AND lu = 0
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
      ':expediteur_id' => intval($expediteur_id),
      ':me'            => $mon_id,
    ]);

  } else {
    // Cas 2: expéditeur invité
    $sql = "
      UPDATE message
      SET lu = 1
      WHERE email_invite    = :email
        AND destinataire_id = :me
        AND lu = 0
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
      ':email' => $email_invite,
      ':me'    => $mon_id,
    ]);
  }

  echo json_encode(['success' => true]);

} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode([
    'error' => 'Erreur SQL : ' . $e->getMessage()
  ]);
}