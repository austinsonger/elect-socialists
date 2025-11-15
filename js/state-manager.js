// State Manager Module
// Maintains application state for filters, selected official, and officials data

const StateManager = (function() {
    'use strict';

    // Application state
    const state = {
        allOfficials: [],
        filteredOfficials: [],
        filters: {
            search: '',
            state: '',
            officeLevels: ['federal', 'state', 'county', 'city', 'town'],
            affiliations: [],
            yearStart: null,
            yearEnd: null
        },
        selectedOfficial: null,
        isLoading: true
    };

    // Event listeners
    const listeners = {
        stateChange: [],
        filterChange: [],
        officialsChange: []
    };

    /**
     * Subscribe to state changes
     * @param {string} event - Event type ('stateChange', 'filterChange', 'officialsChange')
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
     * Set all officials data
     * @param {Array} officials - Array of official objects
     */
    function setOfficials(officials) {
        state.allOfficials = officials;
        state.filteredOfficials = officials;
        state.isLoading = false;
        
        // Initialize available affiliations
        const affiliations = DataLoader.getUniqueValues(officials, 'politicalAffiliation');
        state.filters.affiliations = affiliations;
        
        notify('officialsChange', {
            allOfficials: state.allOfficials,
            filteredOfficials: state.filteredOfficials
        });
        notify('stateChange', state);
    }

    /**
     * Update filters
     * @param {Object} newFilters - Partial filter object to update
     */
    function updateFilters(newFilters) {
        state.filters = { ...state.filters, ...newFilters };
        applyFilters();
        notify('filterChange', state.filters);
    }

    /**
     * Apply current filters to officials data
     */
    function applyFilters() {
        let filtered = state.allOfficials;

        // Search filter
        if (state.filters.search) {
            const searchLower = state.filters.search.toLowerCase();
            filtered = filtered.filter(official => {
                return (
                    official.name.toLowerCase().includes(searchLower) ||
                    official.position.toLowerCase().includes(searchLower) ||
                    (official.location.city && official.location.city.toLowerCase().includes(searchLower)) ||
                    (official.location.county && official.location.county.toLowerCase().includes(searchLower))
                );
            });
        }

        // State filter
        if (state.filters.state) {
            filtered = filtered.filter(official => 
                official.location.state === state.filters.state
            );
        }

        // Office level filter
        if (state.filters.officeLevels.length > 0) {
            filtered = filtered.filter(official => 
                state.filters.officeLevels.includes(official.officeLevel)
            );
        }

        // Affiliation filter
        if (state.filters.affiliations.length > 0) {
            filtered = filtered.filter(official => 
                state.filters.affiliations.includes(official.politicalAffiliation)
            );
        }

        // Year elected filter
        if (state.filters.yearStart || state.filters.yearEnd) {
            filtered = filtered.filter(official => {
                const yearElected = official.yearElected;
                const meetsStart = !state.filters.yearStart || yearElected >= state.filters.yearStart;
                const meetsEnd = !state.filters.yearEnd || yearElected <= state.filters.yearEnd;
                return meetsStart && meetsEnd;
            });
        }

        state.filteredOfficials = filtered;
        notify('officialsChange', {
            allOfficials: state.allOfficials,
            filteredOfficials: state.filteredOfficials
        });
    }

    /**
     * Reset all filters to default values
     */
    function resetFilters() {
        const affiliations = DataLoader.getUniqueValues(state.allOfficials, 'politicalAffiliation');
        
        state.filters = {
            search: '',
            state: '',
            officeLevels: ['federal', 'state', 'county', 'city', 'town'],
            affiliations: affiliations,
            yearStart: null,
            yearEnd: null
        };
        
        applyFilters();
        notify('filterChange', state.filters);
    }

    /**
     * Set selected official
     * @param {Object|null} official - Official object or null to deselect
     */
    function setSelectedOfficial(official) {
        state.selectedOfficial = official;
        notify('stateChange', state);
    }

    /**
     * Get current state
     * @returns {Object} Current state object
     */
    function getState() {
        return { ...state };
    }

    /**
     * Get all officials
     * @returns {Array} All officials
     */
    function getAllOfficials() {
        return state.allOfficials;
    }

    /**
     * Get filtered officials
     * @returns {Array} Filtered officials
     */
    function getFilteredOfficials() {
        return state.filteredOfficials;
    }

    /**
     * Get current filters
     * @returns {Object} Current filters
     */
    function getFilters() {
        return { ...state.filters };
    }

    /**
     * Get selected official
     * @returns {Object|null} Selected official or null
     */
    function getSelectedOfficial() {
        return state.selectedOfficial;
    }

    /**
     * Check if data is loading
     * @returns {boolean} Loading state
     */
    function isLoading() {
        return state.isLoading;
    }

    // Public API
    return {
        subscribe,
        setOfficials,
        updateFilters,
        resetFilters,
        setSelectedOfficial,
        getState,
        getAllOfficials,
        getFilteredOfficials,
        getFilters,
        getSelectedOfficial,
        isLoading
    };
})();
// State Manager Module
// Maintains application state for filters, selected official, and officials data

