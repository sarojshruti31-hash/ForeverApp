// Global State
let currency = '$';
let delivery_fee = 10;
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};

// Navbar Logic
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('w-0');
    menu.classList.toggle('w-full');
}

function setShowSearch(val) {
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        if (val) {
            searchBar.classList.remove('hidden');
        } else {
            searchBar.classList.add('hidden');
        }
    }
}

// Cart Logic
function addToCart(itemId, size) {
    if (!size) {
        alert('Select Product Size');
        return;
    }

    if (cartItems[itemId]) {
        if (cartItems[itemId][size]) {
            cartItems[itemId][size] += 1;
        } else {
            cartItems[itemId][size] = 1;
        }
    } else {
        cartItems[itemId] = {};
        cartItems[itemId][size] = 1;
    }

    updateCartStorage();
    updateCartIconCount();
    
    // Toast notification (simplified)
    showToast('Product added to cart');
}

function updateQuantity(itemId, size, quantity) {
    if (cartItems[itemId]) {
        cartItems[itemId][size] = quantity;
        if (quantity <= 0) {
            delete cartItems[itemId][size];
            if (Object.keys(cartItems[itemId]).length === 0) {
                delete cartItems[itemId];
            }
        }
    }
    updateCartStorage();
}

function getCartCount() {
    let totalCount = 0;
    for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
            if (cartItems[itemId][size] > 0) {
                totalCount += cartItems[itemId][size];
            }
        }
    }
    return totalCount;
}

function getCartAmount() {
    let totalAmount = 0;
    for (const itemId in cartItems) {
        const itemInfo = products.find(p => p._id === itemId);
        if (!itemInfo) continue;

        for (const size in cartItems[itemId]) {
            if (cartItems[itemId][size] > 0) {
                totalAmount += itemInfo.price * cartItems[itemId][size];
            }
        }
    }
    return totalAmount;
}

function updateCartStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function updateCartIconCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const count = getCartCount();
    countElements.forEach(el => {
        el.innerText = count;
    });
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 bg-black text-white px-6 py-3 rounded-md shadow-lg z-50 animate-bounce';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartIconCount();
});
