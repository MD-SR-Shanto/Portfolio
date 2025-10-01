// --- 1. Toggle Navbar for Mobile ---
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('#menu-btn');
    const navbar = document.querySelector('.navbar');

    menuBtn.onclick = () => {
        menuBtn.classList.toggle('fa-xmark');
        navbar.classList.toggle('active');
    };

    // Close navbar when a link is clicked
    document.querySelectorAll('.navbar a').forEach(link => {
        link.onclick = () => {
            menuBtn.classList.remove('fa-xmark');
            navbar.classList.remove('active');
        };
    });
});


// --- 2. Scroll Reveal Animation Functionality ---

/**
 * Checks if an element is in the viewport and adds the 'active' class.
 * @param {HTMLElement} element 
 */
function revealOnScroll(element) {
    const windowHeight = window.innerHeight;
    // Get the position of the element relative to the viewport
    const elementTop = element.getBoundingClientRect().top;
    // Tweak this value to control when the animation starts (e.g., 150px before the top)
    const revealPoint = 150; 

    if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
    } else {
        // Optional: remove 'active' when scrolled away (for re-animation)
        element.classList.remove('active');
    }
}

// Find all elements with the 'reveal' class
const revealElements = document.querySelectorAll('.reveal');

// Function to run on scroll and initial load
function handleScroll() {
    revealElements.forEach(el => {
        revealOnScroll(el);
    });
}

// Attach the function to the scroll event
window.addEventListener('scroll', handleScroll);

// Run on initial load to reveal elements already in view
handleScroll();


// --- 3. Typing Text Animation (Home Section) ---
const typingElement = document.querySelector('.typing-text');
const texts = ["Web Developer", "Frontend Expert", "UI/UX Designer", "Problem Solver"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Faster deleting
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100; // Normal typing
    }

    // Finished typing a word
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } 
    // Finished deleting a word
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length; // Move to the next word
        typingSpeed = 300; // Short pause before starting next word
    }

    setTimeout(type, typingSpeed);
}

// Start the typing animation
if(typingElement) {
    type();
}