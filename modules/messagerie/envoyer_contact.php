<?php
session_start();
require_once '../commun/config.php';

$email = $_POST['email'] ?? null;
$contenu = $_POST['contenu'] ?? null;

if (!$email || !$contenu) {
    http_response_code(400);
    exit("Champs manquants.");
}

try {
    if (!isset($pdo)) {
        $pdo = new PDO($dsn, $user, $pwd, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    }

    $expediteur_id = null;
    $email_invite = null;

    if (isset($_SESSION['user_id'])) {
        $expediteur_id = $_SESSION['user_id'];
    } else {
        $email_invite = $email;
    }

    // Récupérer tous les admins
    $stmt = $pdo->prepare("SELECT id_utilisateur FROM utilisateurs WHERE role = 'admin'");
    $stmt->execute();
    $admins = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Insérer le message pour chaque admin
    $stmt = $pdo->prepare("INSERT INTO message (expediteur_id, email_invite, destinataire_id, contenu) VALUES (?, ?, ?, ?)");

    foreach ($admins as $admin_id) {
        $stmt->execute([$expediteur_id, $email_invite, $admin_id, $contenu]);
    }

    echo "✅ Votre message a été envoyé à l'équipe administrative.";
} catch (PDOException $e) {
    http_response_code(500);
    echo "❌ Erreur serveur : " . $e->getMessage();
}