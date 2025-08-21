# Google Sheets Configuration Template

## Required Setup for Google Sheets Integration

### 1. Create Google Spreadsheet

Create a new Google Spreadsheet with the following sheets:

#### Sheet 1: "no-logo"
| A (ID) | B (Name) | C (Description) | D (Price) | E (Type) | F (Colors) | G (Sizes) | H (Image) | I (Artist) | J (Limited) | K (Remaining) |
|--------|----------|-----------------|-----------|----------|------------|-----------|-----------|-----------|-------------|---------------|
| nl-001 | Black Oversize T-Shirt | Classic black oversize t-shirt with perfect cut | 45.00 | t-shirt | Black,White,Gray | S,M,L,XL,XXL | https://example.com/image.jpg | | FALSE | |
| nl-002 | White Oversize Hoodie | Premium white oversize hoodie, soft and comfortable | 75.00 | hoodie | White,Black,Gray,Cream | S,M,L,XL,XXL | https://example.com/image2.jpg | | FALSE | |

#### Sheet 2: "ready-to-wear"
| A (ID) | B (Name) | C (Description) | D (Price) | E (Type) | F (Colors) | G (Sizes) | H (Image) | I (Artist) | J (Limited) | K (Remaining) |
|--------|----------|-----------------|-----------|----------|------------|-----------|-----------|-----------|-------------|---------------|
| rtw-001 | Urban Abstract Hoodie | Limited edition hoodie with urban abstract print | 95.00 | hoodie | Black/White,Dark Blue | S,M,L,XL,XXL | https://example.com/art1.jpg | Alex Storm | TRUE | 15 |
| rtw-002 | Geometric Dreams T-Shirt | Artistic geometric pattern exclusive to our platform | 65.00 | t-shirt | White/Black,Cream/Brown | S,M,L,XL,XXL | https://example.com/art2.jpg | Maria Vibe | TRUE | 8 |

### 2. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Sheets API:
   - Navigate to APIs & Services > Library
   - Search for "Google Sheets API"
   - Click "Enable"

### 3. Create API Key

1. Go to APIs & Services > Credentials
2. Click "Create Credentials" > "API Key"
3. Copy the API key
4. Click "Restrict Key" and set:
   - Application restrictions: HTTP referrers (websites)
   - Add your domain (e.g., `yourdomain.com/*`)
   - API restrictions: Google Sheets API only

### 4. Make Spreadsheet Public

1. Open your Google Spreadsheet
2. Click "Share" button
3. Set to "Anyone with the link can view"
4. Copy the spreadsheet ID from URL

### 5. Update Configuration

Edit `assets/js/products.js` and replace:

```javascript
// Replace these with your actual values
this.sheetsApiKey = 'YOUR_GOOGLE_SHEETS_API_KEY';
this.spreadsheetId = 'YOUR_SPREADSHEET_ID';
```

### 6. Spreadsheet ID Location

From URL like: `https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI/edit`
The spreadsheet ID is: `1ABC123DEF456GHI`

## Column Definitions

| Column | Required | Description | Example |
|--------|----------|-------------|---------|
| ID | Yes | Unique product identifier | nl-001, rtw-002 |
| Name | Yes | Product display name | "Black Oversize T-Shirt" |
| Description | Yes | Product description | "Classic black oversize..." |
| Price | Yes | Price in USD (decimal) | 45.00 |
| Type | Yes | Product type | t-shirt, hoodie |
| Colors | No | Available colors (comma-separated) | "Black,White,Gray" |
| Sizes | No | Available sizes (comma-separated) | "S,M,L,XL,XXL" |
| Image | No | Image URL | "https://example.com/image.jpg" |
| Artist | No | Artist name (for ready-to-wear) | "Alex Storm" |
| Limited | No | Is limited edition (TRUE/FALSE) | TRUE |
| Remaining | No | Stock remaining (number) | 15 |

## Testing the Integration

1. Update the configuration as described above
2. Reload the website
3. Check browser console for any errors
4. Products should load from Google Sheets instead of demo data

## Troubleshooting

### Common Issues:

1. **"API key not valid"**
   - Check if API key is correct
   - Verify API key restrictions
   - Ensure Google Sheets API is enabled

2. **"Spreadsheet not found"**
   - Check spreadsheet ID
   - Ensure spreadsheet is set to public
   - Verify sheet names match exactly

3. **"No products loading"**
   - Check browser console for errors
   - Verify sheet structure matches template
   - Ensure data starts from row 2 (row 1 is headers)

### Debug Mode:

Add this to browser console to enable debug logging:
```javascript
localStorage.setItem('debug', 'true');
```

## Security Notes

- Never expose API keys in public repositories
- Use environment variables for production
- Consider implementing a backend proxy for API calls
- Regularly rotate API keys
- Monitor API usage quotas

## Alternative Hosting Options

If you prefer not to use Google Sheets:
1. Use a headless CMS like Strapi or Contentful
2. Implement a simple JSON API
3. Use Firebase Firestore
4. Store products in a JSON file
