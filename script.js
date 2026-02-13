// Valentine Proposal Popup Logic - No button starts below Yes, moves on hover
function setupProposalPopup() {
    const popup = document.getElementById('proposalPopup');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const mainContainer = document.getElementById('mainContainer');
    const popupMessage = document.getElementById('popupMessage');
    
    let escapeCount = 0;
    let isEscaping = false;
    
    const hoverMessages = [
        "Oops! Too slow! 😄",
        "You can't catch me! 🏃‍♂️",
        "I'm too quick for you! ⚡",
        "Nice try! Try again! 😉",
        "You'll never get me! 😎",
        "Too fast for you! 🚀",
        "Missed me! Try harder! 💪",
        "I'm a moving target! 🎯",
        "Almost got me! 😄",
        "Just click YES already! 😊",
        "I'm slippery! 🐠",
        "You'll have to be faster! 🏎️",
        "Not even close! 😄",
        "I'm untouchable! 👻",
        "Better luck next time! 🍀"
    ];
    
    const escapeTexts = [
        "Try to catch me! 😄",
        "You can't click me! 🏃‍♂️",
        "Too fast! ⚡",
        "I'm running away! 🏎️",
        "Catch me if you can! 😎",
        "Nope! Not today! 😄",
        "Too quick for you! 🚀",
        "Missed again! 😉",
        "You'll have to be faster! ⚡",
        "Almost! But not quite! 😊"
    ];
    
    // Position No button initially below Yes button
    positionNoButtonBelowYes();
    
    // Yes Button - Accept Proposal
    yesBtn.addEventListener('click', function() {
        yesBtn.disabled = true;
        noBtn.disabled = true;
        
        // Trigger confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        
        // Change popup message
        popupMessage.innerHTML = `
            <div class="celebrate-message">
                <i class="fas fa-heart"></i>
                <h3>YAY! You've made me the happiest! 🎉</h3>
                <p>Get ready for the most romantic Valentine's Day! 💖</p>
            </div>
        `;
        
        // Animate the popup exit
        popup.style.animation = 'fadeOut 1s ease forwards';
        
        // Show main content after delay
        setTimeout(() => {
            popup.style.display = 'none';
            mainContainer.style.display = 'block';
            
            // Trigger welcome celebration
            triggerWelcomeCelebration();
        }, 1000);
    });
    
    // No Button - Escape behavior on hover
    noBtn.addEventListener('mouseenter', function(e) {
        if (isEscaping) return;
        isEscaping = true;
        
        escapeCount++;
        
        // Change button text to fun escape text
        const randomText = escapeTexts[Math.floor(Math.random() * escapeTexts.length)];
        noBtn.innerHTML = `<i class="fas fa-running"></i> <span class="btn-text">${randomText}</span>`;
        
        // Show random message in bubble
        showNoButtonMessage();
        
        // Move button to random position anywhere on screen
        moveNoButtonToRandomPosition();
        
        // Play escape sound
        playEscapeSound();
        
        // After movement is complete, allow hovering again
        setTimeout(() => {
            isEscaping = false;
        }, 400);
    });
    
    // Also escape on touch for mobile
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (isEscaping) return;
        isEscaping = true;
        
        escapeCount++;
        
        // Change button text
        const randomText = escapeTexts[Math.floor(Math.random() * escapeTexts.length)];
        noBtn.innerHTML = `<i class="fas fa-running"></i> <span class="btn-text">${randomText}</span>`;
        
        // Show message
        showNoButtonMessage();
        
        // Move button
        moveNoButtonToRandomPosition();
        
        // Play escape sound
        playEscapeSound();
        
        setTimeout(() => {
            isEscaping = false;
        }, 400);
    });
    
    // No button click - Still make it escape
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isEscaping) return;
        isEscaping = true;
        
        escapeCount++;
        
        // Change text
        const randomText = escapeTexts[Math.floor(Math.random() * escapeTexts.length)];
        noBtn.innerHTML = `<i class="fas fa-running"></i> <span class="btn-text">${randomText}</span>`;
        
        // Show message
        showNoButtonMessage();
        
        // Move even further
        moveNoButtonToRandomPosition(true);
        
        // Play escape sound
        playEscapeSound();
        
        // After many attempts, make a joke in the popup message
        if (escapeCount > 10) {
            popupMessage.innerHTML = `
                <div style="color: #FF9800;">
                    <i class="fas fa-smile-wink"></i>
                    Having fun chasing me? 😄 Just click YES!
                </div>
            `;
        }
        
        setTimeout(() => {
            isEscaping = false;
        }, 400);
    });
    
    function positionNoButtonBelowYes() {
        // Calculate position below Yes button on the screen
        const yesRect = yesBtn.getBoundingClientRect();
        const popupCard = document.querySelector('.popup-card');
        const popupRect = popupCard.getBoundingClientRect();
        
        // Position below Yes button (which is inside the popup card)
        const buttonBelowYesTop = yesRect.bottom + 20;
        const centerX = popupRect.left + popupRect.width/2;
        
        // Set initial position
        noBtn.style.position = 'fixed';
        noBtn.style.top = `${buttonBelowYesTop}px`;
        noBtn.style.left = `${centerX}px`;
        noBtn.style.transform = 'translateX(-50%)';
        
        // Reset to original "No" text
        noBtn.innerHTML = '<i class="fas fa-times"></i> <span class="btn-text">No</span>';
    }
    
    function moveNoButtonToRandomPosition(farAway = false) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const buttonWidth = noBtn.offsetWidth;
        const buttonHeight = noBtn.offsetHeight;
        
        const minX = 20;
        const maxX = screenWidth - buttonWidth - 20;
        const minY = 20;
        const maxY = screenHeight - buttonHeight - 20;
        
        let randomX, randomY;
        
        if (farAway) {
            const currentX = parseInt(noBtn.style.left) || screenWidth/2;
            randomX = currentX > screenWidth/2 ? 
                Math.random() * (screenWidth/3) : 
                screenWidth/2 + Math.random() * (screenWidth/3);
            
            const currentY = parseInt(noBtn.style.top) || screenHeight/2;
            randomY = currentY > screenHeight/2 ? 
                Math.random() * (screenHeight/3) : 
                screenHeight/2 + Math.random() * (screenHeight/3);
        } else {
            randomX = Math.random() * (maxX - minX) + minX;
            randomY = Math.random() * (maxY - minY) + minY;
        }
        
        randomX = Math.max(minX, Math.min(randomX, maxX));
        randomY = Math.max(minY, Math.min(randomY, maxY));
        
        const yesRect = yesBtn.getBoundingClientRect();
        let attempts = 0;
        while (attempts < 10) {
            const distance = Math.sqrt(
                Math.pow(randomX + buttonWidth/2 - (yesRect.left + yesRect.width/2), 2) +
                Math.pow(randomY + buttonHeight/2 - (yesRect.top + yesRect.height/2), 2)
            );
            
            if (distance > 150) break;
            
            randomX = Math.random() * (maxX - minX) + minX;
            randomY = Math.random() * (maxY - minY) + minY;
            attempts++;
        }
        
        noBtn.classList.add('escaping');
        
        setTimeout(() => {
            noBtn.style.left = `${randomX}px`;
            noBtn.style.top = `${randomY}px`;
            noBtn.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                noBtn.classList.remove('escaping');
            }, 400);
        }, 50);
    }
    
    function showNoButtonMessage() {
        const randomMessage = hoverMessages[Math.floor(Math.random() * hoverMessages.length)];
        
        const existingBubble = document.querySelector('.no-message-bubble');
        if (existingBubble) {
            existingBubble.remove();
        }
        
        const messageBubble = document.createElement('div');
        messageBubble.className = 'no-message-bubble';
        messageBubble.textContent = randomMessage;
        
        const buttonRect = noBtn.getBoundingClientRect();
        
        let bubbleTop = buttonRect.top - 50;
        let bubbleLeft = buttonRect.left + buttonRect.width/2;
        
        if (bubbleTop < 20) bubbleTop = buttonRect.bottom + 20;
        if (bubbleLeft < 100) bubbleLeft = 100;
        if (bubbleLeft > window.innerWidth - 100) bubbleLeft = window.innerWidth - 100;
        
        messageBubble.style.left = `${bubbleLeft}px`;
        messageBubble.style.top = `${bubbleTop}px`;
        messageBubble.style.transform = 'translateX(-50%)';
        
        document.body.appendChild(messageBubble);
        
        setTimeout(() => {
            if (messageBubble.parentNode) {
                messageBubble.remove();
            }
        }, 2000);
    }
    
    function playEscapeSound() {
        try {
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-cartoon-toy-whistle-616.mp3');
            audio.volume = 0.2;
            audio.play().catch(e => console.log("Audio play prevented"));
        } catch (e) {
            console.log("Sound not available");
        }
    }
    
    function triggerWelcomeCelebration() {
        const header = document.querySelector('.header h1');
        const originalText = header.innerHTML;
        
        header.innerHTML = `Welcome to Our Valentine's Day! 💝`;
        header.style.color = '#4CAF50';
        header.style.transform = 'scale(1.1)';
        header.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            confetti({
                particleCount: 300,
                angle: 90,
                spread: 100,
                origin: { y: 0.5 }
            });
        }, 500);
        
        setTimeout(() => {
            header.innerHTML = originalText;
            header.style.color = '#ff4081';
            header.style.transform = 'scale(1)';
        }, 3000);
    }
}

