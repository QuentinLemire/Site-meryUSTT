<?php
require '../commun/config.php';

function safe($val) {
    return htmlspecialchars($val ?? '-');
}

$poules = $pdo->query("
    SELECT 
        P.id_poule,
        P.n_poule,
        P.division,
        C.type AS type_championnat,
        E.nom AS nom_equipe,
        CAST(SUBSTRING(E.nom, LOCATE('Méry', E.nom) + 5, 2) AS UNSIGNED) AS numero_mery
    FROM Poule P
    JOIN Championnat C ON P.id_championnat = C.id_championnat
    LEFT JOIN Equipe E ON E.id_poule = P.id_poule AND E.nom LIKE 'Méry %'
    GROUP BY 
        P.id_poule, P.n_poule, P.division, C.type, E.nom
    ORDER BY 
        FIELD(C.type, 'Championnat de France', 'Championnat de Paris'),
        numero_mery ASC
")->fetchAll(PDO::FETCH_ASSOC);

if (empty($poules)) {
    echo "<p>Aucune poule trouvée.</p>";
} else {
    echo "<div class='poules-container'>";

    foreach ($poules as $poule) {
        echo "<div class='poule-box' data-id='" . $poule['id_poule'] . "'>";

        // Affichage du titre avec l'équipe Méry si trouvée
        echo "<h2 class='poule-header'>";
        if (!empty($poule['nom_equipe'])) {
            echo safe($poule['nom_equipe']) . " - ";
        }
        echo "Poule " . safe($poule['n_poule']) . " - " . safe($poule['division']) . " - " . safe($poule['type_championnat']) . "</h2>";

        // Classement
        echo "<table class='poule-table'>
                <tr>
                    <th>Équipe</th>
                    <th>MJ</th>
                    <th>V</th>
                    <th>N</th>
                    <th>D</th>
                    <th>Pts</th>
                </tr>";

        $stmt = $pdo->prepare("SELECT E.nom AS equipe, C.matchs_joues, C.matchs_gagnes, C.matchs_nuls, C.matchs_perdus, C.points 
                               FROM Equipe E
                               LEFT JOIN Classement_Equipe C ON E.id_equipe = C.id_equipe
                               WHERE E.id_poule = ?
                               ORDER BY C.points DESC");
        $stmt->execute([$poule['id_poule']]);
        $classement = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($classement)) {
            echo "<tr><td colspan='6'>Aucun classement disponible.</td></tr>";
        } else {
            foreach ($classement as $equipe) {
                echo "<tr>
                        <td>" . safe($equipe['equipe']) . "</td>
                        <td>" . ($equipe['matchs_joues'] ?? '-') . "</td>
                        <td>" . ($equipe['matchs_gagnes'] ?? '-') . "</td>
                        <td>" . ($equipe['matchs_nuls'] ?? '-') . "</td>
                        <td>" . ($equipe['matchs_perdus'] ?? '-') . "</td>
                        <td>" . ($equipe['points'] ?? '-') . "</td>
                    </tr>";
            }
        }

        echo "</table>";
        echo "</div>"; 
    }

    echo "</div>"; 
}
?>