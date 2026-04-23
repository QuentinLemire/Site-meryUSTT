<?php
include("../commun/config.php");

if (isset($_POST['id_stock']) && isset($_POST['quantite'])) {
    $id_stock = $_POST['id_stock'];
    $quantite = $_POST['quantite'];

    // Vérifier si la quantité est un nombre valide
    if (!is_numeric($quantite)) {
        echo json_encode(["success" => false, "message" => "La quantité n'est pas valide."]);
        exit;
    }

    // Mise à jour du stock dans la base de données
    try {
        $sql = "UPDATE Stocks SET quantite = quantite - :quantite WHERE id_stock = :id_stock";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':quantite', $quantite, PDO::PARAM_INT);
        $stmt->bindParam(':id_stock', $id_stock, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true, "message" => "Stock mis à jour avec succès."]);
        } else {
            echo json_encode(["success" => false, "message" => "Erreur lors de la mise à jour du stock."]);
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Erreur de base de données : " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Données manquantes."]);
}
?>