// Data Storage
const appData = {
    lovePercentage: 100,
    currentQuoteIndex: 0,
    currentQuestionIndex: 0,
    points: 0,
    daysTogether: calculateDaysTogether('2024-05-24'),
    musicPlaying: false
};

// Romantic Quotes Database
const romanticQuotes = [
    "You are the source of my joy, the center of my world, and the whole of my heart.",
    "In you, I've found the love of my life and my closest, truest friend.",
    "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.",
    "If I had a flower for every time I thought of you, I could walk in my garden forever.",
    "I love you not only for what you are, but for what I am when I am with you.",
    "To the world you may be one person, but to one person you are the world.",
    "I would rather spend one lifetime with you, than face all the ages of this world alone.",
    "You're my today and all of my tomorrows.",
    "I love you more than I have ever found a way to say to you.",
    "Being with you makes me so happy, it feels like I'm in a dream I never want to wake up from."
];

// Interactive Questions
const questions = [
    {
        question: "What's your favorite memory of us?",
        answers: [
            { text: "Our first date", points: 10 },
            { text: "That surprise you planned", points: 20 },
            { text: "All our little moments", points: 15 }
        ]
    },
    {
        question: "What do you love most about our relationship?",
        answers: [
            { text: "Our deep conversations", points: 15 },
            { text: "How we make each other laugh", points: 20 },
            { text: "The way we support each other", points: 25 }
        ]
    },
    {
        question: "Where would you like us to travel together?",
        answers: [
            { text: "A romantic beach getaway", points: 20 },
            { text: "A cozy mountain cabin", points: 15 },
            { text: "Exploring a new city", points: 10 }
        ]
    },
    {
        question: "What's your favorite thing about me?",
        answers: [
            { text: "Your kindness", points: 25 },
            { text: "Your sense of humor", points: 20 },
            { text: "The way you look at me", points: 30 }
        ]
    }
];

