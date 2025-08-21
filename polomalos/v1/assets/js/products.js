// Products management and Google Sheets integration
class ProductManager {
    constructor() {
        this.products = {
            'no-logo': [],
            'ready-to-wear': [],
            'custom-art': []
        };
        this.sheetsApiKey = ''; // Replace with your Google Sheets API key
        this.spreadsheetId = ''; // Replace with your Google Sheets ID
        this.loading = false;
        
        // Initialize products
        this.initializeProducts();
    }

    // Initialize with demo products and attempt to load from Google Sheets
    async initializeProducts() {
        // Load demo products first
        this.loadDemoProducts();
        this.renderAllProducts();

        // Try to load from Google Sheets if configured
        if (this.sheetsApiKey && this.spreadsheetId) {
            try {
                await this.loadFromGoogleSheets();
            } catch (error) {
                console.warn('Could not load from Google Sheets:', error);
            }
        }
    }

    // Load demo products
    loadDemoProducts() {
        this.products['no-logo'] = [
            {
                id: 'nl-001',
                nameKey: 'product.black_oversize_tshirt',
                descriptionKey: 'product.black_oversize_tshirt_desc',
                price: 49.99,
                category: 'no-logo',
                type: 't-shirt',
                colors: ['Black', 'White'],
                sizes: ['S', 'M', 'L', 'XL'],
                image: 'assets/images/black-t.webp'
            },
            {
                id: 'nl-002',
                nameKey: 'product.white_oversize_hoodie',
                descriptionKey: 'product.white_oversize_hoodie_desc',
                price: 79.99,
                category: 'no-logo',
                type: 'hoodie',
                colors: ['White', 'Gray'],
                sizes: ['S', 'M', 'L', 'XL'],
                image: 'assets/images/gray-hoo.webp'
            },
            {
                id: 'nl-003',
                nameKey: 'product.gray_oversize_tshirt',
                descriptionKey: 'product.gray_oversize_tshirt_desc',
                price: 49.99,
                category: 'no-logo',
                type: 't-shirt',
                colors: ['Gray', 'Black'],
                sizes: ['S', 'M', 'L', 'XL'],
                image: 'assets/images/gray-t.webp'
            }
        ];

        this.products['ready-to-wear'] = [
            {
                id: 'rtw-001',
                nameKey: 'product.urban_abstract_hoodie',
                descriptionKey: 'product.urban_abstract_hoodie_desc',
                price: 95.00,
                category: 'ready-to-wear',
                type: 'hoodie',
                artist: 'Alex Storm',
                colors: ['Black/White', 'Dark Blue'],
                sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                image: 'assets/images/abstr-hoo.webp',
                limited: true,
                remaining: 15
            },
            {
                id: 'rtw-002',
                nameKey: 'product.geometric_dreams_tshirt',
                descriptionKey: 'product.geometric_dreams_tshirt_desc',
                price: 65.00,
                category: 'ready-to-wear',
                type: 't-shirt',
                artist: 'Maria Vibe',
                colors: ['White/Black', 'Cream/Brown'],
                sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                image: 'assets/images/geom-t.png',
                limited: true,
                remaining: 8
            },
            {
                id: 'rtw-003',
                nameKey: 'product.street_poetry_hoodie',
                descriptionKey: 'product.street_poetry_hoodie_desc',
                price: 90.00,
                category: 'ready-to-wear',
                type: 'hoodie',
                artist: 'Urban Collective',
                colors: ['Black/Red', 'White/Black'],
                sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                image: 'assets/images/street-hoo.webp',
                limited: true,
                remaining: 22
            }
        ];
    }

