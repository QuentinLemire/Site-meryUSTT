<?php
require_once '../commun/config.php';

if (!isset($_POST['id_evenement'])) {
    echo "❌ ID manquant.";
    exit;
}

$id = (int) $_POST['id_evenement'];

try {
    $stmt = $pdo->prepare("DELETE FROM evenements WHERE id_evenement = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() > 0) {
        echo "✅ Événement supprimé.";
    } else {
        echo "❌ Événement introuvable.";
    }
} catch (PDOException $e) {
    echo "❌ Erreur PDO : " . $e->getMessage();
}