fb_initialise();
fb_detectLoginChange();
import { 
    fb_initialise, fb_authenticate, fb_detectLoginChange, fb_logout,
    fb_writeRecords, fb_readRecords, fb_readAll, fb_updateRecords,
    fb_sortedRead, fb_userDetails, FB_GAMEDB, fb_writeLobby } from './fb_io.mjs';

import { ref, set, get, update, query, orderByChild, limitToFirst }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Popup elements
const popup = document.querySelector(".popup");
const popupTitle = document.querySelector("#popupTitle");
const popupMessage = document.querySelector(".popupMessage");

// Buttons
const createBtn = document.querySelector("#createBtn");
const joinBtn = document.querySelector("#joinBtn");
const submitBtn = document.querySelector("#submitBtn");
const closeBtn = document.querySelector("#submitBtn");

// Lobby list
const lobbyList = document.querySelector("#lobbyList");

// Input 
const serverInput = document.querySelector("#serverInput");

//for fixing lobbyName 
let lobbyName = "";
// for fixing uid error
let uid = "";

// Current mode
let mode = "";

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
    window.location.href = "/html/gtn_lobby.html";
});

// Enter key support
serverInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        submitBtn.click();
    }
});

const lobbyRef = ref(FB_GAMEDB, 'lobby/' + uid + "lobbyName/");

update(lobbyRef, {

    guestUID:
        sessionStorage.getItem("uid"),

    guestName:
        sessionStorage.getItem("displayName"),

    accepted:
        "yes"

});

// Creating lobby object
const lobbyRecord = {
    uid: sessionStorage.getItem("uid"),

    userName: sessionStorage.getItem("displayName"),

    lobbyName: lobbyName,

    accepted: "no"
};

console.log(
    "Lobby record being written:",
    lobbyRecord
);