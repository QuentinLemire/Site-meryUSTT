<?php
header('Content-Type: application/json');
require_once '../commun/config.php';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$bdd;charset=utf8mb4", $user, $pwd);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "
        SELECT 
            P.id_poule,
            C.type AS championnat,
            P.division,
            P.n_poule,
            GROUP_CONCAT(E.nom ORDER BY E.nom SEPARATOR ', ') AS equipes,
            MIN(
                CASE 
                    WHEN E.nom LIKE 'Méry %' AND E.nom REGEXP 'Méry [0-9]+'
                    THEN CAST(SUBSTRING(E.nom, LOCATE('Méry', E.nom) + 5, 3) AS UNSIGNED)
                    ELSE 999
                END
            ) AS numero_mery
        FROM Poule P
        JOIN Championnat C ON P.id_championnat = C.id_championnat
        JOIN Equipe E ON E.id_poule = P.id_poule
        GROUP BY P.id_poule, P.n_poule, P.division, C.type
        ORDER BY 
            FIELD(C.type, 'Championnat de France', 'Championnat de Paris'),
            numero_mery ASC
    ";

    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $poules = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($poules) {
        echo json_encode(['success' => true, 'poules' => $poules]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Aucune poule trouvée']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur de récupération des poules : ' . $e->getMessage()]);
}
?>