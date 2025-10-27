// ==========================================
// CART MANAGEMENT SYSTEM FOR WASTE2WORTH
// ==========================================
// Integrated with Supabase for persistent cart storage

import { supabase } from './supabaseClient.js';

// ==========================================
// SUPABASE CART FUNCTIONS
// ==========================================

// Get current user ID
async function getCurrentUserId() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      console.log('⚠️ No user logged in');
      return null;
    }
    return user.id;
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
}

// Add item to cart (Supabase)
async function addToCart(product) {
  console.log('🛒 Adding to cart:', product);
  
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      showNotification('Please login to add items to cart');
      window.location.href = 'signup.html';
      return;
    }

    // Check if item already exists in cart
    const { data: existingItems, error: fetchError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', product.id);

    if (fetchError) throw fetchError;

    if (existingItems && existingItems.length > 0) {
      // Item exists, update quantity
      const newQuantity = existingItems[0].quantity + 1;
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItems[0].id);

      if (updateError) throw updateError;
      console.log('✅ Updated cart item quantity');
    } else {
      // New item, insert into cart
      const { error: insertError } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: product.id,
          quantity: 1
        });

      if (insertError) throw insertError;
      console.log('✅ Added new item to cart');
    }

    // Also save to localStorage for quick access
    saveToLocalCart(product);
    
    await updateCartCount();
    showNotification('Item added to cart! 🛒');

  } catch (error) {
    console.error('❌ Error adding to cart:', error);
    showNotification('Failed to add item to cart');
  }
}

// Get cart items from Supabase
async function getCart() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log('⚠️ No user logged in, returning empty cart');
      return [];
    }

    // Fetch cart items with product details
    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        product_id,
        quantity,
        created_at,
        products (
          id,
          name,
          description,
          price,
          image_url,
          stock,
          category
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;

    console.log(`✅ Fetched ${cartItems?.length || 0} cart items`);
    
    // Transform data to match expected format
    const transformedCart = cartItems?.map(item => ({
      cartItemId: item.id,
      id: item.product_id,
      name: item.products.name,
      description: item.products.description,
      price: parseFloat(item.products.price),
      image: item.products.image_url,
      quantity: item.quantity,
      stock_quantity: item.products.stock,
      category: item.products.category
    })) || [];

    return transformedCart;

  } catch (error) {
    console.error('❌ Error fetching cart:', error);
    return [];
  }
}

// Update cart item quantity
async function updateQuantity(cartItemId, newQuantity) {
  console.log(`📝 Updating cart item ${cartItemId} to quantity ${newQuantity}`);
  
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      showNotification('Please login to update cart');
      return;
    }

    if (newQuantity <= 0) {
      await removeFromCart(cartItemId);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: newQuantity })
      .eq('id', cartItemId)
      .eq('user_id', userId);

    if (error) throw error;

    console.log('✅ Cart item quantity updated');
    await updateCartCount();

  } catch (error) {
    console.error('❌ Error updating quantity:', error);
    showNotification('Failed to update quantity');
  }
}

// Remove item from cart
async function removeFromCart(cartItemId) {
  console.log(`🗑️ Removing cart item ${cartItemId}`);
  
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      showNotification('Please login to remove items');
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId)
      .eq('user_id', userId);

    if (error) throw error;

    console.log('✅ Cart item removed');
    await updateCartCount();
    showNotification('Item removed from cart');

  } catch (error) {
    console.error('❌ Error removing from cart:', error);
    showNotification('Failed to remove item');
  }
}

// Clear entire cart
async function clearCart() {
  console.log('🗑️ Clearing cart...');
  
  try {
    const userId = await getCurrentUserId();
    if (!userId) return;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;

    console.log('✅ Cart cleared');
    localStorage.removeItem('waste2worth_cart');
    await updateCartCount();

  } catch (error) {
    console.error('❌ Error clearing cart:', error);
  }
}

// Get cart count
async function getCartCount() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return 0;

    const { data, error } = await supabase
      .from('cart_items')
      .select('quantity')
      .eq('user_id', userId);

    if (error) throw error;

    const totalCount = data?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    return totalCount;

  } catch (error) {
    console.error('❌ Error getting cart count:', error);
    return 0;
  }
}

// Update cart count display
async function updateCartCount() {
  const count = await getCartCount();
  const countElements = document.querySelectorAll('.cart-count');
  
  countElements.forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'inline' : 'none';
  });
  
  console.log(`🛒 Cart count updated: ${count}`);
}

// Calculate cart totals
async function calculateTotals() {
  const cart = await getCart();
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;
  
  return {
    subtotal: subtotal,
    shipping: shipping,
    tax: tax,
    total: total,
    itemCount: cart.length
  };
}

// ==========================================
// LEGACY LOCALSTORAGE FUNCTIONS (BACKUP)
// ==========================================

// Save to localStorage as backup
function saveToLocalCart(product) {
  let cart = JSON.parse(localStorage.getItem('waste2worth_cart') || '[]');
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  localStorage.setItem('waste2worth_cart', JSON.stringify(cart));
}

// Get cart from localStorage
function getLocalCart() {
  const cart = localStorage.getItem('waste2worth_cart');
  return cart ? JSON.parse(cart) : [];
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Format price in Indian Rupees
function formatPrice(price) {
  return '₹' + parseFloat(price).toFixed(0);
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
  if (!document.querySelector('#notification-styles')) {
    style.id = 'notification-styles';
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize cart count on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', async function() {
    await updateCartCount();
  });
}

// ============================================
// WISHLIST MANAGEMENT FUNCTIONS
// ============================================

// Get wishlist from localStorage
function getWishlist() {
  const wishlist = localStorage.getItem('waste2worth_wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
}

// Save wishlist to localStorage
function saveWishlist(wishlist) {
  localStorage.setItem('waste2worth_wishlist', JSON.stringify(wishlist));
}

// Add item to wishlist
function addToWishlist(product) {
  let wishlist = getWishlist();
  
  // Check if item already exists
  const existingItem = wishlist.find(item => item.id === product.id);
  
  if (existingItem) {
    showNotification('Item already in wishlist!');
    return false;
  }
  
  // Add to wishlist with timestamp
  wishlist.push({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    icon: product.icon,
    addedDate: new Date().toISOString()
  });
  
  saveWishlist(wishlist);
  updateWishlistCount();
  showNotification('Added to wishlist! 💚');
  return true;
}

// Remove item from wishlist
function removeFromWishlist(productId) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(item => item.id !== productId);
  saveWishlist(wishlist);
  updateWishlistCount();
  showNotification('Removed from wishlist');
}

// Check if item is in wishlist
function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === productId);
}

// Update wishlist count in navigation
function updateWishlistCount() {
  const wishlist = getWishlist();
  const wishlistCountElements = document.querySelectorAll('.wishlist-count');
  
  wishlistCountElements.forEach(element => {
    element.textContent = wishlist.length;
    
    // Add animation
    element.style.animation = 'none';
    setTimeout(() => {
      element.style.animation = 'pulse 0.3s ease-out';
    }, 10);
  });
}

// ==========================================
// EXPORT FUNCTIONS
// ==========================================
export {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartCount,
  updateCartCount,
  calculateTotals,
  formatPrice,
  showNotification,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  isInWishlist
};
