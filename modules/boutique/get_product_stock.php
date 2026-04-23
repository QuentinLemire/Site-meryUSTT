<?php
include("../commun/config.php");

$id_produit = $_GET['id_produit'];

// Vérifier si l'id_produit est valide
if (empty($id_produit)) {
    echo json_encode(["success" => false, "message" => "Produit non valide."]);
    exit;
}

// Récupérer les tailles et quantités en stock pour le produit
$sql = "SELECT id_stock, taille, quantite FROM Stocks WHERE id_produit = :id_produit";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':id_produit', $id_produit, PDO::PARAM_INT);
$stmt->execute();
$stocks = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Vérifier si des stocks ont été trouvés
if ($stocks) {
    echo json_encode(["success" => true, "stocks" => $stocks]);
} else {
    echo json_encode(["success" => false, "message" => "Aucun stock trouvé pour ce produit."]);
}
?>