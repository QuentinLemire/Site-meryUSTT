<?php
require_once '../commun/config.php';
header('Content-Type: text/plain; charset=utf-8');

try {
    $titre = trim($_POST['titre'] ?? '');
    $date = trim($_POST['date'] ?? '');

    // Champs facultatifs → NULL si vide
    $description = trim($_POST['description'] ?? '') ?: null;
    $lieu = trim($_POST['lieu'] ?? '') ?: null;
    $type = trim($_POST['type'] ?? '') ?: null;

    // Vérifie uniquement les champs obligatoires
    if (empty($titre) || empty($date)) {
        throw new Exception("⚠️ Merci de remplir les champs obligatoires (titre, date).");
    }

    $sql = "INSERT INTO evenements (titre, description, date, lieu, type, id_equipe)
            VALUES (?, ?, ?, ?, ?, NULL)";
    $stmt = $pdo->prepare($sql);
    $success = $stmt->execute([$titre, $description, $date, $lieu, $type]);

    if ($success) {
        echo "✅ Événement ajouté avec succès";
    } else {
        echo "❌ Échec lors de l’ajout.";
    }

} catch (PDOException $e) {
    echo "❌ Erreur PDO : " . $e->getMessage();
} catch (Exception $e) {
    echo "❌ Erreur : " . $e->getMessage();
}