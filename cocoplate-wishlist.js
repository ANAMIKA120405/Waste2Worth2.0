// Cocoplate Wishlist Toggle Functions

// Product data for cocoplate dinnerware
const cocoplateProductsData = {
  'cocoplate-dinner': { id: 'cocoplate-dinner', name: 'Natural Dinner Plate', description: 'Eco-friendly dinner plate from coconut husk', price: 50, icon: '🥥' },
  'cocoplate-bowl': { id: 'cocoplate-bowl', name: 'Natural Bowl', description: 'Sustainable bowl for soups and salads', price: 45, icon: '🥥' },
  'cocoplate-small': { id: 'cocoplate-small', name: 'Small Plate', description: 'Perfect for appetizers and desserts', price: 35, icon: '🥥' },
  'cocoplate-serving': { id: 'cocoplate-serving', name: 'Serving Platter', description: 'Large platter for family meals', price: 80, icon: '🥥' },
  'cocoplate-cup': { id: 'cocoplate-cup', name: 'Natural Cup', description: 'Eco-friendly drinking cup', price: 30, icon: '🥥' },
  'cocoplate-set': { id: 'cocoplate-set', name: 'Complete Dinnerware Set', description: 'Full set of plates, bowls, and cups', price: 250, icon: '🥥' }
};

// Wishlist toggle function for cocoplate page
function toggleWishlist(button, productId) {
  event.stopPropagation();
  const product = cocoplateProductsData[productId];
  if (!product) return;
  
  const isInWishlist = button.classList.contains('active');
  if (isInWishlist) {
    removeFromWishlist(productId);
    button.textContent = '♡';
    button.classList.remove('active');
  } else {
    if (addToWishlist(product)) {
      button.textContent = '❤';
      button.classList.add('active');
    }
  }
}

// Initialize wishlist buttons on page load
window.addEventListener('DOMContentLoaded', function() {
  const wishlist = getWishlist();
  document.querySelectorAll('.wishlist-btn').forEach(button => {
    const onclickAttr = button.getAttribute('onclick');
    if (onclickAttr) {
      const match = onclickAttr.match(/'([^']+)'/);
      if (match) {
        const productId = match[1];
        if (wishlist.some(item => item.id === productId)) {
          button.textContent = '❤';
          button.classList.add('active');
        }
      }
    }
  });
});
