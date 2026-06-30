// ==========================================
// CONTACT PAGE - VANILLA JS LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. NAVBAR GLASSMORPHISM
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

    // 2. SCROLL REVEAL (Intersection Observer)
    const revealElements = document.querySelectorAll('.c-fade-up, .c-word-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));


    // 3. MAGNETIC BUTTONS
    const magneticBtns = document.querySelectorAll('.c-btn-magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            btn.style.transform = `translate(${x}px, ${y}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });


    // 4. MOUSE PARALLAX (Hero Section)
    const heroSection = document.querySelector('.c-hero-section');
    if (heroSection) {
        const parallaxItems = heroSection.querySelectorAll('.c-parallax-item');
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left - rect.width / 2);
            const mouseY = (e.clientY - rect.top - rect.height / 2);

            parallaxItems.forEach(item => {
                const speed = parseFloat(item.getAttribute('data-speed')) || 0.02;
                const x = mouseX * speed;
                const y = mouseY * speed;
                item.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`; // Keep centering if it's absolute centered
            });
        });
        heroSection.addEventListener('mouseleave', () => {
            parallaxItems.forEach(item => {
                item.style.transform = `translate(-50%, -50%)`;
            });
        });
    }


    // 5. FAQ ACCORDION
    const faqItems = document.querySelectorAll('.c-accordion-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.c-acc-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

});
