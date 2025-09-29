// Navigation functions
function goBack() {
    window.history.back();
}

function goToHome() {
    window.location.href = 'index.html';
}

function goToBenefits() {
    window.location.href = 'benefits.html';
}

function goToWallet() {
    window.location.href = 'wallet.html';
}

function goToScanInstructions() {
    window.location.href = 'scan-instructions.html';
}

function goToMachineDetails() {
    window.location.href = 'machine-details.html';
}

function goToCart() {
    window.location.href = 'cart.html';
}

function goToPayment() {
    window.location.href = 'payment-summary.html';
}

function goToProfile() {
    window.location.href = 'profile.html';
}

function goToMachines() {
    window.location.href = 'machines.html';
}

// Add Money Modal functions
let selectedAmount = 0;

function showAddMoneyModal() {
    document.getElementById('addMoneyModal').style.display = 'block';
}

function closeAddMoneyModal() {
    document.getElementById('addMoneyModal').style.display = 'none';
    selectedAmount = 0;
    document.getElementById('selectedAmount').textContent = '0';
    document.getElementById('customAmount').value = '';
}

function selectAmount(amount) {
    selectedAmount = amount;
    document.getElementById('selectedAmount').textContent = amount;
    document.getElementById('customAmount').value = '';
    
    // Update button states
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

function confirmAddMoney() {
    const customAmount = parseFloat(document.getElementById('customAmount').value);
    const finalAmount = customAmount || selectedAmount;
    
    if (finalAmount > 0) {
        // Simulate adding money
        alert(`Successfully added $${finalAmount} to your wallet!`);
        closeAddMoneyModal();
        
        // Update wallet balance (in a real app, this would be done via API)
        updateWalletBalance(finalAmount);
    } else {
        alert('Please select or enter an amount to add.');
    }
}

function updateWalletBalance(amount) {
    // This would typically update the balance via API
    console.log(`Added $${amount} to wallet`);
}

// Handle custom amount input
document.addEventListener('DOMContentLoaded', function() {
    const customAmountInput = document.getElementById('customAmount');
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            const value = parseFloat(this.value);
            if (value > 0) {
                selectedAmount = value;
                document.getElementById('selectedAmount').textContent = value;
                
                // Remove selection from preset buttons
                document.querySelectorAll('.amount-btn').forEach(btn => {
                    btn.classList.remove('selected');
                });
            }
        });
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addMoneyModal');
    if (event.target === modal) {
        closeAddMoneyModal();
    }
}

// QR Scanning Functions
function startScanning() {
    // Simulate QR code scanning
    setTimeout(() => {
        alert('QR Code detected! Loading machine details...');
        goToMachineDetails();
    }, 2000);
}

// Machine Details Functions
let selectedAddons = [];

function toggleAddon(addonId) {
    const addonItem = document.querySelector(`[onclick="toggleAddon('${addonId}')"]`);
    const index = selectedAddons.indexOf(addonId);
    
    if (index > -1) {
        selectedAddons.splice(index, 1);
        addonItem.classList.remove('selected');
    } else {
        selectedAddons.push(addonId);
        addonItem.classList.add('selected');
    }
    
    updatePayNowButton();
}

function updatePayNowButton() {
    const basePrice = 4.99;
    const addonPrice = selectedAddons.length * 1.50;
    const totalPrice = basePrice + addonPrice;
    
    const payNowBtn = document.querySelector('.pay-now-btn');
    if (payNowBtn) {
        payNowBtn.textContent = `Pay Now $${totalPrice.toFixed(2)}`;
    }
}

function addToCart() {
    const machine = {
        name: 'Washer',
        price: 4.99,
        duration: '10 mins',
        addons: selectedAddons
    };
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(machine);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    alert('Added to cart!');
}

function quickAddToCart(machineId) {
    const machine = machinesData.find(m => m.id === machineId);
    if (machine && machine.status === 'Available') {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            id: machine.id,
            name: machine.name,
            price: machine.price,
            duration: machine.type === 'Washer' ? '10 mins' : '30 mins',
            addons: []
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cart.length;
    });
}

// Contact Support Functions
function startLiveChat() {
    alert('Live chat feature coming soon! For now, please call or email us.');
}

function callSupport() {
    window.location.href = 'tel:+15551234567';
}

function emailSupport() {
    window.location.href = 'mailto:support@smrt.com';
}

function openFAQ() {
    alert('FAQ section coming soon! For now, please contact us directly.');
}

function goToContactSupport() {
    window.location.href = 'contact-support.html';
}

function payNow() {
    // Add to cart first, then go to payment
    addToCart();
    goToPayment();
}

// Cart Functions
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cartItems');
    
    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <span class="item-duration">${item.duration}</span>
                        ${item.addons.length > 0 ? `<div class="item-addons">Add-ons: ${item.addons.join(', ')}</div>` : ''}
                    </div>
                    <div class="item-price">
                        <span class="price">$${item.price.toFixed(2)}</span>
                        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
        }
        
        updateCartTotal();
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + item.price + (item.addons.length * 1.50), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// Payment Functions
function processPayment() {
    alert('Payment processed successfully! Thank you for using SMRT.');
    // Clear cart after successful payment
    localStorage.removeItem('cart');
    goToHome();
}

