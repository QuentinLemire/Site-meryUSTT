<?php
session_start();
require_once '../commun/config.php';

if (!isset($_SESSION['user_id'])) {
  echo json_encode(['email' => null]);
  exit;
}

$id = $_SESSION['user_id'];
$stmt = $pdo->prepare("SELECT email FROM utilisateurs WHERE id_utilisateur = ?");
$stmt->execute([$id]);
$email = $stmt->fetchColumn();

echo json_encode(['email' => $email]);