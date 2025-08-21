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
        this.showAddedNotification(product);
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
    console.log('openCart called');
    const modal = document.getElementById('cart-modal');
    console.log('Cart modal element:', modal);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        console.log('Cart modal opened');
    } else {
        console.error('Cart modal not found!');
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

    // Here you would typically integrate with a payment processor
    // For demo purposes, we'll show an alert
    const total = cart.getTotal();
    const itemsCount = cart.getItemsCount();
    
    alert(`${t('cart.checkout')}\n${t('cart.total')} $${total.toFixed(2)}\n${itemsCount} items`);
    
    // Clear cart after "checkout"
    cart.clear();
    closeCart();
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
        }
    });
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
        checkout();
    }, 500);
}

// Export for global access
window.cart = cart;
window.openCart = openCart;
window.closeCart = closeCart;
window.checkout = checkout;
window.addToCart = addToCart;
window.buyNow = buyNow;
