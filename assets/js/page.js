document.addEventListener("DOMContentLoaded", function() {
    fetch("layout.html")
        .then(response => response.text())
        .then(data => {
            let tempDiv = document.createElement("div");
            tempDiv.innerHTML = data;

            // Insérer le header en haut 
            if (!document.querySelector("#site-header")) {
                document.body.insertAdjacentElement("afterbegin", tempDiv.querySelector("#site-header"));
            }

            // Insérer le footer en bas 
            if (!document.querySelector("#site-footer")) {
                document.body.appendChild(tempDiv.querySelector("#site-footer"));
            }

            console.log("✅ Header et footer insérés avec succès !");

            // Charger le CSS 
            if (!document.getElementById("layout-css")) {
                let link = document.createElement("link");
                link.id = "layout-css";
                link.rel = "stylesheet";
                link.href = "../assets/css/layout.css";
                document.head.appendChild(link);
                console.log("✅ layout.css chargé !");
            } else {
                console.log("⚠ layout.css est déjà chargé.");
            }

            // Exécuter layout.js après l'insertion du layout
            if (!document.getElementById("layout-js")) {
                let script = document.createElement("script");
                script.id = "layout-js"; 
                script.src = "../assets/js/layout.js";
                script.onload = function() {
                    console.log("✅ layout.js chargé et exécuté !");
                    if (typeof initLayoutScripts === "function") {
                        initLayoutScripts();
                    }
                };
                document.body.appendChild(script);
            } else {
                console.log("⚠ layout.js est déjà chargé, on ne le charge pas à nouveau.");
            }

            // Exécuter panier.js après l'insertion du layout
            if (!document.getElementById("panier-js")) {
                let script = document.createElement("script");
                script.id = "panier-js"; 
                script.src = "../assets/js/panier.js";
                script.onload = function() {
                    console.log("✅ panier.js chargé et exécuté !");
                    if (typeof initPanierScripts === "function") {
                        initPanierScripts();
                    }
                };
                document.body.appendChild(script);
            } else {
                console.log("⚠ panier.js est déjà chargé, on ne le charge pas à nouveau.");
            }
        })
        .catch(error => console.error("❌ Erreur chargement layout.html :", error));
});