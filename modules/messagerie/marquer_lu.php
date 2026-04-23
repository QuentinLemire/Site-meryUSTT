<?php
require_once '../commun/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $stmt = $pdo->prepare("UPDATE messages SET lu = 1 WHERE id = ?");
    $stmt->execute([$_POST['id']]);
}