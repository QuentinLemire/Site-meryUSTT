function initLayoutScripts() {
    if (window.layoutInitialized) {
        console.warn("⚠ `initLayoutScripts` déjà exécuté, on évite un double chargement.");
        return;
    }
    window.layoutInitialized = true;

    console.log("🔄 Exécution de initLayoutScripts après chargement de layout.html");

    const userMenu = document.querySelector(".user-menu");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const userName = document.getElementById("user-name");
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");
    const registerLink = document.getElementById("register-link");
    const userActions = document.getElementById("user-actions");
    const logoutLink = document.getElementById("logout-link");

    if (!userMenu || !dropdownMenu || !loginForm || !logoutLink) {
        console.error("❌ Les éléments du DOM ne sont pas encore disponibles !");
        return;
    }

    // Menu utilisateur
    let timeout;
    function showMenu() {
        clearTimeout(timeout);
        dropdownMenu.style.display = "block";
        dropdownMenu.style.opacity = "1";
        dropdownMenu.style.visibility = "visible";
    }
    function hideMenu() {
        timeout = setTimeout(() => {
            dropdownMenu.style.opacity = "0";
            dropdownMenu.style.visibility = "hidden";
            setTimeout(() => dropdownMenu.style.display = "none", 200);
        }, 300);
    }

    userMenu.removeEventListener("mouseenter", showMenu);
    userMenu.removeEventListener("mouseleave", hideMenu);
    dropdownMenu.removeEventListener("mouseenter", showMenu);
    dropdownMenu.removeEventListener("mouseleave", hideMenu);

    userMenu.addEventListener("mouseenter", showMenu);
    userMenu.addEventListener("mouseleave", hideMenu);
    dropdownMenu.addEventListener("mouseenter", showMenu);
    dropdownMenu.addEventListener("mouseleave", hideMenu);

    // Chargement des infos utilisateur
    fetch("../modules/utilisateur/get_user_info.php")
        .then(response => response.json())
        .then(data => {
            console.log("✅ Données utilisateur reçues :", data);
            if (data.logged_in) {
                userName.textContent = "Bonjour, " + data.prenom;
                loginForm.style.display = "none";
                registerLink.style.display = "none";
                userActions.style.display = "flex";

                // Mise à jour de la pastille des messages non lus
                mettreAJourBadgeMessages();
            }
        })
        .catch(error => console.error("❌ Erreur lors de la récupération des infos utilisateur :", error));

    loginForm.removeEventListener("submit", handleLogin);
    logoutLink.removeEventListener("click", handleLogout);

    function handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log("🔄 Tentative de connexion avec :", email, password);

        fetch("../modules/utilisateur/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("✅ Connexion réussie !");
                window.location.reload();
            } else {
                loginError.style.display = "block";
                document.getElementById("email").style.border = "2px solid red";
                document.getElementById("password").style.border = "2px solid red";
            }
        })
        .catch(error => console.error("❌ Erreur lors de la connexion :", error));
    }

    function handleLogout(event) {
        event.preventDefault();

        fetch("../modules/utilisateur/logout.php")
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                userActions.style.display = "none";
                loginForm.style.display = "block";
                registerLink.style.display = "block";
                window.location.reload();
            })
            .catch(error => console.error("❌ Erreur Déconnexion :", error));
    }

    loginForm.addEventListener("submit", handleLogin);
    logoutLink.addEventListener("click", handleLogout);

    console.log("✅ Scripts du layout initialisés !");
}

function mettreAJourBadgeMessages() {
    fetch("../modules/messagerie/get_total_non_lus.php")
        .then(res => res.json())
        .then(data => {
            const badge = document.getElementById("total-non-lus");
            if (badge && data.total > 0) {
                badge.textContent = data.total;
                badge.style.display = "inline-block";
            }
        })
        .catch(err => console.error("❌ Erreur fetch non-lus :", err));
}

if (document.readyState === "complete") {
    initLayoutScripts();
} else {
    window.addEventListener("load", initLayoutScripts);
}

document.addEventListener("DOMContentLoaded", function () {
    let panierInterval = setInterval(() => {
        let cartCount = document.getElementById("cart-count");
        let cartPreview = document.getElementById("cart-items");

        if (cartCount && cartPreview) {
            clearInterval(panierInterval);
            afficherPanier();
            activerSurvolPanier();
        } else {
            console.log("⏳ En attente du chargement du panier...");
        }
    }, 300);
});