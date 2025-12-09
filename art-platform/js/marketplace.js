// ============================================
// FRONTEND: Marketplace Module
// ============================================
// Dependencies: firebase/firestore (install: npm install firebase)
// Database: Reads from 'artworks' collection in Firestore
// Usage: Marketplace.fetchListings()

(function(){
  function fetchListings(){
    console.log('fetchListings');
    return Promise.resolve([]);
  }
  window.Marketplace = {fetchListings};
  if(typeof module !== 'undefined') module.exports = {fetchListings};
})();
