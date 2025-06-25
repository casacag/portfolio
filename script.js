document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.querySelectorAll(".flag");
    let currentLang = "it"; // Default language

    function loadTranslations(lang) {
        console.log('🔄 Loading translations for:', lang);
        fetch("translations.json")
            .then(response => response.json())
            .then(data => {
                console.log('✅ Translations loaded:', data);
                const t = data[lang]; // Clean alias for translations
                console.log('🎯 Current language data:', t);
                
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
                        if (role) {
                            const roleParts = project.role.split(':');
                            role.innerHTML = `<strong>${roleParts[0]}:</strong>${roleParts[1] || ''}`;
                        }
                        
                        updateText(card.querySelector(".project-description"), project.description);
                        updateHTML(card.querySelector(".project-btn"), `${project.viewProject} <i class="fas fa-arrow-right"></i>`);
                    }
                }
                
                // Update Contact Section
                updateText("#contact .section-title", t.contactTitle);
                updateText("#contact .section-subtitle", t.contactText);
                updateText(".contact-form h3", t.sendMessage);
                
                // Update Form placeholders
                const nameInput = document.querySelector('input[type="text"]');
                if (nameInput) nameInput.placeholder = t.yourName;
                
                const emailInput = document.querySelector('input[type="email"]');
                if (emailInput) emailInput.placeholder = t.yourEmail;
                
                const messageInput = document.querySelector('textarea');
                if (messageInput) messageInput.placeholder = t.yourMessage;
                
                updateHTML('.contact-form .btn', `<i class="fas fa-paper-plane"></i> ${t.sendButton}`);
                
                // Update Navigation Menu
                const navLinks = document.querySelectorAll('.nav-menu a');
                if (t.navigation && navLinks.length >= 4) {
                    navLinks[0].textContent = t.navigation.about;
                    navLinks[1].textContent = t.navigation.skills;
                    navLinks[2].textContent = t.navigation.portfolio;
                    navLinks[3].textContent = t.navigation.contact;
                }
                
            })
            .catch(error => console.error('Translation loading error:', error));
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
        },
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

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ANALYTICS & TRACKING =====
// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn, .project-btn, .project-link')) {
        console.log('Button clicked:', e.target.textContent.trim());
        // Here you could add Google Analytics or other tracking
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Global error caught:', e.error);
    // Graceful error handling without breaking the UI
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Focus management for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(focusStyle);

// ===== MOBILE MENU =====
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle classes
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
            
            // Close menu when clicking nav links
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    }, 100);
});

// ===== SCROLL EFFECTS =====
// Dynamic header behavior
let lastScrollTop = 0;
const header = document.querySelector('.modern-header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.skill-card, .project-card, .contact-item, .stat-item').forEach(el => {
    observer.observe(el);
});