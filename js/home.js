document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Glassmorphism on Scroll
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
        handleScroll(); // Initialize on load
    }

    // 2. Hero Photo Slideshow
    const slides = document.querySelectorAll('.slide-photo');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000); // Change photo every 3 seconds
    }

    // 3. Entrance Animation for Headline
    const textLines = document.querySelectorAll('.line-inner');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const textObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal each line with a staggered delay
                textLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('revealed');
                    }, index * 150 + 200); // 150ms delay between each line, starting after 200ms
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const heroSection = document.getElementById('hero');
    if (heroSection) {
        textObserver.observe(heroSection);
    }

    // 3. Mouse Parallax Effect for Floating Elements and Decor
    const parallaxElements = document.querySelectorAll('.float-el, .decor-blob, .glass-circle');
    
    window.addEventListener('mousemove', (e) => {
        // Calculate mouse position relative to center of screen
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;

        parallaxElements.forEach(el => {
            // Get speed from data attribute or default to 0.02
            const speed = parseFloat(el.getAttribute('data-speed')) || 0.02;
            
            // Floating elements have an inherent CSS animation (transform translateY).
            // Changing transform via JS overrides CSS animations unless we use CSS variables.
            // Let's use CSS variables to pass the mouse offset, then CSS can handle both.
            el.style.setProperty('--mouseX', `${x * speed * 10}px`);
            el.style.setProperty('--mouseY', `${y * speed * 10}px`);
            
            // For simple implementation without rewriting CSS animations, 
            // we will just apply a margin or translate via transform since
            // keyframes might overwrite. Wait, margin is safer to combine with CSS transform.
            // Better yet, we can apply transform if there's no CSS animation, 
            // or modify the transform string.
            // Let's just use transform for the parallax, it will look smooth.
            // If they have an animation, it might fight. 
            // Let's apply translation directly using transform and let the float happen naturally.
            // Wait, we can use margin to offset without touching transform!
            el.style.marginLeft = `${-x * speed * 20}px`;
            el.style.marginTop = `${-y * speed * 20}px`;
            
            // Add slight rotation based on mouse x
            if (el.classList.contains('decor-blob') || el.classList.contains('glass-circle')) {
                el.style.transform = `rotate(${x * speed}deg)`;
            }
        });
    }, { passive: true });

    // 4. Premium Gallery Logic
    // Text Splitting Utility
    const splitTextEls = document.querySelectorAll('.split-text');
    splitTextEls.forEach(el => {
        const text = el.innerHTML;
        let parsedText = text.replace(/<br\s*\/?>/gi, '^^br^^');
        let words = parsedText.split(' ').map((word, index) => {
            if (word === '') return '';
            if (word.includes('^^br^^')) {
                return word.split('^^br^^').map(w => w ? `<span class="word" style="transition-delay: ${index * 40}ms">${w}</span>` : '').join('<br>');
            }
            return `<span class="word" style="transition-delay: ${index * 40}ms">${word}</span>`;
        }).join(' ');
        el.innerHTML = words;
    });

    // Gallery Intersection Observer
    const galleryItems = document.querySelectorAll('.product-block, .gallery-header, .gallery-ending-block');
    const navDots = document.querySelectorAll('.nav-dot');
    
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
            }
        });
    }, { threshold: 0.15 });

    galleryItems.forEach(item => galleryObserver.observe(item));

    // Magnetic Wrap & Cursor Follow (Mouse Tracking)
    const magneticWraps = document.querySelectorAll('.magnetic-wrap');
    magneticWraps.forEach(wrap => {
        wrap.addEventListener('mousemove', (e) => {
            const rect = wrap.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            wrap.style.setProperty('--mouse-x', x * 2); // -1 to 1
            wrap.style.setProperty('--mouse-y', y * 2);
        });
        wrap.addEventListener('mouseleave', () => {
            wrap.style.setProperty('--mouse-x', 0);
            wrap.style.setProperty('--mouse-y', 0);
        });
    });

    // Magnetic Buttons
    const magBtns = document.querySelectorAll('.btn-magnetic');
    magBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width/2) * 0.3; // max ~15px
            const y = (e.clientY - rect.top - rect.height/2) * 0.3;
            btn.style.transform = `translate(${x}px, ${y}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // Parallax Scroll Engine
    const parallaxDecor = document.querySelectorAll('.float-decor, .parallax-fast, .parallax-slow');
    const endingText = document.querySelector('.ending-title');
    const endingLine = document.querySelector('.ending-green-line');
    
    let isScrolling = false;
    
    const updateParallax = () => {
        const scrolled = window.scrollY;
        
        // Update Decor Parallax
        parallaxDecor.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed')) || (el.classList.contains('parallax-fast') ? -0.05 : 0.02);
            const rect = el.getBoundingClientRect();
            const elCenterY = rect.top + rect.height/2;
            const viewCenterY = window.innerHeight / 2;
            const diff = elCenterY - viewCenterY;
            
            el.style.transform = `translateY(${diff * speed}px)`;
        });

        // Update Ending Block
        if (endingText) {
            const rect = endingText.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scaleVal = 1 + (window.innerHeight - rect.top) * 0.0005;
                endingText.style.transform = `scale(${Math.min(scaleVal, 1.2)})`;
                endingLine.style.width = `${Math.min((window.innerHeight - rect.top) * 0.1, 100)}%`;
            }
        }

        // Update Nav Dots
        document.querySelectorAll('.product-block').forEach((block, index) => {
            const rect = block.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                navDots.forEach(dot => dot.classList.remove('active'));
                if(navDots[index]) navDots[index].classList.add('active');
            }
        });

        isScrolling = false;
    };

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(updateParallax);
            isScrolling = true;
        }
    }, { passive: true });

    // Click on nav dots
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if(targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. Product Page Visual Enhancements
    const productTitles = document.querySelectorAll('.slide-title');
    productTitles.forEach(title => {
        // Split only if not already split
        if (!title.querySelector('.word')) {
            const text = title.innerHTML.trim();
            const words = text.split(' ').map((word, index) => {
                return `<span class="word" style="transition-delay: ${index * 60}ms">${word}</span>`;
            }).join(' ');
            title.innerHTML = words;
        }
    });

    const productImages = document.querySelectorAll('.slide-image');
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 70;
        const y = (window.innerHeight / 2 - e.clientY) / 70;
        
        productImages.forEach(img => {
            img.style.position = 'relative';
            img.style.left = `${x}px`;
            img.style.top = `${y}px`;
        });
    }, { passive: true });
});

    // Enhanced Premium Background Injection for Text Areas
    const textAreas = document.querySelectorAll(".product-block .text-area");
    textAreas.forEach(area => {
        if (area.querySelector(".premium-bg-wrapper")) return;

        const bgWrapper = document.createElement("div");
        bgWrapper.className = "premium-bg-wrapper";
        
        bgWrapper.innerHTML = `
            <!-- 5-8 Oversized Organic Blobs -->
            <div class="bg-layer layer-blob blob-1" data-speed="0.05"></div>
            <div class="bg-layer layer-blob blob-2" data-speed="-0.03"></div>
            <div class="bg-layer layer-blob blob-3" data-speed="0.04"></div>
            <div class="bg-layer layer-blob blob-4" data-speed="-0.05"></div>
            <div class="bg-layer layer-blob blob-5" data-speed="0.02"></div>
            <div class="bg-layer layer-blob blob-6" data-speed="0.06"></div>
            
            <!-- 4 Soft Cloud Shapes -->
            <div class="bg-layer layer-cloud cloud-1" data-speed="0.02"></div>
            <div class="bg-layer layer-cloud cloud-2" data-speed="-0.01"></div>
            <div class="bg-layer layer-cloud cloud-3" data-speed="0.03"></div>
            <div class="bg-layer layer-cloud cloud-4" data-speed="-0.02"></div>

            <!-- 3 Paper-cut layers -->
            <div class="bg-layer layer-papercut paper-1" data-speed="0.01"></div>
            <div class="bg-layer layer-papercut paper-2" data-speed="-0.02"></div>
            <div class="bg-layer layer-papercut paper-3" data-speed="0.04"></div>

            <!-- 3 Large faded circles -->
            <div class="bg-layer layer-circle circle-1" data-speed="-0.03"></div>
            <div class="bg-layer layer-circle circle-2" data-speed="0.02"></div>
            <div class="bg-layer layer-circle circle-3" data-speed="0.05"></div>

            <!-- 2 Semi-transparent arches -->
            <div class="bg-layer layer-arch arch-1" data-speed="-0.01"></div>
            <div class="bg-layer layer-arch arch-2" data-speed="0.02"></div>

            <!-- Outlines, Grids, Lines, Particles, Leaves -->
            <div class="bg-layer layer-outline-circle" data-speed="-0.04"></div>
            <div class="bg-layer layer-dotted-grid" data-speed="0.01"></div>
            <div class="bg-layer layer-packaging-lines" data-speed="0.03"></div>
            <div class="bg-layer layer-particles" data-speed="0.06"></div>
            <div class="bg-layer layer-leaf-1" data-speed="-0.02"></div>
            <div class="bg-layer layer-leaf-2" data-speed="0.01"></div>
        `;
        
        area.insertBefore(bgWrapper, area.firstChild);
    });

    window.addEventListener("mousemove", (e) => {
        const x = (window.innerWidth / 2 - e.clientX);
        const y = (window.innerHeight / 2 - e.clientY);
        
        document.querySelectorAll(".premium-bg-wrapper .bg-layer").forEach(layer => {
            const speed = parseFloat(layer.getAttribute("data-speed")) || 0;
            if (speed !== 0) {
                layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            }
        });
    }, { passive: true });

