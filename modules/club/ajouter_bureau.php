<?php
require_once '../commun/config.php';

$id_joueur = $_POST['id_joueur'] ?? '';
$role = $_POST['role'] ?? '';

if (!$id_joueur || !$role) {
    http_response_code(400);
    echo "❌ Données manquantes.";
    exit;
}

try {
    // Vérification que le joueur existe
    $stmt = $pdo->prepare("SELECT 1 FROM joueur WHERE id_joueur = ?");
    $stmt->execute([$id_joueur]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo "❌ Joueur non trouvé.";
        exit;
    }

    // Gestion de l'image (optionnelle)
    $photoPath = 'pages/image/bureau/membre_bureau.jpeg'; // valeur par défaut

    if (isset($_FILES['photo']) && $_FILES['photo']['size'] > 0) {
        $uploadDir = '../../pages/image/bureau/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

        $filename = uniqid() . "_" . basename($_FILES['photo']['name']);
        $targetFile = $uploadDir . $filename;
        $photoPath = 'pages/image/bureau/' . $filename;

        if (!move_uploaded_file($_FILES['photo']['tmp_name'], $targetFile)) {
            http_response_code(500);
            echo "❌ Échec upload image.";
            exit;
        }
    }

    // Insertion
    $stmt = $pdo->prepare("INSERT INTO bureau (id_joueur, role, photo) VALUES (?, ?, ?)");
    $stmt->execute([$id_joueur, $role, $photoPath]);

    echo "✅ Membre ajouté.";
} catch (PDOException $e) {
    http_response_code(500);
    echo "❌ Erreur SQL : " . $e->getMessage();
}