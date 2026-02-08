// ============================================
// Bubu Dudu Valentine's Day Website JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const questionPage = document.getElementById('questionPage');
    const successPage = document.getElementById('successPage');
    const heartsContainer = document.getElementById('heartsContainer');
    const confettiCanvas = document.getElementById('confettiCanvas');
    const ctx = confettiCanvas.getContext('2d');
    const bgMusic = document.getElementById('bgMusic');
    const startOverlay = document.getElementById('startOverlay');
    const celebrationVideo = document.getElementById('celebrationVideo');

    // Set canvas size
    function resizeCanvas() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ============================================
    // Start Overlay - Click to begin & play music
    // ============================================
    startOverlay.addEventListener('click', () => {
        startOverlay.classList.add('hidden');
        // Start playing background music
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
    });

    // ============================================
    // Floating Hearts Generator
    // ============================================
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🌸', '✨', '💐', '🌹'];

// Add multiple images here
const girlImages = ["girl1.png", "girl2.png", "girl3.png", "girl4.png"];

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';

    const size = Math.random() * 20 + 20; // 20px to 40px

    // 75% chance image, 25% chance emoji
    if (Math.random() < 0.75) {
        const img = document.createElement("img");
        img.src = girlImages[Math.floor(Math.random() * girlImages.length)];

        img.style.width = size + "px";
        img.style.height = size + "px";
        img.style.borderRadius = "50%"; // optional (circle)
        img.style.objectFit = "cover";
        img.style.objectPosition = "center top";

        heart.appendChild(img);
    } else {
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.fontSize = size + "px";
    }

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 5 + 5) + "s";
    heart.style.animationDelay = Math.random() * 2 + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 12500);
}

setInterval(createHeart, 600);

for (let i = 0; i < 12; i++) {
    setTimeout(createHeart, i * 200);
}

    // ============================================
    // No Button - Moves away when clicked
    // ============================================
    function getViewportSize() {
    if (window.visualViewport) {
        return {
            width: window.visualViewport.width,
            height: window.visualViewport.height
        };
    }
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

function moveNoButtonRandomly() {
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const { width: screenWidth, height: screenHeight } = getViewportSize();

    const padding = 10;

    // Generate random position directly (better than moveDistance)
    let newX = Math.random() * (screenWidth - btnWidth - padding * 2) + padding;
    let newY = Math.random() * (screenHeight - btnHeight - padding * 2) + padding;

    // Apply new position
    noBtn.style.position = "fixed";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.margin = "0";
    noBtn.style.zIndex = "9999";
    noBtn.style.transition = "left 0.2s ease, top 0.2s ease";
}

// PC click
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButtonRandomly();
});

// Mobile touch
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButtonRandomly();
});

    // No button click handler - just move away
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        moveNoButtonRandomly();
    });

    // Touch handler for mobile
    noBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        moveNoButtonRandomly();
    });

    // ============================================
    // Yes Button Click Handler
    // ============================================
    yesBtn.addEventListener('click', () => {
        // Pause background music so user can watch video
        bgMusic.pause();
        
        // Hide question page, show success page
        questionPage.classList.add('hidden');
        successPage.classList.remove('hidden');
        
        // Auto-play the video
        if (celebrationVideo) {
            celebrationVideo.muted = false;
            celebrationVideo.play().catch(e => {
                console.log('Video autoplay failed, trying muted:', e);
                celebrationVideo.muted = true;
                celebrationVideo.play();
            });
        }
        
        // Start confetti celebration
        startConfetti();
        
        // Create extra hearts for celebration
        for (let i = 0; i < 40; i++) {
            setTimeout(createHeart, i * 80);
        }
    });

    // ============================================
    // Confetti Animation
    // ============================================
    const confettiColors = ['#FF69B4', '#FF1493', '#C2185B', '#880E4F', '#E91E63', '#FF4D6D', '#FFB6C1', '#DDA0DD', '#FFD700', '#FF6B6B'];
    const confettiPieces = [];

    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * confettiCanvas.width;
            this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
            this.size = Math.random() * 12 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 4 - 2;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            this.shape = Math.random() > 0.5 ? 'circle' : 'rect';
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > confettiCanvas.height) {
                this.y = -this.size;
                this.x = Math.random() * confettiCanvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            
            if (this.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2);
            }
            
            ctx.restore();
        }
    }

    let confettiAnimationId;
    let confettiRunning = false;

    function startConfetti() {
        if (confettiRunning) return;
        confettiRunning = true;
        
        for (let i = 0; i < 200; i++) {
            confettiPieces.push(new ConfettiPiece());
        }
        
        animateConfetti();
        
        setTimeout(() => {
            confettiRunning = false;
            cancelAnimationFrame(confettiAnimationId);
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            confettiPieces.length = 0;
        }, 10000);
    }

    function animateConfetti() {
        if (!confettiRunning) return;
        
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        confettiAnimationId = requestAnimationFrame(animateConfetti);
    }

    // ============================================
    // Window resize handler
    // ============================================
    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    // ============================================
    // Sparkle effect on mouse/touch move
    // ============================================
    let lastSparkleTime = 0;
const sparkleDelay = 180; // higher = less lag

// 3 images (keep name girlImage as you said)
const girlImage = ["girl4.png", "girl2.png", "girl3.png"];

function handleSparkle(x, y) {
    const now = Date.now();
    if (now - lastSparkleTime > sparkleDelay) {
        lastSparkleTime = now;
        createSparkle(x, y);
    }
}

// Throttle mousemove using requestAnimationFrame
let mouseX = 0, mouseY = 0;
let isMoving = false;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(() => {
            handleSparkle(mouseX, mouseY);
            isMoving = false;
        });
    }
});

document.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
        handleSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: true });

function createSparkle(x, y) {
    const sparkle = document.createElement("img");

    // Random image from the array
    sparkle.src = girlImage[Math.floor(Math.random() * girlImage.length)];

    const size = 18 + Math.random() * 10;
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;

    sparkle.style.cssText = `
        position: fixed;
        left: ${x + offsetX}px;
        top: ${y + offsetY}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center 15%;
        pointer-events: none;
        z-index: 1000;
        will-change: transform, opacity;
        animation: sparkleAnim 0.6s ease-out forwards;
    `;

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 600);
}

// Sparkle animation
const style = document.createElement("style");
style.textContent = `
    @keyframes sparkleAnim {
        0% {
            opacity: 1;
            transform: scale(1) translate(0, 0);
        }
        100% {
            opacity: 0;
            transform: scale(0.3) translate(0px, -30px);
        }
    }
`;
document.head.appendChild(style);

});
