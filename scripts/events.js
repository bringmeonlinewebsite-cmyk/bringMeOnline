window.onload = function() {
    const modal = document.getElementById("popup-modal");
    const closeBtn = document.querySelector(".close-popup");
    const form = document.getElementById("contact-form");
    
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = 'toast' + (type === 'error' ? ' error' : '');
        toast.textContent = message;
        document.body.appendChild(toast);
        // Remove after animation completes (~2.8s)
        setTimeout(() => {
            if (toast && toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }
    
    // Get all Get Started buttons
    const buttons = [
        document.getElementById("static-website-button"),
        document.getElementById("e-commerce-website-button"),
        document.getElementById("management-system-button")
    ];
    
    // Add click event listeners to all buttons
    buttons.forEach((button, index) => {
        if (button) {
            button.addEventListener("click", function() {
                // Pre-select the service based on which button was clicked
                const serviceSelect = document.getElementById("service");
                const services = ["business-website", "e-commerce", "management-system"];
                serviceSelect.value = services[index];
                
                // Show the popup
                modal.style.display = "block";
                document.body.style.overflow = "hidden"; // Prevent background scrolling
            });
        }
    });
    
    // Close popup when clicking the X
    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Restore scrolling
        });
    }
    
    // Close popup when clicking outside the modal
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
    
    // Close popup when pressing Escape key
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && modal.style.display === "block") {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
    
    // Handle form submission
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get("name"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                service: formData.get("service"),
                message: formData.get("message")
            };
            
            // Simple validation
            if (!data.name || !data.email || !data.phone || !data.service) {
                alert("Please fill in all required fields.");
                return;
            }

            const apiUrl = "https://script.google.com/macros/s/AKfycbzFcEehvrFzUMVUqp5g55gH7QZ_IjB-nshcTUuWlHgXIbgiVGHbCbMIrg02oNrFqBJ6CQ/exec";
            
                // Activate loading state on submit button
                const submitBtn = form.querySelector('.submit-btn');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.classList.add('loading');
                    submitBtn.dataset.originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Sending...';
                }

                // Create and show modal overlay loader
                const popupContent = document.querySelector('.popup-content');
                let overlay;
                if (popupContent) {
                    overlay = document.createElement('div');
                    overlay.className = 'modal-loading-overlay';
                    const wrapper = document.createElement('div');
                    wrapper.style.display = 'flex';
                    wrapper.style.flexDirection = 'column';
                    wrapper.style.alignItems = 'center';
                    const spinner = document.createElement('div');
                    spinner.className = 'spinner';
                    const text = document.createElement('div');
                    text.className = 'loading-text';
                    text.setAttribute('aria-live', 'polite');
                    text.textContent = 'Sending your inquiry…';
                    wrapper.appendChild(spinner);
                    wrapper.appendChild(text);
                    overlay.appendChild(wrapper);
                    popupContent.appendChild(overlay);
                }

            // Send data to API
            fetch(apiUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then((res) => {
                    // Show success toast
                    showToast("Thank you! We'll get back to you within 24 hours.");

                    // Reset form and close popup
                form.reset();
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            })
            .catch((error) => {
                console.error('Error:', error);
                    showToast("There was an error sending your message. Please try again.", 'error');
                })
                .finally(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('loading');
                        if (submitBtn.dataset.originalText) {
                            submitBtn.textContent = submitBtn.dataset.originalText;
                        }
                    }
                    // Remove overlay loader
                    if (overlay && overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                });
        });
    }
};