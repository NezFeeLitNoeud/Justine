/* ============================================
   CONFIGURATION - MODIFIER ICI
   ============================================ */

const CONFIG = {
    // Avatars
    chatAvatar: "images/chat.jpg",
    pugAvatar: "images/pug.jpg",

    // Nom du chat (pour le dialogue)
    chatName: "Le Chat",

    // Nom de la personne qui reçoit le message
    recipientName: "toi",

    // Nom de la fille qui a missionné le chat
    senderName: "elle",

    // ============================================
    // SCÉNARIO COMPLET
    // ============================================

    // INTRO (Le chat établit le contact)
    // Utilise des tableaux pour grouper plusieurs lignes dans une même bulle
    intro: [
        { type: "message", from: "chat", text: [
            "Salut. Oui c'est le Kiks et non ce n'est pas une blague."
        ]},
        { type: "pause", duration: 600 },
        { type: "message", from: "chat", text: [
            "On m'a... missionné. Apparemment, quelqu'un voulait te montrer des trucs. Des photos. Des souvenirs. Ce genre de choses. "
        ]},
        { type: "choice", options: [
            "C'est qui ce 'quelqu'un' ?",
            "T'es vraiment entrain de me parler ?"
        ]},
        { type: "message", from: "chat", text: "Tu poses beaucoup de questions. Mais bon, c'est la Saint-valentin parait-il. " },
        { type: "message", from: "chat", text: [
            "Alors voilà. On va commencer."
        ]},
    ],

    // Phrases d'intro variées avant chaque photo (utilisées aléatoirement)
    photoIntros: [
        "Tiens, regarde ça.",
        "Celle-là, elle y tenait.",
        "Ah, et il y a ça aussi.",
        "Attends, regarde.",
        "Elle m'a dit de te montrer ça.",
        "Encore une.",
        "Et celle-ci.",
        "Regarde."
    ],

    // PHOTOS ET SOUVENIRS (première partie)
    // photos: peut être une string (1 photo) ou un tableau (plusieurs photos à swiper)
    memoriesPart1: [
        {
            photos: ["images/photo1.jpg", "images/photo1b.jpg", "images/photo1c.jpg"], // Plusieurs photos à swiper
            caption: "Parfois, je repense à nos premières soirées ensemble. Des moments simples, qui s'étiraient jusqu'à pas d'heure, comme suspendus dans le temps. Ils laissent toujours en moi une douceur tranquille.",
            chatComment: "Elle a insisté pour commencer par celle-là. Va savoir pourquoi."
        },
        {
            photos: ["images/photo2.jpg", "images/photo2b.jpg", "images/photo2c.jpg", "images/photo2d.jpg"], // Une seule photo
            caption: "Les deux chattes de sa vie.",
            chatComment: "Celles-ci, c'est moi qui les ai choisies. Parce que en vrai, je t'aime bien."
        },
        {
            photos: ["images/photo3.jpg", "images/photo3b.jpg", "images/photo3c.jpg", "images/photo3d.jpg"],
            caption: "Parce qu'on va si bien ensemble. ",
            chatComment: "Je constate. Je ne commente pas."
        }
    ],

    // Les infos "chaudes" de la pub (détails sur la personne)
    pugHotInfo: "Elle a une collection de thé très impressionnante 😏",

    // Message d'excuse du chat après la pub (dans le chat, pas une page séparée)
    sorryMessages: [
        "...Désolé pour ça.",
        "On reprend."
    ],

    // PHOTOS ET SOUVENIRS (deuxième partie - après la pub)
    memoriesPart2: [
        {
            photos: ["images/photo4.jpg", "images/photo4b.jpg", "images/photo4c.jpg", "images/photo4d.jpg"],
            caption: "Je sais ô combien tu n'aimes pas les photos de toi. Mais moi je te trouve absolument magnifique",
            chatComment: "Elle a sacrément raison. T'es super fraiche dis donc!"
        },
        {
            photos: ["images/photo5.jpg", "images/photo5b.jpg", "images/photo5c.jpg"],
            caption: "Ces petits moments simples. Pas d'éplechure de légume, mais en vrai c'est tout comme.",
            chatComment: "Je ne sais pas ce que ça veut dire. Et je crois que je ne veux pas savoir."
        },
        {
            photos: [
                "images/photo6.jpg",
                "images/photo6b.jpg",
                "images/photo6c.jpg",
                "images/photo6d.jpg",
                "images/photo6e.jpg",
                "images/photo6f.jpg",
                "images/photo6g.jpg"
            ],
            caption: "Et puis il y a ça aussi. Toutes ces sorties, ces moments uniques qui rechauffent le coeur",
            chatComment: "Ok, j'avoue que ta mamie est très mignonne (pas autant que moi mais bon....)."
        }
    ],

    // TRANSITION VERS LE MESSAGE FINAL
    transition: [
        { type: "message", from: "chat", text: "Bon." },
        { type: "message", from: "chat", text: [
            "Il y a autre chose.",
            "Elle voulait te dire quelque chose.",
            "Un truc plus... personnel."
        ]},
        { type: "pause", duration: 500 },
        { type: "message", from: "chat", text: [
            "Moi je ne suis que le messager, hein.",
            "Scroll vers le bas pour lire."
        ]},
    ],

    // MESSAGE FINAL (scroll vertical)
    finalMessage: [
        "Hey.",
        "Je sais pas trop comment dire ça.",
        "On est quoi, nous deux ? Je sais pas vraiment.",
        "Et honnêtement, j'ai pas besoin de mettre un mot dessus.",
        "Ce que je sais, c'est que...",
        "Quand je suis avec toi, c'est différent.",
        "Pas dans le sens cliché du terme.",
        "Juste... bien. Naturel.",
        "Ces photos, ces moments...",
        "C'est pas grand-chose pour certains.",
        "Mais pour moi, ça compte.",
        "Tu comptes.",
        "Voilà, c'est dit.",
        "Joyeuse Saint-Valentin. 💝"
    ],

    // Signature du message final
    finalSignature: "— De la part de quelqu'un qui t'apprécie (beaucoup)"
};


