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
}