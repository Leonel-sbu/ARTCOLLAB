// ============================================
// FIREBASE CONFIGURATION (Backend-as-a-Service)
// ============================================
// Layer: Backend Service Provider
// Purpose: Initialize Firebase SDK for authentication, database, and storage
// Dependencies: Include Firebase SDK script in HTML
// Setup: Replace placeholders with your Firebase project credentials
//        Get credentials from: https://console.firebase.google.com
//
// Script Include:
// <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js"></script>

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Export for simple inclusion
if (typeof module !== 'undefined') module.exports = firebaseConfig;