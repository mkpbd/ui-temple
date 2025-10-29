/**
 * Canteen Management System - Main Application
 * Modern vanilla JavaScript with ES6 modules
 */

// Application State Management
class AppState {
    constructor() {
        this.state = {
            currentView: 'dashboard',
            theme: localStorage.getItem('theme') || 'light',
            user: {
                name: 'John Doe',
                role: 'admin',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            },
            cart: JSON.parse(localStorage.getItem('cart')) || [],
            orders: JSON.parse(localStorage.getItem('orders')) || [],
            menuItems: JSON.parse(localStorage.getItem('menuItems')) || [],
            inventory: JSON.parse(localStorage.getItem('inventory')) || [],
            notifications: []
        };
        this.listeners = [];
        this.initializeData();
    }

    // Initialize with sample data if empty
    initializeData() {
        if (this.state.menuItems.length === 0) {
            this.state.menuItems = sampleData.menuItems;
            this.saveToStorage('menuItems');
        }
        if (this.state.orders.length === 0) {
            this.state.orders = sampleData.orders;
            this.saveToStorage('orders');
        }
        if (this.state.inventory.length === 0) {
            this.state.inventory = sampleData.inventory;
            this.saveToStorage('inventory');
        }
    }

    // Subscribe to state changes
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // Update state and notify listeners
    setState(updates) {
        this.state = { ...this.state, ...updates };
        this.listeners.forEach(listener => listener(this.state));
    }

    // Get current state
    getState() {
        return this.state;
    }

    // Save specific data to localStorage
    saveToStorage(key) {
        localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
}

// Sample Data
const sampleData = {
    menuItems: [
        {
            id: 1,
            name: 'Chicken Burger',
            price: 12.99,
            category: 'Main Course',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
            description: 'Juicy grilled chicken with fresh lettuce and tomato',
            available: true,
            ingredients: ['Chicken', 'Lettuce', 'Tomato', 'Bun'],
            calories: 450,
            preparationTime: 15
        },
        {
            id: 2,
            name: 'Caesar Salad',
            price: 8.99,
            category: 'Salads',
            image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop',
            description: 'Fresh romaine lettuce with caesar dressing and croutons',
            available: true,
            ingredients: ['Romaine Lettuce', 'Caesar Dressing', 'Croutons', 'Parmesan'],
            calories: 280,
            preparationTime: 5
        },
        {
            id: 3,
            name: 'Margherita Pizza',
            price: 15.99,
            category: 'Pizza',
            image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop',
            description: 'Classic pizza with fresh mozzarella and basil',
            available: true,
            ingredients: ['Pizza Dough', 'Tomato Sauce', 'Mozzarella', 'Basil'],
            calories: 650,
            preparationTime: 20
        },
        {
            id: 4,
            name: 'Chocolate Cake',
            price: 6.99,
            category: 'Desserts',
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop',
            description: 'Rich chocolate cake with chocolate frosting',
            available: false,
            ingredients: ['Chocolate', 'Flour', 'Sugar', 'Eggs'],
            calories: 420,
            preparationTime: 10
        },
        {
            id: 5,
            name: 'Fresh Orange Juice',
            price: 4.99,
            category: 'Beverages',
            image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=200&fit=crop',
            description: 'Freshly squeezed orange juice',
            available: true,
            ingredients: ['Fresh Oranges'],
            calories: 110,
            preparationTime: 3
        },
        {
            id: 6,
            name: 'Grilled Salmon',
            price: 18.99,
            category: 'Main Course',
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop',
            description: 'Grilled salmon with herbs and lemon',
            available: true,
            ingredients: ['Salmon', 'Herbs', 'Lemon', 'Olive Oil'],
            calories: 380,
            preparationTime: 25
        }
    ],
    orders: [
        {
            id: 'ORD-001',
            customerName: 'Alice Johnson',
            items: [
                { id: 1, name: 'Chicken Burger', price: 12.99, quantity: 2 },
                { id: 5, name: 'Fresh Orange Juice', price: 4.99, quantity: 2 }
            ],
            total: 35.96,
            status: 'completed',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            paymentMethod: 'card'
        },
        {
            id: 'ORD-002',
            customerName: 'Bob Smith',
            items: [
                { id: 3, name: 'Margherita Pizza', price: 15.99, quantity: 1 },
                { id: 2, name: 'Caesar Salad', price: 8.99, quantity: 1 }
            ],
            total: 24.98,
            status: 'preparing',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            paymentMethod: 'cash'
        },
        {
            id: 'ORD-003',
            customerName: 'Carol Davis',
            items: [
                { id: 6, name: 'Grilled Salmon', price: 18.99, quantity: 1 }
            ],
            total: 18.99,
            status: 'pending',
            timestamp: new Date().toISOString(),
            paymentMethod: 'card'
        }
    ],
    inventory: [
        { id: 1, name: 'Chicken Breast', stock: 25, unit: 'kg', reorderLevel: 5, cost: 8.50 },
        { id: 2, name: 'Lettuce', stock: 15, unit: 'heads', reorderLevel: 3, cost: 2.00 },
        { id: 3, name: 'Tomatoes', stock: 8, unit: 'kg', reorderLevel: 2, cost: 3.50 },
        { id: 4, name: 'Mozzarella Cheese', stock: 12, unit: 'kg', reorderLevel: 3, cost: 12.00 },
        { id: 5, name: 'Pizza Dough', stock: 20, unit: 'pieces', reorderLevel: 5, cost: 1.50 },
        { id: 6, name: 'Salmon Fillet', stock: 3, unit: 'kg', reorderLevel: 2, cost: 25.00 }
    ]
};

// Initialize global app state
const appState = new AppState();

// Router for handling navigation
class Router {
    constructor() {
        this.routes = {
            'dashboard': () => this.renderDashboard(),
            'menu': () => this.renderMenu(),
            'orders': () => this.renderOrders(),
            'inventory': () => this.renderInventory(),
            'reports': () => this.renderReports(),
            'settings': () => this.renderSettings()
        };
        this.init();
    }

