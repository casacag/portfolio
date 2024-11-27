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
                "Per avere informazioni ulteriori inserire NomeProgetto Tematica. I nomi dei progetti sono Biancaneve, Distordi e Raccomandazioni. Le tematiche sono Ruolo, Perchè, Problematiche.",
        },
        en: {
            welcome: "Hi! How can I assist you?",
            defaultResponse:
                "For further information, provide ProjectName Topic. The project names are Biancaneve, Distordi, and Recommendations. The topics are Role, Why, and Issues.",
        },
    };

    // Mappa delle risposte per ciascuna lingua
    const responses = {
        it: {
            Biancaneve: {
                Ruolo: " Il mio ruolo è stato quello di creare l'idea di gioco e tutta la parte di programmazione, si può dire che è come se fosse un progetto personale.",
                Perchè: "Biancaneve nasce da un laboratorio, io sono entrato in corso in un gruppo che aveva già scelto il linguaggio, ma non aveva ancora dato forma al progetto.",
                Problematiche: "Le principali problematiche sono state il movimento di biancaneve e la gestione del tasto di restart.",
            },
            Distordi: {
                Ruolo: "In Distordi il mio ruolo è stato quello di progettare la rete server e client, e migliorare la scelta randomica degli elementi in una lista.",
                Perchè: "Distordi è stato realizzato per la Global Game Jam, eravamo 3 programmatori e un modellatore.",
                Problematiche: "Da lato mio la parte più problematica è stata attribuire quali elementi adassero nel server e quali restassero in locale.",
            },
            Raccomandazioni: {
                Ruolo: " Per Raccomandazioni ho fatto tutto dalla scelta delle immagini allo sviluppo del sito, partendo da zero.",
                Perchè: "Il progetto è nato per offrire suggerimenti ai miei ospiti di affitti brevi.",
                Problematiche: "La sfide principale è stata fare un sito web multilingua è stato il mio primo progetto che prevedesse questo tipo di funzione.",
            },
        },
        en: {
            Biancaneve: {
                Role: "My role was to develop the game concept and handle all the programming aspects. You could say it's like a personal project.",
                Why: "This project originated from a workshop. I joined midway, in a group that had already chosen the programming language but had not yet shaped the project.",
                Issues: "The main issues were Biancaneve's movement and the handling of the restart button.",
            },
            Distordi: {
                Role: "In Distordi, my role was to design the server-client network and improve the random selection of items from a list.",
                Why: "Distordi was created for the Global Game Jam. We were 3 programmers and 1 modeler.",
                Issues: "On my side, the most challenging part was determining which elements should be on the server and which should remain local.",
            },
            Recommendations: {
                Role: "For Recommendations, I did everything from choosing the images to developing the website, starting from scratch.",
                Why: "The project was created to offer recommendations to my short-term rental guests.",
                Issues: "The main challenge was creating a multilingual website; it was my first project that required this type of functionality.",
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


