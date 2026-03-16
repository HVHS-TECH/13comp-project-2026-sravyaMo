/**************************************************************/
// reg.mjs
// Main entry for REG.html
// Written by <Sravya>, Term 2 
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c reg.mjs',
            'color: blue; background-color: white;');
/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module
import { fb_initialise, fb_writeRecords, fb_userDetails } from './fb_io.mjs';
window.getUserInput = getUserInput;

/*********************************************************** */
fb_userDetails.uid = sessionStorage.getItem('uid');
fb_userDetails.displayName = sessionStorage.getItem('displayName');
fb_userDetails.email = sessionStorage.getItem('email');
fb_userDetails.photoURL = sessionStorage.getItem('photoURL');
document.getElementById('displayName').value = fb_userDetails.displayName;
document.getElementById('email').value = fb_userDetails.email;
/********************************************************** */
export function getUserInput() {
  console.log('getUserInput()');

    //check if form is valid
    if (document.getElementById('f_userDetails').checkValidity()) {
        // get values from the form
        const displayName = document.getElementById("displayName").value;
        const email = document.getElementById("email").value;
        const age = document.getElementById("age").value;
        const sex = document.getElementById("sex").value;

        console.log("displayName:", displayName);
        console.log("Email:", email);
        console.log("Age:", age);
        console.log("Sex:", sex);

        fb_writeRecords(fb_userDetails);
    } else {
        console.log("Form is invalid. Please fill in all required fields!");
    }
}
document.getElementById('register').onclick = getUserInput;