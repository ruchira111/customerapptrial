# SMRT Customer App

A complete mobile web application for SMRT's laundry service customer interface, built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

### Core Functionality
- **QR Code Scanning Flow**: Complete scanning instructions and machine detection
- **Machine Listing**: Grid view of available washing machines and dryers
- **Machine Details**: Detailed view with add-ons and pricing
- **Shopping Cart**: Add/remove machines with persistent storage
- **Payment Summary**: Complete checkout flow with wallet integration

### User Management
- **Profile Page**: Three main cards for Wallet, Rewards, and Profile Settings
- **Wallet Management**: Balance display, transaction history, payment methods
- **Loyalty Benefits**: Active benefits display with discount cards
- **User Authentication**: Profile management and settings

### Navigation
- **Bottom Navigation**: Home, Machines, Profile, Support
- **Cross-page Navigation**: Seamless flow between all features
- **Responsive Design**: Mobile-first approach with scrolling support

## 📱 Pages

1. **Home** (`index.html`) - Main dashboard with wallet and benefits overview
2. **Machines** (`machines.html`) - Machine listing with filtering options
3. **Machine Details** (`machine-details.html`) - Individual machine view with add-ons
4. **Scan Instructions** (`scan-instructions.html`) - QR code scanning guide
5. **Cart** (`cart.html`) - Shopping cart with item management
6. **Payment Summary** (`payment-summary.html`) - Checkout and payment processing
7. **Profile** (`profile.html`) - User profile and settings
8. **Wallet** (`wallet.html`) - Wallet management and transactions
9. **Benefits** (`benefits.html`) - Loyalty program and discounts

## 🎨 Design Features

- **Mobile-First Design**: Optimized for mobile devices (375x812px)
- **Modern UI**: Clean, card-based interface with hover effects
- **Color Scheme**: SMRT brand colors (#d60692 primary, #f7f8f9 background)
- **Typography**: Outfit font family for modern appearance
- **Interactive Elements**: Buttons, modals, and smooth transitions

## 🛠️ Technical Stack

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **JavaScript (ES6+)**: Modern JavaScript with localStorage for data persistence
- **No Dependencies**: Pure vanilla implementation

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ruchira111/customerapptrial.git
   cd customerapptrial
   ```

2. **Start local server**:
   ```bash
   python3 -m http.server 8080
   ```

3. **Open in browser**:
   ```
   http://localhost:8080
   ```

## 🔄 User Flow

1. **Home** → View wallet balance and active benefits
2. **Scan** → QR code scanning instructions → Machine details
3. **Machines** → Browse available machines → Add to cart or view details
4. **Cart** → Review selected items → Proceed to payment
5. **Payment** → Complete checkout with wallet integration
6. **Profile** → Manage account, wallet, and benefits

## 💾 Data Storage

- **localStorage**: Cart items, user preferences, and session data
- **No Backend Required**: Fully functional frontend application
- **Persistent State**: Cart and user data maintained across sessions

## 📱 Responsive Features

- **Fixed Bottom Navigation**: Stays visible while scrolling
- **Scrollable Content**: Pages with extensive content support scrolling
- **Touch-Friendly**: Optimized for mobile touch interactions
- **Status Bar**: Realistic mobile status bar with battery and signal indicators

## 🎯 Key Components

### Navigation System
- Bottom navigation bar with 4 main sections
- Cross-page navigation with proper state management
- Back button functionality throughout the app

### Machine Management
- Real-time status updates (Available, In Use, Out of Order)
- Filtering by machine type and availability
- Dynamic pricing with add-on options

### Payment Integration
- Wallet balance management
- Transaction history tracking
- Multiple payment method support
- Loyalty discount application

## 🚀 Future Enhancements

- Real-time machine status updates
- Push notifications for completed cycles
- Social features and user reviews
- Advanced analytics and usage tracking
- Integration with actual payment gateways

## 📄 License

This project is part of the SMRT customer application trial and is intended for demonstration purposes.

---

**Built with ❤️ for SMRT's customer experience**