/* ============================================
   APPLICATION
   ============================================ */

class NarrativeApp {
    constructor() {
        this.dialogueContainer = document.getElementById('dialogue-container');
        this.photoContainer = document.getElementById('photo-container');
        this.carousel = document.getElementById('carousel');
        this.carouselDots = document.getElementById('carousel-dots');
        this.photoCaption = document.getElementById('photo-caption');
        this.swipeHint = document.getElementById('swipe-hint');

        // Cinema UI elements (progress + loader)
        this.photoProgress = document.createElement('div');
        this.photoProgress.className = 'photo-progress';
        this.photoContainer.appendChild(this.photoProgress);

        this.photoLoader = document.createElement('div');
        this.photoLoader.className = 'photo-loader';
        this.photoLoader.innerHTML = `
            <div class="loader-ring"></div>
            <div class="loader-text">Chargement…</div>
        `;
        this.photoContainer.appendChild(this.photoLoader);
        this.choicesContainer = document.getElementById('choices-container');
        this.tapIndicator = document.getElementById('tap-indicator');
        this.adOverlay = document.getElementById('ad-overlay');
        this.finalMessage = document.getElementById('final-message');

        this.currentStep = 0;
        this.currentPhase = 'intro';
        this.memoryIndex = 0;
        this.isWaiting = false;
        this.canTap = false;
        this.usedPhotoIntros = [];

        // Carousel state
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        // Event listeners
        document.addEventListener('click', (e) => this.handleTap(e));

        // Swipe events pour le carousel
        this.carousel.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.carousel.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

        // Commencer le récit
        this.startNarrative();
    }

    async startNarrative() {
        await this.delay(500);
        await this.playSequence(CONFIG.intro);
        this.currentPhase = 'memories1';
        await this.playMemories(CONFIG.memoriesPart1);
        this.showAd();
    }

    async playSequence(sequence) {
        for (const item of sequence) {
            await this.playItem(item);
        }
    }

