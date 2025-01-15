const text = [
    "an aspiring Product Manager",
    "a student at Barnard of Columbia", 
    "passionate about user experience", 
    "a music lover",
    "a problem solver", 
    "a foodie & travel lover!", 
    "a data enthusiast"
];
let speed = 100;
const textElements = document.querySelector(".typewriter");

let textIndex = 0;
let characterIndex = 0;

if (!textElements) {// Check if the elm exists
    console.error('Element with class "typewriter" not found!');
}

function typeWriter() {
    if (characterIndex < text[textIndex].length) {
        textElements.innerHTML += text[textIndex].charAt(characterIndex);  
        characterIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 1000);  
    }
}

function eraseText() {
    if (textElements.innerHTML.length > 0) {
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);  // one char at a time, erases
        setTimeout(eraseText, 50);  // continues erasing
    } else {
        textIndex = (textIndex + 1) % text.length;  
        characterIndex = 0;  
        setTimeout(typeWriter, 500);  
    }
}

window.onload = typeWriter; 
