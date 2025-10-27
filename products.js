// ==========================================
// PRODUCTS LOADER FOR WASTE2WORTH
// ==========================================
// This file fetches products from Supabase and displays them dynamically
// Only runs after user authentication is verified

import { supabase } from './supabaseClient.js';
import { getCurrentUser } from './auth.js';

// ==========================================
// FETCH PRODUCTS FROM SUPABASE
// ==========================================
async function fetchProducts() {
    console.log('📦 Fetching products from Supabase...');
    
    try {
        // Verify user is authenticated first
        const user = await getCurrentUser();
        if (!user) {
            console.log('❌ User not authenticated. Cannot fetch products.');
            return null;
        }

        console.log('✅ User authenticated. Fetching products...');

        // Fetch all products from Supabase
        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_available', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('❌ Error fetching products:', error.message);
            throw error;
        }

        console.log(`✅ Successfully fetched ${products.length} products!`);
        console.log('Products:', products);
        
        return products;

    } catch (error) {
        console.error('❌ Error in fetchProducts:', error);
        return null;
    }
}

// ==========================================
// DISPLAY PRODUCTS ON HOMEPAGE
// ==========================================
function displayProducts(products) {
    console.log('🎨 Displaying products on page...');

    if (!products || products.length === 0) {
        console.log('⚠️ No products to display');
        return;
    }

    // Get the products grid container
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) {
        console.error('❌ Products grid container not found');
        return;
    }

    // Clear existing products (optional - remove if you want to keep static products)
    // productsGrid.innerHTML = '';

    // Group products by category
    const categorizedProducts = {
        perfume: [],
        cocoplate: [],
        'coco-peat': [],
        bricket: [],
        other: []
    };

    products.forEach(product => {
        const category = product.category || 'other';
        if (categorizedProducts[category]) {
            categorizedProducts[category].push(product);
        } else {
            categorizedProducts.other.push(product);
        }
    });

    // Display products by category
    let displayCount = 0;

    // Show up to 4 featured products on homepage
    const featuredProducts = [
        ...categorizedProducts.perfume.slice(0, 1),
        ...categorizedProducts.cocoplate.slice(0, 1),
        ...categorizedProducts['coco-peat'].slice(0, 1),
        ...categorizedProducts.bricket.slice(0, 1)
    ].filter(p => p); // Remove undefined entries

    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
        displayCount++;
    });

    console.log(`✅ Displayed ${displayCount} products on homepage`);
}

// ==========================================
// CREATE PRODUCT CARD HTML
// ==========================================
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);

    // Determine if product has "Add to Cart" or redirect
    const isDirectPurchase = product.category === 'coco-peat' || product.category === 'bricket';
    const redirectPage = product.category === 'perfume' ? 'perfume.html' : 
                         product.category === 'cocoplate' ? 'cocoplate.html' : null;

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image_url || 'images/placeholder.jpg'}" 
                 alt="${product.name}" 
                 style="width:100%;height:140px;object-fit:cover;border-radius:20px 20px 0 0;">
            <div class="product-label">${product.name}</div>
        </div>
        <div class="product-content">
            <div class="product-title">${product.name}</div>
            <div class="product-desc">${product.description || 'Premium quality product'}</div>
            <div class="product-rating">
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="rating-text">(4.8)</span>
            </div>
            <div class="product-price">₹${parseFloat(product.price).toFixed(2)}</div>
            ${product.stock_quantity < 10 && product.stock_quantity > 0 ? 
                `<div style="color: #ff6b6b; font-size: 0.85rem; margin-top: 8px;">Only ${product.stock_quantity} left!</div>` : ''}
            ${product.stock_quantity === 0 ? 
                `<div style="color: #ff6b6b; font-size: 0.85rem; margin-top: 8px; font-weight: 600;">Out of Stock</div>` : ''}
            ${isDirectPurchase ? 
                `<button class="product-btn add-to-cart-btn" 
                         data-product-id="${product.id}" 
                         style="border:none;cursor:pointer;"
                         ${product.stock_quantity === 0 ? 'disabled' : ''}>
                    ${product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                 </button>` :
                redirectPage ? 
                    `<button class="product-btn" 
                             data-redirect="${redirectPage}" 
                             style="border:none;cursor:pointer;">
                        View Collection
                     </button>` :
                    `<button class="product-btn add-to-cart-btn" 
                             data-product-id="${product.id}" 
                             style="border:none;cursor:pointer;"
                             ${product.stock_quantity === 0 ? 'disabled' : ''}>
                        ${product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                     </button>`
            }
        </div>
    `;

    // Add event listeners for Add to Cart buttons
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            addProductToCart(product);
        });
    }

    // Add event listeners for redirect buttons
    const redirectBtn = card.querySelector('[data-redirect]');
    if (redirectBtn) {
        redirectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const url = redirectBtn.getAttribute('data-redirect');
            if (url) window.location.href = url;
        });
    }

    return card;
}

// ==========================================
// ADD PRODUCT TO CART
// ==========================================
function addProductToCart(product) {
    console.log('🛒 Adding product to cart:', product.name);

    // Check if addToCart function exists (from cart.js)
    if (typeof addToCart === 'function') {
        const cartProduct = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: parseFloat(product.price),
            image: product.image_url,
            quantity: 1
        };
        addToCart(cartProduct);
    } else {
        console.error('❌ addToCart function not found. Make sure cart.js is loaded.');
        alert('Error: Cart functionality not available');
    }
}

// ==========================================
// INITIALIZE PRODUCTS ON PAGE LOAD
// ==========================================
async function initializeProducts() {
    console.log('🚀 Initializing products loader...');

    // Wait a bit for authentication to complete
    setTimeout(async () => {
        const products = await fetchProducts();
        if (products) {
            displayProducts(products);
        }
    }, 500); // 500ms delay to ensure auth completes first
}

// ==========================================
// AUTO-RUN ON PAGE LOAD
// ==========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProducts);
} else {
    initializeProducts();
}

// ==========================================
// EXPORT FUNCTIONS FOR USE IN OTHER FILES
// ==========================================
export { fetchProducts, displayProducts, initializeProducts };
