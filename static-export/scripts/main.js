// ===== THEME TOGGLE =====
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ===== ROTATING TAGLINES =====
function initTaglineRotation() {
    const taglines = [
        'Finance Professional',
        'Chartered Accountant',
        'Data Analyst',
        'Tech Enthusiast'
    ];
    
    let currentIndex = 0;
    const taglineElement = document.getElementById('rotating-tagline');
    
    function rotateTagline() {
        // Fade out
        taglineElement.style.opacity = '0';
        
        setTimeout(() => {
            // Change text
            currentIndex = (currentIndex + 1) % taglines.length;
            taglineElement.textContent = taglines[currentIndex];
            
            // Fade in
            taglineElement.style.opacity = '1';
        }, 300);
    }
    
    // Rotate every 2.5 seconds
    setInterval(rotateTagline, 2500);
}

// ===== INFINITE TICKER SCROLL =====
function initTickers() {
    // Finance ticker
    const financeTicker = document.getElementById('finance-ticker');
    const financeSkills = [
        'Budgeting',
        'Forecasting',
        'Financial Projections and Modelling',
        'Equity Valuations',
        'Project Finance Modelling',
        'Pitch Deck Preparations',
        'Financial Due Diligence',
        'Market Research',
        'Credit Analysis',
        'Turnaround and Restructuring Strategies',
        'Bankruptcy Advisory (Insolvency Support)'
    ];
    
    // Create three sets for smooth infinite scroll
    financeTicker.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        financeSkills.forEach(skill => {
            const item = document.createElement('div');
            item.className = 'ticker-item';
            item.textContent = skill;
            financeTicker.appendChild(item);
        });
    }
    
    // Tech ticker
    const techTicker = document.getElementById('tech-ticker');
    const techSkills = [
        { name: 'Power BI', icon: '📊', rating: 80 },
        { name: 'Microsoft Tools', icon: '📦', rating: 90 },
        { name: 'Python', icon: '🐍', rating: 70 },
        { name: 'Alteryx', icon: '⚙️', rating: 80 },
        { name: 'SQL', icon: '🗄️', rating: 50 }
    ];
    
    // Create three sets for smooth infinite scroll
    techTicker.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        techSkills.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'tech-skill-card';
            card.innerHTML = `
                <div class="tech-skill-icon">${skill.icon}</div>
                <h4 class="tech-skill-name">${skill.name}</h4>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${skill.rating}%"></div>
                </div>
            `;
            techTicker.appendChild(card);
        });
    }
}

// ===== CERTIFICATIONS CAROUSEL =====
function initCertificationsCarousel() {
    const track = document.getElementById('cert-track');
    const prevButton = document.getElementById('cert-prev');
    const nextButton = document.getElementById('cert-next');
    const cards = track.querySelectorAll('.certification-card');
    
    const cardWidth = 320; // 20rem
    const gap = 32; // 2rem
    const cardTotalWidth = cardWidth + gap;
    
    let currentPosition = 0;
    const totalCards = cards.length;
    const visibleCards = 3;
    const maxScroll = (totalCards - visibleCards) * cardTotalWidth;
    
    function updateButtons() {
        prevButton.style.opacity = currentPosition > 0 ? '1' : '0.5';
        prevButton.style.cursor = currentPosition > 0 ? 'pointer' : 'not-allowed';
        prevButton.disabled = currentPosition <= 0;
        
        nextButton.style.opacity = currentPosition < maxScroll ? '1' : '0.5';
        nextButton.style.cursor = currentPosition < maxScroll ? 'pointer' : 'not-allowed';
        nextButton.disabled = currentPosition >= maxScroll;
    }
    
    function updatePosition() {
        track.style.transform = `translateX(-${currentPosition}px)`;
        updateButtons();
    }
    
    prevButton.addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition = Math.max(0, currentPosition - cardTotalWidth);
            updatePosition();
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentPosition < maxScroll) {
            currentPosition = Math.min(maxScroll, currentPosition + cardTotalWidth);
            updatePosition();
        }
    });
    
    // Initialize button states
    updateButtons();
    
    // Handle responsive behavior
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reset position on resize
            currentPosition = 0;
            updatePosition();
        }, 250);
    });
}

// ===== SMOOTH SCROLL FOR NAVIGATION =====
function initSmoothScroll() {
    // Add smooth scroll behavior to any anchor links (if you add navigation later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ===== TAGLINE FADE TRANSITION =====
function setupTaglineFade() {
    const taglineElement = document.getElementById('rotating-tagline');
    taglineElement.style.transition = 'opacity 0.3s ease';
}

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTaglineRotation();
    setupTaglineFade();
    initTickers();
    initCertificationsCarousel();
    initSmoothScroll();
    
    // Small delay before starting scroll animations
    setTimeout(initScrollAnimations, 100);
});

// ===== HANDLE VISIBILITY CHANGE (pause animations when tab is hidden) =====
document.addEventListener('visibilitychange', () => {
    const tickers = document.querySelectorAll('.ticker');
    if (document.hidden) {
        tickers.forEach(ticker => {
            ticker.style.animationPlayState = 'paused';
        });
    } else {
        tickers.forEach(ticker => {
            ticker.style.animationPlayState = 'running';
        });
    }
});
