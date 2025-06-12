// Mobile background optimization
function optimizeBackgroundForMobile() {
    const isMobile = window.innerWidth <= 768;
    const backgrounds = document.querySelectorAll('.neural-bg, .dots-bg, .wave-bg, .geometric-bg');
    
    if (isMobile) {
        // If on mobile, switch to a simpler background
        switchBackground('stars');
        
        // Disable complex backgrounds
        backgrounds.forEach(bg => {
            bg.style.display = 'none';
        });
        
        // Reduce neural network complexity if it's active
        const neural = document.querySelector('.neural-bg');
        if (neural) {
            const nodes = neural.querySelectorAll('.neural-node');
            const lines = neural.querySelectorAll('.neural-line');
            
            // Keep only a few nodes and lines for better performance
            for (let i = 0; i < nodes.length; i++) {
                if (i > 5) nodes[i].style.display = 'none';
            }
            
            for (let i = 0; i < lines.length; i++) {
                if (i > 3) lines[i].style.display = 'none';
            }
        }
    }
}

// Call this function on page load and resize
document.addEventListener('DOMContentLoaded', function() {
    optimizeBackgroundForMobile();
    window.addEventListener('resize', optimizeBackgroundForMobile);
});