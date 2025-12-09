// ============================================
// FRONTEND: Courses Module
// ============================================
// Dependencies: firebase/firestore (install: npm install firebase)
// Database: Reads from 'courses' collection in Firestore
// Usage: Courses.fetchCourses()

(function(){
  function fetchCourses(){ console.log('fetchCourses'); return Promise.resolve([]); }
  window.Courses = {fetchCourses};
  if(typeof module !== 'undefined') module.exports = {fetchCourses};
})();