    async playItem(item) {
        switch (item.type) {
            case 'message':
                await this.showMessage(item.from, item.text);
                await this.waitForTap();
                break;
            case 'pause':
                await this.delay(item.duration);
                break;
            case 'choice':
                await this.showChoices(item.options);
                break;
        }
    }

    async showMessage(from, text) {
        // Afficher indicateur de frappe
        const typingEl = this.createTypingIndicator(from);
        this.dialogueContainer.appendChild(typingEl);
        this.scrollToBottom();

        await this.delay(600 + Math.random() * 300);

        // Remplacer par le message
        typingEl.remove();
        const messageEl = this.createMessageElement(from, text);
        this.dialogueContainer.appendChild(messageEl);
        this.scrollToBottom();
    }

    createAvatarElement(avatarPath, fallbackEmoji) {
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';

        const img = document.createElement('img');
        img.src = avatarPath;
        img.alt = 'Avatar';

        img.onerror = () => {
            avatar.innerHTML = `<span class="avatar-emoji">${fallbackEmoji}</span>`;
        };

        avatar.appendChild(img);
        return avatar;
    }

    createTypingIndicator(from) {
        const wrapper = document.createElement('div');
        wrapper.className = `message from-${from}`;

        const avatar = this.createAvatarElement(CONFIG.chatAvatar, '😺');
        wrapper.appendChild(avatar);

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble typing-indicator';
        bubble.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        wrapper.appendChild(bubble);

        return wrapper;
    }

    createMessageElement(from, text) {
        const wrapper = document.createElement('div');
        wrapper.className = `message from-${from}`;

        // Gérer les textes multiples (tableau) ou simple (string)
        let bubbleContent;
        if (Array.isArray(text)) {
            bubbleContent = text.map(line => `<p>${line}</p>`).join('');
        } else {
            bubbleContent = `<p>${text}</p>`;
        }

        if (from === 'chat') {
            const avatar = this.createAvatarElement(CONFIG.chatAvatar, '😺');
            wrapper.appendChild(avatar);

            const bubble = document.createElement('div');
            bubble.className = 'message-bubble';
            bubble.innerHTML = bubbleContent;
            wrapper.appendChild(bubble);
        } else {
            wrapper.innerHTML = `
                <div class="message-bubble">${bubbleContent}</div>
            `;
        }

        return wrapper;
    }

