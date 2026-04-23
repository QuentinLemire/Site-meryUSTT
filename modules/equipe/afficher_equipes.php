<?php
include('../commun/config.php');

try {
    $conn = new PDO($dsn, $user, $pwd);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

// Récupérer les équipes de Mery avec le championnat, la division, et la poule
$query = $conn->prepare("
    SELECT 
        e.nom AS nom,
        e.nb_joueurs,
        c.type AS championnat,
        p.n_poule AS poule,
        p.division
    FROM Equipe e
    INNER JOIN Poule p ON e.id_poule = p.id_poule
    INNER JOIN Championnat c ON e.id_championnat = c.id_championnat
    WHERE e.nom LIKE 'Mery%'
");
$query->execute();
$equipes = $query->fetchAll(PDO::FETCH_ASSOC);

$conn = null;

echo json_encode(['equipes' => $equipes]);
?>