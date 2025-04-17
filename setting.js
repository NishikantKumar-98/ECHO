document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.settings-section');
    
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

    // Password strength indicator
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        if (input.id !== 'confirm-password') {
            input.addEventListener('input', function() {
                const strengthMeter = this.closest('.form-group').querySelector('.strength-meter');
                const strength = calculatePasswordStrength(this.value);
                
                strengthMeter.style.width = `${strength * 20}%`;
                
                if (strength <= 1) {
                    strengthMeter.style.backgroundColor = 'var(--danger-color)';
                } else if (strength <= 3) {
                    strengthMeter.style.backgroundColor = 'var(--warning-color)';
                } else {
                    strengthMeter.style.backgroundColor = 'var(--success-color)';
                }
            });
        }
    });
    
    function calculatePasswordStrength(password) {
        let strength = 0;
        
        // Length check
        if (password.length > 0) strength += 1;
        if (password.length >= 8) strength += 1;
        
        // Character type checks
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        return strength;
    }

    // Save buttons functionality
    const saveButtons = document.querySelectorAll('.save-btn');
    
    saveButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show saving state
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            this.disabled = true;
            
            // Simulate save operation
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Saved!';
                
                // Reset button after delay
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 1500);
            }, 1000);
        });
    });

    // Theme selection
    const themeOptions = document.querySelectorAll('.theme-option input');
    
    themeOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.checked) {
                const theme = this.nextElementSibling.className.replace('theme-', '');
                applyTheme(theme);
            }
        });
    });
    
    function applyTheme(theme) {
        // In a real app, you would save this preference and apply it to the whole app
        console.log(`Theme changed to ${theme}`);
    }

    // Confirm dangerous actions
    const dangerButtons = document.querySelectorAll('.btn-danger');
    
    dangerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Are you sure you want to perform this action? This cannot be undone.')) {
                // In a real app, you would perform the dangerous action here
                alert('Action completed');
            }
        });
    });

    // Form validation for security section
    const securityForm = document.querySelector('#security .settings-form');
    
    if (securityForm) {
        securityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = this.querySelector('input[type="password"]').value;
            const newPassword = this.querySelectorAll('input[type="password"]')[1].value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[2].value;
            
            if (!currentPassword) {
                alert('Please enter your current password');
                return;
            }
            
            if (newPassword.length < 8) {
                alert('New password must be at least 8 characters');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // In a real app, you would submit the form here
            alert('Password changed successfully');
        });
    }
});