    init() {
        // Handle hash changes
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Handle initial load
        this.handleRoute();
        
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-item') || e.target.closest('.nav-item')) {
                e.preventDefault();
                const link = e.target.matches('.nav-item') ? e.target : e.target.closest('.nav-item');
                const route = link.getAttribute('href').substring(1);
                this.navigate(route);
            }
        });
    }

    handleRoute() {
        const hash = window.location.hash.substring(1) || 'dashboard';
        this.navigate(hash, false);
    }

    navigate(route, updateHash = true) {
        if (updateHash) {
            window.location.hash = route;
        }
        
        // Update active navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${route}`) {
                item.classList.add('active');
            }
        });
        
        // Update app state
        appState.setState({ currentView: route });
        
        // Render the route
        if (this.routes[route]) {
            this.routes[route]();
        } else {
            this.renderNotFound();
        }
    }

    renderDashboard() {
        const state = appState.getState();
        const totalOrders = state.orders.length;
        const todayRevenue = state.orders
            .filter(order => new Date(order.timestamp).toDateString() === new Date().toDateString())
            .reduce((sum, order) => sum + order.total, 0);
        const activeOrders = state.orders.filter(order => order.status !== 'completed').length;
        const availableItems = state.menuItems.filter(item => item.available).length;
        const lowStockItems = state.inventory.filter(item => item.stock <= item.reorderLevel);

        const content = `
            <div class="space-y-6">
                <!-- Page Header -->
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Last updated: ${new Date().toLocaleString()}
                    </div>
                </div>

                <!-- Statistics Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 card-hover">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                                <i class="fas fa-shopping-cart text-blue-600 dark:text-blue-400"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                                <p class="text-2xl font-semibold text-gray-900 dark:text-white">${totalOrders}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 card-hover">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-green-100 dark:bg-green-900">
                                <i class="fas fa-dollar-sign text-green-600 dark:text-green-400"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue Today</p>
                                <p class="text-2xl font-semibold text-gray-900 dark:text-white">$${todayRevenue.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 card-hover">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                                <i class="fas fa-clock text-yellow-600 dark:text-yellow-400"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Orders</p>
                                <p class="text-2xl font-semibold text-gray-900 dark:text-white">${activeOrders}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 card-hover">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                                <i class="fas fa-utensils text-purple-600 dark:text-purple-400"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Available Items</p>
                                <p class="text-2xl font-semibold text-gray-900 dark:text-white">${availableItems}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity and Low Stock Alerts -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Recent Orders -->
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
                        </div>
                        <div class="p-6">
                            <div class="space-y-4">
                                ${state.orders.slice(0, 5).map(order => `
                                    <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div>
                                            <p class="font-medium text-gray-900 dark:text-white">${order.id}</p>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">${order.customerName}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="font-medium text-gray-900 dark:text-white">$${order.total.toFixed(2)}</p>
                                            <span class="badge badge-${order.status === 'completed' ? 'success' : order.status === 'preparing' ? 'warning' : 'info'}">${order.status}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Low Stock Alerts -->
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Low Stock Alerts</h2>
                        </div>
                        <div class="p-6">
                            ${lowStockItems.length > 0 ? `
                                <div class="space-y-4">
                                    ${lowStockItems.map(item => `
                                        <div class="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                            <div>
                                                <p class="font-medium text-gray-900 dark:text-white">${item.name}</p>
                                                <p class="text-sm text-red-600 dark:text-red-400">Stock: ${item.stock} ${item.unit}</p>
                                            </div>
                                            <button class="btn-primary text-sm" onclick="showRestockModal(${item.id})">
                                                Restock
                                            </button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div class="text-center py-8">
                                    <i class="fas fa-check-circle text-green-500 text-4xl mb-4"></i>
                                    <p class="text-gray-600 dark:text-gray-400">All items are well stocked!</p>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('main-content').innerHTML = content;
    }

    renderMenu() {
        const state = appState.getState();
        const categories = [...new Set(state.menuItems.map(item => item.category))];
        
        const content = `
            <div class="space-y-6">
                <!-- Page Header -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Menu Management</h1>
                    <button onclick="showAddItemModal()" class="btn-primary">
                        <i class="fas fa-plus mr-2"></i>Add New Item
                    </button>
                </div>

                <!-- Filters and Search -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <div class="flex flex-col sm:flex-row gap-4">
                        <div class="flex-1">
                            <input type="text" id="menu-search" placeholder="Search menu items..." 
                                   class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input">
                        </div>
                        <select id="category-filter" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option value="">All Categories</option>
                            ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                        </select>
                        <select id="availability-filter" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option value="">All Items</option>
                            <option value="available">Available Only</option>
                            <option value="unavailable">Unavailable Only</option>
                        </select>
                    </div>
                </div>

                <!-- Menu Items Grid -->
                <div id="menu-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${this.renderMenuItems(state.menuItems)}
                </div>
            </div>
        `;

        document.getElementById('main-content').innerHTML = content;
        this.setupMenuFilters();
    }

    renderMenuItems(items) {
        return items.map(item => `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden card-hover">
                <div class="relative">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
                    <div class="absolute top-2 right-2">
                        <span class="badge ${item.available ? 'badge-success' : 'badge-danger'}">
                            ${item.available ? 'Available' : 'Unavailable'}
                        </span>
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex items-start justify-between mb-2">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${item.name}</h3>
                        <span class="text-xl font-bold text-primary-600 dark:text-primary-400">$${item.price}</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">${item.description}</p>
                    <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span><i class="fas fa-fire mr-1"></i>${item.calories} cal</span>
                        <span><i class="fas fa-clock mr-1"></i>${item.preparationTime} min</span>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="addToCart(${item.id})" 
                                class="flex-1 btn-primary ${!item.available ? 'opacity-50 cursor-not-allowed' : ''}"
                                ${!item.available ? 'disabled' : ''}>
                            <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                        </button>
                        <button onclick="editMenuItem(${item.id})" class="btn-secondary">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupMenuFilters() {
        const searchInput = document.getElementById('menu-search');
        const categoryFilter = document.getElementById('category-filter');
        const availabilityFilter = document.getElementById('availability-filter');

        const filterItems = () => {
            const state = appState.getState();
            let filteredItems = [...state.menuItems];

            // Search filter
            const searchTerm = searchInput.value.toLowerCase();
            if (searchTerm) {
                filteredItems = filteredItems.filter(item => 
                    item.name.toLowerCase().includes(searchTerm) ||
                    item.description.toLowerCase().includes(searchTerm) ||
                    item.category.toLowerCase().includes(searchTerm)
                );
            }

            // Category filter
            const selectedCategory = categoryFilter.value;
            if (selectedCategory) {
                filteredItems = filteredItems.filter(item => item.category === selectedCategory);
            }

            // Availability filter
            const availabilityValue = availabilityFilter.value;
            if (availabilityValue === 'available') {
                filteredItems = filteredItems.filter(item => item.available);
            } else if (availabilityValue === 'unavailable') {
                filteredItems = filteredItems.filter(item => !item.available);
            }

            document.getElementById('menu-grid').innerHTML = this.renderMenuItems(filteredItems);
        };

        searchInput.addEventListener('input', filterItems);
        categoryFilter.addEventListener('change', filterItems);
        availabilityFilter.addEventListener('change', filterItems);
    }

    renderOrders() {
        const state = appState.getState();
        
        const content = `
            <div class="space-y-6">
                <!-- Page Header -->
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Orders Management</h1>
                    <div class="flex gap-2">
                        <select id="order-status-filter" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option value="">All Orders</option>
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <!-- Orders Table -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="cursor-pointer" onclick="sortOrders('id')">
                                        Order ID <i class="fas fa-sort ml-1"></i>
                                    </th>
                                    <th class="cursor-pointer" onclick="sortOrders('customerName')">
                                        Customer <i class="fas fa-sort ml-1"></i>
                                    </th>
                                    <th class="cursor-pointer" onclick="sortOrders('total')">
                                        Total <i class="fas fa-sort ml-1"></i>
                                    </th>
                                    <th class="cursor-pointer" onclick="sortOrders('status')">
                                        Status <i class="fas fa-sort ml-1"></i>
                                    </th>
                                    <th class="cursor-pointer" onclick="sortOrders('timestamp')">
                                        Date <i class="fas fa-sort ml-1"></i>
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="orders-tbody">
                                ${this.renderOrderRows(state.orders)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('main-content').innerHTML = content;
        this.setupOrderFilters();
    }

    renderOrderRows(orders) {
        return orders.map(order => `
            <tr>
                <td class="font-medium">${order.id}</td>
                <td>${order.customerName}</td>
                <td class="font-medium">$${order.total.toFixed(2)}</td>
                <td>
                    <span class="badge badge-${order.status === 'completed' ? 'success' : order.status === 'preparing' ? 'warning' : 'info'}">
                        ${order.status}
                    </span>
                </td>
                <td>${new Date(order.timestamp).toLocaleDateString()}</td>
                <td>
                    <div class="flex gap-2">
                        <button onclick="viewOrderDetails('${order.id}')" class="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${order.status !== 'completed' ? `
                            <button onclick="updateOrderStatus('${order.id}', 'completed')" class="text-green-600 hover:text-green-800 dark:text-green-400">
                                <i class="fas fa-check"></i>
                            </button>
                        ` : ''}
                        <button onclick="printReceipt('${order.id}')" class="text-gray-600 hover:text-gray-800 dark:text-gray-400">
                            <i class="fas fa-print"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    setupOrderFilters() {
        const statusFilter = document.getElementById('order-status-filter');
        
        statusFilter.addEventListener('change', () => {
            const state = appState.getState();
            let filteredOrders = [...state.orders];
            
            const selectedStatus = statusFilter.value;
            if (selectedStatus) {
                filteredOrders = filteredOrders.filter(order => order.status === selectedStatus);
            }
            
            document.getElementById('orders-tbody').innerHTML = this.renderOrderRows(filteredOrders);
        });
    }

    renderInventory() {
        const state = appState.getState();
        
        const content = `
            <div class="space-y-6">
                <!-- Page Header -->
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Inventory Management</h1>
                    <button onclick="showAddInventoryModal()" class="btn-primary">
                        <i class="fas fa-plus mr-2"></i>Add Item
                    </button>
                </div>

                <!-- Inventory Table -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Current Stock</th>
                                    <th>Unit</th>
                                    <th>Reorder Level</th>
                                    <th>Cost per Unit</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${state.inventory.map(item => `
                                    <tr>
                                        <td class="font-medium">${item.name}</td>
                                        <td class="font-medium ${item.stock <= item.reorderLevel ? 'text-red-600 dark:text-red-400' : ''}">${item.stock}</td>
                                        <td>${item.unit}</td>
                                        <td>${item.reorderLevel}</td>
                                        <td>$${item.cost.toFixed(2)}</td>
                                        <td>
                                            <span class="badge ${item.stock <= item.reorderLevel ? 'badge-danger' : item.stock <= item.reorderLevel * 2 ? 'badge-warning' : 'badge-success'}">
                                                ${item.stock <= item.reorderLevel ? 'Low Stock' : item.stock <= item.reorderLevel * 2 ? 'Medium' : 'Good'}
                                            </span>
                                        </td>
                                        <td>
                                            <div class="flex gap-2">
                                                <button onclick="adjustStock(${item.id})" class="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button onclick="restockItem(${item.id})" class="text-green-600 hover:text-green-800 dark:text-green-400">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('main-content').innerHTML = content;
    }

    renderReports() {
        const state = appState.getState();
        const totalRevenue = state.orders.reduce((sum, order) => sum + order.total, 0);
        const completedOrders = state.orders.filter(order => order.status === 'completed').length;
        const avgOrderValue = completedOrders > 0 ? totalRevenue / completedOrders : 0;
        
        const content = `
            <div class="space-y-6">
                <!-- Page Header -->
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
                    <button onclick="exportReports()" class="btn-primary">
                        <i class="fas fa-download mr-2"></i>Export CSV
                    </button>
                </div>

                <!-- Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-green-100 dark:bg-green-900">
                                <i class="fas fa-dollar-sign text-green-600 dark:text-green-400"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                                <p class="text-2xl font-semibold text-gray-900 dark:text-white">$${totalRevenue.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                                <i class="fas fa-shopping-cart text-blue-600 dark:text-blue-400"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Orders</p>
                                <p class="text-2xl font-semibold text-gray-900 dark:text-white">${completedOrders}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                                <i class="fas fa-chart-line text-purple-600 dark:text-purple-400"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Order Value</p>
                                <p class="text-2xl font-semibold text-gray-900 dark:text-white">$${avgOrderValue.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Charts Section -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Overview</h2>
                    <div id="sales-chart" class="h-64">
                        <!-- Simple SVG chart would go here -->
                        <div class="flex items-end justify-center h-full space-x-2">
                            ${this.generateSimpleChart(state.orders)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('main-content').innerHTML = content;
    }

    generateSimpleChart(orders) {
        // Group orders by day for the last 7 days
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            last7Days.push(date.toDateString());
        }

        const dailyRevenue = last7Days.map(day => {
            const dayOrders = orders.filter(order => new Date(order.timestamp).toDateString() === day);
            return dayOrders.reduce((sum, order) => sum + order.total, 0);
        });

        const maxRevenue = Math.max(...dailyRevenue, 1);

        return dailyRevenue.map((revenue, index) => {
            const height = (revenue / maxRevenue) * 200;
            const day = new Date(last7Days[index]).toLocaleDateString('en-US', { weekday: 'short' });
            
            return `
                <div class="flex flex-col items-center">
                    <div class="bg-primary-500 rounded-t" style="width: 30px; height: ${height}px; min-height: 10px;"></div>
                    <div class="text-xs text-gray-600 dark:text-gray-400 mt-2">${day}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-500">$${revenue.toFixed(0)}</div>
                </div>
            `;
        }).join('');
    }

    renderSettings() {
        const content = `
            <div class="space-y-6">
                <!-- Page Header -->
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

                <!-- Settings Sections -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- General Settings -->
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">General Settings</h2>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Restaurant Name</label>
                                <input type="text" value="Canteen Pro" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                                <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tax Rate (%)</label>
                                <input type="number" value="8.5" step="0.1" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input">
                            </div>
                        </div>
                    </div>

                    <!-- Notification Settings -->
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notifications</h2>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <span class="text-gray-700 dark:text-gray-300">Low Stock Alerts</span>
                                <input type="checkbox" checked class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-700 dark:text-gray-300">New Order Notifications</span>
                                <input type="checkbox" checked class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-700 dark:text-gray-300">Daily Reports</span>
                                <input type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Data Management -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Management</h2>
                    <div class="flex flex-wrap gap-4">
                        <button onclick="exportData()" class="btn-primary">
                            <i class="fas fa-download mr-2"></i>Export Data
                        </button>
                        <button onclick="importData()" class="btn-secondary">
                            <i class="fas fa-upload mr-2"></i>Import Data
                        </button>
                        <button onclick="resetData()" class="btn-danger">
                            <i class="fas fa-trash mr-2"></i>Reset All Data
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('main-content').innerHTML = content;
    }

    renderNotFound() {
        const content = `
            <div class="text-center py-12">
                <i class="fas fa-exclamation-triangle text-6xl text-gray-400 mb-4"></i>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h1>
                <p class="text-gray-600 dark:text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
                <button onclick="router.navigate('dashboard')" class="btn-primary">
                    <i class="fas fa-home mr-2"></i>Go to Dashboard
                </button>
            </div>
        `;

        document.getElementById('main-content').innerHTML = content;
    }
}

// Cart Management
class CartManager {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Cart button click
        document.getElementById('cart-btn').addEventListener('click', () => {
            this.toggleCart();
        });

        // Close cart button
        document.getElementById('close-cart').addEventListener('click', () => {
            this.closeCart();
        });

        // Checkout button
        document.getElementById('checkout-btn').addEventListener('click', () => {
            this.checkout();
        });

        // Clear cart button
        document.getElementById('clear-cart').addEventListener('click', () => {
            this.clearCart();
        });
    }

    addItem(itemId) {
        const state = appState.getState();
        const menuItem = state.menuItems.find(item => item.id === itemId);
        
        if (!menuItem || !menuItem.available) {
            showNotification('Item is not available', 'error');
            return;
        }

        const existingItem = state.cart.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.cart.push({
                id: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                image: menuItem.image,
                quantity: 1
            });
        }

        appState.setState({ cart: state.cart });
        appState.saveToStorage('cart');
        this.updateCartUI();
        showNotification(`${menuItem.name} added to cart`, 'success');
    }

    removeItem(itemId) {
        const state = appState.getState();
        const updatedCart = state.cart.filter(item => item.id !== itemId);
        appState.setState({ cart: updatedCart });
        appState.saveToStorage('cart');
        this.updateCartUI();
    }

    updateQuantity(itemId, quantity) {
        const state = appState.getState();
        const item = state.cart.find(item => item.id === itemId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeItem(itemId);
            } else {
                item.quantity = quantity;
                appState.setState({ cart: state.cart });
                appState.saveToStorage('cart');
                this.updateCartUI();
            }
        }
    }

    clearCart() {
        appState.setState({ cart: [] });
        appState.saveToStorage('cart');
        this.updateCartUI();
        showNotification('Cart cleared', 'info');
    }

    toggleCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('overlay');
        
        if (cartSidebar.classList.contains('translate-x-full')) {
            cartSidebar.classList.remove('translate-x-full');
            overlay.classList.remove('hidden');
        } else {
            this.closeCart();
        }
    }

    closeCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('overlay');
        
        cartSidebar.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    }

    updateCartUI() {
        const state = appState.getState();
        const cartItems = document.getElementById('cart-items');
        const cartBadge = document.getElementById('cart-badge');
        const cartTotal = document.getElementById('cart-total');
        const checkoutBtn = document.getElementById('checkout-btn');

        // Update cart badge
        const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.classList.remove('hidden');
        } else {
            cartBadge.classList.add('hidden');
        }

        // Update cart items
        if (state.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-shopping-cart text-gray-400 text-4xl mb-4"></i>
                    <p class="text-gray-600 dark:text-gray-400">Your cart is empty</p>
                </div>
            `;
            checkoutBtn.disabled = true;
        } else {
            cartItems.innerHTML = state.cart.map(item => `
                <div class="flex items-center space-x-4 p-4 border-b border-gray-200 dark:border-gray-700">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                    <div class="flex-1">
                        <h3 class="font-medium text-gray-900 dark:text-white">${item.name}</h3>
                        <p class="text-primary-600 dark:text-primary-400 font-medium">$${item.price}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})" 
                                class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600">
                            <i class="fas fa-minus text-xs"></i>
                        </button>
                        <span class="w-8 text-center font-medium text-gray-900 dark:text-white">${item.quantity}</span>
                        <button onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})" 
                                class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600">
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                    </div>
                    <button onclick="cartManager.removeItem(${item.id})" 
                            class="text-red-500 hover:text-red-700 dark:text-red-400">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
            checkoutBtn.disabled = false;
        }

        // Update total
        const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    checkout() {
        const state = appState.getState();
        
        if (state.cart.length === 0) {
            showNotification('Cart is empty', 'error');
            return;
        }

        showCheckoutModal();
    }
}

// Theme Management
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Set initial theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);

        // Setup theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        localStorage.setItem('theme', theme);
        appState.setState({ theme });
    }

    toggleTheme() {
        const currentTheme = appState.getState().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        showNotification(`Switched to ${newTheme} theme`, 'info');
    }
}

// Utility Functions
function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    toast.innerHTML = `
        <div class="p-4">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} text-${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'warning' ? 'yellow' : 'blue'}-500"></i>
                </div>
                <div class="ml-3 w-0 flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">${message}</p>
                </div>
                <div class="ml-4 flex-shrink-0 flex">
                    <button onclick="this.parentElement.parentElement.parentElement.parentElement.remove()" 
                            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, duration);
}

function showModal(title, content, actions = '') {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full animate-bounce-in">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">${title}</h2>
            </div>
            <div class="p-6">
                ${content}
            </div>
            ${actions ? `
                <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                    ${actions}
                </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('modals-container').appendChild(modal);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    return modal;
}

// Global Functions (called from HTML)
function addToCart(itemId) {
    cartManager.addItem(itemId);
}

function showCheckoutModal() {
    const state = appState.getState();
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = total * 0.085; // 8.5% tax
    const finalTotal = total + tax;
    
    const content = `
        <form id="checkout-form" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Customer Name</label>
                <input type="text" id="customer-name" required 
                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
                <select id="payment-method" required 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Select payment method</option>
                    <option value="cash">Cash</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="digital">Digital Wallet</option>
                </select>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div class="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span>Tax (8.5%):</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="flex justify-between font-semibold text-lg border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                    <span>Total:</span>
                    <span>$${finalTotal.toFixed(2)}</span>
                </div>
            </div>
        </form>
    `;
    
    const actions = `
        <button type="button" onclick="this.closest('.modal-backdrop').remove()" class="btn-secondary">Cancel</button>
        <button type="button" onclick="processOrder()" class="btn-primary">Place Order</button>
    `;
    
    showModal('Checkout', content, actions);
}

function processOrder() {
    const customerName = document.getElementById('customer-name').value;
    const paymentMethod = document.getElementById('payment-method').value;
    
    if (!customerName || !paymentMethod) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const state = appState.getState();
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = total * 0.085;
    const finalTotal = total + tax;
    
    const newOrder = {
        id: `ORD-${String(state.orders.length + 1).padStart(3, '0')}`,
        customerName,
        items: [...state.cart],
        total: finalTotal,
        status: 'pending',
        timestamp: new Date().toISOString(),
        paymentMethod
    };
    
    // Add order to state
    state.orders.unshift(newOrder);
    appState.setState({ 
        orders: state.orders,
        cart: []
    });
    appState.saveToStorage('orders');
    appState.saveToStorage('cart');
    
    // Update UI
    cartManager.updateCartUI();
    cartManager.closeCart();
    
    // Close modal
    document.querySelector('.modal-backdrop').remove();
    
    showNotification(`Order ${newOrder.id} placed successfully!`, 'success');
    
    // Navigate to orders if not already there
    if (appState.getState().currentView !== 'orders') {
        router.navigate('orders');
    }
}

function editMenuItem(itemId) {
    const state = appState.getState();
    const item = state.menuItems.find(i => i.id === itemId);
    
    if (!item) return;
    
    const content = `
        <form id="edit-item-form" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input type="text" id="item-name" value="${item.name}" required 
                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price</label>
                <input type="number" id="item-price" value="${item.price}" step="0.01" required 
                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <input type="text" id="item-category" value="${item.category}" required 
                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea id="item-description" rows="3" required 
                          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input">${item.description}</textarea>
            </div>
            <div class="flex items-center">
                <input type="checkbox" id="item-available" ${item.available ? 'checked' : ''} 
                       class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                <label for="item-available" class="ml-2 text-sm text-gray-700 dark:text-gray-300">Available</label>
            </div>
        </form>
    `;
    
    const actions = `
        <button type="button" onclick="this.closest('.modal-backdrop').remove()" class="btn-secondary">Cancel</button>
        <button type="button" onclick="updateMenuItem(${itemId})" class="btn-primary">Update Item</button>
    `;
    
    showModal('Edit Menu Item', content, actions);
}

function updateMenuItem(itemId) {
    const name = document.getElementById('item-name').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const category = document.getElementById('item-category').value;
    const description = document.getElementById('item-description').value;
    const available = document.getElementById('item-available').checked;
    
    if (!name || !price || !category || !description) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const state = appState.getState();
    const itemIndex = state.menuItems.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        state.menuItems[itemIndex] = {
            ...state.menuItems[itemIndex],
            name,
            price,
            category,
            description,
            available
        };
        
        appState.setState({ menuItems: state.menuItems });
        appState.saveToStorage('menuItems');
        
        // Refresh current view if on menu page
        if (appState.getState().currentView === 'menu') {
            router.renderMenu();
        }
        
        document.querySelector('.modal-backdrop').remove();
        showNotification('Menu item updated successfully', 'success');
    }
}

function showAddItemModal() {
    const content = `
        <form id="add-item-form" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input type="text" id="new-item-name" required 
                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price</label>
                <input type="number" id="new-item-price" step="0.01" required 
                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <input type="text" id="new-item-category" required 
                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea id="new-item-description" rows="3" required 
                          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input"></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                <input type="url" id="new-item-image" 
                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input"
                       placeholder="https://example.com/image.jpg">
            </div>
            <div class="flex items-center">
                <input type="checkbox" id="new-item-available" checked 
                       class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                <label for="new-item-available" class="ml-2 text-sm text-gray-700 dark:text-gray-300">Available</label>
            </div>
        </form>
    `;
    
    const actions = `
        <button type="button" onclick="this.closest('.modal-backdrop').remove()" class="btn-secondary">Cancel</button>
        <button type="button" onclick="addNewMenuItem()" class="btn-primary">Add Item</button>
    `;
    
    showModal('Add New Menu Item', content, actions);
}

function addNewMenuItem() {
    const name = document.getElementById('new-item-name').value;
    const price = parseFloat(document.getElementById('new-item-price').value);
    const category = document.getElementById('new-item-category').value;
    const description = document.getElementById('new-item-description').value;
    const image = document.getElementById('new-item-image').value || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop';
    const available = document.getElementById('new-item-available').checked;
    
    if (!name || !price || !category || !description) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const state = appState.getState();
    const newId = Math.max(...state.menuItems.map(item => item.id)) + 1;
    
    const newItem = {
        id: newId,
        name,
        price,
        category,
        description,
        image,
        available,
        ingredients: [],
        calories: 0,
        preparationTime: 10
    };
    
    state.menuItems.push(newItem);
    appState.setState({ menuItems: state.menuItems });
    appState.saveToStorage('menuItems');
    
    // Refresh current view if on menu page
    if (appState.getState().currentView === 'menu') {
        router.renderMenu();
    }
    
    document.querySelector('.modal-backdrop').remove();
    showNotification('Menu item added successfully', 'success');
}

function viewOrderDetails(orderId) {
    const state = appState.getState();
    const order = state.orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    const content = `
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span class="font-medium text-gray-700 dark:text-gray-300">Order ID:</span>
                    <span class="text-gray-900 dark:text-white">${order.id}</span>
                </div>
                <div>
                    <span class="font-medium text-gray-700 dark:text-gray-300">Customer:</span>
                    <span class="text-gray-900 dark:text-white">${order.customerName}</span>
                </div>
                <div>
                    <span class="font-medium text-gray-700 dark:text-gray-300">Status:</span>
                    <span class="badge badge-${order.status === 'completed' ? 'success' : order.status === 'preparing' ? 'warning' : 'info'}">${order.status}</span>
                </div>
                <div>
                    <span class="font-medium text-gray-700 dark:text-gray-300">Payment:</span>
                    <span class="text-gray-900 dark:text-white">${order.paymentMethod}</span>
                </div>
            </div>
            
            <div>
                <h3 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Order Items:</h3>
                <div class="space-y-2">
                    ${order.items.map(item => `
                        <div class="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                            <span class="text-gray-900 dark:text-white">${item.name} x${item.quantity}</span>
                            <span class="font-medium text-gray-900 dark:text-white">$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
                <div class="flex justify-between items-center font-semibold text-lg">
                    <span class="text-gray-700 dark:text-gray-300">Total:</span>
                    <span class="text-gray-900 dark:text-white">$${order.total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `;
    
    const actions = `
        <button type="button" onclick="this.closest('.modal-backdrop').remove()" class="btn-secondary">Close</button>
        ${order.status !== 'completed' ? `
            <button type="button" onclick="updateOrderStatus('${order.id}', 'completed'); this.closest('.modal-backdrop').remove();" class="btn-primary">Mark Complete</button>
        ` : ''}
    `;
    
    showModal('Order Details', content, actions);
}

function updateOrderStatus(orderId, newStatus) {
    const state = appState.getState();
    const orderIndex = state.orders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
        state.orders[orderIndex].status = newStatus;
        appState.setState({ orders: state.orders });
        appState.saveToStorage('orders');
        
        // Refresh orders view if currently viewing
        if (appState.getState().currentView === 'orders') {
            router.renderOrders();
        }
        
        showNotification(`Order ${orderId} marked as ${newStatus}`, 'success');
    }
}

function printReceipt(orderId) {
    const state = appState.getState();
    const order = state.orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Receipt - ${order.id}</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
                .order-info { margin-bottom: 20px; }
                .items { margin-bottom: 20px; }
                .item { display: flex; justify-content: space-between; margin-bottom: 5px; }
                .total { border-top: 2px solid #000; padding-top: 10px; font-weight: bold; font-size: 1.2em; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Canteen Pro</h1>
                <p>Receipt</p>
            </div>
            
            <div class="order-info">
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Customer:</strong> ${order.customerName}</p>
                <p><strong>Date:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
                <p><strong>Payment:</strong> ${order.paymentMethod}</p>
            </div>
            
            <div class="items">
                <h3>Items:</h3>
                ${order.items.map(item => `
                    <div class="item">
                        <span>${item.name} x${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="total">
                <div class="item">
                    <span>Total:</span>
                    <span>$${order.total.toFixed(2)}</span>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; font-size: 0.9em;">
                <p>Thank you for your order!</p>
            </div>
        </body>
        </html>
    `);
    
    receiptWindow.document.close();
    receiptWindow.print();
}

function sortOrders(field) {
    const state = appState.getState();
    const sortedOrders = [...state.orders].sort((a, b) => {
        if (field === 'total') {
            return b[field] - a[field];
        } else if (field === 'timestamp') {
            return new Date(b[field]) - new Date(a[field]);
        } else {
            return a[field].localeCompare(b[field]);
        }
    });
    
    document.getElementById('orders-tbody').innerHTML = router.renderOrderRows(sortedOrders);
}

function adjustStock(itemId) {
    const state = appState.getState();
    const item = state.inventory.find(i => i.id === itemId);
    
    if (!item) return;
    
    const content = `
        <form id="adjust-stock-form" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Item: ${item.name}</label>
                <p class="text-sm text-gray-600 dark:text-gray-400">Current Stock: ${item.stock} ${item.unit}</p>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Stock Amount</label>
                <input type="number" id="new-stock" value="${item.stock}" min="0" required 
                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason</label>
                <select id="adjustment-reason" required 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Select reason</option>
                    <option value="restock">Restock</option>
                    <option value="usage">Usage</option>
                    <option value="waste">Waste/Spoilage</option>
                    <option value="correction">Inventory Correction</option>
                </select>
            </div>
        </form>
    `;
    
    const actions = `
        <button type="button" onclick="this.closest('.modal-backdrop').remove()" class="btn-secondary">Cancel</button>
        <button type="button" onclick="updateStock(${itemId})" class="btn-primary">Update Stock</button>
    `;
    
    showModal('Adjust Stock', content, actions);
}

function updateStock(itemId) {
    const newStock = parseInt(document.getElementById('new-stock').value);
    const reason = document.getElementById('adjustment-reason').value;
    
    if (isNaN(newStock) || !reason) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const state = appState.getState();
    const itemIndex = state.inventory.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        state.inventory[itemIndex].stock = newStock;
        appState.setState({ inventory: state.inventory });
        appState.saveToStorage('inventory');
        
        // Refresh inventory view if currently viewing
        if (appState.getState().currentView === 'inventory') {
            router.renderInventory();
        }
        
        document.querySelector('.modal-backdrop').remove();
        showNotification('Stock updated successfully', 'success');
    }
}

function restockItem(itemId) {
    const state = appState.getState();
    const item = state.inventory.find(i => i.id === itemId);
    
    if (!item) return;
    
    const content = `
        <form id="restock-form" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Item: ${item.name}</label>
                <p class="text-sm text-gray-600 dark:text-gray-400">Current Stock: ${item.stock} ${item.unit}</p>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Restock Amount</label>
                <input type="number" id="restock-amount" min="1" required 
                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white form-input">
            </div>
        </form>
    `;
    
    const actions = `
        <button type="button" onclick="this.closest('.modal-backdrop').remove()" class="btn-secondary">Cancel</button>
        <button type="button" onclick="processRestock(${itemId})" class="btn-primary">Restock</button>
    `;
    
    showModal('Restock Item', content, actions);
}

function processRestock(itemId) {
    const restockAmount = parseInt(document.getElementById('restock-amount').value);
    
    if (isNaN(restockAmount) || restockAmount <= 0) {
        showNotification('Please enter a valid restock amount', 'error');
        return;
    }
    
    const state = appState.getState();
    const itemIndex = state.inventory.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        state.inventory[itemIndex].stock += restockAmount;
        appState.setState({ inventory: state.inventory });
        appState.saveToStorage('inventory');
        
        // Refresh views
        if (appState.getState().currentView === 'inventory') {
            router.renderInventory();
        } else if (appState.getState().currentView === 'dashboard') {
            router.renderDashboard();
        }
        
        document.querySelector('.modal-backdrop').remove();
        showNotification(`Restocked ${restockAmount} units successfully`, 'success');
    }
}

function exportReports() {
    const state = appState.getState();
    const csvContent = [
        ['Order ID', 'Customer', 'Total', 'Status', 'Date', 'Payment Method'],
        ...state.orders.map(order => [
            order.id,
            order.customerName,
            order.total.toFixed(2),
            order.status,
            new Date(order.timestamp).toLocaleDateString(),
            order.paymentMethod
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `canteen-reports-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('Reports exported successfully', 'success');
}

function exportData() {
    const state = appState.getState();
    const data = {
        menuItems: state.menuItems,
        orders: state.orders,
        inventory: state.inventory,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `canteen-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully', 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    if (data.menuItems && data.orders && data.inventory) {
                        appState.setState({
                            menuItems: data.menuItems,
                            orders: data.orders,
                            inventory: data.inventory
                        });
                        
                        appState.saveToStorage('menuItems');
                        appState.saveToStorage('orders');
                        appState.saveToStorage('inventory');
                        
                        // Refresh current view
                        router.handleRoute();
                        
                        showNotification('Data imported successfully', 'success');
                    } else {
                        showNotification('Invalid data format', 'error');
                    }
                } catch (error) {
                    showNotification('Error importing data', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function resetData() {
    const content = `
        <div class="text-center">
            <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Reset All Data</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
                This will permanently delete all orders, menu items, and inventory data. This action cannot be undone.
            </p>
        </div>
    `;
    
    const actions = `
        <button type="button" onclick="this.closest('.modal-backdrop').remove()" class="btn-secondary">Cancel</button>
        <button type="button" onclick="confirmResetData()" class="btn-danger">Reset All Data</button>
    `;
    
    showModal('Confirm Reset', content, actions);
}

function confirmResetData() {
    // Clear localStorage
    localStorage.removeItem('menuItems');
    localStorage.removeItem('orders');
    localStorage.removeItem('inventory');
    localStorage.removeItem('cart');
    
    // Reset state to initial data
    appState.setState({
        cart: [],
        orders: [],
        menuItems: [],
        inventory: []
    });
    
    // Reinitialize with sample data
    appState.initializeData();
    
    // Close modal and refresh
    document.querySelector('.modal-backdrop').remove();
    router.handleRoute();
    cartManager.updateCartUI();
    
    showNotification('All data has been reset', 'info');
}

// Search functionality
function setupGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length > 2) {
                performGlobalSearch(query);
            }
        }, 300);
    });
}

function performGlobalSearch(query) {
    const state = appState.getState();
    const results = [];
    
    // Search menu items
    state.menuItems.forEach(item => {
        if (item.name.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)) {
            results.push({
                type: 'menu',
                title: item.name,
                subtitle: item.category,
                action: () => {
                    router.navigate('menu');
                    setTimeout(() => {
                        document.getElementById('menu-search').value = query;
                        document.getElementById('menu-search').dispatchEvent(new Event('input'));
                    }, 100);
                }
            });
        }
    });
    
    // Search orders
    state.orders.forEach(order => {
        if (order.id.toLowerCase().includes(query) || 
            order.customerName.toLowerCase().includes(query)) {
            results.push({
                type: 'order',
                title: order.id,
                subtitle: order.customerName,
                action: () => {
                    router.navigate('orders');
                    setTimeout(() => viewOrderDetails(order.id), 100);
                }
            });
        }
    });
    
    // Show search results (you could implement a dropdown here)
    if (results.length > 0) {
        console.log('Search results:', results);
        // In a real implementation, you'd show these in a dropdown
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
    }, 1000);
    
    // Initialize components
    window.router = new Router();
    window.cartManager = new CartManager();
    window.themeManager = new ThemeManager();
    
    // Setup global search
    setupGlobalSearch();
    
    // Setup mobile menu toggle
    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking overlay
    document.getElementById('overlay').addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        
        // Also close cart if open
        cartManager.closeCart();
    });
    
    // Setup notifications button
    document.getElementById('notifications-btn').addEventListener('click', () => {
        showNotification('No new notifications', 'info');
    });
    
    // Setup user menu
    document.getElementById('user-menu-btn').addEventListener('click', () => {
        const content = `
            <div class="space-y-4">
                <div class="flex items-center space-x-3">
                    <img src="${appState.getState().user.avatar}" alt="User" class="w-12 h-12 rounded-full">
                    <div>
                        <p class="font-medium text-gray-900 dark:text-white">${appState.getState().user.name}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${appState.getState().user.role}</p>
                    </div>
                </div>
                <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <button onclick="router.navigate('settings'); document.querySelector('.modal-backdrop').remove();" 
                            class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <i class="fas fa-cog mr-2"></i>Settings
                    </button>
                    <button onclick="logout()" 
                            class="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <i class="fas fa-sign-out-alt mr-2"></i>Logout
                    </button>
                </div>
            </div>
        `;
        
        showModal('User Menu', content);
    });
    
    // Initialize cart UI
    cartManager.updateCartUI();
    
    console.log('Canteen Management System initialized successfully!');
});

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // In a real app, you'd clear authentication tokens here
        showNotification('Logged out successfully', 'info');
        document.querySelector('.modal-backdrop').remove();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search').focus();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal-backdrop');
        if (modal) {
            modal.remove();
        } else {
            cartManager.closeCart();
        }
    }
});

// Export for global access
window.addToCart = addToCart;
window.showCheckoutModal = showCheckoutModal;
window.processOrder = processOrder;
window.editMenuItem = editMenuItem;
window.updateMenuItem = updateMenuItem;
window.showAddItemModal = showAddItemModal;
window.addNewMenuItem = addNewMenuItem;
window.viewOrderDetails = viewOrderDetails;
window.updateOrderStatus = updateOrderStatus;
window.printReceipt = printReceipt;
window.sortOrders = sortOrders;
window.adjustStock = adjustStock;
window.updateStock = updateStock;
window.restockItem = restockItem;
window.processRestock = processRestock;
window.exportReports = exportReports;
window.exportData = exportData;
window.importData = importData;
window.resetData = resetData;
window.confirmResetData = confirmResetData;
window.logout = logout;