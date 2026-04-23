<?php
require_once "../commun/config.php"; // Connexion à la BDD
session_start();

header("Content-Type: application/json");

// ✅ Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Vous devez être connecté"]);
    exit;
}

// ✅ Vérifier que l'ID de l'article est bien envoyé
if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode(["success" => false, "message" => "ID de l'article manquant"]);
    exit;
}

$id_article = $_GET['id'];

try {
    $pdo = new PDO($dsn, $user, $pwd, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    $sql = "DELETE FROM articles WHERE id_article = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id_article]);

    echo json_encode(["success" => true, "message" => "Article supprimé"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erreur SQL : " . $e->getMessage()]);
}
?>