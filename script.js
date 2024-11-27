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
                        const button = project.querySelector(".project-button");
                        button.textContent = projectData.buttonText; // Testo del pulsante
                        button.onclick = () => window.open(projectData.linkHref, "_blank");
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
document.addEventListener("DOMContentLoaded", () => {
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeChatbotBtn = document.getElementById("close-chatbot");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSend = document.getElementById("chatbot-send");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const languageFlags = document.querySelectorAll(".language-flag");

    // Lingua predefinita
    let currentLanguage = "it";

    // Testi del bot per ciascuna lingua
    const botTexts = {
        it: {
            welcome: "Ciao! Come posso aiutarti?",
            defaultResponse:
                "Per avere informazioni ulteriori inserire NomeProgetto Tematica. I nomi dei progetti sono Biancaneve, Distorti e Raccomandazioni. Le tematiche sono Ruolo, Perchè, Problematiche.",
        },
        en: {
            welcome: "Hi! How can I assist you?",
            defaultResponse:
                "For further information, provide ProjectName Topic. The project names are Biancaneve, Distorti, and Recommendations. The topics are Role, Why, and Issues.",
        },
    };

    // Mappa delle risposte per ciascuna lingua
    const responses = {
        it: {
            Biancaneve: {
                Ruolo: "In Biancaneve ho ricoperto il ruolo di sviluppatore front-end, lavorando principalmente su React.",
                Perchè: "Biancaneve è stato creato per migliorare l'esperienza utente in un portale fiabesco.",
                Problematiche: "Le principali problematiche sono state l'ottimizzazione delle immagini e l'accessibilità per dispositivi mobili.",
            },
            Distorti: {
                Ruolo: "In Distorti il mio ruolo era sviluppatore full-stack, con focus su Node.js e MongoDB.",
                Perchè: "Distorti è stato progettato per analizzare distorsioni cognitive nei dati utente.",
                Problematiche: "Abbiamo affrontato problemi di scalabilità e latenza nei server.",
            },
            Raccomandazioni: {
                Ruolo: "Per Raccomandazioni ho lavorato come data analyst, integrando algoritmi di machine learning.",
                Perchè: "Il progetto è nato per offrire suggerimenti personalizzati agli utenti.",
                Problematiche: "Sfide principali: bilanciare accuratezza e velocità nel motore di raccomandazione.",
            },
        },
        en: {
            Biancaneve: {
                Role: "In Biancaneve, I worked as a front-end developer, primarily using React.",
                Why: "Biancaneve was created to enhance the user experience on a fairy tale portal.",
                Issues: "The main issues were image optimization and accessibility for mobile devices.",
            },
            Distorti: {
                Role: "In Distorti, I was a full-stack developer, focusing on Node.js and MongoDB.",
                Why: "Distorti was designed to analyze cognitive distortions in user data.",
                Issues: "We faced challenges with server scalability and latency.",
            },
            Recommendations: {
                Role: "For Recommendations, I worked as a data analyst, integrating machine learning algorithms.",
                Why: "The project was developed to provide personalized suggestions to users.",
                Issues: "Main challenges: balancing accuracy and speed in the recommendation engine.",
            },
        },
    };

    // Funzione per aggiungere messaggi
    function addMessage(sender, text) {
        const message = document.createElement("div");
        message.classList.add("message", sender);
        message.textContent = text;
        chatbotMessages.appendChild(message);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scorri in basso
    }

    // Funzione per cambiare lingua
    function setLanguage(lang) {
        currentLanguage = lang;
        chatbotMessages.innerHTML = ""; // Pulisci la chat
        addMessage("bot", botTexts[lang].welcome); // Mostra il messaggio di benvenuto
    }

    // Event listener per cambio lingua
    languageFlags.forEach((flag) => {
        flag.addEventListener("click", () => {
            const selectedLang = flag.getAttribute("data-lang");
            setLanguage(selectedLang);
        });
    });

    // Funzione per elaborare il messaggio dell'utente
    function processMessage(userInput) {
        const lowerInput = userInput.toLowerCase();
        const langResponses = responses[currentLanguage];
        let projectFound = null;
        let topicFound = null;

        // Trova progetto e tematica
        Object.keys(langResponses).forEach((project) => {
            if (lowerInput.includes(project.toLowerCase())) {
                projectFound = project;
            }
        });

        const topics = {
            it: ["ruolo", "perchè", "problematiche"],
            en: ["role", "why", "issues"],
        };

        topics[currentLanguage].forEach((topic) => {
            if (lowerInput.includes(topic)) {
                topicFound = topic.charAt(0).toUpperCase() + topic.slice(1); // Capitalizza la prima lettera
            }
        });

        if (projectFound && topicFound) {
            return langResponses[projectFound][topicFound] || botTexts[currentLanguage].defaultResponse;
        } else if (projectFound) {
            return currentLanguage === "it"
                ? `Hai menzionato il progetto ${projectFound}, ma non ho capito la tematica. Prova con Ruolo, Perchè, o Problematiche.`
                : `You mentioned the project ${projectFound}, but I didn't understand the topic. Try Role, Why, or Issues.`;
        } else if (topicFound) {
            return currentLanguage === "it"
                ? `Hai menzionato la tematica ${topicFound}, ma non ho capito il progetto. Prova con Biancaneve, Distorti, o Raccomandazioni.`
                : `You mentioned the topic ${topicFound}, but I didn't understand the project. Try Biancaneve, Distorti, or Recommendations.`;
        } else {
            return botTexts[currentLanguage].defaultResponse;
        }
    }

    // Mostra il chatbot quando si clicca sul pulsante
    chatbotToggle.addEventListener("click", () => {
        chatbotContainer.style.display = "flex";
        chatbotToggle.style.display = "none";
        setTimeout(() => chatbotContainer.classList.add("expanded"), 10);
        addMessage("bot", botTexts[currentLanguage].welcome); // Messaggio di benvenuto
    });

    // Chiudi il chatbot quando si clicca sulla X
    closeChatbotBtn.addEventListener("click", () => {
        chatbotContainer.classList.remove("expanded");
        setTimeout(() => {
            chatbotContainer.style.display = "none";
            chatbotToggle.style.display = "block";
        }, 300);
    });

    // Gestione invio messaggi
    chatbotSend.addEventListener("click", () => {
        const userInput = chatbotInput.value.trim();
        if (userInput) {
            addMessage("user", userInput); // Mostra il messaggio dell'utente
            chatbotInput.value = ""; // Pulisce l'input

            // Risposta elaborata del bot
            const response = processMessage(userInput);
            setTimeout(() => {
                addMessage("bot", response);
            }, 500);
        }
    });

    // Invio con tasto "Enter"
    chatbotInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            chatbotSend.click();
        }
    });
});


