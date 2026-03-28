document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const showError = (input, message) => {
        const group = input.closest('.form-group');
        let error = group.querySelector('.error-message');
        
        if (!error) {
            error = document.createElement('span');
            error.className = 'error-message';
            group.appendChild(error);
        }
        
        error.textContent = message;
        input.classList.add('invalid');
        
        // Dynamic error styling if not in CSS
        error.style.color = '#ef4444';
        error.style.fontSize = '0.8rem';
        error.style.marginTop = '0.25rem';
        error.style.display = 'block';
    };

    const clearError = (input) => {
        const group = input.closest('.form-group');
        const error = group.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        input.classList.remove('invalid');
    };

    const validateField = (input, rules) => {
        clearError(input);
        const value = input.value.trim();

        if (rules.required && !value) {
            showError(input, 'This field is required');
            return false;
        }

        if (rules.email && !emailPattern.test(value)) {
            showError(input, 'Please enter a valid email address');
            return false;
        }

        if (rules.minLength && value.length < rules.minLength) {
            showError(input, `Minimum ${rules.minLength} characters required`);
            return false;
        }

        if (rules.match && value !== document.getElementById(rules.match).value.trim()) {
            showError(input, 'Passwords do not match');
            return false;
        }

        return true;
    };

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const email = loginForm.querySelector('#email');
            const password = loginForm.querySelector('#password');

            let isValid = true;
            isValid &= validateField(email, { required: true, email: true });
            isValid &= validateField(password, { required: true });

            if (!isValid) {
                e.preventDefault();
            } else {
                // In a real app, you'd handle AJAX here
                alert('Login successful! (Simulated)');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            const name = registerForm.querySelector('#name');
            const email = registerForm.querySelector('#email');
            const phone = registerForm.querySelector('#phone');
            const password = registerForm.querySelector('#password');
            const confirmPassword = registerForm.querySelector('#confirmPassword');

            let isValid = true;
            isValid &= validateField(name, { required: true });
            isValid &= validateField(email, { required: true, email: true });
            isValid &= validateField(phone, { required: true });
            isValid &= validateField(password, { required: true, minLength: 6 });
            isValid &= validateField(confirmPassword, { required: true, match: 'password' });

            if (!isValid) {
                e.preventDefault();
            } else {
                alert('Account created successfully! (Simulated)');
            }
        });
    }

    // Clear errors on input
    const allInputs = document.querySelectorAll('.input-wrapper input');
    allInputs.forEach(input => {
        input.addEventListener('input', () => clearError(input));
    });

    // Password visibility toggle
    const togglePasswords = document.querySelectorAll('.toggle-password');
    togglePasswords.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Toggle eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
});
