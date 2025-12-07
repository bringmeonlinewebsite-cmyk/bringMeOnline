document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. POPUP MODAL FUNCTIONALITY ---
    
    // Get all necessary elements from the HTML
    const popupOverlay = document.getElementById('contact-popup');
    const openPopupBtns = document.querySelectorAll('#open-popup-btn, #open-popup-footer-btn, #cta-btn');
    const closePopupBtn = document.getElementById('close-popup-btn');
    
    /**
     * Function to open the popup.
     * We use a class toggler for better CSS transitions (as defined in styles.css).
     */
    function openPopup() {
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    /**
     * Function to close the popup.
     */
    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    // Attach click listeners to all buttons that should open the popup
    openPopupBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Stop default action (like navigating)
            
            // If the CTA button is clicked, scroll to the projects section first before opening the popup
            if (button.id === 'cta-btn') {
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                // We'll open the popup a moment later to not interrupt the scroll animation
                setTimeout(openPopup, 1000); 
            } else {
                openPopup();
            }
        });
    });

    // Listener for the 'X' close button inside the modal
    closePopupBtn.addEventListener('click', closePopup);

    // Listener to close the modal if the user clicks anywhere on the dark overlay
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    // Listener to close the modal if the user presses the ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });
    
    // --- 2. EXAMPLE FORM SUBMISSION HANDLING ---
    // NOTE: This is front-end validation only. 
    // You need a back-end script (e.g., PHP, Node.js) or a service (like Formspree) 
    // to actually receive the form data.

    const contactForm = document.querySelector('.popup-content form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // **Replace this block with your actual form submission logic (e.g., AJAX)**
        console.log('Form submission attempted...'); 
        
        // Simple success message simulation
        alert('Thank you for your inquiry! We will be in touch soon.'); 

        // Clear the form and close the popup after successful submission
        contactForm.reset();
        closePopup();
    });

    // --- 3. (Optional) ACTIVE NAVIGATION LINK HIGHLIGHTING ---
    // Highlights the link in the header based on which section is currently visible.
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Section must be 50% visible to be considered 'active'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add 'active' class to the link matching the current section ID
                const currentSectionId = entry.target.id;
                const correspondingLink = document.querySelector(`nav ul li a[href="#${currentSectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

});