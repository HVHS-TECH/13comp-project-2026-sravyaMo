// Initializes the elements(may change integration of this later)
const input = document.querySelector("input");
const guess = document.querySelector(".guess");
const checkButton = document.querySelector("button");

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
        [guess.textContent, input.disabled] = ["Correct number guessed!", true];
        [checkButton.textContent, guess.style.color] = ["Replay", "#27ae60"];
    } else if (inputValue > randomNum && inputValue < 100) { //guess too high
        [guess.textContent] = ["Guess too high"];
        guess.style.color = "#333";
    } else if (inputValue < randomNum && inputValue > 0) { //guess too low
        [guess.textContent] = ["Guess too low"];
        guess.style.color = "#333";
    } else { // for invalid input not in range 1-99
        [guess.textContent] = ["Invalid guess!"];
        guess.style.color = "#e74c3c";
    } 
});