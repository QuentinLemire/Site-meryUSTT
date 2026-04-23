<?php
session_start();
require_once '../commun/config.php';

if (!isset($_SESSION['user_id'])) {
  http_response_code(403);
  exit('Utilisateur non connecté');
}

$mon_id = $_SESSION['user_id'];

try {
  $stmt = $pdo->prepare("SELECT id_utilisateur AS id, nom, prenom, email FROM utilisateurs WHERE id_utilisateur != ?");
  $stmt->execute([$mon_id]);
  $utilisateurs = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($utilisateurs);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(["error" => "Erreur lors du chargement des utilisateurs"]);
}