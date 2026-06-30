/* =========================================================================
   SUSTAINABILITY PAGE - VANILLA JS ANIMATIONS
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

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
    /* --- 1. INTERSECTION OBSERVERS FOR REVEALS --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible', 'is-loaded');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to observe
    const revealElements = document.querySelectorAll('.sus-fade-up, .sus-slide-in, .sus-clip-reveal, .sus-stagger, .sus-hero-new, .sus-mission, .sus-matters');
    revealElements.forEach(el => revealObserver.observe(el));


    /* --- 2. TIMELINE LINE DRAW ANIMATION --- */
    const timelineSection = document.querySelector('.sus-timeline-section');
    const timelinePath = document.querySelector('.sus-timeline-path');
    const timelineContainer = document.querySelector('.sus-timeline-container');

    if (timelineSection && timelinePath && timelineContainer) {
        // Calculate total length of the SVG path
        const pathLength = timelinePath.getTotalLength();
        timelinePath.style.strokeDasharray = pathLength;
        timelinePath.style.strokeDashoffset = pathLength;

        // Listen to scroll events on the container (horizontal scroll)
        timelineContainer.addEventListener('scroll', () => {
            const scrollLeft = timelineContainer.scrollLeft;
            const maxScroll = timelineContainer.scrollWidth - timelineContainer.clientWidth;
            
            if (maxScroll > 0) {
                const scrollPercentage = scrollLeft / maxScroll;
                const drawLength = pathLength * scrollPercentage;
                timelinePath.style.strokeDashoffset = pathLength - drawLength;
            }
        });
    }


    /* --- 3. NUMBER COUNTERS --- */
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseInt(target.getAttribute('data-target'), 10);
                const duration = 2000; // ms
                let startTimestamp = null;

                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    
                    // ease out quad
                    const easeProgress = progress * (2 - progress); 
                    
                    target.innerText = Math.floor(easeProgress * endVal);
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        target.innerText = endVal;
                    }
                };

                window.requestAnimationFrame(step);
                observer.unobserve(target); // Only animate once
            }
        });
    }, { threshold: 0.5 });

    const counters = document.querySelectorAll('.sus-counter-num');
    counters.forEach(counter => counterObserver.observe(counter));


    /* --- 4. MAGNETIC BUTTONS --- */
    const magneticBtns = document.querySelectorAll('.sus-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move button slightly towards mouse
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });


    /* --- 5. PARALLAX MOUSE EFFECT ON HERO SECTION --- */
    const heroSection = document.querySelector('.sus-hero-new');
    const heroProduct = document.querySelector('.sus-hero-product');
    const heroPaper1 = document.querySelector('.sus-hero-paper-layer.layer-1');
    const heroPaper2 = document.querySelector('.sus-hero-paper-layer.layer-2');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 100;
            const y = (e.clientY - rect.top - rect.height / 2) / 100;
            
            if(heroProduct) heroProduct.style.transform = `translate(${x * 1.5}px, ${y * 1.5}px)`;
            if(heroPaper1) heroPaper1.style.transform = `translate(-50%, -50%) translate(${-x}px, ${-y}px)`;
            if(heroPaper2) heroPaper2.style.transform = `translate(-50%, -50%) translate(${x * 0.5}px, ${y * 0.5}px)`;
        });
        
        heroSection.addEventListener('mouseleave', () => {
            if(heroProduct) heroProduct.style.transform = `translate(0px, 0px)`;
            if(heroPaper1) heroPaper1.style.transform = `translate(-50%, -50%) translate(0px, 0px)`;
            if(heroPaper2) heroPaper2.style.transform = `translate(-50%, -50%) translate(0px, 0px)`;
        });
    }

    /* --- 5B. PARALLAX MOUSE EFFECT ON MISSION SECTION --- */
    const missionSection = document.querySelector('.sus-mission');
    const missionBgArt = document.querySelector('.sus-mission-bg-art');
    const missionHeading = document.querySelector('.sus-interactive-heading');
    
    if (missionSection && missionBgArt) {
        missionSection.addEventListener('mousemove', (e) => {
            const rect = missionSection.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 150;
            const y = (e.clientY - rect.top - rect.height / 2) / 150;
            
            missionBgArt.style.transform = `translate(${-x}px, ${-y}px)`;
            if(missionHeading) missionHeading.style.transform = `translate(${x * 2}px, ${y * 2}px)`;
        });
        
        missionSection.addEventListener('mouseleave', () => {
            missionBgArt.style.transform = `translate(0px, 0px)`;
            if(missionHeading) missionHeading.style.transform = `translate(0px, 0px)`;
        });
    }

    /* --- 6. SCROLL REVEAL FOR "OUR COMMITMENT" WORDS --- */
    const commitWords = document.querySelectorAll('.sus-commit-word');
    
    window.addEventListener('scroll', () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        commitWords.forEach(word => {
            const wordTop = word.getBoundingClientRect().top;
            
            if (wordTop < triggerBottom && wordTop > 0) {
                word.classList.add('active');
            } else if (wordTop > window.innerHeight) {
                // Optional: remove active class if scrolled back up far enough
                word.classList.remove('active');
            }
        });
    });

});
