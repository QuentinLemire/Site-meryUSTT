document.addEventListener("DOMContentLoaded", function () {
  // Préremplir l'email si l'utilisateur est connecté
  fetch("../modules/messagerie/get_email_session.php")
    .then(res => res.json())
    .then(data => {
      if (data.email) {
        document.getElementById("contact-email").value = data.email;
      }
    });

  // Gérer l'envoi du message
  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("contact-email").value;
    const message = document.getElementById("contact-message").value;

    fetch("../modules/messagerie/envoyer_contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${encodeURIComponent(email)}&contenu=${encodeURIComponent(message)}`
    })
      .then(res => res.text())
      .then(response => {
        console.log("Réponse du serveur :", response);
        localStorage.setItem("contactSent", "1");
        window.location.reload();
      });
  });

  // Si la page se recharge après un envoi réussi
  if (localStorage.getItem("contactSent")) {
    document.getElementById("contact-confirmation").textContent = "✅ Message envoyé avec succès !";
    document.getElementById("contact-confirmation").style.color = "green";
    localStorage.removeItem("contactSent");
  }
});