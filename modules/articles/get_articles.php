<?php
require_once "../commun/config.php"; // Connexion à la BDD
session_start();

header("Content-Type: application/json");

try {
    $pdo = new PDO($dsn, $user, $pwd, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    // ✅ Jointure SQL pour récupérer le nom et prénom de l'auteur
    $sql = "SELECT 
                a.id_article, 
                a.titre, 
                a.contenu, 
                a.date_publication, 
                a.image, 
                u.nom AS auteur_nom, 
                u.prenom AS auteur_prenom
            FROM articles a
            JOIN utilisateurs u ON a.auteur = u.id_utilisateur
            ORDER BY a.date_publication DESC ";
    
    $stmt = $pdo->query($sql);
    $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($articles);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erreur SQL : " . $e->getMessage()]);
}
?>