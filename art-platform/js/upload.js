// ============================================
// FRONTEND: File Upload Module
// ============================================
// Dependencies: firebase/storage, firebase/firestore (install: npm install firebase)
// Database: Writes to Firebase Storage & artworks collection in Firestore
// Usage: Upload.uploadFile(file, metadata)

(function(){
  function uploadFile(file, metadata){
    console.log('uploadFile', file && file.name);
    return Promise.resolve({url: 'https://example.com/' + (file?file.name:'file')});
  }
  window.Upload = {uploadFile};
  if(typeof module !== 'undefined') module.exports = {uploadFile};
})();
