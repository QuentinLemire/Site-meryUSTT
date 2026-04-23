<?php
include __DIR__ . '/../commun/config.php';

header('Content-Type: application/json');

try {
    $pdo = new PDO($dsn, $user, $pwd);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupérer les 4 événements à venir
    $stmt = $pdo->prepare("
        SELECT id_evenement, 
               titre, 
               description, 
               DATE_FORMAT(date, '%d/%m/%Y à %Hh%i') AS date_fr, 
               lieu, 
               type 
        FROM evenements 
        WHERE date >= NOW()
        ORDER BY date ASC 
    ");
    $stmt->execute();
    $evenements = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($evenements);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur SQL : " . $e->getMessage()]);
}
?>