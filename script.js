// Навигация между страницами
function goToStory() {
    window.location.href = 'story.html';
}

function goHome() {
    window.location.href = 'index.html';
}

// Создание падающих сердечек
function createFallingHearts() {
    const heartsBackground = document.querySelector('.hearts-background');
    if (!heartsBackground) return;
    
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.opacity = Math.random() * 0.3 + 0.1;
        
        heartsBackground.appendChild(heart);
        
        // Удаляем сердечко после анимации
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 800);
}

// Добавляем CSS для падающих сердечек динамически
function addFallingHeartStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .falling-heart {
            position: fixed;
            top: -50px;
            animation: fall linear;
            pointer-events: none;
            z-index: -1;
        }
        
        @keyframes fall {
            to {
                top: 100vh;
                transform: rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Анимация появления элементов при прокрутке
function animateOnScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    addFallingHeartStyles();
    createFallingHearts();
    
    // Запускаем анимацию на странице истории
    if (document.querySelector('.story-page')) {
        animateOnScroll();
    }
});
