<?php
require '../commun/config.php';
 
if (isset($_POST['id_poule'])) {
    $id_poule = $_POST['id_poule'];

    try {
        $stmt = $pdo->prepare("DELETE FROM poule WHERE id_poule = ?");
        $stmt->execute([$id_poule]);

        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'ID de la poule manquant.']);
}
?>