document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.querySelectorAll(".flag");
    let currentLang = "it"; // Default language

    function loadTranslations(lang) {
        fetch("./translations.json")
            .then(response => response.json())
            .then(data => {
                const translations = data[lang];
                if (!translations) {
                    console.error(`Traduzioni non trovate per la lingua: ${lang}`);
                    return;
                }

                console.log("Traduzioni per la lingua:", translations);

                // Aggiorna il titolo dell'intestazione
                document.querySelector("header h1").textContent = translations.headerTitle;

                // Aggiorna i link di navigazione
                const navLinks = document.querySelectorAll("nav ul li a");
                navLinks[0].textContent = translations.navLinks.about;
                navLinks[1].textContent = translations.navLinks.portfolio;
                navLinks[2].textContent = translations.navLinks.contact;

                // Aggiorna la sezione "Chi Sono"
                document.querySelector("#about h2").textContent = translations.aboutTitle;
                document.querySelector("#about p").textContent = translations.aboutText;

                // Aggiorna la sezione "Portfolio"
                document.querySelector("#portfolio h2").textContent = translations.portfolioTitle;

                // Aggiorna i progetti
                document.querySelectorAll(".project").forEach((project, index) => {
                    const projectData = translations[`project${index}`];
                    if (projectData) {
                        project.querySelector("h3").textContent = projectData.title;

                        // Aggiorna i dettagli dei progetti
                        const paragraphs = project.querySelectorAll("p");
                        paragraphs[0].innerHTML = `<b>${projectData.role}</b>`;
                        paragraphs[1].innerHTML = `<b>${projectData.description}</b>`;
                        paragraphs[2].innerHTML = `<b>${projectData.technologies}</b>`;
                    }
                });

                // Aggiorna la sezione "Contatti"
                document.querySelector("#contact h2").textContent = translations.contactTitle;
                document.querySelector("#contact p").textContent = translations.contactText;
            })
            .catch(error => console.error("Errore durante il caricamento delle traduzioni:", error));
    }

    // Cambia lingua al click sulla bandiera
    languageSelector.forEach(flag => {
        flag.addEventListener("click", () => {
            currentLang = flag.id; // L'id della bandiera deve corrispondere alla lingua
            loadTranslations(currentLang);
        });
    });

    // Carica la lingua di default all'avvio della pagina
    loadTranslations(currentLang);
});