    // Load products from Google Sheets
    async loadFromGoogleSheets() {
        if (!this.sheetsApiKey || !this.spreadsheetId) {
            throw new Error('Google Sheets API key or Spreadsheet ID not configured');
        }

        this.setLoading(true);

        try {
            // Load each category from different sheets
            const categories = ['no-logo', 'ready-to-wear'];
            
            for (const category of categories) {
                const range = `${category}!A2:K100`; // Adjust range as needed
                const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}?key=${this.sheetsApiKey}`;
                
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.values && data.values.length > 0) {
                    const products = data.values.map(row => this.parseSheetRow(row, category));
                    this.products[category] = products.filter(product => product !== null);
                }
            }

            this.renderAllProducts();
        } catch (error) {
            console.error('Error loading from Google Sheets:', error);
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    // Parse a row from Google Sheets
    parseSheetRow(row, category) {
        try {
            // Expected columns: ID, Name, Description, Price, Type, Colors, Sizes, Image, Artist, Limited, Remaining
            if (row.length < 4) return null;

            return {
                id: row[0] || '',
                name: row[1] || '',
                description: row[2] || '',
                price: parseFloat(row[3]) || 0,
                category: category,
                type: row[4] || 't-shirt',
                colors: row[5] ? row[5].split(',').map(c => c.trim()) : ['Black'],
                sizes: row[6] ? row[6].split(',').map(s => s.trim()) : ['M', 'L', 'XL'],
                image: row[7] || 'placeholder',
                artist: row[8] || '',
                limited: row[9] === 'TRUE' || row[9] === 'true',
                remaining: parseInt(row[10]) || null
            };
        } catch (error) {
            console.error('Error parsing sheet row:', error);
            return null;
        }
    }

    // Set loading state
    setLoading(loading) {
        this.loading = loading;
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            if (loading) {
                spinner.classList.remove('hidden');
            } else {
                spinner.classList.add('hidden');
            }
        }
    }

    // Render all products
    renderAllProducts() {
        Object.keys(this.products).forEach(category => {
            this.renderProductsForCategory(category);
        });
    }

    // Render products for a specific category
    renderProductsForCategory(category) {
        const container = document.getElementById(`${category}-products`);
        if (!container) return;

        const products = this.products[category];
        
        if (products.length === 0) {
            container.innerHTML = `
                <div class="no-products">
                    <p>${t('common.no_products')}</p>
                </div>
            `;
            return;
        }

        container.innerHTML = products.map(product => this.renderProductCard(product)).join('');
    }

    // Render individual product card
    renderProductCard(product) {
        const limitedBadge = product.limited ? 
            `<div class="product-badge limited">${t('product.limited')} ${product.remaining} ${t('product.left')}</div>` : '';
        
        const artistInfo = product.artist ? 
            `<div class="product-artist">${t('product.by')} ${product.artist}</div>` : '';

        // Translate colors and sizes
        const translatedColors = product.colors.map(color => this.translateColor(color)).join(', ');
        const translatedSizes = product.sizes.map(size => this.translateSize(size)).join(', ');

        // Get translated name and description
        const productName = product.nameKey ? t(product.nameKey) : product.name;
        const productDescription = product.descriptionKey ? t(product.descriptionKey) : product.description;

        return `
            <div class="product-card" data-id="${product.id}">
                ${limitedBadge}
                <div class="product-image">
                    ${this.renderProductImage(product)}
                </div>
                <div class="product-info">
                    <h4 class="product-title">${productName}</h4>
                    ${artistInfo}
                    <p class="product-description">${productDescription}</p>
                    <div class="product-details">
                        <div class="product-colors">
                            <strong>${t('product.colors')}</strong> ${translatedColors}
                        </div>
                        <div class="product-sizes">
                            <strong>${t('product.sizes')}</strong> ${translatedSizes}
                        </div>
                    </div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="btn btn-secondary" onclick="addToCart('${product.id}', '${productName}', '${product.price}')">
                            ${t('product.add_to_cart')}
                        </button>
                        <button class="btn btn-primary" onclick="openProductModal('${product.id}')">
                            ${t('product.buy_now')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Render product image
    renderProductImage(product) {
        // Get translated product name for alt attribute
        const productName = product.nameKey ? t(product.nameKey) : product.name;
        
        if (product.image && product.image !== 'placeholder') {
            return `<img src="${product.image}" alt="${productName}" class="product-img" loading="lazy">`;
        } else {
            return `
                <div class="product-placeholder">
                    <i class="fas fa-${product.type === 'hoodie' ? 'hoodie' : 'tshirt'}"></i>
                    <p>${productName}</p>
                </div>
            `;
        }
    }

    // Get product by ID
    getProductById(id) {
        for (const category of Object.keys(this.products)) {
            const product = this.products[category].find(p => p.id === id);
            if (product) return product;
        }
        return null;
    }

    // Search products
    searchProducts(query) {
        const results = [];
        const searchTerm = query.toLowerCase();
        
        Object.values(this.products).flat().forEach(product => {
            // Get translated name and description for search
            const productName = product.nameKey ? t(product.nameKey) : product.name;
            const productDescription = product.descriptionKey ? t(product.descriptionKey) : product.description;
            
            if (
                productName.toLowerCase().includes(searchTerm) ||
                productDescription.toLowerCase().includes(searchTerm) ||
                (product.artist && product.artist.toLowerCase().includes(searchTerm))
            ) {
                results.push(product);
            }
        });
        
        return results;
    }

    // Filter products by criteria
    filterProducts(category, filters = {}) {
        let products = this.products[category] || [];
        
        if (filters.type) {
            products = products.filter(p => p.type === filters.type);
        }
        
        if (filters.maxPrice) {
            products = products.filter(p => p.price <= filters.maxPrice);
        }
        
        if (filters.minPrice) {
            products = products.filter(p => p.price >= filters.minPrice);
        }
        
        if (filters.inStock) {
            products = products.filter(p => !p.limited || p.remaining > 0);
        }
        
        return products;
    }
    
    // Translate color names
    translateColor(color) {
        const colorMap = {
            'Black': 'color.black',
            'White': 'color.white',
            'Gray': 'color.gray',
            'Dark Blue': 'color.dark_blue',
            'Cream': 'color.cream',
            'Brown': 'color.brown',
            'Red': 'color.red',
            'Black/White': 'color.black_white',
            'White/Black': 'color.white_black',
            'Cream/Brown': 'color.cream_brown',
            'Black/Red': 'color.black_red'
        };
        
        return t(colorMap[color] || color);
    }
    
    // Translate size names
    translateSize(size) {
        const sizeMap = {
            'S': 'size.s',
            'M': 'size.m',
            'L': 'size.l',
            'XL': 'size.xl',
            'XXL': 'size.xxl'
        };
        
        return t(sizeMap[size] || size);
    }
}

// Initialize product manager
const productManager = new ProductManager();

// Product modal functions
function openProductModal(productId) {
    console.log('openProductModal called with ID:', productId);
    const product = productManager.getProductById(productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    const modal = document.getElementById('product-modal');
    const title = document.getElementById('product-modal-title');
    const content = document.getElementById('product-modal-content');

    console.log('Modal elements:', { modal, title, content });

    if (!modal || !title || !content) {
        console.error('Modal elements not found');
        return;
    }

    // Get translated product name
    const productName = product.nameKey ? t(product.nameKey) : product.name;
    title.textContent = productName;
    content.innerHTML = renderProductModalContent(product);
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    console.log('Product modal opened');
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function renderProductModalContent(product) {
    // Get translated name and description
    const productName = product.nameKey ? t(product.nameKey) : product.name;
    const productDescription = product.descriptionKey ? t(product.descriptionKey) : product.description;
    
    return `
        <div class="product-modal-content">
            <div class="product-modal-image">
                ${productManager.renderProductImage(product)}
            </div>
            <div class="product-modal-details">
                ${product.artist ? `<p><strong>${t('product.modal.artist')}</strong> ${product.artist}</p>` : ''}
                <p><strong>${t('product.modal.description')}</strong> ${productDescription}</p>
                <p><strong>${t('product.modal.price')}</strong> $${product.price.toFixed(2)}</p>
                ${product.limited ? `<p><strong>${t('product.modal.limited_edition')}</strong> ${product.remaining} ${t('product.modal.remaining')}</p>` : ''}
                
                <div class="product-options">
                    <div class="option-group">
                        <label for="product-color">${t('product.modal.color')}</label>
                        <select id="product-color" class="form-control">
                            ${product.colors.map(color => 
                                `<option value="${color}">${productManager.translateColor(color)}</option>`
                            ).join('')}
                        </select>
                    </div>
                    
                    <div class="option-group">
                        <label for="product-size">${t('product.modal.size')}</label>
                        <select id="product-size" class="form-control">
                            ${product.sizes.map(size => 
                                `<option value="${size}">${productManager.translateSize(size)}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
                
                <div class="product-modal-actions">
                    <button class="btn btn-secondary" onclick="addToCartFromModal('${product.id}')">
                        ${t('product.add_to_cart')}
                    </button>
                    <button class="btn btn-primary" onclick="buyNowFromModal('${product.id}')">
                        ${t('product.buy_now')}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function addToCartFromModal(productId) {
    const product = productManager.getProductById(productId);
    if (!product) return;

    const color = document.getElementById('product-color')?.value || '';
    const size = document.getElementById('product-size')?.value || '';
    
    // Get translated product name
    const productName = product.nameKey ? t(product.nameKey) : product.name;
    addToCart(productId, productName, product.price, size, color);
    closeProductModal();
}

function buyNowFromModal(productId) {
    const product = productManager.getProductById(productId);
    if (!product) return;

    const color = document.getElementById('product-color')?.value || '';
    const size = document.getElementById('product-size')?.value || '';
    
    // Get translated product name
    const productName = product.nameKey ? t(product.nameKey) : product.name;
    buyNow(productId, productName, product.price, size, color);
    closeProductModal();
}

// Custom form functions
function openCustomForm() {
    const modal = document.getElementById('custom-modal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCustomForm() {
    const modal = document.getElementById('custom-modal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Reset form
    const form = document.getElementById('custom-form');
    if (form) form.reset();
}

function submitCustomForm() {
    const form = document.getElementById('custom-form');
    const formData = new FormData(form);
    
    const customOrder = {
        name: document.getElementById('custom-name').value,
        email: document.getElementById('custom-email').value,
        type: document.getElementById('custom-type').value,
        size: document.getElementById('custom-size').value,
        description: document.getElementById('custom-description').value,
        budget: document.getElementById('custom-budget').value,
        timestamp: new Date().toISOString()
    };
    
    // Validate form
    if (!customOrder.name || !customOrder.email || !customOrder.type || 
        !customOrder.size || !customOrder.description || !customOrder.budget) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here you would typically send to your backend/Google Sheets
    console.log('Custom order submitted:', customOrder);
    
    // For demo, show success message
    alert(`${t('custom.submit')} successful! We'll contact you at ${customOrder.email} within 24 hours.`);
    
    closeCustomForm();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Product modal close on background click
    const productModal = document.getElementById('product-modal');
    if (productModal) {
        productModal.addEventListener('click', function(e) {
            if (e.target === productModal) {
                closeProductModal();
            }
        });
    }

    // Custom modal close on background click
    const customModal = document.getElementById('custom-modal');
    if (customModal) {
        customModal.addEventListener('click', function(e) {
            if (e.target === customModal) {
                closeCustomForm();
            }
        });
    }
});

// Export for global access
window.productManager = productManager;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.openCustomForm = openCustomForm;
window.closeCustomForm = closeCustomForm;
window.submitCustomForm = submitCustomForm;
window.addToCartFromModal = addToCartFromModal;
window.buyNowFromModal = buyNowFromModal;
