<?php
require '../commun/config.php';

$mois = $_GET['mois'] ?? date('m');
$annee = $_GET['annee'] ?? date('Y');

$start = "$annee-" . str_pad($mois, 2, "0", STR_PAD_LEFT) . "-01";
$end = date("Y-m-t", strtotime($start));

$stmt = $pdo->prepare("
    SELECT 
        DATE(date) AS date,
        titre,
        description,
        lieu,
        type
    FROM Evenements
    WHERE date BETWEEN :start AND :end
    ORDER BY date ASC
");
$stmt->execute([
    'start' => $start,
    'end' => $end
]);

$evenements = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($evenements);
?>