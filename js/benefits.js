// ==========================================
// BENEFITS SECTION INTERACTIONS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const benefitsSection = document.getElementById('benefits');
    if (!benefitsSection) return;

    // Scroll Reveal
    const bObserverOptions = { threshold: 0.1, rootMargin: "0px" };
    const bObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('tf-visible');
                
                // Draw lines
                const lines = entry.target.querySelectorAll('.tf-connector-line');
                lines.forEach(line => line.classList.add('drawn'));
                
                observer.unobserve(entry.target);
            }
        });
    }, bObserverOptions);
    
    bObserver.observe(benefitsSection);

    // Hover Highlights (Tags and Lines)
    const scatterItems = benefitsSection.querySelectorAll('.tf-scatter-item');
    
    scatterItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            // Dim others
            scatterItems.forEach(other => { if(other !== item) other.style.opacity = '0.5'; });
            const tags = benefitsSection.querySelectorAll('.tf-benefit-tag');
            tags.forEach(tag => tag.style.opacity = '0.3');
            
            // Highlight target
            const targetId = item.getAttribute('data-target');
            const targetTag = document.getElementById(targetId);
            if (targetTag) {
                targetTag.style.opacity = '1';
                targetTag.classList.add('highlight');
            }
            
            // Highlight line (assuming line indices match 1-4, etc.)
            const line = benefitsSection.querySelector(`.tf-line-${index+1}`);
            if (line) line.classList.add('highlight');
        });
        
        item.addEventListener('mouseleave', () => {
            scatterItems.forEach(other => other.style.opacity = '1');
            const tags = benefitsSection.querySelectorAll('.tf-benefit-tag');
            tags.forEach(tag => {
                tag.style.opacity = '1';
                tag.classList.remove('highlight');
            });
            const lines = benefitsSection.querySelectorAll('.tf-connector-line');
            lines.forEach(line => line.classList.remove('highlight'));
        });
    });

    // Benefits Magnetic Button
    const tfMagBtn = benefitsSection.querySelector('.tf-magnetic-btn');
    if (tfMagBtn) {
        tfMagBtn.addEventListener('mousemove', (e) => {
            const rect = tfMagBtn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width/2) * 0.3;
            const y = (e.clientY - rect.top - rect.height/2) * 0.3;
            tfMagBtn.style.transform = `translate(${x}px, ${y}px)`;
        });
        tfMagBtn.addEventListener('mouseleave', () => {
            tfMagBtn.style.transform = `translate(0px, 0px)`;
        });
    }
});
