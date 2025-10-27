// Perfume Wishlist Toggle Functions

// Product data for perfumes
const perfumeProductsData = {
  'perfume-vrindavan': { id: 'perfume-vrindavan', name: 'VrindavanPrem', description: 'Pure fragrance reflecting love and devotion', price: 180, icon: '🌸' },
  'perfume-kalachandhrika': { id: 'perfume-kalachandhrika', name: 'Kalachandhrika', description: 'Luxury floral perfume', price: 200, icon: '🌺' },
  'perfume-geranium': { id: 'perfume-geranium', name: 'Geranium Bliss', description: 'Fresh and uplifting scent', price: 190, icon: '🌷' },
  'perfume-cedarwood': { id: 'perfume-cedarwood', name: 'Cedarwood Musk', description: 'Woody and earthy fragrance', price: 210, icon: '🌲' },
  'perfume-lavender': { id: 'perfume-lavender', name: 'Lavender Fields', description: 'Calming lavender essence', price: 185, icon: '💜' },
  'perfume-citrus': { id: 'perfume-citrus', name: 'Citrus Breeze', description: 'Refreshing citrus blend', price: 175, icon: '🍋' },
  'perfume-rose': { id: 'perfume-rose', name: 'Rose Garden', description: 'Classic rose perfume', price: 195, icon: '🌹' },
  'perfume-sandalwood': { id: 'perfume-sandalwood', name: 'Sandalwood Essence', description: 'Rich sandalwood aroma', price: 220, icon: '🪵' },
  'perfume-jasmine': { id: 'perfume-jasmine', name: 'Jasmine Night', description: 'Exotic jasmine fragrance', price: 200, icon: '🌼' }
};

// Wishlist toggle function for perfume page
async function toggleWishlist(button, productId) {
  event.stopPropagation();
  
  // Wait for window.wishlistFunctions to be available
  if (!window.wishlistFunctions) {
    console.error('Wishlist functions not loaded yet');
    return;
  }
  
  const { addToWishlist, removeFromWishlist } = window.wishlistFunctions;
  
  const product = perfumeProductsData[productId];
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
  // Wait for wishlist functions to be available
  const checkWishlistLoaded = setInterval(() => {
    if (window.wishlistFunctions) {
      clearInterval(checkWishlistLoaded);
      const { getWishlist } = window.wishlistFunctions;
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
    }
  }, 50);
});
