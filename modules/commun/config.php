<?php
$user = 'root'; // Nom d'utilisateur MySQL
$pwd = 'root'; // Mot de passe MySQL
$host = 'localhost'; // Adresse du serveur MySQL
$bdd = 'ProjetMery'; // Nom de la base de données

$dsn = "mysql:host=$host;dbname=$bdd;charset=utf8mb4";

try {
    $pdo = new PDO($dsn, $user, $pwd, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>