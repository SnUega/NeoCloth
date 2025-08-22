// Import submitViaWeb3Forms function
async function submitViaWeb3Forms(form) {
    try {
        const formData = new FormData(form);
        
        // Honeypot check (anti-spam)
        if ((formData.get('botcheck') || '').toString().trim().length > 0) return true;
        
        // Set the correct access key for Web3Forms
        formData.set('access_key', '61e6ccc8-9d1d-4c61-83b0-7290be23fa7b');
        
        // Add source information
        formData.set('source', 'Neo_OVERSIZE');
        
        // For cart orders, ensure we have all required cart data
        if (form.id === 'cart-checkout-form') {
            // Ensure cart items data is properly formatted
            const cartItems = cart.items.map(item => {
                const size = item.size || 'Standard';
                const color = item.color || 'Default';
                return `${item.name} - Size: ${size}, Color: ${color} - $${item.price.toFixed(2)}`;
            }).join('\n');
            
            formData.set('cart_items', cartItems);
            formData.set('cart_total', cart.getTotal().toFixed(2));
            formData.set('subject', 'NeoCloth Cart Order');
        }
        
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' },
        });
        
        return res.ok;
    } catch (error) {
        console.error('Error submitting form:', error);
        return false;
    }
}

// Import startConfirmCountdown function (placeholder - will be defined in main.js)
function startConfirmCountdown() {
    // This function will be available from main.js
    if (window.startConfirmCountdown) {
        window.startConfirmCountdown();
    }
}

