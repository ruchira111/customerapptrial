// Gradient Customization Logic
let extractedPalette = [];
let selectedGradient = null;

// Initialize file upload listener
document.addEventListener('DOMContentLoaded', function() {
    const logoUpload = document.getElementById('logoUpload');
    if (logoUpload) {
        logoUpload.addEventListener('change', handleLogoUpload);
    }
});

// Handle logo upload
function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageUrl = e.target.result;
        
        // Show uploaded logo
        document.getElementById('uploadArea').style.display = 'none';
        document.getElementById('uploadedLogoPreview').style.display = 'flex';
        document.getElementById('logoPreviewImg').src = imageUrl;
        
        // Extract colors from the image
        extractColorsFromImage(imageUrl);
    };
    reader.readAsDataURL(file);
}

// Extract colors using Vibrant.js
function extractColorsFromImage(imageUrl) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
        Vibrant.from(img).getPalette()
            .then(palette => {
                processExtractedPalette(palette);
            })
            .catch(error => {
                console.error('Error extracting colors:', error);
                alert('Error extracting colors from the image. Please try another image.');
            });
    };
    img.src = imageUrl;
}

// Process the extracted color palette
function processExtractedPalette(palette) {
    extractedPalette = [];
    
    // Extract all available colors from Vibrant palette
    const paletteKeys = ['Vibrant', 'DarkVibrant', 'LightVibrant', 'Muted', 'DarkMuted', 'LightMuted'];
    
    paletteKeys.forEach(key => {
        if (palette[key]) {
            extractedPalette.push({
                name: key,
                hex: palette[key].getHex(),
                rgb: palette[key].getRgb(),
                population: palette[key].getPopulation()
            });
        }
    });
    
    // Display extracted colors
    displayExtractedColors();
    
    // Generate gradients
    generateGradients();
}

// Display extracted colors
function displayExtractedColors() {
    const colorPaletteSection = document.getElementById('colorPaletteSection');
    const extractedColorsDiv = document.getElementById('extractedColors');
    
    colorPaletteSection.style.display = 'block';
    extractedColorsDiv.innerHTML = '';
    
    extractedPalette.forEach(color => {
        const colorSwatch = document.createElement('div');
        colorSwatch.className = 'color-swatch';
        colorSwatch.style.background = color.hex;
        
        const colorInfo = document.createElement('div');
        colorInfo.className = 'color-info';
        colorInfo.innerHTML = `
            <span class="color-name">${color.name}</span>
            <span class="color-hex">${color.hex}</span>
        `;
        
        const colorItem = document.createElement('div');
        colorItem.className = 'color-item';
        colorItem.appendChild(colorSwatch);
        colorItem.appendChild(colorInfo);
        
        extractedColorsDiv.appendChild(colorItem);
    });
}

// Generate gradients from extracted colors
function generateGradients() {
    const gradientsSection = document.getElementById('generatedGradientsSection');
    const gradientsGrid = document.getElementById('gradientsGrid');
    
    gradientsSection.style.display = 'block';
    gradientsGrid.innerHTML = '';
    
    // Generate different gradient combinations
    const gradients = createGradientCombinations();
    
    gradients.forEach((gradient, index) => {
        const gradientCard = document.createElement('div');
        gradientCard.className = 'gradient-option-card';
        gradientCard.style.background = gradient.css;
        gradientCard.onclick = () => selectGradient(gradient, gradientCard);
        
        // Add accessibility indicator
        const accessibilityBadge = document.createElement('div');
        accessibilityBadge.className = 'accessibility-badge';
        accessibilityBadge.innerHTML = gradient.accessible ? '✓ Accessible' : '⚠ Limited Contrast';
        
        // Add sample text to show readability
        const sampleText = document.createElement('div');
        sampleText.className = 'gradient-sample-text';
        sampleText.innerHTML = `
            <h3>Hello, User</h3>
            <p>Sample text</p>
        `;
        
        gradientCard.appendChild(accessibilityBadge);
        gradientCard.appendChild(sampleText);
        
        gradientsGrid.appendChild(gradientCard);
    });
    
    // Show action buttons
    document.getElementById('gradientActionButtons').style.display = 'flex';
}

