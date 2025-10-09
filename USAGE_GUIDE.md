# Gradient Customization - Quick Start Guide

## For Customers

### How to Customize Your Background

1. **Navigate to Profile**
   - From the home screen, tap the Profile icon (👤) in the bottom navigation

2. **Open Customization**
   - Scroll down and tap "Customize Background" (🎨 icon)

3. **Upload Your Logo**
   - Click the upload area
   - Select your shop logo (JPG, PNG, or SVG)
   - The system will automatically extract colors

4. **Review Extracted Colors**
   - See 4-6 dominant colors from your logo
   - Each color shows its name and hex code

5. **Choose Your Gradient**
   - Browse 8 generated gradient options
   - Look for the ✓ Accessible badge for best readability
   - Tap any gradient to preview it

6. **Preview Your Choice**
   - See how the gradient looks with your home page content
   - Check text readability against the background

7. **Apply the Gradient**
   - Tap "Apply Background" to save your choice
   - Return to home page to see your custom gradient!

### Tips for Best Results

✅ **Do:**
- Use high-quality logos (200-500px wide)
- Choose logos with 2-4 distinct colors
- Select gradients marked as "Accessible"
- Preview before applying

❌ **Don't:**
- Use very complex logos with 10+ colors
- Upload extremely large files (>1MB)
- Select gradients without the accessibility checkmark
- Skip the preview step

## For Developers

### Quick Integration

#### 1. Add Vibrant.js to Your Page
```html
<script src="https://cdn.jsdelivr.net/npm/node-vibrant@3.2.1-alpha.1/dist/vibrant.min.js"></script>
```

#### 2. Extract Colors from an Image
```javascript
Vibrant.from(imageElement).getPalette()
    .then(palette => {
        const colors = {
            vibrant: palette.Vibrant.getHex(),
            darkVibrant: palette.DarkVibrant.getHex(),
            lightVibrant: palette.LightVibrant.getHex()
        };
        console.log(colors);
    });
```

#### 3. Generate a Gradient
```javascript
function createRadialGradient(color1, color2, alpha = 0.25) {
    const rgba1 = addAlpha(color1, alpha);
    const rgba2 = addAlpha(color2, alpha * 0.8);
    return `radial-gradient(ellipse at top left, ${rgba1} 0%, ${rgba2} 50%, transparent 70%)`;
}
```

#### 4. Check Accessibility
```javascript
function checkContrast(colorHex, textColor = '#000000') {
    const ratio = getContrastRatio(
        hexToRgb(colorHex),
        hexToRgb(textColor)
    );
    return ratio >= 3.0; // WCAG AA for large text
}
```

#### 5. Apply the Gradient
```javascript
// Save to localStorage
localStorage.setItem('customGradient', JSON.stringify({
    css: gradientCSS,
    accessible: true
}));

// Apply to element
document.getElementById('background').style.background = gradientCSS;
```

### Sample Code: Complete Workflow

```javascript
// Complete gradient customization workflow
async function customizeGradient(imageFile) {
    // 1. Load image
    const imageUrl = URL.createObjectURL(imageFile);
    const img = new Image();
    img.src = imageUrl;
    
    await new Promise(resolve => img.onload = resolve);
    
    // 2. Extract colors
    const palette = await Vibrant.from(img).getPalette();
    
    // 3. Get top colors
    const colors = [
        palette.Vibrant,
        palette.DarkVibrant,
        palette.LightVibrant
    ].filter(Boolean);
    
    // 4. Generate gradient
    const gradient = `radial-gradient(
        ellipse at top left,
        ${addAlpha(colors[0].getHex(), 0.25)} 0%,
        ${addAlpha(colors[1].getHex(), 0.2)} 50%,
        transparent 70%
    )`;
    
    // 5. Check accessibility
    const isAccessible = checkContrast(colors[0].getHex());
    
    // 6. Apply if accessible
    if (isAccessible) {
        document.getElementById('background').style.background = gradient;
        localStorage.setItem('customGradient', gradient);
    }
    
    return { gradient, isAccessible };
}
```

## Example Gradients by Industry

### Coffee Shop
**Logo Colors**: #6F4E37 (coffee brown), #FFF8DC (cream)
**Gradient Result**: Warm, inviting brown-to-cream radial gradient
**Accessibility**: ✓ High contrast with black text

### Tech Startup
**Logo Colors**: #4A90E2 (blue), #50E3C2 (turquoise)
**Gradient Result**: Modern blue-turquoise linear gradient
**Accessibility**: ✓ Good contrast for tech-forward feel

### Bakery
**Logo Colors**: #FFB6C1 (pink), #FFA500 (orange)
**Gradient Result**: Sweet pink-orange sunset gradient
**Accessibility**: ✓ Cheerful and readable

### Gym/Fitness
**Logo Colors**: #FF4500 (red-orange), #000000 (black)
**Gradient Result**: High-energy red gradient with dark accents
**Accessibility**: ✓ Bold and motivating

### Organic Store
**Logo Colors**: #228B22 (forest green), #F5F5DC (beige)
**Gradient Result**: Natural green-beige earth tones
**Accessibility**: ✓ Calm and eco-friendly

## Testing Your Gradient

### Manual Testing Checklist

