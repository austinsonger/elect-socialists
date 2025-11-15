// Main Application Module
// Coordinates all modules and initializes the application

(function() {
    'use strict';

    /**
     * Initialize the application
     */
    async function initApp() {
        try {
            console.log('Initializing Democratic Socialist Officials Map...');

            // Show loading indicator
            showLoadingIndicator(true);

            // Initialize map
            MapManager.initMap('map');

            // Initialize filter controller
            FilterController.init();
            FilterController.populateStateDropdown();

            // Load officials data
            const result = await DataLoader.loadOfficials('data/officials.json');

            if (result.officials.length === 0) {
                throw new Error('No valid officials data loaded');
            }

            // Set officials in state manager
            StateManager.setOfficials(result.officials);

            // Add initial markers to map
            MapManager.addMarkers(result.officials);

            // Hide loading indicator
            showLoadingIndicator(false);

            console.log('Application initialized successfully');
            console.log(`Loaded ${result.validCount} officials`);

            // Log any validation errors
            if (result.errors.length > 0) {
                console.warn(`${result.errors.length} officials failed validation`);
            }

        } catch (error) {
            console.error('Failed to initialize application:', error);
            showError('Failed to load the map. Please refresh the page to try again.');
            showLoadingIndicator(false);
        }
    }

    /**
     * Show or hide loading indicator
     * @param {boolean} show - Whether to show the loading indicator
     */
    function showLoadingIndicator(show) {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = show ? 'flex' : 'none';
        }
    }

    /**
     * Show error message to user
     * @param {string} message - Error message
     */
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.setAttribute('role', 'alert');
        errorDiv.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                        background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 10px 15px rgba(0,0,0,0.1);
                        text-align: center; z-index: 10000; max-width: 400px;">
                <h2 style="color: #e63946; margin-bottom: 1rem;">Error</h2>
                <p style="color: #1d3557; margin-bottom: 1.5rem;">${message}</p>
                <button onclick="location.reload()" 
                        style="background: #e63946; color: white; border: none; padding: 0.75rem 1.5rem;
                               border-radius: 4px; font-size: 1rem; cursor: pointer;">
                    Reload Page
                </button>
            </div>
        `;
        document.body.appendChild(errorDiv);
    }

    /**
     * Setup keyboard accessibility
     */
    function setupKeyboardAccessibility() {
        // Allow Escape key to close popups
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                PopupComponent.closePopup();
            }
        });
    }

    /**
     * Setup responsive behavior
     */
    function setupResponsiveBehavior() {
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const map = MapManager.getMap();
                if (map) {
                    map.invalidateSize();
                }
            }, 250);
        });
    }

    /**
     * Application entry point
     */
    function main() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initApp();
                setupKeyboardAccessibility();
                setupResponsiveBehavior();
            });
        } else {
            // DOM is already loaded
            initApp();
            setupKeyboardAccessibility();
            setupResponsiveBehavior();
        }
    }

    // Start the application
    main();

})();
// Main Application Module
// Coordinates all modules and initializes the application

(function() {
    'use strict';

    /**
     * Initialize the application
     */
    async function initApp() {
        try {
            console.log('Initializing Democratic Socialist Officials Map...');

            // Show loading indicator
            showLoadingIndicator(true);

            // Initialize map
            MapManager.initMap('map');

            // Initialize filter controller
            FilterController.init();
            FilterController.populateStateDropdown();

            // Load officials data
            const result = await DataLoader.loadOfficials('data/officials.json');

            if (result.officials.length === 0) {
                throw new Error('No valid officials data loaded');
            }

            // Set officials in state manager
            StateManager.setOfficials(result.officials);

            // Add initial markers to map
            MapManager.addMarkers(result.officials);

            // Hide loading indicator
            showLoadingIndicator(false);

            console.log('Application initialized successfully');
            console.log(`Loaded ${result.validCount} officials`);

            // Log any validation errors
            if (result.errors.length > 0) {
                console.warn(`${result.errors.length} officials failed validation`);
            }

        } catch (error) {
            console.error('Failed to initialize application:', error);
            showError('Failed to load the map. Please refresh the page to try again.');
            showLoadingIndicator(false);
        }
    }

    /**
     * Show or hide loading indicator
     * @param {boolean} show - Whether to show the loading indicator
     */
    function showLoadingIndicator(show) {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = show ? 'flex' : 'none';
        }
    }

    /**
     * Show error message to user
     * @param {string} message - Error message
     */
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.setAttribute('role', 'alert');
        errorDiv.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                        background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 10px 15px rgba(0,0,0,0.1);
                        text-align: center; z-index: 10000; max-width: 400px;">
                <h2 style="color: #e63946; margin-bottom: 1rem;">Error</h2>
                <p style="color: #1d3557; margin-bottom: 1.5rem;">${message}</p>
                <button onclick="location.reload()" 
                        style="background: #e63946; color: white; border: none; padding: 0.75rem 1.5rem;
                               border-radius: 4px; font-size: 1rem; cursor: pointer;">
                    Reload Page
                </button>
            </div>
        `;
        document.body.appendChild(errorDiv);
    }

    /**
     * Setup keyboard accessibility
     */
    function setupKeyboardAccessibility() {
        // Allow Escape key to close popups
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                PopupComponent.closePopup();
            }
        });
    }

    /**
     * Setup responsive behavior
     */
    function setupResponsiveBehavior() {
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const map = MapManager.getMap();
                if (map) {
                    map.invalidateSize();
                }
            }, 250);
        });
    }

    /**
     * Application entry point
     */
    function main() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initApp();
                setupKeyboardAccessibility();
                setupResponsiveBehavior();
            });
        } else {
            // DOM is already loaded
            initApp();
            setupKeyboardAccessibility();
            setupResponsiveBehavior();
        }
    }

    // Start the application
    main();

})();
