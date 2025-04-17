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

    // Password toggle visibility
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });

    // Password strength meter
    password.addEventListener('input', function() {
        const strengthMeter = document.getElementById('strengthMeter');
        const strengthText = document.getElementById('strengthText');
        const passwordValue = this.value;
        
        // Calculate strength
        let strength = 0;
        
        // Length check
        if (passwordValue.length > 0) strength += 1;
        if (passwordValue.length >= 8) strength += 1;
        
        // Character type checks
        if (/[A-Z]/.test(passwordValue)) strength += 1;
        if (/[0-9]/.test(passwordValue)) strength += 1;
        if (/[^A-Za-z0-9]/.test(passwordValue)) strength += 1;
        
        // Update meter
        const width = strength * 20;
        strengthMeter.style.width = `${width}%`;
        
        // Update colors and text
        if (strength <= 1) {
            strengthMeter.style.background = 'var(--error-color)';
            strengthText.textContent = 'Weak';
            strengthText.style.color = 'var(--error-color)';
        } else if (strength <= 3) {
            strengthMeter.style.background = '#ffdd57';
            strengthText.textContent = 'Moderate';
            strengthText.style.color = '#ffdd57';
        } else {
            strengthMeter.style.background = 'var(--success-color)';
            strengthText.textContent = 'Strong';
            strengthText.style.color = 'var(--success-color)';
        }
    });

    // Form validation
    const form = document.getElementById('signupForm');
    const signupBtn = document.getElementById('signupBtn');
    const btnText = document.querySelector('.btn-text');
    const loader = document.getElementById('loader');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        let isValid = true;
        
        // Username validation
        const username = document.getElementById('username');
        const usernameError = document.getElementById('username-error');
        if (username.value.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
            isValid = false;
        } else {
            usernameError.textContent = '';
        }
        
        // Email validation
        const email = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }
        
        // Password validation
        const password = document.getElementById('password');
        const passwordError = document.getElementById('password-error');
        if (password.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }
        
        // Confirm password validation
        const confirmPassword = document.getElementById('confirm-password');
        const confirmError = document.getElementById('confirm-error');
        if (confirmPassword.value !== password.value) {
            confirmError.textContent = 'Passwords do not match';
            isValid = false;
        } else {
            confirmError.textContent = '';
        }
        
        // Terms checkbox validation
        const terms = document.getElementById('terms');
        if (!terms.checked) {
            alert('You must agree to the terms and conditions');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            signupBtn.classList.add('loading');
            
            setTimeout(() => {
                signupBtn.classList.remove('loading');
                alert('Account created successfully! Redirecting to dashboard...');
                window.location.href = 'dashboard.html';
            }, 2000);
        }
    });
});