// Timeline Controller Module
// Manages timeline state, year progression, and temporal filtering

const TimelineController = (function() {
    'use strict';

    // Timeline state
    const state = {
        currentYear: null,
        minYear: null,
        maxYear: null,
        isPlaying: false,
        animationSpeed: 1, // 1x speed by default
        isTimelineActive: false,
        yearlyOfficialCounts: new Map(),
        animationIntervalId: null
    };

    // Event listeners
    const listeners = {
        yearChange: [],
        playStateChange: [],
        timelineToggle: []
    };

    /**
     * Subscribe to timeline events
     * @param {string} event - Event type
     * @param {Function} callback - Callback function
     */
    function subscribe(event, callback) {
        if (listeners[event]) {
            listeners[event].push(callback);
        }
    }

    /**
     * Notify all listeners of a specific event
     * @param {string} event - Event type
     * @param {*} data - Data to pass to listeners
     */
    function notify(event, data) {
        if (listeners[event]) {
            listeners[event].forEach(callback => callback(data));
        }
    }

    /**
     * Initialize timeline with officials data
     * @param {Array} officials - Array of official objects
     */
    function initialize(officials) {
        if (!officials || officials.length === 0) {
            console.warn('No officials data provided to timeline');
            return;
        }

        // Extract year range from data
        const years = officials
            .map(o => o.yearElected)
            .filter(year => year != null);

        if (years.length === 0) {
            console.warn('No valid election years found in data');
            return;
        }

        state.minYear = Math.min(...years);
        state.maxYear = Math.max(...years);
        state.currentYear = state.maxYear; // Start at most recent year

        // Calculate yearly official counts
        calculateYearlyCounts(officials);

        console.log(`Timeline initialized: ${state.minYear} - ${state.maxYear}`);
    }

    /**
     * Calculate the number of officials elected each year (cumulative)
     * @param {Array} officials - Array of official objects
     */
    function calculateYearlyCounts(officials) {
        state.yearlyOfficialCounts.clear();

        for (let year = state.minYear; year <= state.maxYear; year++) {
            const count = officials.filter(o => o.yearElected <= year).length;
            state.yearlyOfficialCounts.set(year, count);
        }
    }

    /**
     * Set the current year position
     * @param {number} year - Year to set
     */
    function setYear(year) {
        if (year < state.minYear || year > state.maxYear) {
            console.warn(`Year ${year} is out of range`);
            return;
        }

        state.currentYear = year;
        notify('yearChange', {
            year: state.currentYear,
            count: state.yearlyOfficialCounts.get(state.currentYear) || 0
        });
    }

    /**
     * Step forward one year
     */
    function stepForward() {
        if (state.currentYear < state.maxYear) {
            setYear(state.currentYear + 1);
        } else if (state.isPlaying) {
            // Stop playing when reaching the end
            pause();
        }
    }

    /**
     * Step backward one year
     */
    function stepBackward() {
        if (state.currentYear > state.minYear) {
            setYear(state.currentYear - 1);
        }
    }

    /**
     * Start automatic timeline progression
     */
    function play() {
        if (state.isPlaying) return;

        state.isPlaying = true;
        notify('playStateChange', { isPlaying: true });

        // If at the end, restart from beginning
        if (state.currentYear >= state.maxYear) {
            setYear(state.minYear);
        }

        // Calculate interval based on speed (faster speed = shorter interval)
        const baseInterval = 1000; // 1 second per year at 1x speed
        const interval = baseInterval / state.animationSpeed;

        state.animationIntervalId = setInterval(() => {
            stepForward();
        }, interval);
    }

    /**
     * Pause automatic timeline progression
     */
    function pause() {
        if (!state.isPlaying) return;

        state.isPlaying = false;
        notify('playStateChange', { isPlaying: false });

        if (state.animationIntervalId) {
            clearInterval(state.animationIntervalId);
            state.animationIntervalId = null;
        }
    }

    /**
     * Toggle between play and pause
     */
    function togglePlayPause() {
        if (state.isPlaying) {
            pause();
        } else {
            play();
        }
    }

    /**
     * Set animation speed
     * @param {number} speed - Speed multiplier (0.5, 1, 2, etc.)
     */
    function setSpeed(speed) {
        if (speed <= 0) {
            console.warn('Speed must be positive');
            return;
        }

        state.animationSpeed = speed;

        // If currently playing, restart with new speed
        if (state.isPlaying) {
            pause();
            play();
        }
    }

    /**
     * Activate timeline mode
     */
    function activateTimeline() {
        state.isTimelineActive = true;
        state.currentYear = state.minYear; // Start from beginning
        notify('timelineToggle', { active: true });
        notify('yearChange', {
            year: state.currentYear,
            count: state.yearlyOfficialCounts.get(state.currentYear) || 0
        });
    }

    /**
     * Deactivate timeline mode
     */
    function deactivateTimeline() {
        pause();
        state.isTimelineActive = false;
        notify('timelineToggle', { active: false });
    }

    /**
     * Toggle timeline mode on/off
     */
    function toggleTimeline() {
        if (state.isTimelineActive) {
            deactivateTimeline();
        } else {
            activateTimeline();
        }
    }

    /**
     * Get officials that should be visible at current year
     * @param {Array} officials - All officials
     * @returns {Array} Filtered officials
     */
    function getVisibleOfficials(officials) {
        if (!state.isTimelineActive || state.currentYear === null) {
            return officials;
        }

        return officials.filter(official => 
            official.yearElected <= state.currentYear
        );
    }

    /**
     * Get current timeline state
     * @returns {Object} Current state
     */
    function getState() {
        return {
            ...state,
            animationIntervalId: null // Don't expose interval ID
        };
    }

    /**
     * Reset timeline to initial state
     */
    function reset() {
        pause();
        if (state.minYear !== null) {
            state.currentYear = state.minYear;
            notify('yearChange', {
                year: state.currentYear,
                count: state.yearlyOfficialCounts.get(state.currentYear) || 0
            });
        }
    }

    // Public API
    return {
        subscribe,
        initialize,
        setYear,
        stepForward,
        stepBackward,
        play,
        pause,
        togglePlayPause,
        setSpeed,
        activateTimeline,
        deactivateTimeline,
        toggleTimeline,
        getVisibleOfficials,
        getState,
        reset
    };
})();
