// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 79.99,
        rating: 4.5,
        reviews: 1234,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        category: "Electronics",
        discount: 20
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        price: 299.99,
        rating: 4.8,
        reviews: 856,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        category: "Electronics",
        discount: 15
    },
    {
        id: 3,
        name: "Laptop Backpack",
        price: 49.99,
        rating: 4.3,
        reviews: 432,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        category: "Fashion",
        discount: 0
    },
    {
        id: 4,
        name: "Coffee Maker",
        price: 89.99,
        rating: 4.6,
        reviews: 678,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
        category: "Home & Kitchen",
        discount: 25
    },
    {
        id: 5,
        name: "Running Shoes",
        price: 119.99,
        rating: 4.7,
        reviews: 923,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        category: "Sports",
        discount: 10
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        price: 59.99,
        rating: 4.4,
        reviews: 567,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
        category: "Electronics",
        discount: 0
    },
    {
        id: 7,
        name: "Yoga Mat Premium",
        price: 34.99,
        rating: 4.5,
        reviews: 345,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
        category: "Sports",
        discount: 15
    },
    {
        id: 8,
        name: "Digital Camera",
        price: 549.99,
        rating: 4.9,
        reviews: 234,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
        category: "Electronics",
        discount: 30
    },
    {
        id: 9,
        name: "Desk Lamp LED",
        price: 39.99,
        rating: 4.2,
        reviews: 456,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
        category: "Home & Kitchen",
        discount: 0
    },
    {
        id: 10,
        name: "Gaming Mouse",
        price: 69.99,
        rating: 4.6,
        reviews: 789,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
        category: "Gaming",
        discount: 20
    }
];

// Shopping cart
let cart = [];

// Render products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const dealsGrid = document.getElementById('dealsGrid');
    
    // Render featured products (first 5)
    productsGrid.innerHTML = products.slice(0, 5).map(product => createProductCard(product)).join('');
    
    // Render deals (products with discounts)
    const dealsProducts = products.filter(p => p.discount > 0).slice(0, 4);
    dealsGrid.innerHTML = dealsProducts.map(product => createProductCard(product, true)).join('');
}

// Create product card HTML
function createProductCard(product, showDiscount = false) {
    const discountedPrice = product.discount > 0 ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price;
    const stars = generateStars(product.rating);
    
    return `
        <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2">
            <div class="relative overflow-hidden">
                ${product.discount > 0 ? `
                    <div class="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                        -${product.discount}%
                    </div>
                ` : ''}
                <img src="${product.image}" alt="${product.name}" 
                     class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300">
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="bg-white rounded-full p-2 shadow-lg hover:bg-orange-500 hover:text-white transition-colors" 
                            onclick="event.stopPropagation(); addToWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="p-4">
                <h4 class="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">${product.name}</h4>
                <div class="flex items-center mb-2">
                    <div class="text-yellow-400 text-sm mr-2">${stars}</div>
                    <span class="text-gray-500 text-sm">(${product.reviews})</span>
                </div>
                <div class="flex items-center justify-between mb-3">
                    <div>
                        ${product.discount > 0 ? `
                            <span class="text-2xl font-bold text-orange-600">$${discountedPrice}</span>
                            <span class="text-sm text-gray-400 line-through ml-2">$${product.price}</span>
                        ` : `
                            <span class="text-2xl font-bold text-orange-600">$${product.price}</span>
                        `}
                    </div>
                </div>
                <button onclick="addToCart(${product.id})" 
                        class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-all transform hover:scale-105">
                    <i class="fas fa-shopping-cart mr-2"></i>Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    showCartSidebar();
    
    // Show notification
    showNotification('Product added to cart!');
}

// Update cart display
function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => {
            const discountedPrice = item.discount > 0 ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price;
            return `
                <div class="flex items-center space-x-4 border-b pb-4">
                    <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded">
                    <div class="flex-1">
                        <h4 class="font-semibold text-sm text-gray-800">${item.name}</h4>
                        <p class="text-orange-600 font-bold">$${discountedPrice}</p>
                        <div class="flex items-center space-x-2 mt-2">
                            <button onclick="decreaseQuantity(${item.id})" 
                                    class="bg-gray-200 hover:bg-gray-300 w-6 h-6 rounded flex items-center justify-center">
                                <i class="fas fa-minus text-xs"></i>
                            </button>
                            <span class="font-semibold">${item.quantity}</span>
                            <button onclick="increaseQuantity(${item.id})" 
                                    class="bg-gray-200 hover:bg-gray-300 w-6 h-6 rounded flex items-center justify-center">
                                <i class="fas fa-plus text-xs"></i>
                            </button>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${item.id})" 
                            class="text-red-500 hover:text-red-700">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => {
        const price = item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price;
        return sum + (price * item.quantity);
    }, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Increase quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Show cart sidebar
function showCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
}

// Hide cart sidebar
function hideCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.add('translate-x-full');
    overlay.classList.add('hidden');
}

// Add to wishlist
function addToWishlist(productId) {
    showNotification('Added to wishlist!');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i>${message}
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.toLowerCase();
            if (query) {
                showNotification(`Searching for "${query}"...`);
            }
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupSearch();
    
    // Cart icon click
    document.getElementById('cartIcon').addEventListener('click', showCartSidebar);
    
    // Close cart button
    document.getElementById('closeCart').addEventListener('click', hideCartSidebar);
    
    // Overlay click
    document.getElementById('cartOverlay').addEventListener('click', hideCartSidebar);
});

// Add custom animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slide-in {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .animate-slide-in {
        animation: slide-in 0.3s ease-out;
    }
    
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

