<?php
include("../commun/config.php");

if (!empty($_POST['id_produit'])) {
    $id = $_POST['id_produit'];
    $sql = "DELETE FROM produits WHERE id_produit=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    echo "Produit supprimé avec succès !";
} else {
    echo "Erreur : ID produit manquant.";
}
?>