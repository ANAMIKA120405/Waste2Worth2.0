// Cart Management System for Waste2Worth

// Get cart from localStorage
function getCart() {
  const cart = localStorage.getItem('waste2worth_cart');
  return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('waste2worth_cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(product) {
  let cart = getCart();
  
  // Check if item already exists
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex > -1) {
    // Item exists, increase quantity
    cart[existingItemIndex].quantity += 1;
  } else {
    // New item, add to cart
    cart.push({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  saveCart(cart);
  updateCartCount();
  
  // Show notification
  showNotification('Item added to cart!');
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartCount();
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
  let cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex > -1) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      cart[itemIndex].quantity = newQuantity;
      saveCart(cart);
    }
  }
}

// Get cart count
function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Update cart count display
function updateCartCount() {
  const countElements = document.querySelectorAll('.cart-count');
  const count = getCartCount();
  countElements.forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'inline' : 'none';
  });
}

// Calculate cart totals
function calculateTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;
  
  return {
    subtotal: subtotal,
    shipping: shipping,
    tax: tax,
    total: total
  };
}

// Format price in Indian Rupees
function formatPrice(price) {
  return '₹' + price.toFixed(0);
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #3c9a5f;
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    z-index: 10000;
    font-weight: 600;
    animation: slideIn 0.3s ease-out;
  `;
  
  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});
