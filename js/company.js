document.addEventListener("DOMContentLoaded", () => {
    
    // Navbar Glassmorphism on Scroll
    const navbar = document.getElementById('mainNav');
    if (navbar && !navbar.classList.contains('always-glass')) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('glass');
            } else {
                navbar.classList.remove('glass');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // 1. Initial Hero Load Animation
    const heroSection = document.querySelector('.c-hero');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('is-loaded');
        }, 100);
    }

    // 2. Intersection Observer for Scroll Reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible', 'is-loaded');
                
                // Trigger Number Counters if present
                if (entry.target.classList.contains('c-stat')) {
                    const counter = entry.target.querySelector('.c-counter');
                    if (counter && !counter.classList.contains('counted')) {
                        animateCounter(counter);
                        counter.classList.add('counted');
                    }
                }
            }
        });
    }, observerOptions);

    // Observe fade-ups and the vision section for underline
    const revealElements = document.querySelectorAll('.c-fade-up, .c-vision');
    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Number Counter Animation Logic
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // ms
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;
        
        const timer = setInterval(() => {
            current += 1;
            element.textContent = current;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, stepTime);
    }

    // 4. Parallax Effect for Hero
    if (heroSection) {
        const heroVisual = document.querySelector('.c-hero-visual');
        const heroBlob = document.querySelector('.c-hero-blob');
        
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 80;
            const y = (e.clientY - rect.top - rect.height / 2) / 80;
            
            if(heroVisual) heroVisual.style.transform = `translate(${x}px, ${y}px)`;
            if(heroBlob) heroBlob.style.transform = `translate(${-x}px, ${-y}px)`;
        });
        
        heroSection.addEventListener('mouseleave', () => {
            if(heroVisual) heroVisual.style.transform = `translate(0px, 0px)`;
            if(heroBlob) heroBlob.style.transform = `translate(0px, 0px)`;
        });
    }

});
