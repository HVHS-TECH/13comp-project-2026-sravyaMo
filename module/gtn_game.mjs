// Initializes the elements(may change integration of this later)
const input = document.querySelector("input");
const guess = document.querySelector(".guess");
const checkButton = document.querySelector("button");

const roomDisplay = document.querySelector("#roomDisplay");
const playerCount = document.querySelector("#playerCount");

 // Room info
 const roomName = document.querySelector("roomName");
 const roomMode = document.querySelector("roomMode");

 // Display room
 roomDisplay.textContent = 'Room: $(roomName)';

 // Placeholder player text
 playerCount.textContent = "Waiting for a second player....";

 // Focus input
 input.focus();

 // Temp single-player number
// Comes from firebase
let randomNum = Math.floor(Math.random() * 100) + 1;

// Message animation bit
function showMessage(text, color = "#333") {
    guess.textContent = text;
    guess.style.color = color;
    guess.classList.remove("blink");
    void guess.offsetWidth;
    guess.classList.add("blink");
}

// Resets game
const resetGame = () => {
    randomNum = Math.floor(Math.random() * 100) + 1;
    input.disabled = false;
    input.value = "";
    guess.textContent = "";
    checkButton.textContent = "Guess";
};

// Guess button
checkButton.addEventListener("click", () => {
    if (input.disabled) {
        resetGame();
        return;
    }

    const inputValue = Number(input.value);

    if (inputValue === randomNum) {
        showMessage("correct number guessed!", "#27ae60");
        input.disabled = true;
        checkButton.textContent = "Replay";
    }
    else if (inputValue > randomNum && inputValue <= 100) {
        showMessage("Guess too high!");
    }
    else if (inputValue < randomNum && inputValue > 100) {
        showMessage("Guess too low!");
    }
    else {
        showMessage("Invalid guess", "#e743c3c");
    }
});

// Enter key
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkButton.click();
    }
});