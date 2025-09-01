// Simple script to create base64 favicon data
// You can run this in browser console to generate favicon data

function createFavicon() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // Background circle with Hana Green
    ctx.fillStyle = '#00856A';
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, 2 * Math.PI);
    ctx.fill();
    
    // Letter H
    ctx.fillStyle = 'white';
    // Left vertical line
    ctx.fillRect(10, 8, 2, 16);
    // Right vertical line  
    ctx.fillRect(20, 8, 2, 16);
    // Horizontal line
    ctx.fillRect(12, 15, 6, 2);
    
    // Accent dot
    ctx.beginPath();
    ctx.arc(16, 10, 1.5, 0, 2 * Math.PI);
    ctx.fill();
    
    return canvas.toDataURL('image/png');
}

console.log('Run createFavicon() in browser console and save the result as favicon data URL');