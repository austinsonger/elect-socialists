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

            // Initialize timeline controller
            TimelineController.initialize(result.officials);
            initializeTimelineUI();

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
     * Initialize timeline UI and event handlers
     */
    function initializeTimelineUI() {
        const timelineState = TimelineController.getState();
        
        // Update slider bounds
        const slider = document.getElementById('timeline-slider');
        if (slider && timelineState.minYear && timelineState.maxYear) {
            slider.min = timelineState.minYear;
            slider.max = timelineState.maxYear;
            slider.value = timelineState.maxYear;
            slider.setAttribute('aria-valuemin', timelineState.minYear);
            slider.setAttribute('aria-valuemax', timelineState.maxYear);
            slider.setAttribute('aria-valuenow', timelineState.maxYear);
            
            // Update labels
            document.getElementById('timeline-label-start').textContent = timelineState.minYear;
            document.getElementById('timeline-label-end').textContent = timelineState.maxYear;
        }

        // Timeline toggle button
        const toggleBtn = document.getElementById('timeline-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                TimelineController.toggleTimeline();
            });
        }

        // Play/Pause button
        const playPauseBtn = document.getElementById('timeline-play-pause');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function() {
                TimelineController.togglePlayPause();
            });
        }

        // Step forward button
        const stepForwardBtn = document.getElementById('timeline-step-forward');
        if (stepForwardBtn) {
            stepForwardBtn.addEventListener('click', function() {
                TimelineController.stepForward();
            });
        }

        // Step backward button
        const stepBackBtn = document.getElementById('timeline-step-back');
        if (stepBackBtn) {
            stepBackBtn.addEventListener('click', function() {
                TimelineController.stepBackward();
            });
        }

        // Reset button
        const resetBtn = document.getElementById('timeline-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                TimelineController.reset();
            });
        }

        // Speed selector
        const speedSelect = document.getElementById('timeline-speed-select');
        if (speedSelect) {
            speedSelect.addEventListener('change', function(e) {
                const speed = parseFloat(e.target.value);
                TimelineController.setSpeed(speed);
            });
        }

        // Slider input
        if (slider) {
            slider.addEventListener('input', function(e) {
                const year = parseInt(e.target.value);
                TimelineController.setYear(year);
            });
        }

        // Subscribe to timeline events
        TimelineController.subscribe('yearChange', function(data) {
            updateTimelineDisplay(data);
            StateManager.applyFilters();
        });

        TimelineController.subscribe('playStateChange', function(data) {
            updatePlayPauseButton(data.isPlaying);
        });

        TimelineController.subscribe('timelineToggle', function(data) {
            updateTimelinePanel(data.active);
        });

        // Subscribe to state changes to update map
        StateManager.subscribe('officialsChange', function(data) {
            MapManager.updateMarkers(data.filteredOfficials);
        });
    }

    /**
     * Update timeline display with current year and count
     * @param {Object} data - Year and count data
     */
    function updateTimelineDisplay(data) {
        const yearDisplay = document.getElementById('timeline-year');
        const countDisplay = document.getElementById('timeline-count');
        const slider = document.getElementById('timeline-slider');
        const progress = document.getElementById('timeline-progress');

        if (yearDisplay) {
            yearDisplay.textContent = data.year;
        }

        if (countDisplay) {
            countDisplay.textContent = data.count;
        }

        if (slider) {
            slider.value = data.year;
            slider.setAttribute('aria-valuenow', data.year);
        }

        // Update progress bar
        if (progress && slider) {
            const timelineState = TimelineController.getState();
            const range = timelineState.maxYear - timelineState.minYear;
            const position = data.year - timelineState.minYear;
            const percentage = (position / range) * 100;
            progress.style.width = `${percentage}%`;
        }
    }

    /**
     * Update play/pause button state
     * @param {boolean} isPlaying - Whether timeline is playing
     */
    function updatePlayPauseButton(isPlaying) {
        const icon = document.getElementById('play-pause-icon');
        const button = document.getElementById('timeline-play-pause');

        if (icon) {
            icon.textContent = isPlaying ? '⏸' : '▶';
        }

        if (button) {
            button.setAttribute('aria-label', isPlaying ? 'Pause timeline animation' : 'Play timeline animation');
        }
    }

    /**
     * Update timeline panel visibility
     * @param {boolean} active - Whether timeline is active
     */
    function updateTimelinePanel(active) {
        const content = document.getElementById('timeline-content');
        const toggleBtn = document.getElementById('timeline-toggle');
        const toggleText = toggleBtn ? toggleBtn.querySelector('.timeline-toggle-text') : null;

        if (content) {
            content.style.display = active ? 'block' : 'none';
        }

        if (toggleBtn) {
            toggleBtn.setAttribute('aria-pressed', active.toString());
        }

        if (toggleText) {
            toggleText.textContent = active ? 'Deactivate Timeline' : 'Activate Timeline';
        }

        // Trigger filter reapplication
        if (!active) {
            StateManager.applyFilters();
        }
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

            // Timeline keyboard controls
            const timelineState = TimelineController.getState();
            if (timelineState.isTimelineActive) {
                // Spacebar to play/pause
                if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
                    e.preventDefault();
                    TimelineController.togglePlayPause();
                }
                // Arrow keys to step
                else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    TimelineController.stepForward();
                }
                else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    TimelineController.stepBackward();
                }
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
        
        // Handle virtual keyboard for better mobile UX
        setupVirtualKeyboardHandling();
    }
    
    /**
     * Setup virtual keyboard handling for mobile devices
     */
    function setupVirtualKeyboardHandling() {
        const inputs = document.querySelectorAll('input, select, textarea');
        let initialViewportHeight = window.innerHeight;
        
        inputs.forEach(input => {
            // When input is focused, scroll it into view
            input.addEventListener('focus', function() {
                // Small delay to allow keyboard to appear
                setTimeout(() => {
                    // Check if viewport height changed (keyboard appeared)
                    const currentHeight = window.innerHeight;
                    if (currentHeight < initialViewportHeight * 0.75) {
                        // Keyboard is likely open, scroll element into view
                        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 300);
            });
            
            // Update initial height on blur
            input.addEventListener('blur', function() {
                setTimeout(() => {
                    initialViewportHeight = window.innerHeight;
                }, 300);
            });
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
