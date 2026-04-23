<?php
include '../commun/config.php'; 

$sql = "SELECT id_equipe, nom, id_championnat FROM Equipe WHERE nom LIKE 'MERY%' ORDER BY id_championnat, nom";
$stmt = $pdo->query($sql);
$equipes = $stmt->fetchAll();

$championnats = [
    1 => "Championnat de France",
    2 => "Championnat de Paris"
];

$equipesByChampionnat = [
    1 => [], // Championnat de France
    2 => []  // Championnat de Paris
];

// Trier les équipes par championnat
foreach ($equipes as $equipe) {
    $equipesByChampionnat[$equipe['id_championnat']][] = $equipe;
}

echo '<option value="">-- Sélectionnez une équipe --</option>';

foreach ($championnats as $id => $nomChampionnat) {
    if (!empty($equipesByChampionnat[$id])) {
        echo "<optgroup label='-- $nomChampionnat --'>";
        foreach ($equipesByChampionnat[$id] as $equipe) {
            echo "<option value='{$equipe['id_equipe']}'>{$equipe['nom']}</option>";
        }
        echo "</optgroup>";
    }
}
?>