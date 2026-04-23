<?php
session_start();
require_once '../commun/config.php';
ini_set('display_errors', 1);
error_reporting(E_ALL);

if (!isset($_SESSION['user_id'])) {
  http_response_code(403);
  exit('Utilisateur non connecté');
}

$mon_id = $_SESSION['user_id'];

try {
  $sql = "
    -- 1) Conversations avec d'autres utilisateurs
    SELECT
      u.id_utilisateur AS id,
      u.nom,
      u.prenom,
      NULL                AS email_invite,
      SUM(m.destinataire_id = :mon_id AND m.lu = 0) AS non_lus,
      MAX(m.date_envoi)   AS last_date
    FROM message m
    JOIN utilisateurs u
      ON (
           (m.expediteur_id    = u.id_utilisateur AND m.destinataire_id = :mon_id)
        OR (m.destinataire_id = u.id_utilisateur AND m.expediteur_id    = :mon_id)
      )
    GROUP BY u.id_utilisateur, u.nom, u.prenom

    UNION

    -- 2) Conversations avec des invités
    SELECT
      NULL           AS id,
      NULL           AS nom,
      NULL           AS prenom,
      m.email_invite AS email_invite,
      SUM(m.destinataire_id = :mon_id AND m.lu = 0) AS non_lus,
      MAX(m.date_envoi)   AS last_date
    FROM message m
    WHERE m.email_invite IS NOT NULL
      AND m.destinataire_id = :mon_id
    GROUP BY m.email_invite

    -- On trie le tout par date du dernier message
    ORDER BY last_date DESC
  ";

  $stmt = $pdo->prepare($sql);
  $stmt->execute(['mon_id' => $mon_id]);
  $conversations = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($conversations);
} catch (PDOException $e) {
  http_response_code(500);
  echo "Erreur SQL : " . $e->getMessage();
}