// ==========================================
// AUTHENTICATION HANDLER FOR WASTE2WORTH
// ==========================================
// This file handles user authentication using Supabase
// Import this file on pages that require authentication

import { supabase } from './supabaseClient.js';

// ==========================================
// CHECK IF USER IS LOGGED IN
// ==========================================
async function checkUser() {
    console.log('🔍 Checking if user is logged in...');
    
    try {
        // Get the current user from Supabase
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
            console.error('❌ Error checking user:', error.message);
            redirectToLogin();
            return;
        }
        
        if (!user) {
            // User is not logged in
            console.log('❌ No user found. Redirecting to login...');
            redirectToLogin();
        } else {
            // User is logged in
            console.log('✅ User is logged in!');
            console.log('📧 Email:', user.email);
            console.log('👤 User ID:', user.id);
            
            // Optional: Store user info in localStorage for easy access
            localStorage.setItem('waste2worth_user', JSON.stringify({
                email: user.email,
                user_id: user.id,
                full_name: user.user_metadata?.full_name || 'User'
            }));
        }
        
    } catch (error) {
        console.error('❌ Error in checkUser:', error);
        redirectToLogin();
    }
}

// ==========================================
// REDIRECT TO LOGIN PAGE
// ==========================================
function redirectToLogin() {
    console.log('🔄 Redirecting to login page...');
    window.location.href = 'signup.html'; // Changed to signup.html since that's your login page
}

// ==========================================
// LOGOUT FUNCTION
// ==========================================
async function logout() {
    console.log('🚪 Logging out user...');
    
    try {
        // Sign out from Supabase
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            console.error('❌ Error during logout:', error.message);
            alert('Logout failed: ' + error.message);
            return;
        }
        
        // Remove user data from localStorage
        localStorage.removeItem('waste2worth_user');
        localStorage.removeItem('waste2worth_cart');
        localStorage.removeItem('waste2worth_wishlist');
        
        console.log('✅ User logged out successfully!');
        console.log('🔄 Redirecting to login page...');
        
        // Redirect to login page
        window.location.href = 'signup.html';
        
    } catch (error) {
        console.error('❌ Error in logout:', error);
        alert('An error occurred during logout');
    }
}

// ==========================================
// GET CURRENT USER INFO
// ==========================================
async function getCurrentUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
            console.error('❌ Error getting user:', error.message);
            return null;
        }
        
        return user;
    } catch (error) {
        console.error('❌ Error in getCurrentUser:', error);
        return null;
    }
}

// ==========================================
// INITIALIZE AUTHENTICATION
// ==========================================
function initAuth() {
    console.log('🔐 Initializing authentication...');
    
    // Check if user is logged in when page loads
    checkUser();
    
    // Add logout button event listener
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('🖱️ Logout button clicked');
            await logout();
        });
        console.log('✅ Logout button listener added');
    } else {
        console.log('ℹ️ No logout button found (id="logout-btn")');
    }
}

// ==========================================
// AUTO-RUN ON PAGE LOAD
// ==========================================
// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    // DOM is already loaded
    initAuth();
}

// ==========================================
// EXPORT FUNCTIONS FOR USE IN OTHER FILES
// ==========================================
export { checkUser, logout, getCurrentUser };
