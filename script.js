document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.querySelectorAll(".flag");
    let currentLang = "it"; // Default language

    // Embedded translations as fallback for GitHub Pages
    const translationsData = {
        "it": {
            "heroTitle": "Ciao, sono Alessio",
            "heroSubtitle": "Trasformo idee in realtà digitale attraverso codice pulito e design funzionale",
            "exploreProjects": "Esplora i Progetti",
            "contactMe": "Contattami",
            "greeting": "Salve, sono Alessio Cocco!",
            "aboutTitle": "Chi Sono",
            "aboutText": "Sono un laureando in Ingegneria Informatica con una passione per la tecnologia e il design. Oltre a essere un property manager, mi dedico alla creazione di siti web, app e videogiochi che uniscono funzionalità e creatività. Dai un'occhiata ai miei progetti qui sotto e scopri come trasformo idee in realtà digitale!",
            "skillsTitle": "Skills & Tecnologie",
            "skillsSubtitle": "Le tecnologie con cui lavoro per creare esperienze digitali incredibili",
            "portfolioTitle": "I Miei Lavori",
            "portfolioSubtitle": "Una selezione dei miei progetti più significativi",
            "contactTitle": "Contatti",
            "contactText": "Per collaborazioni o domande, contattami qui:",
            "sendMessage": "Invia un messaggio",
            "contactLabels": {
                "email": "Email",
                "github": "GitHub"
            },
            "yourName": "Il tuo nome",
            "yourEmail": "La tua email",
            "yourMessage": "Il tuo messaggio",
            "sendButton": "Invia Messaggio",
            "navigation": {
                "about": "Chi Sono",
                "skills": "Skills",
                "portfolio": "I Miei Lavori",
                "contact": "Contatti"
            },
            "stats": {
                "projects": "Progetti",
                "experience": "Anni di Esperienza",
                "technologies": "Tecnologie"
            },
            "footer": "© 2024 Alessio Cocco. Tutti i diritti riservati.",
            "chatbotPlaceholder": "Scrivi qui...",
            "chatbotTitle": "Chatbot",
            "skills": {
                "javascript": { "title": "JavaScript", "description": "Sviluppo dinamico e interattivo" },
                "htmlcss": { "title": "HTML & CSS", "description": "Struttura e design responsive" },
                "unity": { "title": "Unity", "description": "Sviluppo di videogiochi" },
                "backend": { "title": "Backend", "description": "Server e logica applicativa" },
                "github": { "title": "Git & GitHub", "description": "Controllo versioni e collaborazione" },
                "responsive": { "title": "Responsive Design", "description": "Design per tutti i dispositivi" }
            },
            "project1": {
                "title": "Progetto 1: Web App",
                "role": "Ruolo: Ideazione e sviluppo completo",
                "description": "Un progetto interattivo creato per un laboratorio, sviluppato interamente a mano in soli 5 giorni. Il gioco combina una narrativa coinvolgente con elementi di interazione basati su JavaScript, con supporto di HTML e CSS per il design e la struttura visiva.",
                "technologies": "Tecnologie",
                "viewProject": "Guarda il progetto",
                "altText": "Web App Biancaneve"
            },
            "project2": {
                "title": "Progetto 2: Videogioco 1",
                "role": "Ruolo: Programmazione lato server e gestione funzionalità online",
                "description": "Un gioco multiplayer sviluppato in team, pubblicato su Itch.io. Mi sono occupato del miglioramento della logica di scelta randomica e della gestione del server-client. Abbiamo utilizzato il tool Photon per implementare le funzionalità online, assicurando un'esperienza fluida per i giocatori.",
                "technologies": "Tecnologie",
                "viewProject": "Guarda il progetto",
                "altText": "Videogioco Distorti"
            },
            "project3": {
                "title": "Progetto 3: Sito Web",
                "role": "Ruolo: Sviluppo e progettazione completa",
                "description": "Un sito web creato per fornire ai miei ospiti raccomandazioni su cosa fare durante il soggiorno. Il sito è multilingue e supporta traduzioni dinamiche grazie all'uso di JSON. La struttura e il design sono stati interamente realizzati con HTML, CSS e JavaScript.",
                "technologies": "Tecnologie",
                "viewProject": "Guarda il progetto",
                "altText": "Sito Web Raccomandazioni"
            }
        },
        "en": {
            "heroTitle": "Hi, I'm Alessio",
            "heroSubtitle": "I transform ideas into digital reality through clean code and functional design",
            "exploreProjects": "Explore Projects",
            "contactMe": "Contact Me",
            "greeting": "Hi, I'm Alessio Cocco!",
            "aboutTitle": "About Me",
            "aboutText": "I'm a Computer Engineering student with a passion for technology and design. Besides being a property manager, I dedicate myself to creating websites, apps, and games that combine functionality and creativity. Check out my projects below and discover how I bring ideas to digital life!",
            "skillsTitle": "Skills & Technologies",
            "skillsSubtitle": "The technologies I work with to create incredible digital experiences",
            "portfolioTitle": "My Work",
            "portfolioSubtitle": "A selection of my most significant projects",
            "contactTitle": "Contact",
            "contactText": "For collaborations or questions, contact me here:",
            "sendMessage": "Send a message",
            "contactLabels": {
                "email": "Email",
                "github": "GitHub"
            },
            "yourName": "Your name",
            "yourEmail": "Your email",
            "yourMessage": "Your message",
            "sendButton": "Send Message",
            "navigation": {
                "about": "About Me",
                "skills": "Skills",
                "portfolio": "My Work",
                "contact": "Contact"
            },
            "stats": {
                "projects": "Projects",
                "experience": "Years of Experience",
                "technologies": "Technologies"
            },
            "footer": "© 2024 Alessio Cocco. All rights reserved.",
            "chatbotPlaceholder": "Type here...",
            "chatbotTitle": "Chatbot",
            "skills": {
                "javascript": { "title": "JavaScript", "description": "Dynamic and interactive development" },
                "htmlcss": { "title": "HTML & CSS", "description": "Structure and responsive design" },
                "unity": { "title": "Unity", "description": "Game development" },
                "backend": { "title": "Backend", "description": "Server and application logic" },
                "github": { "title": "Git & GitHub", "description": "Version control and collaboration" },
                "responsive": { "title": "Responsive Design", "description": "Design for all devices" }
            },
            "project1": {
                "title": "Project 1: Web App",
                "role": "Role: Ideation and complete development",
                "description": "An interactive project created for a workshop, developed entirely by hand in just 5 days. The game combines engaging storytelling with interactive elements based on JavaScript, supported by HTML and CSS for visual design and structure.",
                "technologies": "Technologies",
                "viewProject": "View project",
                "altText": "Web App Biancaneve"
            },
            "project2": {
                "title": "Project 2: Video Game 1",
                "role": "Role: Server-side programming and online functionality management",
                "description": "A multiplayer game developed as a team, published on Itch.io. I worked on improving the random choice logic and managing the server-client communication. We used Photon to implement online features, ensuring a smooth player experience.",
                "technologies": "Technologies",
                "viewProject": "View project",
                "altText": "Video Game Distorti"
            },
            "project3": {
                "title": "Project 3: Website",
                "role": "Role: Development and complete design",
                "description": "A website created to provide my guests with recommendations on what to do during their stay. The site is multilingual and supports dynamic translations using JSON. The structure and design were entirely crafted with HTML, CSS, and JavaScript.",
                "technologies": "Technologies",
                "viewProject": "View project",
                "altText": "Website Recommendations"
            }
        }
    };

    function loadTranslations(lang) {
        console.log('🔄 Loading translations for:', lang);
        
        // Try to load from JSON file first, then fallback to embedded data
        fetch("translations.json")
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                console.log('✅ Translations loaded from JSON file:', data);
                applyTranslations(data[lang]);
            })
            .catch(error => {
                console.log('⚠️ JSON file failed, using embedded translations:', error);
                applyTranslations(translationsData[lang]);
            });
    }

    function applyTranslations(t) {
        if (!t) {
            console.error('❌ No translation data available');
            return;
        }
        
        console.log('🎯 Applying translations:', t);
        
        // Helper function to safely update text content
        const updateText = (selector, text) => {
            const element = document.querySelector(selector);
            if (element && text) element.textContent = text;
        };
        
        const updateHTML = (selector, html) => {
            const element = document.querySelector(selector);
            if (element && html) element.innerHTML = html;
        };
        
        // Update Hero Section
        updateText(".hero-title .gradient-text", t.heroTitle);
        updateText(".hero-subtitle", t.heroSubtitle);
        updateHTML('.btn-primary', `<i class="fas fa-rocket"></i> ${t.exploreProjects}`);
        updateHTML('.btn-secondary', `<i class="fas fa-envelope"></i> ${t.contactMe}`);
        
        // Update About Section
        updateText("#about .section-title", t.aboutTitle);
        updateText("#about .about-text .lead", t.greeting);
        const aboutParagraphs = document.querySelectorAll("#about .about-text p");
        if (aboutParagraphs[1]) aboutParagraphs[1].textContent = t.aboutText;
        
        // Update Stats
        const statLabels = document.querySelectorAll(".stat-label");
        if (statLabels.length >= 3 && t.stats) {
            statLabels[0].textContent = t.stats.projects;
            statLabels[1].textContent = t.stats.experience;
            statLabels[2].textContent = t.stats.technologies;
        }
        
        // Update Skills Section
        updateText("#skills .section-title", t.skillsTitle);
        updateText("#skills .section-subtitle", t.skillsSubtitle);
        
        // Update Skills Cards
        const skillCards = document.querySelectorAll(".skill-card");
        const skillKeys = ['javascript', 'htmlcss', 'unity', 'backend', 'github', 'responsive'];
        
        skillCards.forEach((card, index) => {
            const skillKey = skillKeys[index];
            if (t.skills && t.skills[skillKey]) {
                updateText(card.querySelector("h3"), t.skills[skillKey].title);
                updateText(card.querySelector("p"), t.skills[skillKey].description);
            }
        });
        
        // Update Portfolio Section
        updateText("#portfolio .section-title", t.portfolioTitle);
        updateText("#portfolio .section-subtitle", t.portfolioSubtitle);
        
        // Update Projects
        const projectCards = document.querySelectorAll(".project-card");
        for (let i = 0; i < projectCards.length; i++) {
            const projectKey = `project${i + 1}`;
            const project = t[projectKey];
            
            if (project) {
                const card = projectCards[i];
                updateText(card.querySelector("h3"), project.title);
                
                const role = card.querySelector(".project-role");
                if (role && project.role) {
                    role.innerHTML = `<strong>${project.role}</strong>`;
                }
                
                updateText(card.querySelector(".project-description"), project.description);
                updateHTML(card.querySelector(".project-btn"), `${project.viewProject} <i class="fas fa-arrow-right"></i>`);
                
                // Update image alt text
                const projectImg = card.querySelector(".project-image img");
                if (projectImg && project.altText) {
                    projectImg.alt = project.altText;
                }
            }
        }
        
        // Update Contact Section
        updateText("#contact .section-title", t.contactTitle);
        updateText("#contact .section-subtitle", t.contactText);
        updateText(".contact-form h3", t.sendMessage);
        
        // Update Contact Labels
        const contactLabels = document.querySelectorAll(".contact-details h3");
        if (contactLabels.length >= 2 && t.contactLabels) {
            contactLabels[0].textContent = t.contactLabels.email;
            contactLabels[1].textContent = t.contactLabels.github;
        }
        
        // Update Form placeholders
        const nameInput = document.querySelector('input[type="text"]');
        if (nameInput) nameInput.placeholder = t.yourName;
        
        const emailInput = document.querySelector('input[type="email"]');
        if (emailInput) emailInput.placeholder = t.yourEmail;
        
        const messageInput = document.querySelector('textarea');
        if (messageInput) messageInput.placeholder = t.yourMessage;
        
        const formButton = document.querySelector('.contact-form button[type="submit"]');
        if (formButton && t.sendButton) {
            formButton.innerHTML = `<i class="fas fa-paper-plane"></i> ${t.sendButton}`;
        }
        
        // Update Navigation Menu
        const navLinks = document.querySelectorAll('.nav-menu a');
        if (t.navigation && navLinks.length >= 4) {
            navLinks[0].textContent = t.navigation.about;
            navLinks[1].textContent = t.navigation.skills;
            navLinks[2].textContent = t.navigation.portfolio;
            navLinks[3].textContent = t.navigation.contact;
        }
        
        // Update Footer
        const footerText = document.querySelector(".footer-text p");
        if (footerText && t.footer) {
            footerText.textContent = t.footer;
        }
        
        // Update Chatbot placeholder and header
        const chatbotInput = document.querySelector("#chatbot-input");
        if (chatbotInput && t.chatbotPlaceholder) {
            chatbotInput.placeholder = t.chatbotPlaceholder;
        }
        
        const chatbotHeader = document.querySelector("#chatbot-header span");
        if (chatbotHeader && t.chatbotTitle) {
            chatbotHeader.textContent = t.chatbotTitle;
        }
    }

    // Change language on click
    languageSelector.forEach(flag => {
        flag.addEventListener("click", () => {
            currentLang = flag.id;
            loadTranslations(currentLang);
            // Update flag states
            languageSelector.forEach(f => f.classList.remove('active'));
            flag.classList.add('active');
            
            // Sync with chatbot language
            if (window.setChatbotLanguage) {
                window.setChatbotLanguage(currentLang);
            }
        });
    });

    // Load default language on page load
    loadTranslations(currentLang);
});