// Shopping Cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    // Add item to cart
    addItem(product) {
        const existingItem = this.items.find(item => 
            item.id === product.id && 
            item.size === product.size && 
            item.color === product.color
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }

        this.saveToStorage();
        this.updateCartDisplay();
    }

    // Remove item from cart
    removeItem(itemId, size, color) {
        this.items = this.items.filter(item => 
            !(item.id === itemId && item.size === size && item.color === color)
        );
        this.saveToStorage();
        this.updateCartDisplay();
    }

    // Update item quantity
    updateQuantity(itemId, size, color, newQuantity) {
        const item = this.items.find(item => 
            item.id === itemId && item.size === size && item.color === color
        );
        
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(itemId, size, color);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    // Get cart items count
    getItemsCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Clear cart
    clear() {
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }

    // Save to localStorage
    saveToStorage() {
        localStorage.setItem('shopping-cart', JSON.stringify(this.items));
    }

    // Load from localStorage
    loadFromStorage() {
        const savedCart = localStorage.getItem('shopping-cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
    }

    // Update cart display
    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total-amount');

        // Update cart count
        if (cartCount) {
            const count = this.getItemsCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }

        // Update cart items display
        if (cartItems) {
            if (this.items.length === 0) {
                cartItems.innerHTML = `<div class="cart-empty">${t('cart.empty')}</div>`;
            } else {
                cartItems.innerHTML = this.items.map(item => this.renderCartItem(item)).join('');
            }
        }

        // Update cart total
        if (cartTotal) {
            cartTotal.textContent = `$${this.getTotal().toFixed(2)}`;
        }
    }

    // Render cart item
    renderCartItem(item) {
        return `
            <div class="cart-item" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-details">
                        ${item.size ? `${t('custom.size')}: ${item.size}` : ''} 
                        ${item.color ? ` | Color: ${item.color}` : ''}
                        ${item.quantity > 1 ? ` | Qty: ${item.quantity}` : ''}
                    </div>
                </div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="cart-item-remove" onclick="cart.removeItem('${item.id}', '${item.size}', '${item.color}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }

    // Show notification when item is added
    showAddedNotification(product) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="cart-notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${product.name} ${t('cart.add_to_cart').toLowerCase()}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #333;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Cart modal functions
function openCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function checkout() {
    if (cart.items.length === 0) {
        alert(t('cart.empty'));
        return;
    }

    // Open cart checkout modal instead of alert
    openCartCheckout();
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cart icon click
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }

    // Modal close on background click
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                closeCart();
            }
        });
    }

    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCart();
            closeCartCheckout();
        }
    });
    
    // Cart checkout form submit handler
    const cartCheckoutForm = document.getElementById('cart-checkout-form');
    if (cartCheckoutForm) {
        cartCheckoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitCartOrder();
        });
    }
    
    // Cart checkout modal close on background click
    const cartCheckoutModal = document.getElementById('cart-checkout-modal');
    if (cartCheckoutModal) {
        cartCheckoutModal.addEventListener('click', function(e) {
            if (e.target === cartCheckoutModal) {
                closeCartCheckout();
            }
        });
    }
});

// Product interaction functions
function addToCart(productId, productName, productPrice, size = '', color = '') {
    const product = {
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        size: size,
        color: color
    };
    
    cart.addItem(product);
}

function buyNow(productId, productName, productPrice, size = '', color = '') {
    // Add to cart
    addToCart(productId, productName, productPrice, size, color);
    
    // Open checkout directly
    setTimeout(() => {
        openCartCheckout();
    }, 500);
}

// Cart checkout modal functions
function openCartCheckout() {
    if (cart.items.length === 0) {
        alert(t('cart.empty'));
        return;
    }

    // Close cart modal first
    closeCart();
    
    // Populate checkout items
    populateCheckoutItems();
    
    // Show checkout modal
    const modal = document.getElementById('cart-checkout-modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeCartCheckout() {
    const modal = document.getElementById('cart-checkout-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function populateCheckoutItems() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total-amount');
    const cartItemsData = document.getElementById('cart-items-data');
    const cartTotalData = document.getElementById('cart-total-data');
    const orderSummaryData = document.getElementById('order-summary-data');
    const orderDateData = document.getElementById('order-date-data');
    
    if (!checkoutItems || !checkoutTotal || !cartItemsData || !cartTotalData || !orderSummaryData || !orderDateData) return;
    
    // Clear previous items
    checkoutItems.innerHTML = '';
    
    // Add each cart item to checkout display
    cart.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        
        const itemInfo = document.createElement('div');
        itemInfo.className = 'checkout-item-info';
        
        const itemTitle = document.createElement('div');
        itemTitle.className = 'checkout-item-title';
        itemTitle.textContent = item.name;
        
        const itemDetails = document.createElement('div');
        itemDetails.className = 'checkout-item-details';
        const details = [];
        const size = item.size || 'Standard';
        const color = item.color || 'Default';
        details.push(`Size: ${size}`);
        details.push(`Color: ${color}`);
        itemDetails.textContent = details.join(', ');
        
        const itemPrice = document.createElement('div');
        itemPrice.className = 'checkout-item-price';
        itemPrice.textContent = `$${item.price.toFixed(2)}`;
        
        itemInfo.appendChild(itemTitle);
        itemInfo.appendChild(itemDetails);
        itemElement.appendChild(itemInfo);
        itemElement.appendChild(itemPrice);
        checkoutItems.appendChild(itemElement);
    });
    
    // Update total
    const total = cart.getTotal();
    checkoutTotal.textContent = `$${total.toFixed(2)}`;
    
    // Set hidden form data with detailed cart information
    const formattedItems = cart.items.map(item => {
        const size = item.size || 'Standard';
        const color = item.color || 'Default';
        const quantity = item.quantity || 1;
        const itemTotal = (item.price * quantity).toFixed(2);
        return `Product: ${item.name}\nSize: ${size}\nColor: ${color}\nPrice: $${item.price.toFixed(2)}\nQuantity: ${quantity}\nItem Total: $${itemTotal}`;
    }).join('\n\n');
    
    cartItemsData.value = formattedItems;
    cartTotalData.value = total.toFixed(2);
    
    // Set order summary
    const orderSummary = `Order Summary:\nTotal Items: ${cart.getItemsCount()}\nTotal Amount: $${total.toFixed(2)}\nSource: Neo_OVERSIZE`;
    orderSummaryData.value = orderSummary;
    
    // Set order date
    orderDateData.value = new Date().toISOString();
}

async function submitCartOrder() {
    const form = document.getElementById('cart-checkout-form');
    if (!form) return;
    
    // Validate required fields
    const phone = document.getElementById('checkout-phone').value.trim();
    const email = document.getElementById('checkout-email').value.trim();
    
    if (!phone || !email) {
        alert('Please fill in phone and email fields.');
        return;
    }
    
    // Add additional order information to form
    const formData = new FormData(form);
    
    // Add customer contact info
    formData.set('customer_phone', phone);
    formData.set('customer_email', email);
    
    // Add order summary
    const orderSummary = `Order Summary:\nTotal Items: ${cart.getItemsCount()}\nTotal Amount: $${cart.getTotal().toFixed(2)}\nSource: Neo_OVERSIZE`;
    formData.set('order_summary', orderSummary);
    
    // Add timestamp
    formData.set('order_date', new Date().toISOString());
    
    // Submit via Web3Forms
    const ok = await submitViaWeb3Forms(form);
    
    // Close the checkout modal
    closeCartCheckout();
    
    // Show confirmation modal
    startConfirmCountdown();
    
    // Clear cart after successful submission
    if (ok) {
        cart.clear();
        cart.updateCartDisplay();
    }
}

// Export for global access
window.cart = cart;
window.openCart = openCart;
window.closeCart = closeCart;
window.checkout = checkout;
window.addToCart = addToCart;
window.buyNow = buyNow;
window.openCartCheckout = openCartCheckout;
window.closeCartCheckout = closeCartCheckout;
window.submitCartOrder = submitCartOrder;
