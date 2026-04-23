document.addEventListener("DOMContentLoaded", function () {
    const userMenu = document.querySelector(".user-menu");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const userName = document.getElementById("user-name");
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");
    const registerLink = document.getElementById("register-link");
    const userActions = document.getElementById("user-actions");
    const logoutLink = document.getElementById("logout-link");

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

    userMenu.addEventListener("mouseenter", showMenu);
    userMenu.addEventListener("mouseleave", hideMenu);
    dropdownMenu.addEventListener("mouseenter", showMenu);
    dropdownMenu.addEventListener("mouseleave", hideMenu);

    fetch("../modules/utilisateur/get_user_info.php")
        .then(response => response.json())
        .then(data => {
            if (data.logged_in) {
                userName.textContent = "Bonjour, " + data.prenom;
                loginForm.style.display = "none";
                registerLink.style.display = "none";
                userActions.style.display = "flex";
            }
        });

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        fetch("../modules/utilisateur/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `email=${email.value}&password=${password.value}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Connexion réussie !");
                window.location.reload();
            } else {
                loginError.style.display = "block";
                email.style.border = "2px solid red";
                password.style.border = "2px solid red";
            }
        });
    });

    logoutLink.addEventListener("click", function (e) {
        e.preventDefault();

        fetch("../modules/utilisateur/logout.php")
            .then(response => response.json())
            .then(data => {
                alert(data.message); 
                userActions.style.display = "none"; 
                loginForm.style.display = "block"; 
                registerLink.style.display = "block"; 
                window.location.reload(); 
            })
            .catch(error => console.error("Erreur Déconnexion :", error));
    });

});