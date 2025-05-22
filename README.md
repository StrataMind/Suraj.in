# Suraj Kumar - Personal Portfolio

This is the source code for my personal portfolio website, designed to showcase my skills, projects, journey, and ways to connect with me. It's built with HTML, CSS, and JavaScript, featuring a responsive design and interactive elements.

<!-- Optional: Add a screenshot or GIF of your portfolio here -->
<!-- ![Portfolio Screenshot](link_to_your_screenshot.png) -->

**Live Demo:** [Suraj](https://surajsk2003.github.io/Suraj.in/)

## Features

*   **Responsive Design:** Adapts to various screen sizes (desktop, tablet, mobile).
*   **Interactive Sidebar Navigation:**
    *   Toggleable on mobile.
    *   Peeks out on desktop and expands on hover or click.
    *   Closes on link click (mobile).
    *   Active link highlighting based on scroll position and current page.
*   **Particle.js Background:** Dynamic animated background.
*   **Typed Text Animation:** Engaging "I am..." text animation on the home section.
*   **Social Links Carousel:** Horizontally scrolling carousel of social/professional links (Resume, LinkedIn, Kaggle, Twitter, GitHub).
*   **Detailed "About Me" Section:**
    *   Introduction and professional summary.
    *   "Phases of My Life" section with interactive flip cards.
*   **Skills Section:** Categorized skills displayed in an accordion interface.
*   **Separate Pages:** Dedicated pages for:
    *   Projects (`projects.html`)
    *   Certifications (`certifications.html`)
    *   Contact (`contact.html`)
*   **Project Modal:** (On `projects.html`) Displays detailed information about each project when a card is clicked.
*   **Contact Form:** (On `contact.html`) Allows visitors to send messages directly (requires a backend service like Formspree or a custom backend).
*   **Styled Footer:**
    *   Inspirational quotes section.
    *   General and Important Links sections (accordion on mobile).
    *   Copyright information.

## Technologies Used

*   **Frontend:**
    *   HTML5
    *   CSS3 (Flexbox, Grid, Animations, Transitions, Responsive Media Queries)
    *   JavaScript (ES6+)
        *   DOM Manipulation
        *   Event Listeners
        *   `fetch` API (for contact form)
        *   Custom animations and interactive components (accordions, modal, sidebar, typing animation)
*   **Libraries/Frameworks:**
    *   Particle.js - For the animated background.
*   **Tools:**
    *   VS Code (or any preferred code editor)
    *   Git & GitHub (for version control)

## File Structure

```
static-portfolio/
├── index.html             # Main landing page (Home, About, Skills)
├── projects.html          # Projects page
├── certifications.html    # Certifications page
├── contact.html           # Contact page
├── styles.css             # Main stylesheet
├── scripts.js             # Main JavaScript file
├── particles.js           # Particle.js library file
├── particle-config.js     # Custom configuration for Particle.js
├── images/                # Folder for all images
│   ├── profile_picture.jpeg
│   ├── github.png
│   ├── linkedin.png
│   ├── resume-icon.png
│   ├── kaggle-icon.png
│   ├── twitter-icon.png
│   └── ... (other project/certification images)
└── README.md              # This file
```

## Setup

1.  **Clone the repository (if applicable):**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```
2.  **Open `index.html`:** Navigate to the project directory and open `index.html` in your preferred web browser.

No special build steps are required as this is a static website.

## Customization

To personalize this portfolio for your own use:

1.  **Personal Information:**
    *   Update name, bio, and "Phases of My Life" content in `index.html`.
    *   Replace `images/profile_picture.jpeg` with your photo.
2.  **Skills:**
    *   Modify the skills categories and individual skills in the "Skills" section of `index.html`.
3.  **Projects:**
    *   Edit `projects.html` to add, remove, or modify project cards.
    *   Ensure `data-*` attributes on project cards in `projects.html` are updated for the modal functionality in `scripts.js`.
    *   Add corresponding project images to the `images/` folder.
4.  **Certifications:**
    *   Edit `certifications.html` to list your certifications.
    *   Add any relevant certificate images or links.
5.  **Contact Form:**
    *   In `contact.html`, update the `action` attribute of the `<form>` tag to point to your backend service endpoint (e.g., your Formspree URL).
6.  **Links:**
    *   Update social media links in the sidebar and the social links carousel in `index.html`.
    *   Update the resume link in `index.html`.
    *   Update links in the footer sections of `index.html`.
7.  **Images:**
    *   Replace placeholder images in the `images/` folder with your actual images (e.g., `resume-icon.png`, `kaggle-icon.png`, `twitter-icon.png`).
8.  **Quotes:**
    *   Modify the quotes in the footer section of `index.html`.
9.  **Styling:**
    *   Adjust colors, fonts, and layout in `styles.css` as needed.
10. **Typed Text:**
    *   Update the `textArray` in `scripts.js` for the home page typing animation.

## Future Enhancements (Ideas)

*   Implement the "Blogs (Coming Soon)" section.
*   Integrate the commented-out "live animation" or "floating ball" features.
*   Add more advanced animations or micro-interactions.
*   Optimize images for faster loading.

## Acknowledgements

*   Particle.js by Vincent Garreau for the background animation.

## Contact

If you have any questions or want to connect, feel free to reach out!
*   **LinkedIn:** [suraj-singh-96b45220a](https://www.linkedin.com/in/suraj-singh-96b45220a/)
*   **GitHub:** [surajsk2003](https://github.com/surajsk2003)
*   **Email:** surajkumarsksk2000@gmail.com

---
