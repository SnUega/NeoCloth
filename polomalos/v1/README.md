# Oversize Clothing Landing Page

A modern, multilingual landing page for an oversize clothing brand with Google Sheets integration for product management.

## Features

### 🌍 Multilingual Support
- **3 Languages**: English, Romanian, Russian
- Automatic language detection based on browser settings
- Language preference saved in localStorage
- Easy language switching with dedicated buttons

### 🛒 E-commerce Functionality
- Shopping cart with persistent storage
- Two purchase options per product: "Add to Cart" and "Buy Now"
- Product customization (size, color selection)
- Custom order form for personalized designs

### 📊 Google Sheets Integration
- Load product catalog from Google Sheets
- Support for multiple product categories
- Real-time inventory management
- Easy product management without code changes

### 🎨 Design Features
- Minimalist, modern design
- Responsive layout for all devices
- Smooth scrolling navigation
- Back-to-top button
- Loading animations and transitions
- Dark/light theme support

### 📱 User Experience
- Mobile-first responsive design
- Accessibility features (WCAG compliant)
- Keyboard navigation support
- FAQ section with expandable items
- Customer reviews section
- Trust badges and guarantees

## Project Structure

```
landingOversize/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   ├── main.js         # Core functionality
│   │   ├── translations.js # Language support
│   │   ├── cart.js         # Shopping cart
│   │   └── products.js     # Product management & Google Sheets
│   └── images/             # Image assets (placeholder)
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## Setup Instructions

### 1. Basic Setup
1. Clone or download the project files
2. Open `index.html` in a web browser
3. The site will work with demo products immediately

### 2. Google Sheets Integration (Optional)

#### Step 1: Create Google Sheets
Create a Google Spreadsheet with the following sheets:
- `no-logo` - for No Logo products
- `ready-to-wear` - for Ready-to-Wear products

#### Step 2: Setup Sheet Columns
Each sheet should have these columns (Row 1 as headers):
| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| ID | Name | Description | Price | Type | Colors | Sizes | Image | Artist | Limited | Remaining |

**Example data:**
```
nl-001 | Black Oversize T-Shirt | Classic black oversize t-shirt | 45.00 | t-shirt | Black,White,Gray | S,M,L,XL,XXL | https://example.com/image.jpg | | FALSE | 
```

#### Step 3: Get API Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Sheets API
4. Create credentials (API Key)
5. Restrict the API key to Google Sheets API only

#### Step 4: Configure the Integration
1. Open `assets/js/products.js`
2. Replace these variables:
   ```javascript
   this.sheetsApiKey = 'YOUR_API_KEY_HERE';
   this.spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
   ```
3. Make your Google Sheet public (View access for anyone with link)

#### Step 5: Get Spreadsheet ID
From your Google Sheets URL:
```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
```

### 3. Customization

#### Colors and Branding
Edit `assets/css/styles.css` to change:
- Primary colors (search for `#333` and `#666`)
- Font family (currently using Inter)
- Spacing and layout

#### Content Translation
Edit `assets/js/translations.js` to:
- Add new languages
- Modify existing translations
- Add new translatable content

#### Product Categories
To add new product categories:
1. Add HTML section in `index.html`
2. Add translation keys in `translations.js`
3. Update `products.js` to handle new category

## Development

### Local Development Server
For local development with live reload:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Optimized images (use WebP format when possible)
- Minified CSS and JavaScript for production
- Lazy loading for images
- Efficient DOM manipulation

## Customization Guide

### Adding New Languages
1. Add language object to `translations.js`:
   ```javascript
   es: {
       "nav.home": "Inicio",
       // ... add all translation keys
   }
   ```
2. Add language button to HTML:
   ```html
   <button class="lang-btn" data-lang="es">ES</button>
   ```

### Modifying Product Categories
1. Add new section in HTML
2. Update CSS for styling
3. Add category to `ProductManager` class
4. Create corresponding Google Sheet (if using integration)

### Custom Styling
The CSS uses CSS custom properties for easy theming:
```css
:root {
    --primary-color: #333;
    --secondary-color: #666;
    --background-color: #fff;
    --text-color: #333;
}
```

## Security Considerations

### Google Sheets API
- Use API key restrictions
- Limit access to specific domains
- Never expose API keys in client-side code for production
- Consider using a backend proxy for sensitive operations

### Content Security Policy
Add CSP headers for production:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com;">
```

## Analytics and Tracking

### Google Analytics
Add your tracking code to `assets/js/main.js`:
```javascript
// Replace GA_MEASUREMENT_ID with your actual ID
gtag('config', 'GA_MEASUREMENT_ID');
```

### E-commerce Tracking
Track cart events:
```javascript
// Add to cart
gtag('event', 'add_to_cart', {
    currency: 'USD',
    value: product.price,
    items: [product]
});
```

## Deployment

### Static Hosting
Deploy to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Domain Setup
1. Point domain to hosting provider
2. Setup SSL certificate
3. Configure CDN for better performance

### Environment Variables
For production, use environment variables for:
- Google Sheets API key
- Analytics tracking IDs
- Any other sensitive configuration

## Troubleshooting

### Common Issues

1. **Google Sheets not loading:**
   - Check API key and spreadsheet ID
   - Verify sheet is public
   - Check browser console for errors

2. **Translations not working:**
   - Verify language code format
   - Check translation keys match HTML data-i18n attributes

3. **Cart not persisting:**
   - Ensure localStorage is available
   - Check browser privacy settings

4. **Mobile display issues:**
   - Test on actual devices
   - Use browser dev tools mobile view
   - Check CSS media queries

### Browser Console
Check browser console for errors and enable verbose logging by adding:
```javascript
localStorage.setItem('debug', 'true');
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test across browsers
5. Submit pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review browser console for errors

---

**Note**: This is a demonstration project. For production use, consider implementing proper backend services for cart persistence, payment processing, and inventory management.
