document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("nom").addEventListener("input", function () {
        this.value = this.value.toUpperCase();
    });

    // Inscription
    document.getElementById("register-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let formData = new FormData(this);

        fetch("../modules/utilisateur/register.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error("Erreur Inscription:", error));
    });

    // Connexion
    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let formData = new FormData(this);

        fetch("../modules/utilisateur/login.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                window.location.reload();
            }
        })
        .catch(error => console.error("Erreur Connexion:", error));
    });

});