// Create gradient combinations
function createGradientCombinations() {
    const gradients = [];
    
    // If we have enough colors, create various combinations
    if (extractedPalette.length >= 2) {
        // Two-color gradients
        for (let i = 0; i < Math.min(3, extractedPalette.length - 1); i++) {
            for (let j = i + 1; j < Math.min(4, extractedPalette.length); j++) {
                const color1 = extractedPalette[i];
                const color2 = extractedPalette[j];
                
                // Radial gradient (like the original design)
                gradients.push({
                    type: 'radial-2-color',
                    colors: [color1.hex, color2.hex],
                    css: `radial-gradient(ellipse at top left, ${addAlpha(color1.hex, 0.3)} 0%, ${addAlpha(color2.hex, 0.2)} 50%, transparent 70%)`,
                    accessible: checkAccessibility(color1, color2)
                });
                
                // Linear gradient
                gradients.push({
                    type: 'linear-2-color',
                    colors: [color1.hex, color2.hex],
                    css: `linear-gradient(135deg, ${addAlpha(color1.hex, 0.25)} 0%, ${addAlpha(color2.hex, 0.25)} 100%)`,
                    accessible: checkAccessibility(color1, color2)
                });
            }
        }
        
        // Three-color gradients
        if (extractedPalette.length >= 3) {
            for (let i = 0; i < Math.min(2, extractedPalette.length - 2); i++) {
                const color1 = extractedPalette[i];
                const color2 = extractedPalette[i + 1];
                const color3 = extractedPalette[i + 2];
                
                // Multi-color radial gradient
                gradients.push({
                    type: 'radial-3-color',
                    colors: [color1.hex, color2.hex, color3.hex],
                    css: `radial-gradient(ellipse at top left, ${addAlpha(color1.hex, 0.25)} 0%, ${addAlpha(color2.hex, 0.2)} 40%, ${addAlpha(color3.hex, 0.15)} 70%, transparent 90%)`,
                    accessible: checkAccessibility(color1, color2) && checkAccessibility(color2, color3)
                });
                
                // Multi-color linear gradient
                gradients.push({
                    type: 'linear-3-color',
                    colors: [color1.hex, color2.hex, color3.hex],
                    css: `linear-gradient(180deg, ${addAlpha(color1.hex, 0.2)} 0%, ${addAlpha(color2.hex, 0.2)} 50%, ${addAlpha(color3.hex, 0.2)} 100%)`,
                    accessible: checkAccessibility(color1, color2) && checkAccessibility(color2, color3)
                });
            }
        }
    }
    
    // Limit to top 8 gradients
    return gradients.slice(0, 8);
}

// Add alpha transparency to hex color
function addAlpha(hex, alpha) {
    const rgb = hexToRgb(hex);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

// Convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

// Calculate relative luminance (WCAG 2.0)
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

// Check if gradient provides sufficient contrast for text
function checkAccessibility(color1, color2) {
    // Check contrast against white and black text
    const whiteRgb = { r: 255, g: 255, b: 255 };
    const blackRgb = { r: 0, g: 0, b: 0 };
    
    const contrast1White = getContrastRatio({ rgb: color1.rgb }, { rgb: whiteRgb });
    const contrast1Black = getContrastRatio({ rgb: color1.rgb }, { rgb: blackRgb });
    const contrast2White = getContrastRatio({ rgb: color2.rgb }, { rgb: whiteRgb });
    const contrast2Black = getContrastRatio({ rgb: color2.rgb }, { rgb: blackRgb });
    
    // Since we're using transparent gradients over a light background,
    // we need at least one color to provide good contrast with black text
    const minContrast = 3.0; // AA for large text
    
    return (contrast1Black >= minContrast || contrast2Black >= minContrast);
}

// Select a gradient
function selectGradient(gradient, cardElement) {
    // Remove previous selection
    document.querySelectorAll('.gradient-option-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    cardElement.classList.add('selected');
    
    // Store selected gradient
    selectedGradient = gradient;
    
    // Show preview
    showGradientPreview(gradient);
}

// Show gradient preview
function showGradientPreview(gradient) {
    const previewSection = document.getElementById('gradientPreviewSection');
    const previewCard = document.getElementById('gradientPreviewCard');
    
    previewSection.style.display = 'block';
    previewCard.style.background = gradient.css;
    
    // Scroll to preview
    previewSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Apply gradient to the home page
function applyGradient() {
    if (!selectedGradient) {
        alert('Please select a gradient first');
        return;
    }
    
    // Store gradient in localStorage
    localStorage.setItem('customGradient', JSON.stringify(selectedGradient));
    
    // Show success message
    alert('Background applied successfully! You will see it on your home page.');
    
    // Redirect to home
    goToHome();
}

// Reset customization
function resetCustomization() {
    if (confirm('Are you sure you want to reset your customization?')) {
        // Clear selected gradient
        selectedGradient = null;
        
        // Reset upload
        document.getElementById('uploadArea').style.display = 'flex';
        document.getElementById('uploadedLogoPreview').style.display = 'none';
        document.getElementById('logoUpload').value = '';
        
        // Hide sections
        document.getElementById('colorPaletteSection').style.display = 'none';
        document.getElementById('generatedGradientsSection').style.display = 'none';
        document.getElementById('gradientPreviewSection').style.display = 'none';
        document.getElementById('gradientActionButtons').style.display = 'none';
        
        // Clear stored gradient
        localStorage.removeItem('customGradient');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Navigation helper
function goToHome() {
    window.location.href = 'index.html';
}