- [ ] Upload a logo with 2-4 distinct colors
- [ ] Verify all colors are extracted correctly
- [ ] Check that 8 gradient options are generated
- [ ] Confirm accessibility badges appear
- [ ] Preview each gradient option
- [ ] Verify text is readable in preview
- [ ] Apply gradient and check home page
- [ ] Test gradient persists after page refresh
- [ ] Verify reset functionality works

### Accessibility Testing

```javascript
// Test script to verify all gradients meet standards
function testGradients() {
    const gradients = document.querySelectorAll('.gradient-option-card');
    
    gradients.forEach((gradient, index) => {
        const badge = gradient.querySelector('.accessibility-badge');
        const isAccessible = badge.textContent.includes('✓');
        
        console.log(`Gradient ${index + 1}:`, {
            accessible: isAccessible,
            background: gradient.style.background
        });
    });
}
```

## Troubleshooting Guide

### Issue: Colors Not Extracted

**Symptoms**: Upload succeeds but no colors appear

**Solutions**:
1. Check image format (must be JPG, PNG, or SVG)
2. Verify file isn't corrupted
3. Try a different image with more distinct colors
4. Check browser console for errors

### Issue: Low Contrast Gradients

**Symptoms**: All gradients show ⚠ warning

**Solutions**:
1. Upload logo with darker colors
2. System uses transparency - dark colors work better
3. Try logo with higher color saturation
4. Consider using 2-3 colors instead of many

### Issue: Gradient Not Persisting

**Symptoms**: Gradient disappears after refresh

**Solutions**:
1. Check localStorage is enabled in browser
2. Verify you clicked "Apply Background"
3. Check browser privacy settings
4. Try clearing cache and re-applying

### Issue: Preview Looks Different Than Home

**Symptoms**: Applied gradient doesn't match preview

**Solutions**:
1. Ensure you're viewing the same page
2. Check if other CSS is overriding gradient
3. Verify gradient was saved correctly
4. Try re-applying the gradient

## Performance Tips

### Optimize Your Logo
```bash
# Using ImageMagick to resize logo
convert logo.png -resize 400x400 logo-optimized.png

# Using online tools
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/
```

### Reduce File Size
- Recommended: 200-500px width
- Max file size: 1MB
- Format: PNG for logos with transparency, JPG for photos
- Compression: 80-90% quality is sufficient

## API Reference

### Key Functions

#### `extractColorsFromImage(imageUrl)`
Extracts color palette from uploaded image
- **Parameters**: `imageUrl` (String) - Data URL or image path
- **Returns**: Promise<Palette>

#### `generateGradients()`
Creates gradient combinations from extracted colors
- **Parameters**: None (uses global `extractedPalette`)
- **Returns**: Array of gradient objects

#### `selectGradient(gradient, cardElement)`
Handles gradient selection and preview
- **Parameters**: 
  - `gradient` (Object) - Gradient configuration
  - `cardElement` (HTMLElement) - Card DOM element
- **Returns**: void

#### `applyGradient()`
Applies selected gradient to home page
- **Parameters**: None (uses global `selectedGradient`)
- **Returns**: void
- **Side Effects**: Saves to localStorage, redirects to home

#### `resetCustomization()`
Resets all customizations to default
- **Parameters**: None
- **Returns**: void
- **Side Effects**: Clears localStorage, resets UI

### Color Utilities

#### `hexToRgb(hex)`
Converts hex color to RGB object
- **Input**: "#FF5733"
- **Output**: `{ r: 255, g: 87, b: 51 }`

#### `addAlpha(hex, alpha)`
Adds transparency to hex color
- **Input**: "#FF5733", 0.25
- **Output**: "rgba(255, 87, 51, 0.25)"

#### `getLuminance(rgb)`
Calculates relative luminance (WCAG)
- **Input**: `{ r: 255, g: 87, b: 51 }`
- **Output**: 0.2345 (float between 0-1)

#### `getContrastRatio(color1, color2)`
Calculates contrast ratio between colors
- **Input**: Two color objects with rgb values
- **Output**: 4.5 (ratio as float)

## Best Practices

### For Optimal Results

1. **Logo Quality**
   - Use vector logos (SVG) when possible
   - Ensure logo has clear, distinct colors
   - Avoid logos with gradients already in them

2. **Color Selection**
   - Choose gradients with the ✓ badge
   - Test on different screen brightnesses
   - Consider your brand identity

3. **User Experience**
   - Always preview before applying
   - Test text readability carefully
   - Use reset if gradient doesn't work

4. **Accessibility**
   - Prioritize accessible gradients
   - Test with different text sizes
   - Consider users with visual impairments

### Code Quality

1. **Error Handling**
   - Wrap color extraction in try-catch
   - Validate image before processing
   - Provide user feedback on errors

2. **Performance**
   - Limit gradient options to 8
   - Cache extracted colors
   - Use requestAnimationFrame for preview updates

3. **Maintainability**
   - Keep gradient formulas in constants
   - Document magic numbers (alpha values, etc.)
   - Use semantic variable names

## Support

For issues or questions:
1. Check this guide first
2. Review the technical README
3. Check browser console for errors
4. Contact support with screenshot and error message

---

**Last Updated**: October 2025
**Version**: 1.0.0

