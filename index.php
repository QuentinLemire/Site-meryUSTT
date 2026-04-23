<?php
// Redirection vers la page d'accueil
$accueilPath = 'pages/accueil.html';

// Vérifie si le fichier existe avant de rediriger
if (file_exists($accueilPath)) {
    header("Location: $accueilPath");
    exit;
} else {
    // Fallback si le fichier est manquant
    echo "<h1>Erreur</h1>";
    echo "<p>La page d'accueil n'a pas été trouvée à <code>$accueilPath</code>.</p>";
    echo "<p>Vérifiez le chemin ou contactez l'administrateur du site.</p>";
}