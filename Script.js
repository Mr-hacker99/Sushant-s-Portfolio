// Typewriter Effect (unchanged)
        const roles = [
            "Frontend Developer",
            "Graphic Designer",
            "UI / UX Designer",
            "SEO Specialist"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        const typingSpeed = 100;
        const erasingSpeed = 50;
        const delay = 1500;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        function type() {
            const el = document.querySelector(".typewriter-text");
            if (prefersReducedMotion) {
                el.textContent = roles.join(" • ");
                el.style.borderRight = "none";
                return;
            }

            if (charIndex < roles[roleIndex].length) {
                el.textContent += roles[roleIndex][charIndex];
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(erase, delay);
            }
        }

        function erase() {
            const el = document.querySelector(".typewriter-text");
            if (charIndex > 0) {
                el.textContent = roles[roleIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingSpeed);
            } else {
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, typingSpeed);
            }
        }

        document.addEventListener("DOMContentLoaded", () => {
            type();
        });

        // Mobile Menu Toggle (unchanged)
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });

        // Contact Form Submission (fixed: no duplicates, works with status element)
        const form = document.getElementById('contactForm');
        const statusEl = document.getElementById('formStatus');

        if (form && statusEl) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault(); // Prevents any redirect or reload

                statusEl.textContent = '';
                statusEl.style.color = '';

                const data = {};
                new FormData(form).forEach((value, key) => {
                    data[key] = value.trim();
                });

                if (!data.name || !data.email || !data.message) {
                    statusEl.textContent = 'Please fill in Name, Email, and Message.';
                    statusEl.style.color = 'red';
                    return;
                }

                statusEl.textContent = 'Sending your message...';
                statusEl.style.color = '#555';

                try {
                    // REPLACE WITH YOUR ACTUAL APPS SCRIPT WEB APP URL
                    const webAppUrl = "https://script.google.com/macros/s/AKfycbzcPyXtZuUZyvtYFUfXFgJ_z187WbGtnxfh1WxRj3AS/dev";

                    const response = await fetch(webAppUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });

                    const result = await response.json();

                    if (result.status === 'success') {
                        statusEl.textContent = 'Thank you! Your message was sent successfully.';
                        statusEl.style.color = 'green';
                        form.reset();
                    } else {
                        statusEl.textContent = 'Error: ' + (result.message || 'Submission failed');
                        statusEl.style.color = 'red';
                    }
                } catch (error) {
                    console.error('Submission error:', error);
                    statusEl.textContent = 'Connection error — please try again later.';
                    statusEl.style.color = 'red';
                }
            });
        }
    