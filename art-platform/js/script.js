document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const signinToggle = document.getElementById('signin-toggle');
    const signupToggle = document.getElementById('signup-toggle');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const formWrapper = document.querySelector('.form-wrapper');
    
    // Toggle between Sign In and Sign Up forms
    function toggleForm(isSignUp) {
        if (isSignUp) {
            signinToggle.classList.remove('active');
            signupToggle.classList.add('active');
            formWrapper.classList.add('signup-active');
            
            // Automatic transition back to sign in after 8 seconds
            clearTimeout(window.autoTransitionTimeout);
            window.autoTransitionTimeout = setTimeout(() => {
                toggleForm(false);
            }, 8000);
        } else {
            signinToggle.classList.add('active');
            signupToggle.classList.remove('active');
            formWrapper.classList.remove('signup-active');
            
            // Automatic transition to sign up after 8 seconds
            clearTimeout(window.autoTransitionTimeout);
            window.autoTransitionTimeout = setTimeout(() => {
                toggleForm(true);
            }, 8000);
        }
    }
    
    // Set up toggle button event listeners
    signinToggle.addEventListener('click', () => toggleForm(false));
    signupToggle.addEventListener('click', () => toggleForm(true));
    
    // Handle form submissions
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        // In a real app, you would send this data to a server
        console.log('Sign In attempt with:', { email, password });
        
        // Show success message
        alert('Sign In successful! (This is a demo)');
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
        
        // Simple validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // In a real app, you would send this data to a server
        console.log('Sign Up attempt with:', { name, email, password });
        
        // Show success message
        alert('Account created successfully! (This is a demo)');
        
        // Switch to sign in form after successful registration
        setTimeout(() => toggleForm(false), 1000);
    });
    
    // Initialize auto-transition
    window.autoTransitionTimeout = setTimeout(() => {
        toggleForm(true);
    }, 8000);
    
    // Pause auto-transition on hover
    formWrapper.addEventListener('mouseenter', function() {
        clearTimeout(window.autoTransitionTimeout);
    });
    
    // Resume auto-transition when mouse leaves
    formWrapper.addEventListener('mouseleave', function() {
        const isSignUpActive = formWrapper.classList.contains('signup-active');
        window.autoTransitionTimeout = setTimeout(() => {
            toggleForm(!isSignUpActive);
        }, 8000);
    });
    
    // Add focus effects to input fields
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
        const input = group.querySelector('input');
        const icon = group.querySelector('i');
        
        input.addEventListener('focus', function() {
            group.style.transform = 'translateY(-2px)';
            icon.style.color = '#6a11cb';
        });
        
        input.addEventListener('blur', function() {
            group.style.transform = 'translateY(0)';
            if (!this.value) {
                icon.style.color = '#999';
            }
        });
    });
});