// Secret Messages
const secretMessages = {
    1: "💖 Every day with you is a blessing. You make my world brighter just by being in it!",
    2: "🌟 You're the missing piece I never knew I was looking for. My life is complete with you.",
    3: "🌹 No matter how much time passes, my love for you only grows stronger every single day.",
    4: "💖 Majhi Lakshmi ahes tu and I am blessed to have you in my life!"
};

// Functions
function createFloatingHearts() {
    const container = document.querySelector('.hearts-container');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 15}s`;
        heart.style.width = `${Math.random() * 20 + 10}px`;
        heart.style.height = heart.style.width;
        heart.style.background = `hsl(${Math.random() * 360}, 100%, 65%)`;
        container.appendChild(heart);
    }
}

function initializeApp() {
    updateQuoteDisplay();
    updateQuestionDisplay();
    
    const daysCount = document.getElementById('daysCount');
    if (daysCount) daysCount.textContent = appData.daysTogether;
    
    const music = document.getElementById('bgMusic');
    if (music) music.volume = 0.3;
}

// FIXED: Event Listeners with proper function references
function setupEventListeners() {
    // Quote buttons - FIXED: Use anonymous functions to call the actual functions
    const prevQuoteBtn = document.getElementById('prevQuote');
    const nextQuoteBtn = document.getElementById('nextQuote');
    
    if (prevQuoteBtn) {
        prevQuoteBtn.addEventListener('click', function() {
            goToPreviousQuote();
        });
    }
    
    if (nextQuoteBtn) {
        nextQuoteBtn.addEventListener('click', function() {
            goToNextQuote();
        });
    }
    
    // Question button
    const newQuestion = document.getElementById('newQuestion');
    if (newQuestion) newQuestion.addEventListener('click', nextQuestion);
    
    // Answer buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', handleAnswer);
    });
    
    // Message buttons
    document.querySelectorAll('.message-btn').forEach(btn => {
        btn.addEventListener('click', showMessage);
    });
    
    // Music button
    const musicBtn = document.getElementById('musicBtn');
    if (musicBtn) musicBtn.addEventListener('click', toggleMusic);
}

// FIXED: Renamed functions to avoid conflict with button IDs
function goToPreviousQuote() {
    appData.currentQuoteIndex = 
        (appData.currentQuoteIndex - 1 + romanticQuotes.length) % romanticQuotes.length;
    updateQuoteDisplay();
}

function goToNextQuote() {
    appData.currentQuoteIndex = 
        (appData.currentQuoteIndex + 1) % romanticQuotes.length;
    updateQuoteDisplay();
}

function startAnimations() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
}

function updateQuoteDisplay() {
    const currentQuote = document.getElementById('currentQuote');
    if (currentQuote) {
        currentQuote.textContent = romanticQuotes[appData.currentQuoteIndex];
    }
}

function updateQuestionDisplay() {
    const question = questions[appData.currentQuestionIndex];
    const currentQuestion = document.getElementById('currentQuestion');
    if (currentQuestion) currentQuestion.textContent = question.question;
    
    const answersContainer = document.querySelector('.answers');
    if (!answersContainer) return;
    
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.innerHTML = `<i class="fas fa-star"></i> ${answer.text}`;
        button.dataset.points = answer.points;
        button.addEventListener('click', handleAnswer);
        answersContainer.appendChild(button);
    });
}

function nextQuestion() {
    appData.currentQuestionIndex = 
        (appData.currentQuestionIndex + 1) % questions.length;
    updateQuestionDisplay();
}

function handleAnswer(event) {
    const points = parseInt(event.target.dataset.points);
    appData.points += points;
    
    event.target.style.background = '#ff4081';
    event.target.style.color = 'white';
    event.target.style.transform = 'scale(0.95)';
    
    const pointsPopup = document.createElement('div');
    pointsPopup.textContent = `+${points} 💖`;
    pointsPopup.style.position = 'absolute';
    pointsPopup.style.color = '#ff4081';
    pointsPopup.style.fontWeight = 'bold';
    pointsPopup.style.fontSize = '1.5rem';
    pointsPopup.style.animation = 'floatUp 1s forwards';
    event.target.appendChild(pointsPopup);
    
    setTimeout(() => {
        event.target.style.background = '';
        event.target.style.color = '';
        event.target.style.transform = '';
        pointsPopup.remove();
    }, 1000);
    
    appData.lovePercentage += 5;
    
    if (appData.points >= 100) {
        triggerAchievement("Love Master! 🏆");
    }
}

function showMessage(event) {
    const messageNum = event.target.dataset.message;
    const message = secretMessages[messageNum];
    
    const display = document.getElementById('messageDisplay');
    if (display) {
        display.innerHTML = `<div class="message-reveal">${message}</div>`;
    }
    
    event.target.innerHTML = `<i class="fas fa-lock-open"></i> Message #${messageNum}`;
    event.target.style.background = 'linear-gradient(45deg, #4CAF50, #8BC34A)';
    
    const hearts = ['💖', '💝', '💗', '💓', '💞'];
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.top = `${Math.random() * 100}vh`;
            heart.style.fontSize = `${Math.random() * 20 + 20}px`;
            heart.style.animation = `floatUp ${Math.random() * 2 + 1}s forwards`;
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1000);
        }, i * 100);
    }
}

