/**
 * TRAYFINITY CUSTOM FOOTER
 * Vanilla JavaScript interactions and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const footer = document.querySelector('.tf-footer');
    if (!footer) return;

    // ==========================================
    // 1. SCROLL REVEAL ANIMATION
    // ==========================================
    // Uses IntersectionObserver to trigger animations when footer enters viewport
    
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the footer is visible
    };

    const footerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class which triggers all CSS transitions
                footer.classList.add('tf-visible');
                
                // Trigger JS-specific animations
                animateHeadlineWordByWord();
                
                // Only animate once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    footerObserver.observe(footer);


    // ==========================================
    // 2. HEADLINE WORD-BY-WORD REVEAL
    // ==========================================
    
    function animateHeadlineWordByWord() {
        const headline = document.querySelector('.tf-hero-headline');
        if (!headline) return;

        // In a full production environment we might parse the text nodes and wrap them,
        // but since we have a specific structure, we can apply a simple opacity animation
        // to make it feel more dynamic.
        
        // This is a subtle enhancement over the CSS fade-in
        headline.style.opacity = '0';
        headline.style.transition = 'opacity 1s ease 0.4s';
        
        // Force reflow
        void headline.offsetWidth;
        
        headline.style.opacity = '1';
    }


    // ==========================================
    // 3. NEWSLETTER SUBMISSION
    // ==========================================
    
    const form = document.getElementById('tfNewsletter');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const input = form.querySelector('.tf-input');
            const btn = form.querySelector('.tf-btn-submit');
            const icon = btn.querySelector('i');
            
            if (input.value) {
                // Store original state
                const originalText = btn.childNodes[0].textContent;
                
                // Animate button to success state
                btn.style.backgroundColor = 'var(--tf-black)';
                btn.style.color = 'var(--tf-accent-green)';
                
                // Change icon
                icon.className = 'fas fa-check tf-icon-slide';
                
                // Change text
                btn.childNodes[0].textContent = 'PACKED! ';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    input.value = '';
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    
                    icon.className = 'far fa-paper-plane tf-icon-slide';
                    btn.childNodes[0].textContent = originalText;
                }, 3000);
            }
        });
    }


    // ==========================================
    // 4. PARALLAX DOODLES (Mouse Move)
    // ==========================================
    // Creates a subtle parallax effect based on mouse position within the footer
    
    footer.addEventListener('mousemove', (e) => {
        // Only run on desktop to save battery/performance on mobile
        if (window.innerWidth < 1024) return;
        
        const rect = footer.getBoundingClientRect();
        
        // Calculate normalized mouse coordinates (-1 to 1) relative to footer center
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        
        // Select decorations
        const arrow = document.querySelector('.tf-doodle-arrow');
        const leaf = document.querySelector('.tf-doodle-leaf');
        const sparkle = document.querySelector('.tf-doodle-sparkle');
        const smile = document.querySelector('.tf-doodle-smile');
        
        // Apply varying translations for depth effect
        // Note: we use transform addition in JS, but it overrides CSS animations.
        // For a true blend, we'd need a wrapper element, but this is a simple approximation.
        if (arrow) arrow.style.transform = `translate(${x * -15}px, ${y * -15}px)`;
        if (leaf) leaf.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        if (sparkle) sparkle.style.transform = `translate(${x * -10}px, ${y * -25}px)`;
        if (smile) smile.style.transform = `translate(${x * 30}px, ${y * -10}px)`;
    });
    
    // Reset positions when mouse leaves
    footer.addEventListener('mouseleave', () => {
        const doodles = document.querySelectorAll('.tf-doodle');
        doodles.forEach(doodle => {
            doodle.style.transform = ''; // Reverts to CSS animation transforms
        });
    });

});
