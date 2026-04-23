<?php
require_once '../commun/config.php';

// Récupération des données du formulaire
$id = $_POST['id'] ?? '';
$role = $_POST['role'] ?? '';
$prenom = $_POST['prenom'] ?? '';
$nom = $_POST['nom'] ?? '';
$id_joueur = $_POST['id_joueur'] ?? '';

// Vérification que toutes les données sont présentes
if (!$id || !$role || !$prenom || !$nom || !$id_joueur) {
    http_response_code(400);
    echo "❌ Données incomplètes.";
    exit;
}

try {
    // Mise à jour du joueur (nom + prénom)
    $stmtJoueur = $pdo->prepare("UPDATE joueur SET nom = ?, prenom = ? WHERE id_joueur = ?");
    $stmtJoueur->execute([$nom, $prenom, $id_joueur]);

    // Gestion de la photo si une nouvelle est envoyée
    if (isset($_FILES['photo']) && $_FILES['photo']['size'] > 0) {
        $uploadDir = '../../pages/image/bureau/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

        $filename = uniqid() . "_" . basename($_FILES['photo']['name']);
        $targetFile = $uploadDir . $filename;
        $photoPath = 'pages/image/bureau/' . $filename;

        if (!move_uploaded_file($_FILES['photo']['tmp_name'], $targetFile)) {
            http_response_code(500);
            echo "❌ Échec de l'upload de la nouvelle image.";
            exit;
        }

        $stmt = $pdo->prepare("UPDATE bureau SET role = ?, photo = ? WHERE id = ?");
        $stmt->execute([$role, $photoPath, $id]);
    } else {
        $stmt = $pdo->prepare("UPDATE bureau SET role = ? WHERE id = ?");
        $stmt->execute([$role, $id]);
    }

    echo "✅ Membre mis à jour.";
} catch (PDOException $e) {
    http_response_code(500);
    echo "❌ Erreur SQL : " . $e->getMessage();
}