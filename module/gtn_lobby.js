// Popup elements
const popup = document.querySelector(".popup");
const popupTitle = document.querySelector("#popupTitle");
const popupMessage = document.querySelector(".popupMessage");

// Buttons
const createBtn = document.querySelector("#createBtn");
const joinBtn = document.querySelector("#joinBtn");
const submitBtn = document.querySelector("#submitBtn");
const closeBtn = document.querySelector("#submitBtn");

// Input 
const serverInput = document.querySelector("#serverInput");

// Current mode
let mode = ""

// Opening the "Create" popup
createBtn.addEventListener("click", () => {
    mode = "create";
    popup.classList.remove("hidden");
    popupTitle.textContent = "Create Server";
    popupMessage.textContent = "";
    serverInput.value = "";
});

// Opening the "Join" popup
joinBtn.addEventListener("click", () => {
    mode = "join";
    popup.classList.remove("hidden");
    popupTitle.textContent = "Join Server";
    popupMessage.textContent = "";
    serverInput.value = "";
});

// Closing the popup
closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
});

// Submitting button
submitBtn.addEventListener("click", () => {
    const roomName = serverInput.value.trim();

    // Validation part
    if (roomName < 3) {
        popupMessage.textContent = "Minimum 3 letters";
        return;
    }

    if (roomName > 12) {
        popupMessage.textContent = "Maximum 12 letters";
        return;
    }

    // Save room name
    localStorage.setItem("roomName", roomName);

    // Save mode
    localStorage.setItem("roomMode", mode);

    // Move to game
    window.location.href = "/html/gtn_game.html";
});

// Enter key support
serverInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        submitBtn.click();
    }
});