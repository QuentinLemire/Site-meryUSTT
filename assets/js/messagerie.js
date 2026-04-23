document.addEventListener("DOMContentLoaded", () => {
  chargerConversations();
  chargerListeUtilisateurs();
  
  document.getElementById("nouveau-message")
    .addEventListener("click", () => {
      document.getElementById("popup-nouveau-message").style.display = "block";
    });
  document.getElementById("fermer-popup")
    .addEventListener("click", () => {
      document.getElementById("popup-nouveau-message").style.display = "none";
    });

  document.getElementById("form-nouveau-message")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const destinataire = document.getElementById("destinataire").value;
      const message      = document.getElementById("message").value;
      fetch("../modules/messagerie/envoyer_message.php", {
        method:  "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:    `destinataire_id=${destinataire}&contenu=${encodeURIComponent(message)}`
      })
      .then(() => {
        document.getElementById("popup-nouveau-message").style.display = "none";
        chargerConversations();
      });
  });

  document.getElementById("form-reponse")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const destinataireId = document.getElementById("destinataire_id").value;
      const contenu        = document.getElementById("contenu").value;
      fetch("../modules/messagerie/envoyer_message.php", {
        method:  "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:    `destinataire_id=${destinataireId}&contenu=${encodeURIComponent(contenu)}`
      })
      .then(() => {
        document.getElementById("contenu").value = "";
        chargerConversation(destinataireId, document.getElementById("destinataire_id").dataset.type);
      });
  });
});

function chargerConversations() {
  fetch("../modules/messagerie/get_conversations.php")
    .then(res => res.json())
    .then(data => {
      const liste = document.getElementById("liste-conversations");
      liste.innerHTML = "";

      data
        .filter(conv => conv.id || conv.email_invite)
        .forEach(conv => {
          const li       = document.createElement("li");
          li.classList.add("conversation-item");

          const isInvite = Boolean(conv.email_invite);
          const convId   = isInvite ? conv.email_invite : conv.id;
          const type     = isInvite ? "invite" : "user";
          const label    = isInvite ? conv.email_invite : `${conv.nom} ${conv.prenom}`;

          li.dataset.id   = convId;
          li.dataset.type = type;

          // Pastille si besoin
          const badge = conv.non_lus > 0
            ? `<span class="badge">${conv.non_lus}</span>`
            : "";
          li.innerHTML = `${label} ${badge}`;

          li.addEventListener("click", () => {
            // 1) On supprime la pastille tout de suite
            const pastille = li.querySelector(".badge");
            if (pastille) pastille.remove();

            // 2) On met à jour le champ caché et l'en-tête
            const destInput = document.getElementById("destinataire_id");
            destInput.value        = convId;
            destInput.dataset.type = type;
            document.getElementById("header-conversation").textContent = label;

            // 3) On charge la conversation (et ça marque déjà les messages lus en back-end)
            chargerConversation(convId, type);
          });

          liste.appendChild(li);
        });
    })
    .catch(err => console.error("Erreur chargement conversations :", err));
}

function chargerConversation(idOuEmail, type = "user") {
  const qs = type === "invite"
    ? `email_invite=${encodeURIComponent(idOuEmail)}`
    : `user_id=${idOuEmail}`;

  fetch(`../modules/messagerie/get_conversation.php?${qs}`)
    .then(res => res.json())
    .then(data => {
      const messagesDiv = document.getElementById("messages");
      messagesDiv.innerHTML = "";

      data.forEach(msg => {
        const div = document.createElement("div");
        div.className = msg.expediteur === "moi"
          ? "message-moi"
          : "message-lui";
        div.innerHTML = msg.contenu.replace(/\n/g, "<br>");
        messagesDiv.appendChild(div);
      });
      messagesDiv.scrollTop = messagesDiv.scrollHeight;


      fetch("../modules/messagerie/marquer_lus.php", {
        method:  "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:    type === "invite"
          ? `email_invite=${encodeURIComponent(idOuEmail)}`
          : `expediteur_id=${idOuEmail}`
      })
      .then(() => {
        return fetch("../modules/messagerie/get_total_non_lus.php");
      })
      .then(res => res.json())
      .then(data => {
        const totalBadge = document.getElementById("total-non-lus");
        if (!totalBadge) return;
        if (data.total > 0) {
          totalBadge.textContent = data.total;
          totalBadge.style.display = "inline-block";
        } else {
          totalBadge.style.display = "none";
        }
      })
      .catch(err => console.error("Erreur marquer lus :", err));
    })
    .catch(err => console.error("Erreur chargement conversation :", err));
}

function chargerListeUtilisateurs() {
  fetch("../modules/messagerie/get_mail_utilisateurs.php")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("destinataire");
      select.innerHTML = "";
      data.forEach(user => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = `${user.nom} ${user.prenom} (${user.email})`;
        select.appendChild(option);
      });
    });
}