<?php
require_once('../commun/config.php');

try {
    $conn = new PDO($dsn, $user, $pwd);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $numero_equipe = isset($_POST['numero_equipe']) ? (int)$_POST['numero_equipe'] : null;
    $nom_equipe = isset($_POST['nom_equipe']) ? $_POST['nom_equipe'] : null;
    $championnat = isset($_POST['championnat']) ? (int)$_POST['championnat'] : null;
    $division = isset($_POST['division']) ? $_POST['division'] : null;
    $nombre_joueurs = isset($_POST['nombre_joueurs']) ? (int)$_POST['nombre_joueurs'] : null;
    $numero_poule = isset($_POST['numero_poule']) ? (int)$_POST['numero_poule'] : null;

    // Validation des données
    if ($numero_equipe === null || $nom_equipe === null || $championnat === null || $division === null || $nombre_joueurs === null || $numero_poule === null) {
        echo json_encode(['success' => false, 'error' => 'Tous les champs sont requis.']);
        exit();
    }

    // Vérifier si la poule existe déjà dans la division et le championnat
    $pouleQuery = $conn->prepare("SELECT id_poule FROM Poule WHERE n_poule = :numero_poule AND id_championnat = :championnat AND division = :division");
    $pouleQuery->bindParam(':numero_poule', $numero_poule, PDO::PARAM_INT);
    $pouleQuery->bindParam(':championnat', $championnat, PDO::PARAM_INT);
    $pouleQuery->bindParam(':division', $division, PDO::PARAM_STR);
    $pouleQuery->execute();
    $pouleResult = $pouleQuery->fetch(PDO::FETCH_ASSOC);

    // Si la poule existe, récupérer son id, sinon on l'ajoute
    if ($pouleResult) {
        // Poule existe déjà, récupérer l'ID
        $id_poule = $pouleResult['id_poule'];
    } else {
        // Insérer la nouvelle poule
        $pouleInsert = $conn->prepare("INSERT INTO Poule (n_poule, division, id_championnat) VALUES (:numero_poule, :division, :championnat)");
        $pouleInsert->bindParam(':numero_poule', $numero_poule, PDO::PARAM_INT);
        $pouleInsert->bindParam(':division', $division, PDO::PARAM_STR);
        $pouleInsert->bindParam(':championnat', $championnat, PDO::PARAM_INT);
        
        if ($pouleInsert->execute()) {
            $id_poule = $conn->lastInsertId(); // Récupérer le dernier ID inséré
        } else {
            echo json_encode(['success' => false, 'error' => 'Erreur lors de l\'ajout de la poule: ' . $pouleInsert->errorInfo()]);
            exit();
        }
    }

    // Insérer l'équipe dans la table Equipe
    $stmt = $conn->prepare("INSERT INTO Equipe (nom, nb_joueurs, id_championnat, id_poule) VALUES (:nom, :nb_joueurs, :championnat, :id_poule)");
    $stmt->bindParam(':nom', $nom_equipe, PDO::PARAM_STR);
    $stmt->bindParam(':nb_joueurs', $nombre_joueurs, PDO::PARAM_INT);
    $stmt->bindParam(':championnat', $championnat, PDO::PARAM_INT);
    $stmt->bindParam(':id_poule', $id_poule, PDO::PARAM_INT);

    // Exécuter la requête et vérifier si l'insertion a réussi
    if ($stmt->execute()) {
        echo json_encode(['success' => true]); // Réponse réussie
    } else {
        echo json_encode(['success' => false, 'error' => 'Erreur lors de l\'ajout de l\'équipe: ' . $stmt->errorInfo()[2]]); // Erreur lors de l'insertion
    }

    $conn = null;
}
?>