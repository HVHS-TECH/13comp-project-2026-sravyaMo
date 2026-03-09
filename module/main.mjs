/**************************************************************/
// main.mjs
// Main entry for index.html
// Written by Sravya Moparthi, Term 1 2026
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c main.mjs', 
    'color: blue; background-color: white;');

fb_initialise();

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module
import { fb_initialise, fb_authenticate, fb_detectLoginChange, fb_logout,
         fb_writeRecords, fb_readRecords, fb_readAll, fb_updateRecords } 
    from './fb_io.mjs';


    window.fb_initialise   = fb_initialise;
    window.fb_authenticate   = fb_authenticate;
    window.fb_detectLoginChange   = fb_detectLoginChange;
    window.fb_logout   = fb_logout;
    window.fb_writeRecords   = fb_writeRecords;
    window.fb_readRecords   = fb_readRecords;
    window.fb_readAll   = fb_readAll;
    window.fb_updateRecords   = fb_updateRecords;


/**************************************************************/
// index.html main code
/**************************************************************/


/**************************************************************/
//   END OF CODE
/**************************************************************/