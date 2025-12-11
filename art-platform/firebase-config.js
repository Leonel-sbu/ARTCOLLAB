T// FIREBASE CONFIGURATION
// Replace the placeholders below with your Firebase project's credentials
// Note: This file attempts to initialize Firebase when the SDK is loaded
// via script tags (global namespace). If you use the modular SDK with
// ES modules, initialize using `initializeApp` from 'firebase/app'.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

(function(){
  function initIfPossible(){
    // Namespaced (compat) SDK exposes `firebase` on window and has initializeApp
    if (typeof window !== 'undefined' && window.firebase && typeof window.firebase.initializeApp === 'function'){
      try{
        // Avoid double-initialization
        if (!window.firebase.apps || window.firebase.apps.length === 0){
          window.firebaseApp = window.firebase.initializeApp(firebaseConfig);
          console.log('Firebase initialized (namespaced SDK).');
        } else {
          window.firebaseApp = window.firebase.apps[0];
          console.log('Firebase already initialized.');
        }
        window.firebaseConfigObj = firebaseConfig;
      }catch(e){
        console.warn('Firebase initialization failed:', e);
      }
      return true;
    }

    // If modular SDK is used via import maps / ESM, caller should call initializeFirebase()
    return false;
  }

  // Expose init function so pages using modular SDK can call it after imports
  if (typeof window !== 'undefined'){
    window.initializeFirebase = initIfPossible;
    // Try to initialize immediately if SDK scripts were loaded before this file
    initIfPossible();
  }
})();

// Export config for CommonJS usage (node/test environments)
if (typeof module !== 'undefined') module.exports = firebaseConfig;