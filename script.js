// ===== SIMPLE TRANSLATION SYSTEM =====
document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.querySelectorAll(".flag");
    let currentLang = "it";

    // ONE simple function that loads from JSON and applies translations
    async function loadAndApplyTranslations(lang) {
        console.log('🌍 Loading translations for:', lang);
        
        try {
            const response = await fetch('translations.json');
            const translations = await response.json();
            const t = translations[lang];
            
            if (!t) {
                console.error('❌ Language not found:', lang);
                return;
            }

            console.log('✅ Translations loaded from JSON:', t);
            
            // Helper function
            const updateElement = (selector, value, isHTML = false) => {
                const element = document.querySelector(selector);
                if (element && value !== undefined) {
                    if (isHTML) {
                        element.innerHTML = value;
                    } else {
                        element.textContent = value;
                    }
                    console.log(`✅ Updated ${selector}: ${value}`);
                } else {
                    console.warn(`⚠️ Element not found or value missing: ${selector}`);
                }
            };

            // Apply all translations using the JSON structure
            updateElement('.hero-title .gradient-text', t.heroTitle);
            updateElement('.hero-subtitle', t.heroSubtitle);
            updateElement('.btn-primary', `<i class="fas fa-rocket"></i> ${t.exploreProjects}`, true);
            updateElement('.btn-secondary', `<i class="fas fa-envelope"></i> ${t.contactMe}`, true);
            
            // Navigation - using the JSON structure
            updateElement('a[href="#about"]', t.navigation.about);
            updateElement('a[href="#skills"]', t.navigation.skills);
            updateElement('a[href="#portfolio"]', t.navigation.portfolio);
            updateElement('a[href="#contact"]', t.navigation.contact);
            
            // About section
            updateElement('#about .section-title', t.aboutTitle);
            updateElement('#about .about-text .lead', t.greeting);
            updateElement('#about .about-text p:nth-of-type(2)', t.aboutText);
            updateElement('#about .about-text p:nth-child(2)', t.aboutstr);
            // Stats - using JSON structure
            const statLabels = document.querySelectorAll('.stat-label');
            if (statLabels[0] && t.stats) statLabels[0].textContent = t.stats.projects;
            if (statLabels[1] && t.stats) statLabels[1].textContent = t.stats.experience;
            if (statLabels[2] && t.stats) statLabels[2].textContent = t.stats.technologies;
            
            // Skills - using JSON structure
            updateElement('#skills .section-title', t.skillsTitle);
            updateElement('#skills .section-subtitle', t.skillsSubtitle);
            
            const skillCards = document.querySelectorAll('.skill-card');
            const skillKeys = ['javascript', 'htmlcss', 'unity', 'backend', 'github', 'responsive'];
            
            skillCards.forEach((card, i) => {
                const skillData = t.skills[skillKeys[i]];
                if (skillData) {
                    const titleEl = card.querySelector('h3');
                    const descEl = card.querySelector('p');
                    if (titleEl) titleEl.textContent = skillData.title;
                    if (descEl) descEl.textContent = skillData.description;
                }
            });
            
            // Portfolio - using JSON structure
            updateElement('#portfolio .section-title', t.portfolioTitle);
            updateElement('#portfolio .section-subtitle', t.portfolioSubtitle);
            
            // Projects - FIXED: using correct selectors for project cards
            const projectCards = document.querySelectorAll('.project-card');
            ['project1', 'project2', 'project3'].forEach((projectKey, i) => {
                const project = t[projectKey];
                const card = projectCards[i];
                
                if (project && card) {
                    // Updated selectors to match actual HTML structure
                    const titleEl = card.querySelector('.project-content h3');
                    const roleEl = card.querySelector('.project-role');
                    const descEl = card.querySelector('.project-description');
                    const btnEl = card.querySelector('.project-btn');
                    
                    if (titleEl) titleEl.textContent = project.title;
                    if (roleEl) roleEl.innerHTML = `<strong>${project.roleLabel}</strong> ${project.role}`;
                    if (descEl) descEl.textContent = project.description;
                    if (btnEl) btnEl.innerHTML = `${project.viewProject} <i class="fas fa-arrow-right"></i>`;
                }
            });
            
            // Contact - FIXED: using correct selectors
            updateElement('#contact .section-title', t.contactTitle);
            updateElement('#contact .section-subtitle', t.contactText);
            updateElement('.contact-form h3', t.sendMessage);
            
            // Form - FIXED: using more specific selectors
            const nameInput = document.querySelector('.contact-form input[type="text"]');
            if (nameInput) nameInput.placeholder = t.yourName;
            
            const emailInput = document.querySelector('.contact-form input[type="email"]');
            if (emailInput) emailInput.placeholder = t.yourEmail;
            
            const messageInput = document.querySelector('.contact-form textarea');
            if (messageInput) messageInput.placeholder = t.yourMessage;
            
            const formButton = document.querySelector('.contact-form button[type="submit"]');
            if (formButton) formButton.innerHTML = `<i class="fas fa-paper-plane"></i> ${t.sendButton}`;
            
            // Footer translation
            const footerText = document.querySelector('.footer-text p');
            if (footerText && t.footer) footerText.textContent = t.footer;
            
            console.log('✅ All translations applied successfully');
            
        } catch (error) {
            console.error('❌ Error loading translations:', error);
        }
    }

    // Language switcher
    languageSelector.forEach(flag => {
        flag.addEventListener("click", () => {
            currentLang = flag.id;
            loadAndApplyTranslations(currentLang);
            
            // Update flag states
            languageSelector.forEach(f => f.classList.remove('active'));
            flag.classList.add('active');
            
            console.log('🔄 Language changed to:', currentLang);
        });
    });

    // Load default language
    loadAndApplyTranslations(currentLang);
    
    // Set initial flag state
    document.getElementById(currentLang)?.classList.add('active');
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

