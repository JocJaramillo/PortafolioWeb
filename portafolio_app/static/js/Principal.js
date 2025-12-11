document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Animate Skill Bars ========== //
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 100);
                
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
    
    // ========== Hero Parallax Effect ========== //
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    // ========== Floating Elements Animation ========== //
    const floatingElements = document.querySelectorAll('.float-item');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
    
    // ========== Portfolio Filter (if needed) ========== //
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ========== Team Carousel ========== //
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const paginationDots = document.querySelectorAll('.pagination-dot');
    const progressFill = document.querySelector('.carousel-progress-fill');
    let currentSlide = 0;
    let carouselInterval;
    let progressInterval;
    let progressValue = 0;
    
    function resetProgress() {
        progressValue = 0;
        if (progressFill) {
            progressFill.style.width = '0%';
        }
    }
    
    function updateProgress() {
        progressValue += 0.1; // Increment by 0.1% every 10ms
        if (progressFill) {
            progressFill.style.width = progressValue + '%';
        }
        
        if (progressValue >= 100) {
            nextSlide();
        }
    }
    
    function showSlide(index) {
        // Remove active class from all slides
        carouselSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        paginationDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add active class to current slide
        if (carouselSlides[index]) {
            carouselSlides[index].classList.add('active');
            paginationDots[index].classList.add('active');
            currentSlide = index;
            resetProgress();
        }
    }
    
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= carouselSlides.length) {
            next = 0;
        }
        showSlide(next);
    }
    
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = carouselSlides.length - 1;
        }
        showSlide(prev);
    }
    
    function startCarousel() {
        progressInterval = setInterval(updateProgress, 10); // Update every 10ms for smooth animation
    }
    
    function stopCarousel() {
        clearInterval(progressInterval);
    }
    
    function restartCarousel() {
        stopCarousel();
        resetProgress();
        startCarousel();
    }
    
    // Event listeners for navigation buttons
    if (carouselNext) {
        carouselNext.addEventListener('click', () => {
            nextSlide();
            restartCarousel();
        });
    }
    
    if (carouselPrev) {
        carouselPrev.addEventListener('click', () => {
            prevSlide();
            restartCarousel();
        });
    }
    
    // Event listeners for pagination dots
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const direction = index > currentSlide ? 'right' : 'left';
            showSlide(index, direction);
            restartCarousel();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            restartCarousel();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            restartCarousel();
        }
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carouselWrapper = document.querySelector('.team-carousel-wrapper');
    
    if (carouselWrapper) {
        carouselWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carouselWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
            restartCarousel();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
            restartCarousel();
        }
    }
    
    // Pause carousel on hover
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', stopCarousel);
        carouselWrapper.addEventListener('mouseleave', () => {
            restartCarousel();
        });
    }
    
    // Start carousel
    if (carouselSlides.length > 0) {
        startCarousel();
    }
    
    // Stop carousel when navigating away
    window.addEventListener('beforeunload', stopCarousel);
    
    // Pause carousel when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopCarousel();
        } else {
            restartCarousel();
        }
    });
    
    // ========== Scroll Progress Indicator ========== //
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--primary-color);
        width: 0%;
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // ========== Typing Effect for Hero Title ========== //
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !sessionStorage.getItem('heroAnimated')) {
        const bienvenidosText = 'BIENVENIDOS';
        const portafolioHTML = '<span class="highlight">A NUESTRO PORTAFOLIO</span>';
        heroTitle.innerHTML = '';
        heroTitle.style.opacity = '1';
        let charIndex = 0;
        function typeBienvenidos() {
            if (charIndex < bienvenidosText.length) {
                heroTitle.innerHTML = bienvenidosText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeBienvenidos, 70);
            } else {
                setTimeout(typePortafolio, 400);
            }
        }
        function typePortafolio() {
            heroTitle.innerHTML = bienvenidosText + '<br>';
            let portafolioIndex = 0;
            function typePortafolioStep() {
                if (portafolioIndex < 'A NUESTRO PORTAFOLIO'.length) {
                    heroTitle.innerHTML = bienvenidosText + '<br><span class="highlight">' + 'A NUESTRO PORTAFOLIO'.substring(0, portafolioIndex + 1) + '</span>';
                    portafolioIndex++;
                    setTimeout(typePortafolioStep, 70);
                } else {
                    sessionStorage.setItem('heroAnimated', 'true');
                }
            }
            typePortafolioStep();
        }
        setTimeout(typeBienvenidos, 400);
    }
    
    // ========== Counter Animation for Stats ========== //
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // ========== Portfolio Image Lazy Load with Fade ========== //
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    
    portfolioImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
    
    // ========== Experience Timeline Animation ========== //
    const experienceItems = document.querySelectorAll('.experience-item');
    
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                experienceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    experienceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        experienceObserver.observe(item);
    });
    
    // ========== Hobbies Animation ========== //
    const hobbyItems = document.querySelectorAll('.hobby-item');
    
    hobbyItems.forEach((hobby, index) => {
        hobby.style.opacity = '0';
        hobby.style.transform = 'scale(0.8)';
        hobby.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            hobby.style.opacity = '1';
            hobby.style.transform = 'scale(1)';
        }, 100 * index);
    });
    
    // ========== Smooth Section Transitions ========== //
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // ========== Portfolio Grid Masonry Effect ========== //
    function adjustPortfolioGrid() {
        const grid = document.querySelector('.portfolio-grid');
        if (!grid) return;
        
        const items = grid.querySelectorAll('.portfolio-item');
        let maxHeight = 0;
        
        items.forEach(item => {
            const height = item.offsetHeight;
            if (height > maxHeight) maxHeight = height;
        });
    }
    
    window.addEventListener('load', adjustPortfolioGrid);
    window.addEventListener('resize', adjustPortfolioGrid);
    
    // ========== Add Click Animation to Buttons ========== //
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ========== Mouse Cursor Custom Effect (Optional) ========== //
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: 0.1s;
        z-index: 10000;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });
    
    console.log('✨ Principal page scripts loaded');
});