function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    
    if (!music || !btn) return;
    
    if (appData.musicPlaying) {
        music.pause();
        btn.innerHTML = '<i class="fas fa-music"></i> Play Romantic Music';
        appData.musicPlaying = false;
    } else {
        music.play().catch(e => {
            alert("Please interact with the page first to play music! 🎵");
            console.log("Autoplay prevented:", e);
        });
        btn.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
        appData.musicPlaying = true;
    }
}

function triggerAchievement(message) {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-notification';
    achievement.innerHTML = `
        <div class="achievement-content">
            <i class="fas fa-trophy"></i>
            <h3>Achievement Unlocked!</h3>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(achievement);
    
    setTimeout(() => {
        achievement.remove();
    }, 3000);
}

function calculateDaysTogether(startDate) {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Easter egg: Secret key combination
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerAchievement("You found the secret! 🎮 I love you even more! 💖");
        konamiCode = [];
        
        for(let i = 0; i < 5; i++) {
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 }
                });
                confetti({
                    particleCount: 150,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 }
                });
            }, i * 100);
        }
    }
});

// ===== IMAGE SLIDER FUNCTIONALITY =====
function setupImageSlider() {
    console.log("Setting up image slider...");
    
    const slider = document.getElementById('imageSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const autoPlayBtn = document.getElementById('autoPlayBtn');
    const addImageBtn = document.getElementById('addImageBtn');
    const sliderDots = document.getElementById('sliderDots');
    
    if (!slider) {
        console.error("Slider element not found!");
        return;
    }
    
    let currentSlide = 0;
    let autoPlayInterval = null;
    let isAutoPlaying = false;
    
    // FIXED: Complete array with all 32 images
    const localImages = [
        'image/1.jpg', 'image/2.jpg', 'image/3.jpg', 'image/4.jpg',
        'image/5.jpg', 'image/6.jpg', 'image/7.jpg', 'image/8.jpg',
        'image/9.jpg', 'image/10.jpg', 'image/11.jpg', 'image/12.jpg',
        'image/13.jpg', 'image/14.jpg', 'image/15.jpg', 'image/16.jpg',
        'image/17.jpg', 'image/18.jpg', 'image/19.jpg', 'image/20.jpg',
        'image/21.jpg', 'image/22.jpg', 'image/23.jpg', 'image/24.jpg',
        'image/25.jpg', 'image/26.jpg', 'image/27.jpg', 'image/28.jpg',
        'image/29.jpg', 'image/30.jpg', 'image/31.jpg', 'image/32.jpg'
    ];
    
    const fallbackImages = [
        'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1529254479751-fbacb4c7a587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ];
    
    function loadImages() {
        while (slider.firstChild) {
            slider.removeChild(slider.firstChild);
        }
        
        localImages.forEach((imageSrc, index) => {
            const sliderItem = document.createElement('div');
            sliderItem.className = 'slider-item';
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `Memory ${index + 1}`;
            img.loading = 'lazy';
            
            img.onerror = function() {
                console.log(`Failed to load: ${imageSrc}`);
                this.src = fallbackImages[index % fallbackImages.length];
                this.onerror = null;
            };
            
            sliderItem.appendChild(img);
            slider.appendChild(sliderItem);
        });
        
        console.log(`Loaded ${slider.children.length} images`);
    }
    
    function updateSlider() {
        if (slider.children.length > 0) {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
        }
    }
    
    function createDots() {
        if (!sliderDots) return;
        
        sliderDots.innerHTML = '';
        
        for (let i = 0; i < slider.children.length; i++) {
            const dot = document.createElement('span');
            dot.className = `slider-dot ${i === currentSlide ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateSlider();
                resetAutoPlay();
            });
            sliderDots.appendChild(dot);
        }
    }
    
    function updateDots() {
        if (!sliderDots) return;
        
        const dots = sliderDots.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function toggleAutoPlay() {
        if (isAutoPlaying) {
            stopAutoPlay();
            if (autoPlayBtn) autoPlayBtn.innerHTML = '<i class="fas fa-play"></i> Auto-Play';
        } else {
            startAutoPlay();
            if (autoPlayBtn) autoPlayBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        }
        isAutoPlaying = !isAutoPlaying;
    }
    
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            if (slider.children.length > 0) {
                currentSlide = (currentSlide + 1) % slider.children.length;
                updateSlider();
            }
        }, 3000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    function resetAutoPlay() {
        if (isAutoPlaying) {
            stopAutoPlay();
            startAutoPlay();
        }
    }
    
    loadImages();
    
    setTimeout(() => {
        if (slider.children.length > 0) {
            createDots();
        }
    }, 100);
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (slider.children.length > 0) {
                currentSlide = (currentSlide - 1 + slider.children.length) % slider.children.length;
                updateSlider();
                resetAutoPlay();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (slider.children.length > 0) {
                currentSlide = (currentSlide + 1) % slider.children.length;
                updateSlider();
                resetAutoPlay();
            }
        });
    }
    
    if (autoPlayBtn) {
        autoPlayBtn.addEventListener('click', toggleAutoPlay);
    }
    
    if (addImageBtn) {
        addImageBtn.addEventListener('click', () => {
            alert("Upload feature coming soon! 📸");
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            if (slider.children.length > 0) {
                currentSlide = (currentSlide - 1 + slider.children.length) % slider.children.length;
                updateSlider();
                resetAutoPlay();
            }
        } else if (e.key === 'ArrowRight') {
            if (slider.children.length > 0) {
                currentSlide = (currentSlide + 1) % slider.children.length;
                updateSlider();
                resetAutoPlay();
            }
        }
    });
    
    setTimeout(() => {
        if (slider.children.length > 1 && autoPlayBtn) {
            startAutoPlay();
            isAutoPlaying = true;
            autoPlayBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        }
    }, 5000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing app...");
    
    if (document.getElementById('proposalPopup')) {
        setupProposalPopup();
    }
    
    if (document.querySelector('.hearts-container')) {
        createFloatingHearts();
    }
    
    initializeApp();
    setupEventListeners();
    startAnimations();
    setupImageSlider();
    
    console.log("App initialization complete!");
});
