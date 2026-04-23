<?php
session_start();
require_once '../commun/config.php';

if (!isset($_SESSION['user_id'])) {
  http_response_code(403);
  exit('Utilisateur non connecté');
}

$mon_id       = $_SESSION['user_id'];
$autre_id     = isset($_GET['user_id'])       ? intval($_GET['user_id']) : null;
$email_invite = isset($_GET['email_invite']) ? $_GET['email_invite']      : null;

if (!$autre_id && !$email_invite) {
  http_response_code(400);
  exit('Paramètre user_id ou email_invite manquant');
}

try {
  if ($autre_id) {
    // Conversation avec un utilisateur enregistré
    $sql = "
      SELECT m.expediteur_id, m.contenu, m.date_envoi
      FROM message m
      WHERE (m.expediteur_id    = :me AND m.destinataire_id = :other)
         OR (m.expediteur_id    = :other AND m.destinataire_id = :me)
      ORDER BY m.date_envoi ASC
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
      ':me'    => $mon_id,
      ':other' => $autre_id,
    ]);

  } else {
    // Conversation avec un invité
    $sql = "
      SELECT m.expediteur_id, m.contenu, m.date_envoi
      FROM message m
      WHERE (m.email_invite      = :email
             AND m.destinataire_id = :me)
         OR (m.expediteur_id     = :me
             AND m.email_invite    = :email)
      ORDER BY m.date_envoi ASC
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
      ':me'    => $mon_id,
      ':email' => $email_invite,
    ]);
  }

  $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

  foreach ($messages as &$msg) {
    // Pour un invité, expediteur_id sera NULL → ça tombe dans le 'lui'
    $msg['expediteur'] = ($msg['expediteur_id'] == $mon_id)
                        ? 'moi'
                        : 'lui';
    unset($msg['expediteur_id']);
  }

  echo json_encode($messages);

} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(["error" => "Erreur SQL : " . $e->getMessage()]);
}