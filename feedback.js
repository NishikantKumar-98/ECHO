document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#02d9ff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#02d9ff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        }
    });

    // Tab navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.feedback-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));
            
            // Show the selected section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Form submission handling
    const forms = document.querySelectorAll('.feedback-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.save-btn');
            submitBtn.classList.add('loading');
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                
                // Show success message
                const successAlert = document.createElement('div');
                successAlert.className = 'alert success';
                successAlert.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <span>Thank you! Your feedback has been submitted successfully.</span>
                `;
                form.prepend(successAlert);
                
                // Remove alert after 5 seconds
                setTimeout(() => {
                    successAlert.remove();
                }, 5000);
                
                // Reset form after submission
                form.reset();
            }, 1500);
        });
    });

    // Rating hover effects
    const ratingLabels = document.querySelectorAll('.rating-label');
    
    ratingLabels.forEach(label => {
        label.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        label.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            // In a real app, you would handle logout logic here
            window.location.href = 'welcome.html';
        }
    });

    // Back button
    const backBtn = document.querySelector('.back-btn');
    
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'dashboard.html';
    });
});