// Initializes the elements(may change integration of this later)
const input = document.querySelector("input");
const guess = document.querySelector(".guess");
const checkButton = document.querySelector("button");

function showMessage(text, color = "#333") {
  guess.textContent = text;
  guess.style.color = color;
 
 // restart animation every single time
guess.classList.remove("blink");
void guess.offsetWidth;
guess.classList.add("blink");
}

//sets the initial focus on input field
input.focus();

//function to reset game
const resetGame = () => {
    randomNum = Math.floor(Math.random() * 100); // new number generator part
    input.disabled = false;
    guess.textContent = ""; //clear guess display
    guess.style.color = "#333"; // repeat guess color of text
    input.value = ""; // clear input field
    checkButton.textContent = "check"; //reset button text
};

//generate number between 0 and 99
let randomNum = Math.floor(Math.random() * 100);

// add click event listener to check button
checkButton.addEventListener("click", () => {
    if (input.disabled) {
        //if input disabled, reset game
        resetGame ();
        return;
    }

    let inputValue = input.value; //gets value from input page

    if (inputValue == randomNum) { // correct guess
      showMessage("Correct number guessed!", "#27ae60");
      input.disabled = true;
      checkButton.textContent = "Replay";
    } else if (inputValue > randomNum && inputValue <= 100) { //guess too high
        showMessage("Guess too high!");
    } else if (inputValue < randomNum && inputValue > 0) { //guess too low
        showMessage("Guess too low!");
    } else { // for invalid input not in range 1-99
        showMessage("Invalid guess!", "#e74c3c");
    }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkButton.click();
  }
});