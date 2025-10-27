// Wishlist Toggle Function for Homepage
function toggleWishlist(button, productId) {
    event.stopPropagation();
    
    const productData = {
        '2': { 
            id: '2', 
            name: 'Coco-Peat', 
            description: 'Better water retention for healthy plants', 
            price: 50, 
            icon: '🌱' 
        },
        '3': { 
            id: '3', 
            name: 'Bricket', 
            description: 'Eco-friendly briquettes from leftover materials', 
            price: 1350, 
            icon: '🧱' 
        },
        'perfume1': { 
            id: 'perfume1', 
            name: 'Fragrance Editions', 
            description: 'Eco-friendly perfumes crafted from herbal extracts', 
            price: 599, 
            icon: '🌸' 
        },
        'cocoplate1': { 
            id: 'cocoplate1', 
            name: 'Eco Tableware', 
            description: 'Sustainable plates made from coconut husks', 
            price: 299, 
            icon: '🥥' 
        }
    };
    
    const product = productData[productId];
    if (!product) return;
    
    const isInWishlist = button.classList.contains('active');
    
    if (isInWishlist) {
        // Remove from wishlist
        removeFromWishlist(productId);
        button.textContent = '♡';
        button.classList.remove('active');
    } else {
        // Add to wishlist
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
