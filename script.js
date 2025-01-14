const text = [
    "an aspiring Product Manager",
    "a student at Barnard of Columbia", 
    "passionate about user experience", 
    "a problem solver", 
    "a foodie & travel lover!"
];
let speed = 100;
const textElements = document.querySelector(".typewriter");

let textIndex = 0;
let characterIndex = 0;

// Check if the element exists
if (!textElements) {
    console.error('Element with class "typewriter" not found!');
}

function typeWriter() {
    if (characterIndex < text[textIndex].length) {
        textElements.innerHTML += text[textIndex].charAt(characterIndex);  // Type one character at a time
        characterIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 1000);  // Erase after typing is done
    }
}

function eraseText() {
    if (textElements.innerHTML.length > 0) {
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);  // Remove one character at a time
        setTimeout(eraseText, 50);  // Continue erasing
    } else {
        textIndex = (textIndex + 1) % text.length;  // Move to the next text in the array
        characterIndex = 0;  // Reset character index
        setTimeout(typeWriter, 500);  // Start typing again after erasing
    }
}

window.onload = typeWriter;  // Start typing once the page loads
