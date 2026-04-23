<?php
session_start();
require_once '../commun/config.php';

$id_utilisateur = $_SESSION['user_id'];

$sql = "
SELECT 
    p.id_poule,
    p.division,
    p.n_poule,
    ch.type AS championnat,
    e.id_equipe,
    e.nom AS nom_equipe,
    COALESCE(ce.matchs_joues, 0) AS matchs_joues,
    COALESCE(ce.matchs_gagnes, 0) AS matchs_gagnes,
    COALESCE(ce.matchs_nuls, 0) AS matchs_nuls,
    COALESCE(ce.matchs_perdus, 0) AS matchs_perdus,
    COALESCE(ce.points, 0) AS points,
    CASE WHEN e.id_equipe = e_joueur.id_equipe THEN 1 ELSE 0 END AS est_equipe_joueur
FROM joueur j
JOIN joueur_equipe je ON j.id_joueur = je.id_joueur
JOIN equipe e_joueur ON je.id_equipe = e_joueur.id_equipe
JOIN poule p_joueur ON e_joueur.id_poule = p_joueur.id_poule
JOIN poule p ON p.id_poule = p_joueur.id_poule
JOIN championnat ch ON p.id_championnat = ch.id_championnat
JOIN equipe e ON e.id_poule = p.id_poule
LEFT JOIN classement_equipe ce ON ce.id_equipe = e.id_equipe
WHERE j.id_utilisateur = ?
ORDER BY p.id_poule, points DESC
";

$stmt = $pdo->prepare($sql);
$stmt->execute([$id_utilisateur]);
$resultats = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (empty($resultats)) {
    echo "<p>📭 Vous n'avez encore participé à aucune rencontre.</p>";
    exit;
}

// Regrouper les équipes par poule
$poules = [];

foreach ($resultats as $row) {
    $id_poule = $row['id_poule'];

    if (!isset($poules[$id_poule])) {
        $poules[$id_poule] = [
            'championnat' => $row['championnat'],
            'division' => $row['division'],
            'n_poule' => $row['n_poule'],
            'equipes' => []
        ];
    }

    $poules[$id_poule]['equipes'][] = [
        'id' => $row['id_equipe'],
        'nom' => $row['nom_equipe'],
        'mj' => $row['matchs_joues'],
        'v' => $row['matchs_gagnes'],
        'n' => $row['matchs_nuls'],
        'd' => $row['matchs_perdus'],
        'pts' => $row['points'],
        'est_equipe_joueur' => $row['est_equipe_joueur']
    ];
}

foreach ($poules as $poule) {
    echo '<div class="classement">';
    echo '<h3>Poule ' . htmlspecialchars($poule['n_poule']) . ' - ' . htmlspecialchars($poule['division']) . '</h3>';
    echo '<table>';
    echo '<thead><tr><th>#</th><th>Équipe</th><th>MJ</th><th>V</th><th>N</th><th>D</th><th>Pts</th></tr></thead><tbody>';

    $i = 1;
    foreach ($poule['equipes'] as $equipe) {
        $highlight = $equipe['est_equipe_joueur'] ? ' style="font-weight: bold; color:#002A4D"' : '';
        echo '<tr' . $highlight . '>';
        echo '<td>' . $i . '</td>';
        echo '<td>' . htmlspecialchars($equipe['nom']) . '</td>';
        echo '<td>' . htmlspecialchars($equipe['mj']) . '</td>';
        echo '<td>' . htmlspecialchars($equipe['v']) . '</td>';
        echo '<td>' . htmlspecialchars($equipe['n']) . '</td>';
        echo '<td>' . htmlspecialchars($equipe['d']) . '</td>';
        echo '<td>' . htmlspecialchars($equipe['pts']) . '</td>';
        echo '</tr>';
        $i++;
    }

    echo '</tbody></table>';
    echo '</div>';
}
?>