// ===== CHATBOT FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", () => {
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeChatbotBtn = document.getElementById("close-chatbot");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSend = document.getElementById("chatbot-send");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const languageFlags = document.querySelectorAll(".language-flag");

    // Default language
    let currentLanguage = "it";

    // Bot texts for each language
    const botTexts = {
        it: {
            welcome: "👋 Ciao! Come posso aiutarti?",
            defaultResponse: "Per avere informazioni ulteriori inserire NomeProgetto Tematica. I nomi dei progetti sono Biancaneve, Distorti e Raccomandazioni. Le tematiche sono Ruolo, Perchè, Problematiche.",
            thinking: "🤔 Sto pensando...",
            error: "😅 Mi dispiace, non ho capito. Puoi riprovare?"
        },
        en: {
            welcome: "👋 Hi! How can I assist you?",
            defaultResponse: "For further information, provide ProjectName Topic. The project names are Biancaneve, Distorti, and Recommendations. The topics are Role, Why, and Issues.",
            thinking: "🤔 I'm thinking...",
            error: "😅 Sorry, I didn't understand. Can you try again?"
        }
    };

    // Enhanced responses map
    const responses = {
        it: {
            Biancaneve: {
                Ruolo: "🎮 In Biancaneve ho ricoperto il ruolo di sviluppatore front-end, lavorando principalmente su JavaScript, HTML e CSS per creare un'esperienza di gioco coinvolgente.",
                Perchè: "✨ Biancaneve è stato creato per migliorare l'esperienza utente in un portale fiabesco e dimostrare le mie capacità di sviluppo web interattivo.",
                Problematiche: "⚡ Le principali problematiche sono state l'ottimizzazione delle performance, la gestione dello stato del gioco e l'accessibilità cross-browser."
            },
            Distorti: {
                Ruolo: "🎯 In Distorti il mio ruolo era sviluppatore specializzato in networking multiplayer, con focus su Unity e Photon per le funzionalità online.",
                Perchè: "🚀 Distorti è stato progettato per esplorare le dinamiche multiplayer e creare un'esperienza di gioco collaborativa innovativa.",
                Problematiche: "🔧 Abbiamo affrontato sfide di sincronizzazione di rete, gestione della latenza e bilanciamento del gameplay multiplayer."
            },
            Raccomandazioni: {
                Ruolo: "🌐 Per Raccomandazioni ho lavorato come full-stack developer, implementando funzionalità multilingue e design responsive.",
                Perchè: "💡 Il progetto è nato per offrire un servizio personalizzato ai miei ospiti, dimostrando le mie competenze in sviluppo web pratico.",
                Problematiche: "🎨 Sfide principali: implementazione fluida del sistema di traduzioni dinamiche e ottimizzazione UX mobile."
            }
        },
        en: {
            Biancaneve: {
                Role: "🎮 In Biancaneve, I worked as a front-end developer, primarily using JavaScript, HTML, and CSS to create an engaging gaming experience.",
                Why: "✨ Biancaneve was created to enhance user experience in a fairy tale portal and showcase my interactive web development skills.",
                Issues: "⚡ Main challenges were performance optimization, game state management, and cross-browser accessibility."
            },
            Distorti: {
                Role: "🎯 In Distorti, I was a developer specialized in multiplayer networking, focusing on Unity and Photon for online features.",
                Why: "🚀 Distorti was designed to explore multiplayer dynamics and create an innovative collaborative gaming experience.",
                Issues: "🔧 We faced challenges with network synchronization, latency management, and multiplayer gameplay balancing."
            },
            Recommendations: {
                Role: "🌐 For Recommendations, I worked as a full-stack developer, implementing multilingual features and responsive design.",
                Why: "💡 The project was developed to provide personalized service to my guests, showcasing practical web development skills.",
                Issues: "🎨 Main challenges: smooth implementation of dynamic translation system and mobile UX optimization."
            }
        }
    };

    // Enhanced message adding with typing effect
    function addMessage(sender, text, isTyping = false) {
        const message = document.createElement("div");
        message.classList.add("message", sender);
        
        if (isTyping) {
            message.innerHTML = '<span class="typing-dots">...</span>';
            chatbotMessages.appendChild(message);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            
            setTimeout(() => {
                message.innerHTML = text;
            }, 1000);
        } else {
            message.innerHTML = text;
            chatbotMessages.appendChild(message);
        }
        
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Enhanced language changing
    function setLanguage(lang) {
        currentLanguage = lang;
        chatbotMessages.innerHTML = "";
        addMessage("bot", botTexts[lang].welcome);
        
        // Update language flags visual state
        languageFlags.forEach(flag => {
            flag.style.opacity = flag.getAttribute("data-lang") === lang ? "1" : "0.6";
            flag.style.transform = flag.getAttribute("data-lang") === lang ? "scale(1.1)" : "scale(1)";
        });
    }
    
    // Expose chatbot language function globally
    window.setChatbotLanguage = setLanguage;

    // Event listener for language change
    languageFlags.forEach((flag) => {
        flag.addEventListener("click", () => {
            const selectedLang = flag.getAttribute("data-lang");
            setLanguage(selectedLang);
            
            // Sync with main page language
            const mainFlags = document.querySelectorAll(".flag");
            mainFlags.forEach(f => {
                if (f.id === selectedLang) {
                    f.click();
                }
            });
        });
    });

    // Enhanced message processing with better pattern matching
    function processMessage(userInput) {
        const lowerInput = userInput.toLowerCase();
        const langResponses = responses[currentLanguage];
        let projectFound = null;
        let topicFound = null;

        // Find project with better matching
        Object.keys(langResponses).forEach((project) => {
            const projectLower = project.toLowerCase();
            if (lowerInput.includes(projectLower) || 
                lowerInput.includes(projectLower.substring(0, 5))) {
                projectFound = project;
            }
        });

        // Enhanced topic matching
        const topics = {
            it: ["ruolo", "perchè", "problematiche", "problemi", "difficoltà"],
            en: ["role", "why", "issues", "problems", "challenges"]
        };

        const mainTopics = {
            it: ["ruolo", "perchè", "problematiche"],
            en: ["role", "why", "issues"]
        };

        topics[currentLanguage].forEach((topic, index) => {
            if (lowerInput.includes(topic)) {
                const mainIndex = Math.min(index, mainTopics[currentLanguage].length - 1);
                topicFound = mainTopics[currentLanguage][mainIndex];
                topicFound = topicFound.charAt(0).toUpperCase() + topicFound.slice(1);
            }
        });

        // Enhanced responses
        if (projectFound && topicFound) {
            return langResponses[projectFound][topicFound] || botTexts[currentLanguage].defaultResponse;
        } else if (projectFound) {
            return currentLanguage === "it"
                ? `🎯 Hai menzionato il progetto ${projectFound}! Puoi chiedermi del Ruolo, Perchè l'ho fatto, o delle Problematiche che ho affrontato.`
                : `🎯 You mentioned the project ${projectFound}! You can ask me about the Role, Why I did it, or the Issues I faced.`;
        } else if (topicFound) {
            return currentLanguage === "it"
                ? `💭 Hai chiesto del tema ${topicFound}! Specifica quale progetto ti interessa: Biancaneve, Distorti, o Raccomandazioni.`
                : `💭 You asked about ${topicFound}! Please specify which project interests you: Biancaneve, Distorti, or Recommendations.`;
        } else {
            return botTexts[currentLanguage].defaultResponse;
        }
    }

    // Enhanced chatbot toggle with animation
    chatbotToggle.addEventListener("click", () => {
        chatbotContainer.style.display = "flex";
        chatbotToggle.style.display = "none";
        
        setTimeout(() => {
            chatbotContainer.classList.add("expanded");
        }, 10);
        
        if (chatbotMessages.children.length === 0) {
            addMessage("bot", botTexts[currentLanguage].welcome);
        }
    });

    // Enhanced close with animation
    closeChatbotBtn.addEventListener("click", () => {
        chatbotContainer.classList.remove("expanded");
        setTimeout(() => {
            chatbotContainer.style.display = "none";
            chatbotToggle.style.display = "block";
        }, 300);
    });

    // Enhanced message sending with typing indicator
    function sendMessage() {
        const userInput = chatbotInput.value.trim();
        if (userInput) {
            addMessage("user", userInput);
            chatbotInput.value = "";
            
            // Show typing indicator
            addMessage("bot", botTexts[currentLanguage].thinking, true);
            
            // Process and respond
            setTimeout(() => {
                // Remove typing indicator
                const lastMessage = chatbotMessages.lastElementChild;
                if (lastMessage && lastMessage.innerHTML.includes('...')) {
                    lastMessage.remove();
                }
                
                const response = processMessage(userInput);
                addMessage("bot", response);
            }, 1500);
        }
    }

    chatbotSend.addEventListener("click", sendMessage);

    // Enhanced enter key handling
    chatbotInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    // Auto-focus input when chatbot opens
    chatbotToggle.addEventListener("click", () => {
        setTimeout(() => {
            chatbotInput.focus();
        }, 300);
    });

    // Initialize with default language
    setLanguage(currentLanguage);
});

