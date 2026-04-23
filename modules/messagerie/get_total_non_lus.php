<?php
session_start();
require_once '../commun/config.php';

if (!isset($_SESSION['user_id'])) {
  echo json_encode(['total' => 0]);
  exit;
}

$mon_id = $_SESSION['user_id'];

$stmt = $pdo->prepare("
  SELECT COUNT(*) FROM message
  WHERE destinataire_id = ?
  AND lu = 0
");
$stmt->execute([$mon_id]);
$total = $stmt->fetchColumn();

echo json_encode(['total' => $total]);