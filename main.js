// Debounced scroll listener to improve performance
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            document.querySelector('nav').classList.toggle('window-scroll', window.scrollY > 0);
            isScrolling = false;
        });
    }
    isScrolling = true;
});

// FAQ toggle with dynamic icon change (optional)
const faqs = document.querySelectorAll('.freq');

faqs.forEach(freq => {
    freq.addEventListener("click", () => {
        freq.classList.toggle("open");

        // Optional: Toggle the icon between '+' and '-'
        const icon = freq.querySelector('.material-symbols-outlined');
        icon.textContent = freq.classList.contains('open') ? 'remove' : 'add';
    });
});
// Get necessary elements
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('open-menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const navMenu = document.querySelector('.nav__menu');

    if (menuBtn && closeBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.add('open');
        });

        closeBtn.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    }
 
});
//FORM VALIDATION
const form = document.querySelector('.contact__form');
const nameInput = form.querySelector('input[name="name"]');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Helper function to display error message
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    input.classList.add('input-error');
}

// Helper function to clear error message
function clearError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
    input.classList.remove('input-error');
}

// Validate email format
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Form submission event listener
form.addEventListener('submit', (e) => {
    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required.');
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // Validate Email
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required.');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address.');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Validate Message
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message cannot be empty.');
        isValid = false;
    } else {
        clearError(messageInput);
    }

    // Prevent form submission if validation fails
    if (!isValid) {
        e.preventDefault();
    } else {
        alert('Form submitted successfully!');
    }
});
fetch('/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: 'user@example.com',
        password: 'yourpassword'
    })
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('There was a problem with your fetch operation:', error);
});