// Machine Data
const machinesData = [
    { id: 1, name: 'Washer 99', type: 'Washer', status: 'Available', price: 4.99, timeRemaining: null, image: '🏭' },
    { id: 2, name: 'Washer 99', type: 'Washer', status: 'In Use', price: 4.99, timeRemaining: '15:30', image: '🏭' },
    { id: 3, name: 'Washer 99', type: 'Washer', status: 'Available', price: 4.99, timeRemaining: null, image: '🏭' },
    { id: 4, name: 'Washer 99', type: 'Washer', status: 'Out of Order', price: 4.99, timeRemaining: null, image: '🏭' },
    { id: 5, name: 'Dryer 15', type: 'Dryer', status: 'Available', price: 3.99, timeRemaining: null, image: '🌪️' },
    { id: 6, name: 'Dryer 16', type: 'Dryer', status: 'In Use', price: 3.99, timeRemaining: '08:45', image: '🌪️' },
    { id: 7, name: 'Washer 101', type: 'Washer', status: 'Available', price: 4.99, timeRemaining: null, image: '🏭' },
    { id: 8, name: 'Dryer 17', type: 'Dryer', status: 'Available', price: 3.99, timeRemaining: null, image: '🌪️' }
];

// Machine Functions
function loadMachines(filter = 'All') {
    const machinesGrid = document.getElementById('machinesGrid');
    if (!machinesGrid) return;

    let filteredMachines = machinesData;
    
    if (filter === 'Washers') {
        filteredMachines = machinesData.filter(machine => machine.type === 'Washer');
    } else if (filter === 'Dryers') {
        filteredMachines = machinesData.filter(machine => machine.type === 'Dryer');
    } else if (filter === 'Available') {
        filteredMachines = machinesData.filter(machine => machine.status === 'Available');
    }

    machinesGrid.innerHTML = '';

    filteredMachines.forEach(machine => {
        const machineCard = document.createElement('div');
        machineCard.className = `machine-card ${machine.status.toLowerCase().replace(' ', '-')}`;
        machineCard.onclick = () => handleMachineClick(machine);
        
        const statusBadgeClass = getStatusBadgeClass(machine.status);
        const statusText = machine.status === 'In Use' && machine.timeRemaining 
            ? `In Use (-${machine.timeRemaining})` 
            : machine.status;

        machineCard.innerHTML = `
            <div class="status-badge ${statusBadgeClass}">${statusText}</div>
            <div class="machine-image">
                <div class="machine-icon">${machine.image}</div>
            </div>
            <div class="machine-info">
                <h3>${machine.name}</h3>
                <p>$${machine.price}/cycle</p>
            </div>
            <div class="machine-actions">
                ${machine.status === 'Available' ? `
                    <button class="quick-add-btn" onclick="event.stopPropagation(); quickAddToCart(${machine.id})">
                        Add to Cart
                    </button>
                ` : ''}
            </div>
        `;
        
        machinesGrid.appendChild(machineCard);
    });
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'Available': return 'available';
        case 'In Use': return 'in-use';
        case 'Out of Order': return 'out-of-order';
        default: return 'unknown';
    }
}

function handleMachineClick(machine) {
    if (machine.status === 'Available') {
        // Store selected machine data and go to details page
        localStorage.setItem('selectedMachine', JSON.stringify(machine));
        goToMachineDetails();
    } else {
        alert(`${machine.name} is ${machine.status.toLowerCase()}. Please select an available machine.`);
    }
}

function quickAddToCart(machineId) {
    const machine = machinesData.find(m => m.id === machineId);
    if (machine && machine.status === 'Available') {
        const cartItem = {
            name: machine.name,
            price: machine.price,
            duration: machine.type === 'Washer' ? '10 mins' : '30 mins',
            addons: []
        };
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        alert(`${machine.name} added to cart!`);
    }
}

function setFilter(filter) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Load machines with new filter
    loadMachines(filter);
}

// Add click handlers for cards on home page
document.addEventListener('DOMContentLoaded', function() {
    // Benefits card click handler
    const benefitsCard = document.querySelector('.benefits-card');
    if (benefitsCard) {
        benefitsCard.addEventListener('click', goToBenefits);
        benefitsCard.style.cursor = 'pointer';
    }
    
    // Wallet card click handler
    const walletCard = document.querySelector('.wallet-card');
    if (walletCard) {
        walletCard.addEventListener('click', goToWallet);
        walletCard.style.cursor = 'pointer';
    }
    
    // Add money button click handler (prevent event bubbling)
    const addMoneyBtn = document.querySelector('.add-money-btn');
    if (addMoneyBtn) {
        addMoneyBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showAddMoneyModal();
        });
    }
    
    // Scan button click handler
    const scanButton = document.querySelector('.scan-button');
    if (scanButton) {
        scanButton.addEventListener('click', goToScanInstructions);
    }
    
    // Shopping cart click handler
    const shoppingCart = document.querySelector('.shopping-cart');
    if (shoppingCart) {
        shoppingCart.addEventListener('click', goToCart);
    }
    
    // Load cart items if on cart page
    if (window.location.pathname.includes('cart.html')) {
        loadCartItems();
    }
    
    // Load machines if on machines page
    if (window.location.pathname.includes('machines.html')) {
        loadMachines();
        
        // Add filter button event listeners
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                setFilter(this.textContent);
            });
        });
    }
});

// Add hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();
    
    // Add hover effects to clickable cards
    const clickableCards = document.querySelectorAll('.card');
    clickableCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.style.cursor === 'pointer') {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.2s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
