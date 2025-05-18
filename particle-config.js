document.addEventListener('DOMContentLoaded', function() {
  particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 100, // Increased number of particles
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#00A9FF" // Updated particle color to new accent
    },
    "shape": {
      "type": "circle", // Shape of particles (circle, edge, triangle, polygon, star, image)
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.5, // Slightly increased base opacity
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1, // Slightly faster opacity animation
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3.5, // Slightly increased base size
      "random": true,
      "anim": {
        "enable": true, // Enable size animation
        "speed": 40,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150, // Max distance for linking lines
      "color": "#0077B3", // Updated line color (darker accent)
      "opacity": 0.4, // Slightly more visible lines
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2.5, // Slightly faster particle movement
      "direction": "none", // Direction of movement (none, top, top-right, right, bottom-right, bottom, bottom-left, left, top-left)
      "random": false,
      "straight": false,
      "out_mode": "out", // Behavior when particles move out of bounds (out, bounce)
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble" // Changed hover mode to bubble for a more dynamic effect
      },
      "onclick": {
        "enable": true,
        "mode": "repulse" // Changed click mode to repulse for a pushing away effect
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1 // Make grabbed lines fully opaque
        }
      },
      "bubble": {
        "distance": 250, // Distance for bubble effect
        "size": 6,     // Size of bubbled particles
        "duration": 2,
        "opacity": 0.8,  // Opacity of bubbled particles
        "speed": 3
      },
      "repulse": {
        "distance": 150, // Distance for repulse effect
        "duration": 0.4
      },
      "push": {
        "particles_nb": 5 // Number of particles to push on click
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
  });
});