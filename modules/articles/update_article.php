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
if (!isset($_POST['id_article']) || empty($_POST['id_article'])) {
    echo json_encode(["success" => false, "message" => "ID de l'article manquant"]);
    exit;
}

$id_article = $_POST['id_article'];
$titre = $_POST['titre'] ?? '';
$contenu = $_POST['contenu'] ?? '';

// ✅ Vérifier que les champs sont bien remplis
if (empty($titre) || empty($contenu)) {
    echo json_encode(["success" => false, "message" => "Titre et contenu requis"]);
    exit;
}

// ✅ Gestion de l'upload de l'image (si modifiée)
$imagePath = null;
if (!empty($_FILES['image']['name'])) {
    $uploadsDir = "../../pages/image/article/";
    if (!is_dir($uploadsDir)) {
        mkdir($uploadsDir, 0777, true); // Crée récursivement si le dossier n'existe pas
    }

    $imageName = basename($_FILES['image']['name']);
    $imagePath = "pages/image/article/" . $imageName;
    $fullPath = $uploadsDir . $imageName;

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $fullPath)) {
        echo json_encode(["success" => false, "message" => "Erreur lors de l'upload de l'image"]);
        exit;
    }
}

try {
    $pdo = new PDO($dsn, $user, $pwd, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    if ($imagePath) {
        $sql = "UPDATE articles SET titre = ?, contenu = ?, image = ? WHERE id_article = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$titre, $contenu, $imagePath, $id_article]);
    } else {
        $sql = "UPDATE articles SET titre = ?, contenu = ? WHERE id_article = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$titre, $contenu, $id_article]);
    }

    echo json_encode(["success" => true, "message" => "Article mis à jour"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erreur SQL : " . $e->getMessage()]);
}
?>