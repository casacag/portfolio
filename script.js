document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.querySelectorAll(".flag");
    let currentLang = "it"; // Default language

    function loadTranslations(lang) {
        fetch("translations.json")
            .then(response => response.json())
            .then(data => {
                const translations = data[lang];
                document.querySelector("#about h2").textContent = translations.aboutTitle;
                document.querySelector("#about p").textContent = translations.aboutText;
                document.querySelector("#portfolio h2").textContent = translations.portfolioTitle;
                document.querySelector("#contact h2").textContent = translations.contactTitle;
                document.querySelector("#contact p").textContent = translations.contactText;
                // Update projects
                const projects = translations;
                document.querySelectorAll(".project").forEach((project, index) => {
                    project.querySelector("h3").textContent = projects[`project${index + 1}`].title;
                    const paragraphs = project.querySelectorAll("p");
                    paragraphs[0].textContent = projects[`project${index + 1}`].role;
                    paragraphs[1].textContent = projects[`project${index + 1}`].description;
                    project.querySelector("b").textContent = projects[`project${index + 1}`].technologies;
                });
            });
    }

    // Change language on click
    languageSelector.forEach(flag => {
        flag.addEventListener("click", () => {
            currentLang = flag.id;
            loadTranslations(currentLang);
        });
    });

    // Load default language on page load
    loadTranslations(currentLang);
});

