<?php
require_once '../commun/config.php';

$stmt = $pdo->prepare("SELECT * FROM evenements WHERE date >= NOW() ORDER BY date ASC");
$stmt->execute();
$evenements = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (empty($evenements)) {
    echo "<p>📭 Aucun événement à venir.</p>";
    exit;
}

echo "<table>";
echo "<thead><tr><th>Titre</th><th>Description</th><th>Date</th><th>Lieu</th><th>Type</th><th>Action</th></tr></thead><tbody>";

foreach ($evenements as $e) {
    echo "<tr>";
    echo "<td>" . htmlspecialchars($e['titre'] ?? '', ENT_QUOTES, 'UTF-8') . "</td>";
    echo "<td>" . htmlspecialchars($e['description'] ?? '', ENT_QUOTES, 'UTF-8') . "</td>";
    echo "<td>" . date('d/m/Y H:i', strtotime($e['date'])) . "</td>";
    echo "<td>" . htmlspecialchars($e['lieu'] ?? '', ENT_QUOTES, 'UTF-8') . "</td>";
    echo "<td>" . htmlspecialchars($e['type'] ?? '', ENT_QUOTES, 'UTF-8') . "</td>";
    echo "<td><button onclick=\"supprimerEvenement(" . $e['id_evenement'] . ")\">🗑️ Supprimer</button></td>";
    echo "</tr>";
}

echo "</tbody></table>";