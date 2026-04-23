<?php
include("../commun/config.php");
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Utilisateur non connecté."]);
    exit;
}

// Vérifier si les paramètres nécessaires sont envoyés
if (!isset($_POST['id_produit'])) {
    echo json_encode(["success" => false, "message" => "Paramètre id_produit manquant."]);
    exit;
}

$id_utilisateur = $_SESSION['user_id'];  
$id_produit = (int) $_POST['id_produit'];  

// Afficher les valeurs dans les logs pour vérifier
error_log("ID Utilisateur (Session) : " . $id_utilisateur);  
error_log("ID Produit (POST) : " . $id_produit);  

// SQL pour supprimer le produit du panier
$sql = "
    DELETE FROM panier 
    WHERE id_utilisateur = :id_utilisateur AND id_produit = :id_produit
";

// Afficher la requête dans les logs pour déboguer
error_log("Requête SQL pour suppression : " . $sql);
error_log("Paramètres : ID Utilisateur = " . $id_utilisateur . " | ID Produit = " . $id_produit);

// Préparer et exécuter la requête
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':id_utilisateur', $id_utilisateur, PDO::PARAM_INT);
$stmt->bindParam(':id_produit', $id_produit, PDO::PARAM_INT);

// Exécuter la requête et vérifier si l'exécution a réussi
if ($stmt->execute()) {
    error_log("Produit supprimé du panier avec succès.");
    echo json_encode(["success" => true, "message" => "Produit supprimé du panier."]);
} else {
    // Afficher l'erreur SQL dans les logs
    $errorInfo = $stmt->errorInfo();
    error_log("Erreur SQL lors de la suppression du produit : " . implode(", ", $errorInfo));
    echo json_encode(["success" => false, "message" => "Erreur lors de la suppression du produit."]);
}
?>