document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Form Validation ========== //
    const contactForm = document.querySelector('.contact-form');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Check if required field is empty
        if (field.hasAttribute('required') && value === '') {
            isValid = false;
            errorMessage = 'Este campo es requerido';
        }
        
        // Validate email
        if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Email inválido';
            }
        }
        
        // Update field state
        if (!isValid) {
            field.classList.add('error');
            field.style.borderColor = '#ef4444';
            showFieldError(field, errorMessage);
        } else {
            field.classList.remove('error');
            field.style.borderColor = '';
            removeFieldError(field);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        let errorDiv = field.parentElement.querySelector('.error-message');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                color: #ef4444;
                font-size: 0.85rem;
                margin-top: 0.5rem;
                animation: fadeIn 0.3s ease;
            `;
            field.parentElement.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
    }
    
    function removeFieldError(field) {
        const errorDiv = field.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // ========== Form Submission ========== //
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                if (window.showNotification) {
                    window.showNotification('Por favor corrige los errores en el formulario', 'error');
                }
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual submission)
            setTimeout(() => {
                // Success
                if (window.showNotification) {
                    window.showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
                }
                
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // You can uncomment this to actually submit the form
                // contactForm.submit();
            }, 2000);
        });
    }
    
    // ========== Character Counter for Textarea ========== //
    const messageTextarea = document.querySelector('textarea[name="mensaje"]');
    
    if (messageTextarea) {
        const maxLength = 500;
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            color: var(--text-secondary);
            font-size: 0.85rem;
            margin-top: 0.5rem;
        `;
        messageTextarea.parentElement.appendChild(counter);
        
        function updateCounter() {
            const length = messageTextarea.value.length;
            counter.textContent = `${length} / ${maxLength} caracteres`;
            
            if (length > maxLength) {
                counter.style.color = '#ef4444';
            } else {
                counter.style.color = 'var(--text-secondary)';
            }
        }
        
        updateCounter();
        messageTextarea.addEventListener('input', updateCounter);
    }
    
    // ========== Info Items Animation ========== //
    const infoItems = document.querySelectorAll('.info-item');
    
    const infoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                infoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    infoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        infoObserver.observe(item);
    });
    
    // ========== Copy Contact Info ========== //
    infoItems.forEach(item => {
        item.addEventListener('click', function() {
            const content = this.querySelector('.info-content p').textContent;
            
            navigator.clipboard.writeText(content).then(() => {
                const originalBg = this.style.background;
                this.style.background = 'rgba(0, 217, 255, 0.2)';
                
                if (window.showNotification) {
                    window.showNotification('Información copiada al portapapeles', 'success');
                }
                
                setTimeout(() => {
                    this.style.background = originalBg;
                }, 1000);
            }).catch(err => {
                console.error('Error copying:', err);
            });
        });
        
        item.style.cursor = 'pointer';
        item.title = 'Click para copiar';
    });
    
    // ========== Social Links Animation ========== //
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'scale(0)';
        link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'scale(1)';
        }, 100 * index);
    });
    
    // ========== Form Input Focus Effect ========== //
    formInputs.forEach(input => {
        const label = input.previousElementSibling;
        
        input.addEventListener('focus', function() {
            if (label) {
                label.style.color = 'var(--primary-color)';
            }
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            if (label) {
                label.style.color = '';
            }
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // ========== Auto-resize Textarea ========== //
    const textarea = document.querySelector('textarea');
    
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
    
    // ========== Phone Number Formatting ========== //
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 7) {
                    value = value.slice(0, 3) + '-' + value.slice(3);
                } else {
                    value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
                }
            }
            
            e.target.value = value;
        });
    });
    
    // ========== Prevent Spam Submissions ========== //
    let lastSubmitTime = 0;
    const submitCooldown = 5000; // 5 seconds
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const now = Date.now();
            
            if (now - lastSubmitTime < submitCooldown) {
                e.preventDefault();
                if (window.showNotification) {
                    window.showNotification('Por favor espera unos segundos antes de enviar otro mensaje', 'error');
                }
                return false;
            }
            
            lastSubmitTime = now;
        });
    }
    
    // ========== Honeypot Anti-Spam Field ========== //
    if (contactForm) {
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.style.display = 'none';
        honeypot.tabIndex = -1;
        honeypot.autocomplete = 'off';
        contactForm.appendChild(honeypot);
        
        contactForm.addEventListener('submit', function(e) {
            if (honeypot.value !== '') {
                e.preventDefault();
                console.log('Spam detected');
                return false;
            }
        });
    }
    
    // ========== Show Success Message Animation ========== //
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-overlay';
        successDiv.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--primary-color);"></i>
                <h3 style="margin: 1rem 0;">¡Mensaje Enviado!</h3>
                <p>Gracias por contactarnos. Te responderemos pronto.</p>
            </div>
        `;
        successDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(10, 10, 20, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => successDiv.remove(), 300);
        }, 3000);
    }
    
    // ========== Focus First Input on Load ========== //
    setTimeout(() => {
        const firstInput = contactForm?.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }, 500);
    
    console.log('📧 Contact page scripts loaded');
});