const StateManager = (function() {
    'use strict';

    // Application state
    const state = {
        allOfficials: [],
        filteredOfficials: [],
        filters: {
            search: '',
            state: '',
            officeLevels: ['federal', 'state', 'county', 'city', 'town'],
            affiliations: [],
            yearStart: null,
            yearEnd: null
        },
        selectedOfficial: null,
        isLoading: true
    };

    // Event listeners
    const listeners = {
        stateChange: [],
        filterChange: [],
        officialsChange: []
    };

    /**
     * Subscribe to state changes
     * @param {string} event - Event type ('stateChange', 'filterChange', 'officialsChange')
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
     * Set all officials data
     * @param {Array} officials - Array of official objects
     */
    function setOfficials(officials) {
        state.allOfficials = officials;
        state.filteredOfficials = officials;
        state.isLoading = false;
        
        // Initialize available affiliations
        const affiliations = DataLoader.getUniqueValues(officials, 'politicalAffiliation');
        state.filters.affiliations = affiliations;
        
        notify('officialsChange', {
            allOfficials: state.allOfficials,
            filteredOfficials: state.filteredOfficials
        });
        notify('stateChange', state);
    }

    /**
     * Update filters
     * @param {Object} newFilters - Partial filter object to update
     */
    function updateFilters(newFilters) {
        state.filters = { ...state.filters, ...newFilters };
        applyFilters();
        notify('filterChange', state.filters);
    }

    /**
     * Apply current filters to officials data
     */
    function applyFilters() {
        let filtered = state.allOfficials;

        // Search filter
        if (state.filters.search) {
            const searchLower = state.filters.search.toLowerCase();
            filtered = filtered.filter(official => {
                return (
                    official.name.toLowerCase().includes(searchLower) ||
                    official.position.toLowerCase().includes(searchLower) ||
                    (official.location.city && official.location.city.toLowerCase().includes(searchLower)) ||
                    (official.location.county && official.location.county.toLowerCase().includes(searchLower))
                );
            });
        }

        // State filter
        if (state.filters.state) {
            filtered = filtered.filter(official => 
                official.location.state === state.filters.state
            );
        }

        // Office level filter
        if (state.filters.officeLevels.length > 0) {
            filtered = filtered.filter(official => 
                state.filters.officeLevels.includes(official.officeLevel)
            );
        }

        // Affiliation filter
        if (state.filters.affiliations.length > 0) {
            filtered = filtered.filter(official => 
                state.filters.affiliations.includes(official.politicalAffiliation)
            );
        }

        // Year elected filter
        if (state.filters.yearStart || state.filters.yearEnd) {
            filtered = filtered.filter(official => {
                const yearElected = official.yearElected;
                const meetsStart = !state.filters.yearStart || yearElected >= state.filters.yearStart;
                const meetsEnd = !state.filters.yearEnd || yearElected <= state.filters.yearEnd;
                return meetsStart && meetsEnd;
            });
        }

        state.filteredOfficials = filtered;
        notify('officialsChange', {
            allOfficials: state.allOfficials,
            filteredOfficials: state.filteredOfficials
        });
    }

    /**
     * Reset all filters to default values
     */
    function resetFilters() {
        const affiliations = DataLoader.getUniqueValues(state.allOfficials, 'politicalAffiliation');
        
        state.filters = {
            search: '',
            state: '',
            officeLevels: ['federal', 'state', 'county', 'city', 'town'],
            affiliations: affiliations,
            yearStart: null,
            yearEnd: null
        };
        
        applyFilters();
        notify('filterChange', state.filters);
    }

    /**
     * Set selected official
     * @param {Object|null} official - Official object or null to deselect
     */
    function setSelectedOfficial(official) {
        state.selectedOfficial = official;
        notify('stateChange', state);
    }

    /**
     * Get current state
     * @returns {Object} Current state object
     */
    function getState() {
        return { ...state };
    }

    /**
     * Get all officials
     * @returns {Array} All officials
     */
    function getAllOfficials() {
        return state.allOfficials;
    }

    /**
     * Get filtered officials
     * @returns {Array} Filtered officials
     */
    function getFilteredOfficials() {
        return state.filteredOfficials;
    }

    /**
     * Get current filters
     * @returns {Object} Current filters
     */
    function getFilters() {
        return { ...state.filters };
    }

    /**
     * Get selected official
     * @returns {Object|null} Selected official or null
     */
    function getSelectedOfficial() {
        return state.selectedOfficial;
    }

    /**
     * Check if data is loading
     * @returns {boolean} Loading state
     */
    function isLoading() {
        return state.isLoading;
    }

    // Public API
    return {
        subscribe,
        setOfficials,
        updateFilters,
        resetFilters,
        setSelectedOfficial,
        getState,
        getAllOfficials,
        getFilteredOfficials,
        getFilters,
        getSelectedOfficial,
        isLoading
    };
})();
