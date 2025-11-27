const text = [
    "an aspiring Product Manager",
    "a student at Barnard of Columbia", 
    "passionate about user experience", 
    "a music lover",
    "a problem solver", 
    "a foodie & travel lover", 
    "a data enthusiast"
];

let speed = 100;
const textElement = document.querySelector(".typewriter");

let textIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = text[textIndex];
    
    if (!isDeleting) {
        // Typing
        textElement.innerHTML = currentText.substring(0, characterIndex + 1);
        characterIndex++;
        
        if (characterIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000); // Pause at end
        } else {
            setTimeout(typeWriter, speed);
        }
    } else {
        // Deleting
        textElement.innerHTML = currentText.substring(0, characterIndex - 1);
        characterIndex--;
        
        if (characterIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % text.length;
            setTimeout(typeWriter, 500); // Pause before next word
        } else {
            setTimeout(typeWriter, speed / 2);
        }
    }
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .skill-card, .language-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    if (textElement) {
        typeWriter();
    }
    initScrollAnimations();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});