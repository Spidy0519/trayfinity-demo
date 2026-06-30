// ==========================================
// WHY TRAYFINITY SECTION (Premium Editorial)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('benefits');
    if (!section) return;

    // 1. SCROLL REVEAL (Intersection Observer)
    const revealElements = section.querySelectorAll('.b-fade-up, .b-word-reveal, .b-pill-anim, .tf-connector-canvas');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: "0px 0px -100px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));


    // 2. MAGNETIC BUTTON
    const magneticBtn = section.querySelector('.b-magnetic');
    if (magneticBtn) {
        magneticBtn.addEventListener('mousemove', (e) => {
            const rect = magneticBtn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            magneticBtn.style.transform = `translate(${x}px, ${y}px)`;
        });
        magneticBtn.addEventListener('mouseleave', () => {
            magneticBtn.style.transform = `translate(0px, 0px)`;
        });
    }

    // 3. MOUSE PARALLAX (Trays and Background Shapes)
    const parallaxItems = section.querySelectorAll('.b-parallax-item, .b-parallax-slow, .b-parallax-reverse');
    
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        // Calculate mouse position relative to the center of the section
        const mouseX = (e.clientX - rect.left - rect.width / 2);
        const mouseY = (e.clientY - rect.top - rect.height / 2);

        parallaxItems.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-speed')) || 0.02;
            
            // Adjust direction based on class
            let dir = 1;
            if (item.classList.contains('b-parallax-reverse')) {
                dir = -1;
            }
            
            // Apply transform
            const x = mouseX * speed * dir;
            const y = mouseY * speed * dir;
            
            // Avoid overriding existing CSS animations entirely by applying transform gently, 
            // but since CSS animations use transform, mouse parallax via JS transform overrides CSS transform.
            // For a perfect blend, we'd use a wrapper, but this simple transform works for the parallax effect.
            item.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    section.addEventListener('mouseleave', () => {
        parallaxItems.forEach(item => {
            item.style.transform = `translate(0px, 0px)`;
        });
    });

});
