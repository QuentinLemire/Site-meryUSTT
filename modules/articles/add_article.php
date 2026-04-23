<?php
require_once "../commun/config.php";
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Vous devez être connecté"]);
    exit;
}

if (!isset($_POST['titre'], $_POST['contenu'])) {
    echo json_encode(["success" => false, "message" => "Champs manquants"]);
    exit;
}

$titre = trim($_POST['titre']);
$contenu = trim($_POST['contenu']);
$auteur = $_SESSION['user_id'];

if (empty($titre) || empty($contenu)) {
    echo json_encode(["success" => false, "message" => "Tous les champs sont requis"]);
    exit;
}

// Gestion de l'image
$imagePath = null;
if (!empty($_FILES['image']['name'])) {
    $uploadsDir = "../../pages/image/article"; // Emplacement réel
    $relativePath = "pages/image/article";     // Chemin enregistré en BDD

    // Création du dossier si besoin
    if (!is_dir($uploadsDir)) {
        mkdir($uploadsDir, 0777, true);
    }

    // Nettoyage du nom de fichier
    $extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $imageName = uniqid('article_') . '.' . $extension;
    $cheminFinal = "$uploadsDir/$imageName";
    $imagePath = "$relativePath/$imageName";

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $cheminFinal)) {
        echo json_encode(["success" => false, "message" => "Erreur lors de l'upload de l'image"]);
        exit;
    }
}

try {
    $pdo = new PDO($dsn, $user, $pwd, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

    $stmt = $pdo->prepare("INSERT INTO articles (titre, contenu, auteur, image, date_publication) VALUES (?, ?, ?, ?, NOW())");
    $stmt->execute([$titre, $contenu, $auteur, $imagePath]);

    echo json_encode(["success" => true, "message" => "✅ Article ajouté avec succès"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "❌ Erreur SQL : " . $e->getMessage()]);
}
?>