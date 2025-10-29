# Canteen Management System

A modern, responsive web template for canteen management built with HTML, Tailwind CSS, and vanilla JavaScript.

## Features

### 🎨 Visual & Layout
- **Modern Design**: Clean, minimal aesthetic with proper spacing and typography
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with localStorage persistence
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support

### 📱 Main Components
- **Dashboard**: Statistics cards and recent activity feed
- **Menu Management**: Grid/list view with search, filter, and CRUD operations
- **Order Management**: Cart system with checkout and order tracking
- **Inventory Panel**: Stock management with reorder alerts
- **Reports**: Data export and analytics

### ⚡ JavaScript Features
- **Modular Architecture**: Clean ES6+ vanilla JavaScript
- **Local Storage**: Persistent data using localStorage
- **Real-time Updates**: Dynamic UI updates without page refresh
- **Form Validation**: Client-side validation with user feedback
- **Search & Filter**: Global search and category filtering
- **Print Support**: Receipt printing functionality

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation

1. **Clone or Download** the project files
2. **Open in Browser**: 
   - For basic testing: Open `index.html` directly in your browser
   - For full functionality: Use a local web server

### Using a Local Server

#### Option 1: Python (if installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Option 2: Node.js (if installed)
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

#### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Access the Application
Open your browser and navigate to:
- Direct file: `file:///path/to/index.html`
- Local server: `http://localhost:8000`

## 📁 File Structure

```
canteen-management/
├── index.html          # Main HTML file
├── main.css           # Custom CSS styles
├── app.js             # JavaScript application logic
└── README.md          # This file
```

## 🎯 Usage Guide

### Navigation
- **Sidebar**: Click menu items to navigate between sections
- **Mobile**: Use hamburger menu for mobile navigation
- **Keyboard**: Use `Ctrl/Cmd + K` for global search

### Dashboard
- View key metrics and statistics
- Monitor recent activity and low stock alerts
- Quick access to common actions

### Menu Management
- **Add Items**: Click "Add New Item" button
- **Edit Items**: Click edit icon on menu cards
- **Search**: Use search bar to find specific items
- **Filter**: Select categories to filter menu items

### Order Management
- **Add to Cart**: Click "Add to Cart" on menu items
- **View Cart**: Click cart icon in top navigation
- **Checkout**: Fill customer details and process order
- **Track Orders**: View and update order status in Orders section

### Inventory
- **Stock Levels**: Monitor current stock and reorder thresholds
- **Adjust Stock**: Click adjust button to modify quantities
- **Restock**: Quick restock functionality for low items

### Data Management
- **Export**: Download reports as CSV or full data as JSON
- **Import**: Upload JSON data to restore/migrate
- **Reset**: Clear all data and restore sample data

## 🔧 Customization

### Themes
The application supports light and dark themes. Customize colors in `main.css`:

```css
:root {
  --primary-50: #eff6ff;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  /* Add your custom colors */
}
```

### Sample Data
Modify the sample data in `app.js` within the `AppState.initializeData()` method:

```javascript
// Add your menu items
const sampleMenuItems = [
  {
    id: 1,
    name: "Your Item",
    price: 9.99,
    category: "Your Category",
    // ... other properties
  }
];
```

### Adding Features
The modular structure makes it easy to add new features:

1. Add new routes in the `Router` class
2. Create corresponding render methods
3. Add navigation items in the sidebar
4. Implement any new state management needs

## 🌐 Backend Integration

### API Endpoints
For production use, replace localStorage with API calls:

#### Authentication
```javascript
// Login
POST /api/auth/login
{
  "username": "admin",
  "password": "password"
}

// Response
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "Admin User",
    "role": "admin"
  }
}
```

#### Menu Items
```javascript
// Get all menu items
GET /api/menu-items

// Create menu item
POST /api/menu-items
{
  "name": "New Item",
  "price": 12.99,
  "category": "Main Course",
  "description": "Delicious item",
  "available": true
}

// Update menu item
PUT /api/menu-items/:id
{
  "name": "Updated Item",
  "price": 13.99
}

// Delete menu item
DELETE /api/menu-items/:id
```

#### Orders
```javascript
// Get all orders
GET /api/orders

// Create order
POST /api/orders
{
  "customerName": "John Doe",
  "items": [
    {
      "id": 1,
      "quantity": 2,
      "price": 12.99
    }
  ],
  "paymentMethod": "cash",
  "total": 25.98
}

// Update order status
PATCH /api/orders/:id
{
  "status": "completed"
}
```

#### Inventory
```javascript
// Get inventory
GET /api/inventory

// Update stock
PATCH /api/inventory/:id
{
  "stock": 50,
  "reason": "restock"
}
```

### Integration Steps

1. **Replace localStorage calls** with fetch API calls
2. **Add authentication** token management
3. **Implement error handling** for network requests
4. **Add loading states** for async operations
5. **Handle offline scenarios** with service workers

### Example API Integration

```javascript
// Replace localStorage with API calls
class ApiService {
  constructor() {
    this.baseUrl = 'https://your-api.com/api';
    this.token = localStorage.getItem('authToken');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      ...options
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Menu Items
  async getMenuItems() {
    return this.request('/menu-items');
  }

  async createMenuItem(item) {
    return this.request('/menu-items', {
      method: 'POST',
      body: JSON.stringify(item)
    });
  }

  // Orders
  async getOrders() {
    return this.request('/orders');
  }

  async createOrder(order) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(order)
    });
  }
}
```

## 🎨 Optional Enhancements

### Charts Integration
Add charts to the dashboard using Chart.js:

```html
<!-- Add to index.html -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

```javascript
// Add to dashboard rendering
function renderSalesChart() {
  const ctx = document.getElementById('salesChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Daily Sales',
        data: [120, 190, 300, 500, 200, 300, 450],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1
      }]
    }
  });
}
```

### Progressive Web App (PWA)
Convert to PWA by adding:

1. **Service Worker** for offline functionality
2. **Web App Manifest** for installation
3. **Push Notifications** for order updates

### Real-time Updates
Implement WebSocket connections for:
- Live order updates
- Real-time inventory changes
- Multi-user synchronization

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Check existing documentation
- Review the code comments for implementation details

---

**Built with ❤️ using HTML, Tailwind CSS, and Vanilla JavaScript**