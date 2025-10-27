// ==========================================
// CART PAGE DISPLAY FOR WASTE2WORTH
// ==========================================
// Fetches and displays cart items from Supabase

import { supabase } from './supabaseClient.js';
import { getCart, removeFromCart, updateQuantity, calculateTotals, formatPrice, clearCart } from './cart.js';

// ==========================================
// DISPLAY CART ITEMS
// ==========================================
async function displayCart() {
    console.log('🛒 Loading cart items...');
    
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCart');
    
    if (!cartItemsContainer) {
        console.error('❌ Cart items container not found');
        return;
    }

    try {
        // Fetch cart items
        const cartItems = await getCart();
        
        if (!cartItems || cartItems.length === 0) {
            // Show empty cart message
            cartItemsContainer.innerHTML = '';
            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'block';
            }
            updateCartSummary({ subtotal: 0, shipping: 0, tax: 0, total: 0, itemCount: 0 });
            return;
        }

        // Hide empty cart message
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'none';
        }

        // Display cart items
        cartItemsContainer.innerHTML = cartItems.map(item => `
            <div class="cart-item" data-cart-item-id="${item.cartItemId}">
                <div class="cart-item-image">
                    <img src="${item.image || 'images/placeholder.jpg'}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-desc">${item.description || ''}</div>
                    <div class="cart-item-category" style="font-size: 0.85rem; color: #666; margin-top: 4px;">
                        Category: ${item.category || 'Product'}
                    </div>
                    ${item.stock_quantity < 10 && item.stock_quantity > 0 ? 
                        `<div style="color: #ff6b6b; font-size: 0.85rem; margin-top: 4px;">
                            Only ${item.stock_quantity} left in stock!
                        </div>` : ''}
                    ${item.stock_quantity === 0 ? 
                        `<div style="color: #ff6b6b; font-size: 0.85rem; margin-top: 4px; font-weight: 600;">
                            Out of Stock - Please remove
                        </div>` : ''}
                </div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="decreaseQuantity('${item.cartItemId}', ${item.quantity})" 
                            ${item.quantity <= 1 ? 'disabled' : ''}>−</button>
                    <input type="number" 
                           value="${item.quantity}" 
                           min="1" 
                           max="${item.stock_quantity || 99}"
                           onchange="handleQuantityChange('${item.cartItemId}', this.value, ${item.stock_quantity || 99})"
                           class="qty-input">
                    <button class="qty-btn" onclick="increaseQuantity('${item.cartItemId}', ${item.quantity}, ${item.stock_quantity || 99})"
                            ${item.quantity >= (item.stock_quantity || 99) ? 'disabled' : ''}>+</button>
                </div>
                <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
                <button class="cart-item-remove" onclick="handleRemoveItem('${item.cartItemId}')" title="Remove item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
        `).join('');

        // Update cart summary
        const totals = await calculateTotals();
        updateCartSummary(totals);

        console.log(`✅ Displayed ${cartItems.length} cart items`);

    } catch (error) {
        console.error('❌ Error displaying cart:', error);
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <p>Error loading cart items. Please refresh the page.</p>
            </div>
        `;
    }
}

// ==========================================
// UPDATE CART SUMMARY
// ==========================================
function updateCartSummary(totals) {
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = formatPrice(totals.subtotal);
    if (shippingEl) shippingEl.textContent = formatPrice(totals.shipping);
    if (taxEl) taxEl.textContent = formatPrice(totals.tax);
    if (totalEl) totalEl.textContent = formatPrice(totals.total);

    // Update checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        if (totals.itemCount === 0) {
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = '0.5';
            checkoutBtn.style.cursor = 'not-allowed';
        } else {
            checkoutBtn.disabled = false;
            checkoutBtn.style.opacity = '1';
            checkoutBtn.style.cursor = 'pointer';
        }
        
        // Add click handler for checkout
        checkoutBtn.onclick = handleCheckout;
    }
}

// ==========================================
// QUANTITY HANDLERS
// ==========================================
async function increaseQuantity(cartItemId, currentQty, maxStock) {
    if (currentQty >= maxStock) {
        alert(`Maximum stock available is ${maxStock}`);
        return;
    }
    await updateQuantity(cartItemId, currentQty + 1);
    await displayCart();
}

async function decreaseQuantity(cartItemId, currentQty) {
    if (currentQty <= 1) return;
    await updateQuantity(cartItemId, currentQty - 1);
    await displayCart();
}

async function handleQuantityChange(cartItemId, newValue, maxStock) {
    const newQty = parseInt(newValue);
    
    if (isNaN(newQty) || newQty < 1) {
        alert('Please enter a valid quantity');
        await displayCart();
        return;
    }
    
    if (newQty > maxStock) {
        alert(`Maximum stock available is ${maxStock}`);
        await displayCart();
        return;
    }
    
    await updateQuantity(cartItemId, newQty);
    await displayCart();
}

// ==========================================
// REMOVE ITEM HANDLER
// ==========================================
async function handleRemoveItem(cartItemId) {
    if (confirm('Remove this item from cart?')) {
        await removeFromCart(cartItemId);
        await displayCart();
    }
}

// ==========================================
// CLEAR CART HANDLER
// ==========================================
async function handleClearCart() {
    if (confirm('Are you sure you want to clear your entire cart?')) {
        await clearCart();
        await displayCart();
    }
}

// ==========================================
// CHECKOUT HANDLER
// ==========================================
async function handleCheckout() {
    const totals = await calculateTotals();
    
    if (totals.itemCount === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Save cart totals to sessionStorage for checkout page
    sessionStorage.setItem('checkoutTotals', JSON.stringify(totals));
    
    // Redirect to checkout
    window.location.href = 'checkout.html';
}

// ==========================================
// MAKE FUNCTIONS GLOBALLY AVAILABLE
// ==========================================
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.handleQuantityChange = handleQuantityChange;
window.handleRemoveItem = handleRemoveItem;
window.handleClearCart = handleClearCart;
window.handleCheckout = handleCheckout;
window.displayCart = displayCart;

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayCart);
} else {
    displayCart();
}

export { displayCart, updateCartSummary, handleCheckout };
