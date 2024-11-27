document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.querySelectorAll(".flag");
    let currentLang = "it"; // Lingua di default

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
                const projectKeys = ["project1", "project2", "project3"]; // Specifica le chiavi dei progetti nel JSON
                document.querySelectorAll(".project").forEach((project, index) => {
                    const projectData = translations[projectKeys[index]]; // Accedi alle chiavi direttamente
                    if (projectData) {
                        project.querySelector("h3").textContent = projectData.title;

                        // Aggiorna i dettagli del progetto
                        const paragraphs = project.querySelectorAll("p");
                        paragraphs[0].innerHTML = `${projectData.role}`;
                        paragraphs[1].innerHTML = `${projectData.description}`;
                        paragraphs[2].innerHTML = `${projectData.technologies}`;
                        //Traduci link
                        const link = project.querySelector("a");
                        link.textContent = projectData.linkText;
                        link.href = projectData.linkHref;
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


