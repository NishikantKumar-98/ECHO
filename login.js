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

    // Form validation and submission
    const form = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // Validate inputs
        let isValid = true;
        
        // Email validation
        const emailError = document.getElementById('email-error');
        if (!email) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError.textContent = 'Please enter a valid email';
            isValid = false;
        } else {
            emailError.textContent = '';
        }
        
        // Password validation
        const passwordError = document.getElementById('password-error');
        if (!password) {
            passwordError.textContent = 'Password is required';
            isValid = false;
        } else if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }
        
        if (!isValid) return;
        
        // Show loading state
        loginBtn.classList.add('loading');
        
        try {
            // Simulate API call (replace with actual fetch)
            const response = await simulateLogin(email, password);
            
            if (response.success) {
                // Save to localStorage if "Remember me" is checked
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Login failed: ' + response.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
        } finally {
            loginBtn.classList.remove('loading');
        }
    });

    // Check for remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }

    // Simulate login function (replace with actual API call)
    function simulateLogin(email, password) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // This is just a simulation - in a real app, you would call your backend
                if (email === 'admin@energyshield.com' && password === 'password123') {
                    resolve({ success: true, message: 'Login successful' });
                } else {
                    resolve({ success: false, message: 'Invalid credentials' });
                }
            }, 1500);
        });
    }

    // Social login buttons
    document.querySelectorAll('.social-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.classList.contains('google') ? 'Google' : 
                           this.classList.contains('microsoft') ? 'Microsoft' : 'GitHub';
            alert(`Redirecting to ${provider} login...`);
            // In a real app, you would redirect to the OAuth endpoint
        });
    });
});