    async showChoices(options) {
        this.choicesContainer.innerHTML = '';
        this.choicesContainer.classList.remove('hidden');
        this.tapIndicator.classList.remove('visible');

        options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = option;
            btn.style.animationDelay = `${index * 0.1}s`;
            btn.addEventListener('click', () => this.selectChoice(option));
            this.choicesContainer.appendChild(btn);
        });

        return new Promise(resolve => {
            this.choiceResolver = resolve;
        });
    }

    selectChoice(option) {
        // Afficher le choix de l'utilisateur
        const userMessage = this.createMessageElement('user', option);
        this.dialogueContainer.appendChild(userMessage);
        this.scrollToBottom();

        this.choicesContainer.classList.add('hidden');
        this.choicesContainer.innerHTML = '';

        if (this.choiceResolver) {
            this.choiceResolver();
            this.choiceResolver = null;
        }
    }

    getRandomPhotoIntro() {
        // Récupérer les intros disponibles (non encore utilisées)
        const available = CONFIG.photoIntros.filter(intro => !this.usedPhotoIntros.includes(intro));

        // Si toutes ont été utilisées, reset
        if (available.length === 0) {
            this.usedPhotoIntros = [];
            return CONFIG.photoIntros[Math.floor(Math.random() * CONFIG.photoIntros.length)];
        }

        // Choisir une intro aléatoire parmi les disponibles
        const chosen = available[Math.floor(Math.random() * available.length)];
        this.usedPhotoIntros.push(chosen);
        return chosen;
    }

    async playMemories(memories) {
        for (const memory of memories) {
            await this.showMemory(memory);
        }
    }

    async showMemory(memory) {
        // Message d'intro varié
        const introText = this.getRandomPhotoIntro();
        await this.showMessage('chat', introText);
        await this.waitForTap();

        // Normaliser photos en tableau
        const photos = Array.isArray(memory.photos) ? memory.photos : [memory.photos];
        this.totalSlides = photos.length;
        this.currentSlide = 0;

        // Générer le carousel
        this.carousel.innerHTML = '';
        this.carouselDots.innerHTML = '';
        this.photoProgress.textContent = `1 / ${this.totalSlides}`;
        this.photoLoader.classList.add('visible');

        photos.forEach((photoSrc, index) => {
            // Créer la slide
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            if (index === 0) {
                slide.classList.add('is-active');
            }

            const img = document.createElement('img');
            img.className = 'carousel-img';
            img.src = photoSrc;
            img.alt = `Photo ${index + 1}`;
            img.onload = () => {
                slide.classList.add('is-loaded');
                if (index === 0) {
                    this.photoLoader.classList.remove('visible');
                }
            };
            img.onerror = () => {
                img.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect fill="%23f0f0f0" width="400" height="400"/><text x="200" y="200" text-anchor="middle" fill="%23999" font-family="sans-serif" font-size="16">Photo ${index + 1}</text></svg>`;
                if (index === 0) {
                    this.photoLoader.classList.remove('visible');
                }
            };
            slide.appendChild(img);
            this.carousel.appendChild(slide);

            // Créer le dot
            if (photos.length > 1) {
                const dot = document.createElement('span');
                dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.goToSlide(index);
                });
                this.carouselDots.appendChild(dot);
            }
        });

        // Afficher/masquer le hint de swipe
        this.swipeHint.style.display = photos.length > 1 ? 'block' : 'none';

        this.photoCaption.textContent = memory.caption;
        this.updateCarouselPosition();

        this.photoContainer.classList.remove('hidden');
        await this.delay(50);
        this.photoContainer.classList.add('visible');

        await this.waitForTap();

        // Fermer la photo
        this.photoContainer.classList.remove('visible');
        await this.delay(300);
        this.photoContainer.classList.add('hidden');

        // Commentaire du chat
        await this.showMessage('chat', memory.chatComment);
        await this.waitForTap();
    }

    // Carousel methods
    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && this.currentSlide < this.totalSlides - 1) {
                // Swipe left - next
                this.currentSlide++;
                this.updateCarouselPosition();
            } else if (diff < 0 && this.currentSlide > 0) {
                // Swipe right - previous
                this.currentSlide--;
                this.updateCarouselPosition();
            }
        }
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarouselPosition();
    }

    updateCarouselPosition() {
        this.carousel.style.transform = `translateX(-${this.currentSlide * 100}%)`;

        // Mettre à jour les slides actives et les dots
        const slides = this.carousel.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            slide.classList.toggle('is-active', index === this.currentSlide);
        });

        const dots = this.carouselDots.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

        if (this.totalSlides > 1) {
            this.photoProgress.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
        } else {
            this.photoProgress.textContent = '';
        }
    }

    showAd() {
        const container = this.adOverlay.querySelector('.ad-container');
        container.innerHTML = `
            <div class="ad-header">💕 RENCONTRE PRÈS DE CHEZ TOI 💕</div>
            <div class="ad-avatar" id="ad-avatar-container"></div>
            <div class="ad-name">🐶 Niph</div>
            <div class="ad-distance">📍 10 km de chez toi</div>
            <div class="ad-message">"Infos chaudes : ${CONFIG.pugHotInfo}"</div>
            <button class="ad-close-btn" id="ad-close">❌ Fermer cette pub</button>
        `;

        // Ajouter l'image du pug avec fallback
        const avatarContainer = document.getElementById('ad-avatar-container');
        const img = document.createElement('img');
        img.src = CONFIG.pugAvatar;
        img.alt = 'Niph';
        img.onerror = () => {
            avatarContainer.innerHTML = '<span class="avatar-emoji-large">🐶</span>';
        };
        avatarContainer.appendChild(img);

        // Afficher la pub de manière surprenante
        this.adOverlay.classList.remove('hidden');
        setTimeout(() => {
            this.adOverlay.classList.add('visible');
        }, 50);

        // Bouton fermer
        document.getElementById('ad-close').addEventListener('click', () => {
            this.closeAd();
        });
    }

    async closeAd() {
        this.adOverlay.classList.remove('visible');
        await this.delay(300);
        this.adOverlay.classList.add('hidden');

        // Afficher le message d'excuse directement dans le chat
        await this.showMessage('chat', CONFIG.sorryMessages);
        await this.waitForTap();

        // Continuer le récit
        this.currentPhase = 'memories2';
        await this.playMemories(CONFIG.memoriesPart2);

        // Transition vers le message final
        await this.playSequence(CONFIG.transition);
        this.showFinalMessage();
    }

    showFinalMessage() {
        this.tapIndicator.classList.remove('visible');

        // Générer le contenu du message final
        const content = this.finalMessage.querySelector('.final-content');
        content.innerHTML = '';

        CONFIG.finalMessage.forEach((text, index) => {
            const section = document.createElement('div');
            section.className = 'final-section';
            if (index === CONFIG.finalMessage.length - 1) {
                section.classList.add('emphasis');
            }
            section.innerHTML = `<p>${text}</p>`;
            content.appendChild(section);
        });

        // Signature
        const signature = document.createElement('div');
        signature.className = 'final-section signature';

        const finalAvatar = document.createElement('div');
        finalAvatar.className = 'final-avatar';
        const finalImg = document.createElement('img');
        finalImg.src = CONFIG.chatAvatar;
        finalImg.alt = 'Chat';
        finalImg.onerror = () => {
            finalAvatar.innerHTML = '<span class="avatar-emoji">😺</span>';
        };
        finalAvatar.appendChild(finalImg);

        const signatureText = document.createElement('p');
        signatureText.textContent = CONFIG.finalSignature;

        signature.appendChild(finalAvatar);
        signature.appendChild(signatureText);
        content.appendChild(signature);

        // Afficher
        this.finalMessage.classList.remove('hidden');
        setTimeout(() => {
            this.finalMessage.classList.add('visible');
        }, 50);

        // Observer pour les animations au scroll
        this.setupFinalScrollObserver();
    }

    setupFinalScrollObserver() {
        const sections = this.finalMessage.querySelectorAll('.final-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-10% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    waitForTap() {
        return new Promise(resolve => {
            this.canTap = true;
            this.tapIndicator.classList.add('visible');
            this.tapResolver = resolve;
        });
    }

    handleTap(e) {
        // Ignorer si on clique sur un bouton ou un dot
        if (e.target.tagName === 'BUTTON') return;
        if (e.target.classList.contains('carousel-dot')) return;

        // Ignorer si on ne peut pas taper
        if (!this.canTap) return;

        // Si une photo est affichée avec plusieurs slides, ignorer le tap sur le carousel
        if (this.photoContainer.classList.contains('visible')) {
            // Bloquer la fermeture tant qu'on n'est pas sur la dernière slide
            if (this.totalSlides > 1 && this.currentSlide < this.totalSlides - 1) {
                return;
            }

            // Si on tap sur le carousel lui-même et qu'il y a plusieurs photos, ne pas fermer
            if (this.totalSlides > 1 && (e.target.closest('.carousel') || e.target.closest('.carousel-dots'))) {
                return;
            }

            this.canTap = false;
            this.tapIndicator.classList.remove('visible');
            if (this.tapResolver) {
                this.tapResolver();
                this.tapResolver = null;
            }
            return;
        }

        // Tap normal pour continuer
        this.canTap = false;
        this.tapIndicator.classList.remove('visible');
        if (this.tapResolver) {
            this.tapResolver();
            this.tapResolver = null;
        }
    }

    scrollToBottom() {
        this.dialogueContainer.scrollTo({
            top: this.dialogueContainer.scrollHeight,
            behavior: 'smooth'
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Démarrer l'application
document.addEventListener('DOMContentLoaded', () => {
    new NarrativeApp();
});
