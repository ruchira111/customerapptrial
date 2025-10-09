# Background Gradient Customization Feature

## Overview
This feature allows customers to upload their shop logos and automatically generate beautiful, accessible gradient backgrounds based on the logo's color palette. The system ensures all generated gradients maintain text readability according to WCAG accessibility guidelines.

## How It Works

### 1. Color Extraction
The system uses **Vibrant.js**, a powerful color extraction library that analyzes images and extracts dominant color palettes:
- **Vibrant**: Bright, vibrant colors from the image
- **Dark Vibrant**: Darker, vibrant tones
- **Light Vibrant**: Lighter, vibrant tones
- **Muted**: Softer, muted colors
- **Dark Muted**: Darker, muted tones
- **Light Muted**: Lighter, muted tones

### 2. Gradient Generation Algorithm
The system generates multiple gradient variations from the extracted colors:

#### Two-Color Gradients
- **Radial Gradients**: Elliptical gradients starting from the top-left corner
  - Formula: `radial-gradient(ellipse at top left, color1 0%, color2 50%, transparent 70%)`
  - Uses transparency (0.2-0.3 alpha) to maintain background lightness
  
- **Linear Gradients**: Diagonal gradients at 135 degrees
  - Formula: `linear-gradient(135deg, color1 0%, color2 100%)`
  - Applied with 0.25 alpha transparency

#### Three-Color Gradients
- **Multi-color Radial**: Creates depth with three color transitions
  - Formula: `radial-gradient(ellipse at top left, color1 0%, color2 40%, color3 70%, transparent 90%)`
  
- **Multi-color Linear**: Vertical gradient with three colors
  - Formula: `linear-gradient(180deg, color1 0%, color2 50%, color3 100%)`

### 3. Accessibility Checks
Every generated gradient is tested for text accessibility:

#### Contrast Ratio Calculation
The system uses the **WCAG 2.0 contrast ratio formula**:

```javascript
// Calculate relative luminance
function getLuminance(rgb) {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
        val = val / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Calculate contrast ratio
function getContrastRatio(color1, color2) {
    const lum1 = getLuminance(color1.rgb);
    const lum2 = getLuminance(color2.rgb);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}
```

#### Accessibility Standards
- **Minimum Contrast**: 3.0:1 (WCAG AA for large text)
- **Tested Against**: Both black (#000000) and white (#FFFFFF) text
- **Indicator**: Green checkmark (✓) for accessible gradients, warning (⚠) for limited contrast

### 4. Transparency & Background Integration
All gradients use **alpha transparency** to overlay on the light background (#f7f8f9):

```javascript
function addAlpha(hex, alpha) {
    const rgb = hexToRgb(hex);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}
```

This approach ensures:
- Text remains readable over the gradient
- The gradient enhances rather than overwhelms the UI
- Smooth transitions between colors

## User Experience Flow

1. **Upload Logo**: User clicks "Customize Background" from their profile
2. **Color Extraction**: System automatically extracts 4-6 dominant colors
3. **View Colors**: Extracted color palette displayed with names and hex codes
4. **Choose Gradient**: System generates 8 gradient options to choose from
5. **Preview**: Selected gradient shown in a real-time preview of the home page
6. **Apply**: Gradient saved to localStorage and applied across sessions

## Files Structure

```
smrt-app/
├── customize-gradient.html      # Main customization page
├── gradient-customizer.js       # Color extraction & gradient logic
├── styles.css                   # Gradient customizer styles (lines 2776-3113)
├── index.html                   # Updated with gradient support
├── profile.html                 # Link to customization page
└── script.js                    # Navigation function added
```

## Technical Implementation

### Dependencies
- **Vibrant.js v3.2.1-alpha.1**: Loaded via CDN
  ```html
  <script src="https://cdn.jsdelivr.net/npm/node-vibrant@3.2.1-alpha.1/dist/vibrant.min.js"></script>
  ```

### Storage
Gradients are stored in localStorage:
```javascript
// Save gradient
localStorage.setItem('customGradient', JSON.stringify({
    type: 'radial-2-color',
    colors: ['#d60692', '#4a90e2'],
    css: 'radial-gradient(...)',
    accessible: true
}));

// Retrieve and apply
const customGradient = JSON.parse(localStorage.getItem('customGradient'));
backgroundElement.style.background = gradient.css;
```

### Cross-Origin Image Support
The system handles CORS for image processing:
```javascript
const img = new Image();
img.crossOrigin = 'Anonymous';
```

## Color Science Behind the Algorithm

### Why Radial Gradients?
Radial gradients positioned at the top-left create a natural focal point that:
- Draws attention to the greeting and user name
- Creates depth without overwhelming content
- Matches the original Figma design aesthetic

### Alpha Transparency Values
- **Vibrant colors**: 0.25-0.3 alpha (more transparent to prevent overwhelming)
- **Muted colors**: 0.2-0.25 alpha (slightly more visible as they're softer)
- **Final gradient stop**: Transparent (smooth fade-out)

### Color Combination Strategy
The algorithm prioritizes combinations that:
1. Have complementary or analogous color relationships
2. Show sufficient variation in luminance
3. Create visual interest without clashing
4. Work well with the light background

## Accessibility Features

### WCAG Compliance
- All gradients tested against AA standards
- Visual indicators for accessibility status
- Preview shows actual text rendering
- Option to reject low-contrast gradients

### User Feedback
- Real-time preview with actual UI elements
- Sample text on each gradient option
- Color hex codes for transparency
- Accessibility badges on each option

## Future Enhancements

### Potential Improvements
1. **Manual Color Picker**: Allow users to manually adjust extracted colors
2. **Gradient Angle Control**: Let users rotate linear gradients
3. **Animation**: Add subtle gradient animations
4. **Multiple Profiles**: Save different gradients for different contexts
5. **Dark Mode**: Generate dark-theme compatible gradients
6. **AI Enhancement**: Use ML to suggest optimal color combinations

### Advanced Features
- **Seasonal Themes**: Auto-generate gradients based on time of year
- **Brand Guidelines**: Import brand colors from style guides
- **A/B Testing**: Show which gradients increase engagement
- **Export**: Save gradient CSS for use in other applications

## Browser Compatibility

### Tested Browsers
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (requires CORS configuration for images)
- Mobile browsers: Full support

### Fallback
If gradient customization fails:
- Original gradient displays as designed
- Error logged to console
- User can retry upload

## Performance Considerations

### Optimization
- Images processed client-side (no server upload needed)
- LocalStorage used for persistence (minimal overhead)
- Vibrant.js loaded via CDN (cached across sessions)
- Gradient rendering uses CSS (hardware accelerated)

### Best Practices
- Recommended logo size: 200-500px width
- Supported formats: JPG, PNG, SVG
- File size limit: Suggested < 1MB for fast processing

## Troubleshooting

### Common Issues

**Gradients Not Appearing**
- Check browser localStorage isn't disabled
- Verify JavaScript is enabled
- Check console for errors

**Colors Not Extracted**
- Ensure image loaded successfully
- Try different image format
- Check for CORS errors with external images

**Text Not Readable**
- Select gradients marked as "Accessible"
- Lower alpha transparency manually
- Choose lighter color combinations

## Credits

This feature uses:
- **Vibrant.js** by Jari Zwarts: https://github.com/Vibrant-Colors/node-vibrant
- **WCAG 2.0 Guidelines**: https://www.w3.org/WAI/WCAG21/Understanding/
- **Color Science**: Based on perceptual color models (sRGB, relative luminance)

## License

This gradient customization system is part of the SMRT Customer App.

