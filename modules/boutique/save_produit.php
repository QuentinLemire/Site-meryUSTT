<?php
include("../commun/config.php");

$nom = $_POST['nom'] ?? '';
$description = $_POST['description'] ?? '';
$prix = $_POST['prix'] ?? '';
$categorie = $_POST['categorie'] ?? '';
$sous_categorie = $_POST['sous_categorie'] ?? '';
$id = $_POST['id_produit'] ?? null;

// Vérifier si on ajoute ou modifie un produit
if (!empty($id)) {
    // MODIFICATION DU PRODUIT
    $sql = "UPDATE produits SET nom=?, description=?, prix=?, categorie=?, sous_categorie=? WHERE id_produit=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nom, $description, $prix, $categorie, $sous_categorie, $id]);

    echo "✅ Produit modifié avec succès !";
} else {
    // AJOUT D'UN NOUVEAU PRODUIT
    $sql = "INSERT INTO produits (nom, description, prix, categorie, sous_categorie) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nom, $description, $prix, $categorie, $sous_categorie]);

    // Récupérer l'ID du produit ajouté
    $id = $pdo->lastInsertId();
    echo "✅ Nouveau produit ajouté avec succès !";
}

// Gérer l'upload des nouvelles images SEULEMENT si des fichiers sont envoyés
if (!empty($_FILES['images']['name'][0])) {
    $dossierUploads = "uploads/";
    if (!file_exists($dossierUploads)) {
        mkdir($dossierUploads, 0777, true);
    }

    foreach ($_FILES['images']['tmp_name'] as $index => $tmpName) {
        if ($_FILES['images']['error'][$index] == 0) { // Vérifier si l'image est bien uploadée
            $nomFichier = basename($_FILES['images']['name'][$index]);
            $cheminFichier = $dossierUploads . $nomFichier;

            if (move_uploaded_file($tmpName, $cheminFichier)) {
                // Enregistrer chaque image dans `produit_images`
                $sql = "INSERT INTO produit_images (id_produit, image) VALUES (?, ?)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$id, $cheminFichier]);
            }
        }
    }
}
?>