//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by Sravya, Term 1, 2026
//
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
            'color: blue; background-color: white;');

var FB_GAMEDB;
var FB_GAMEAUTH;

let fb_userDetails = {
    displayName:'n/a',
    email:'n/a',
    photoURL:'n/a',
    uid:'n/a' };


/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules

import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged,
        signOut }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { ref, set, get, update, query, orderByChild, limitToFirst }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export { 
    fb_initialise, fb_authenticate, fb_detectLoginChange, fb_logout,
    fb_writeRecords, fb_readRecords, fb_readAll, fb_updateRecords,
    fb_sortedRead, fb_userDetails, FB_GAMEDB };


/******************************************************/
// fb_initialise()
// Called by html initialise firebase button
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_initialise() {
    console.log('%c fb_initialise(): ', 
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FB_GAMECONFIG = {
  apiKey: "AIzaSyDq0be2GIQXnGbNCD5pmD77P-PknsNQ9G0",
  authDomain: "comp-2025-sravya-moparth-bec7a.firebaseapp.com",
  databaseURL: "https://comp-2025-sravya-moparth-bec7a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "comp-2025-sravya-moparth-bec7a",
  storageBucket: "comp-2025-sravya-moparth-bec7a.firebasestorage.app",
  messagingSenderId: "527743535888",
  appId: "1:527743535888:web:4d45b0785e7d04cfefb395",
  measurementId: "G-T03DEFR2R5"
};
                
    const FB_GAMEAPP = initializeApp(FB_GAMECONFIG);
    FB_GAMEDB = getDatabase(FB_GAMEAPP);
    console.info(FB_GAMEDB);         	//DIAG
}

/*****************************************************/
// fb_authenticate()
// Called by html authenticate button
// Login to Firebase via Google authentication
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_authenticate() {
    console.log('%c fb_authenticate(): ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });
    signInWithPopup(AUTH, PROVIDER)
    .then((result) => {
        //Code for a successful authentication goes here
        fb_userDetails.displayName = result.user.displayName;
        fb_userDetails.email = result.user.email;
        fb_userDetails.photoURL = result.user.photoURL;
        fb_userDetails.uid = result.user.uid;
        console.log(fb_userDetails); //DIAG
        
        //sessionStorage.setItem('googleLoginData', JSON.stringify(fb_userDetails));
        sessionStorage.setItem('displayName', fb_userDetails.displayName );
        sessionStorage.setItem('email', fb_userDetails.email );
        sessionStorage.setItem('photoURL', fb_userDetails.photoURL );
        sessionStorage.setItem('uid', fb_userDetails.uid );

       /*****************************************************/
       //Read fb_userDetails

       const FB_DBREF_UD= ref(FB_GAMEDB, 'userDetails/' + fb_userDetails.uid);
        get(FB_DBREF_UD).then((snapshot) => {
            const fb_data = snapshot.val();
            if (fb_data != null) {
            // FB_USERDETAILS: successful read
                /*****************************************************/
                //Read admin
                const FB_DBREF_ADMIN= ref(FB_GAMEDB, 'admin/' + fb_userDetails.uid);
                    get(FB_DBREF_ADMIN).then((snapshot) => {
                        var fb_data = snapshot.val();
                        if (fb_data != null) {
                            // ADMIN: Successful read
                            sessionStorage.setItem('admin', 'Y');
                            window.location.href='html/select_game.html';
                        } else {
                            // ADMIN: Successful read BUT no record found
                            sessionStorage.setItem('admin', 'N');
                            window.location.href='html/select_game.html';
                        }
                    }).catch((error) => {
                        // ADMIN: read error
                        console.error(error);
                    });
            /*****************************************************/
            } else {
                // FB_USERDETAILS: Successful read BUT no record found
                window.location.href='html/reg.html';
            }
        }).catch((error) => {
            // FB_USERDETAILS: read error
            console.error(error);
        });

       /*****************************************************/

    })
    .catch((error) => {
        //Code for an authentication error goes here
        console.error(error);
    });
}

/*****************************************************/
// fb_detectLoginChange()
// Called by html detect login change button
// Detects login changes
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_detectLoginChange() {
    console.log('%c fb_detectLoginChange(): ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    let fb_loginStatus = 'n/a';
    
    const AUTH = getAuth();
    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            // Code for user logged in goes here
            fb_loginStatus = 'logged in';
        } else {
            // Code for user logged out goes here
            fb_loginStatus = 'logged out';
        }
        console.log('%c fb_detectLoginChange(): ' + fb_loginStatus,
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    }, (error) => {
        // Code for an onAuthStateChanged error goes here
        console.error(error);
    });
}

/*****************************************************/
// fb_logout()
// Called by html logout button
// Logs out of Firebase via Google authentication
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_logout() {
    console.log('%c fb_logout(): ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const AUTH = getAuth();
    signOut(AUTH).then(() => {
        // Code for a successful logout goes here
    console.log('%c fb_logout(): SUCCESSFUL ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    })
    .catch((error) => {
        // Code for a logout error goes here
        console.error(error); //alter to console.error
    });
}

/*****************************************************/
// fb_writeRecords()
// Called by html write record button
// Writes a record to firebase
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_writeRecords() {
    console.log('FB_GAMEDB: SUCCESSFUL', FB_GAMEDB);
    console.log('%c fb_writeRecords(): path/key = ' + 'userDetails/' + fb_userDetails.uid,
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const dbReference= ref(FB_GAMEDB, 'userDetails/' + fb_userDetails.uid);
    set(dbReference, fb_userDetails).then(() => {
        // Code for a successful write goes here
        console.log('%c fb_writeRecords(): SUCCESSFUL',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
        window.location.href='select_game.html';
    }).catch((error) => {
        console.error(error);
        // Code for a write error goes here
    });
}

/*****************************************************/
// fb_readRecords()
// Called by html read record button
// Reads a specific firebase record
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_readRecords() {
    console.log('%c fb_readRecords(): ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const dbReference= ref(FB_GAMEDB, 'userDetails/' +fb_userDetails.uid);
    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            // Code for a successful read goes here
            console.log(fb_data);
            console.log('%c fb_readRecords(): SUCCESSFUL READ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
        } else {
            // Code for no record found goes here
            console.log('No records found');
        }
    }).catch((error) => {
        // Code for a read error goes here
        console.error(error);
    });
}

/*****************************************************/
// fb_readAll()
// Called by html read all button
// Reads all records in a path
// Input:  n/a
// Return: n/a
// need help for firebase part
/******************************************************/
function fb_readAll() {
    console.log('%c fb_readAll(): ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const dbReference= ref(FB_GAMEDB, 'userDetails/');
    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            // Code for a successful read all goes here
            snapshot.forEach(function(childsnapshot) {
                var childData = childsnapshot.val();
                console.log(childData);
                fb_dataArray.push(childData);
            })
            console.table(fb_dataArray);
            console.log('%c fb_readRecords(): SUCCESSFUL',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
        } else {
            //Code for no record found goes here
            console.log('No records found');
        }
    }).catch((error) => {
        // Code for a read all error goes here
        console.error(error);
    });
}

/*****************************************************/
// fb_updateRecords()
// Called by html update record button
// Updates a firebase record
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_updateRecords() {
    console.log('%c fb_updateRecords(): ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    
    var _data = {
        displayName: 'Srav'
    }
    const dbReference= ref(FB_GAMEDB, 'userDetails/' +fb_userDetails.uid);
    update(dbReference, _data).then(() => {
        //Code for a successful update goes here
        console.log('%c fb_readRecords(): SUCCESSFUL UPDATE',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    }).catch((error) => {
        //Code for a update error goes here
        console.error(error);
    });
}

/*****************************************************/
// fb_sortedRead()
/******************************************************/
function fb_sortedRead() {
    console.log('%c fb_sortedRead(): ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const dbReference= query(ref(FB_GAMEDB, 'score/AA'), orderByChild('sortKey'),
    limitToFirst(3));

        get(dbReference)
        .then((snapshot) => {
        if (snapshot.val() != null) {
            //Code for a successful sorted read goes here
            snapshot.forEach(function(childsnapshot) {
                let childData = childsnapshot.val();
                fb_scoresArray.push(childData);
            });
            console.table(fb_scoresArray);
            
        } else {
            // Code for no record found goes here
            console.log('No records found');
        }
        }).catch((error) => {
            // Code for a sorted read error goes here
            console.error(error);
        });
}


/**************************************************************/
// END OF CODE
/**************************************************************/