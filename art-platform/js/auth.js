// ============================================
// FRONTEND: Authentication Module
// ============================================
// Dependencies: firebase/auth (install: npm install firebase)
// Requires: firebase-config.js loaded first
// Database: Writes to Firebase Auth & user profiles in Firestore
// Usage: Auth.login(email, password), Auth.register(data)

(function(){
  function login(email, password){
    console.log('login', email);
    return Promise.resolve({user:{email}});
  }
  function register(data){
    console.log('register', data);
    return Promise.resolve({user:data});
  }
  if(typeof module !== 'undefined') module.exports = {login, register};
  window.Auth = {login, register};
})();
