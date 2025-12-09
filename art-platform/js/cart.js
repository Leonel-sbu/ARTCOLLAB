// ============================================
// FRONTEND: Shopping Cart Module
// ============================================
// Dependencies: None (client-side state only)
// Database: Persists to Firestore orders collection on checkout
// Usage: Cart.add(item), Cart.list()

(function(){
  const cart = [];
  function add(item){ cart.push(item); console.log('cart add',item); }
  function list(){ return cart.slice(); }
  window.Cart = {add, list};
  if(typeof module !== 'undefined') module.exports = {add, list};
})();
