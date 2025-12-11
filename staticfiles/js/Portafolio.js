// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // File modal functionality
    const fileModal = document.getElementById('fileModal');
    const closeModal = document.getElementById('closeModal');
    const fileViewer = document.getElementById('fileViewer');

    // Open file in modal
    window.openFile = function(fileUrl) {
        const fileExtension = fileUrl.split('.').pop().toLowerCase();

        if (fileExtension === 'pdf') {
            // Open PDFs in new tab for better compatibility
            window.open(fileUrl, '_blank');
            return;
        } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
            fileViewer.innerHTML = `<img src="${fileUrl}" alt="File Preview" style="max-width: 100%; max-height: 500px;">`;
        } else {
            fileViewer.innerHTML = `<p>Archivo no soportado para vista previa. <a href="${fileUrl}" target="_blank">Descargar</a></p>`;
        }

        fileModal.style.display = 'flex';
    };

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            fileModal.style.display = 'none';
            fileViewer.innerHTML = '';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === fileModal) {
            fileModal.style.display = 'none';
            fileViewer.innerHTML = '';
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && fileModal.style.display === 'flex') {
            fileModal.style.display = 'none';
            fileViewer.innerHTML = '';
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation for file previews
    const fileItems = document.querySelectorAll('.work-file-item');
    fileItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const targetValue = parseInt(stat.textContent.replace(/[^\d]/g, ''));
                if (!isNaN(targetValue)) {
                    animateNumber(stat, 0, targetValue, 2000);
                }
                statsObserver.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Animate cards on scroll
    const memberCards = document.querySelectorAll('.portfolio-member-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    memberCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    // Initialize cards with staggered animation
    memberCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Animate number counter
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const endTime = startTime + duration;

    function updateNumber(currentTime) {
        if (currentTime >= endTime) {
            element.textContent = end;
            return;
        }

        const progress = (currentTime - startTime) / duration;
        const currentValue = Math.floor(start + (end - start) * easeOutCubic(progress));

        element.textContent = currentValue;

        requestAnimationFrame(updateNumber);
    }

    requestAnimationFrame(updateNumber);
}

// Easing function for smooth animation
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Add loading states for better UX
function showLoadingState(element) {
    element.style.opacity = '0.7';
    element.style.pointerEvents = 'none';
}

function hideLoadingState(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Handle file loading
document.addEventListener('click', function(e) {
    if (e.target.closest('.work-file-item')) {
        const item = e.target.closest('.work-file-item');
        showLoadingState(item);

        // Simulate loading (remove this in production)
        setTimeout(() => {
            hideLoadingState(item);
        }, 500);
    }
});