// ===== SCROLL ANIMATIONS =====
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in-up");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll("section, .skill-card, .project-card").forEach(el => {
        observer.observe(el);
    });
});

// ===== HEADER SCROLL BEHAVIOR =====
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".modern-header");
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.background = "rgba(255, 255, 255, 0.98)";
            header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.background = "rgba(255, 255, 255, 0.95)";
            header.style.boxShadow = "none";
        }

        if (scrollY > lastScrollY && scrollY > 300) {
            header.style.transform = "translateY(-100%)";
        } else {
            header.style.transform = "translateY(0)";
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener("scroll", requestTick);
});

// ===== MOBILE MENU FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const body = document.body;

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        body.classList.toggle("menu-open");
    });

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            body.classList.remove("menu-open");
        });
    });
});

// ===== SMOOTH SCROLLING =====
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});

// ===== FORM HANDLING =====
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get("name") || document.querySelector('input[type="text"]').value;
            const email = formData.get("email") || document.querySelector('input[type="email"]').value;
            const message = formData.get("message") || document.querySelector('textarea').value;

            // Create mailto link
            const subject = `Portfolio Contact from ${name}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
            const mailtoLink = `mailto:alessio.cocco@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            const button = contactForm.querySelector(".btn");
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Messaggio Inviato!';
            button.style.background = '#10b981';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }
});