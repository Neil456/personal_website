document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Nav Link Observer
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all
                navItems.forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.nav-line').style.width = '';
                    item.querySelector('.nav-line').style.backgroundColor = '';
                });

                // Add active class to current
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-item[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    // We let CSS handle the styles via class, but we can enforce if needed
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Subtle hover effect for Cards
    const cards = document.querySelectorAll('.experience-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 0, 0, 0.02), transparent 40%)`;
            card.style.borderColor = `rgba(0, 0, 0, 0.08)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
            card.style.borderColor = 'transparent';
        });
    });

    // Slot Machine Effect for Name and Title
    const animateSlotMachine = (element, text, duration = 1000, stagger = 50) => {
        element.innerHTML = ''; // Clear original text
        element.style.opacity = '1'; // Ensure container is visible
        
        const chars = text.split('');
        
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * stagger}ms`;
            
            if (char === ' ') {
                span.style.width = '0.3em';
            }
            
            element.appendChild(span);
            
            // Trigger animation after a small delay
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100);
        });
    };

    const nameElement = document.querySelector('.profile-header h1');
    const titleElement = document.querySelector('.profile-header h2');

    if (nameElement) {
        const nameText = nameElement.textContent.trim();
        animateSlotMachine(nameElement, nameText, 1000, 50);
    }

    if (titleElement) {
        // Start at the same time as name
        const titleText = titleElement.textContent.trim();
        animateSlotMachine(titleElement, titleText, 1000, 30);
    }

    // Dynamic Background Glow
    const cursorGlow = document.querySelector('.cursor-glow');
    
    if (cursorGlow) {
        let isVisible = false;

        document.addEventListener('mousemove', (e) => {
            if (!isVisible) {
                document.body.classList.add('has-cursor');
                isVisible = true;
            }

            requestAnimationFrame(() => {
                const x = e.clientX;
                const y = e.clientY;
                
                cursorGlow.style.setProperty('--mouse-x', `${x}px`);
                cursorGlow.style.setProperty('--mouse-y', `${y}px`);
                
                // Dynamic hue shift based on X position (Blue -> Purple -> Pink)
                const width = window.innerWidth;
                const hue = 210 + (x / width) * 60; // 210 (Blue) to 270 (Purple)
                cursorGlow.style.setProperty('--glow-hue', hue);
            });
        });
    }
});
