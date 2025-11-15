// Filter Controller Module
// Manages filter UI and interactions

const FilterController = (function() {
    'use strict';

    // DOM elements
    let elements = {};

    /**
     * Initialize filter controller
     */
    function init() {
        // Cache DOM elements
        elements = {
            searchInput: document.getElementById('search-input'),
            stateSelect: document.getElementById('state-select'),
            officeLevelCheckboxes: document.querySelectorAll('input[name="office-level"]'),
            affiliationCheckboxes: document.getElementById('affiliation-checkboxes'),
            yearStart: document.getElementById('year-start'),
            yearEnd: document.getElementById('year-end'),
            clearFiltersBtn: document.getElementById('clear-filters'),
            resultsText: document.getElementById('results-text'),
            toggleFiltersBtn: document.getElementById('toggle-filters'),
            filterPanel: document.getElementById('filter-panel'),
            noResults: document.getElementById('no-results'),
            markersViewBtn: document.getElementById('markers-view-btn'),
            heatmapViewBtn: document.getElementById('heatmap-view-btn')
        };

        // Setup event listeners
        setupEventListeners();

        console.log('Filter controller initialized');
    }

    /**
     * Setup all event listeners
     */
    function setupEventListeners() {
        // Search input with debounce
        let searchTimeout;
        elements.searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                StateManager.updateFilters({ search: e.target.value });
            }, 300);
        });

        // State select
        elements.stateSelect.addEventListener('change', function(e) {
            StateManager.updateFilters({ state: e.target.value });
        });

        // Office level checkboxes
        elements.officeLevelCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const selectedLevels = Array.from(elements.officeLevelCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                StateManager.updateFilters({ officeLevels: selectedLevels });
            });
        });

        // Year inputs
        elements.yearStart.addEventListener('change', function(e) {
            const year = e.target.value ? parseInt(e.target.value) : null;
            StateManager.updateFilters({ yearStart: year });
        });

        elements.yearEnd.addEventListener('change', function(e) {
            const year = e.target.value ? parseInt(e.target.value) : null;
            StateManager.updateFilters({ yearEnd: year });
        });

        // Clear filters button
        elements.clearFiltersBtn.addEventListener('click', function() {
            resetFilterUI();
            StateManager.resetFilters();
            MapManager.resetView();
        });

        // Toggle filters button
        elements.toggleFiltersBtn.addEventListener('click', function() {
            toggleFilterPanel();
        });

        // Mobile: tap on filter header to toggle - with dynamic resize handling
        const filterHeader = document.querySelector('.filter-header');
        let filterHeaderClickHandler = null;
        
        function updateFilterHeaderBehavior() {
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile && !filterHeaderClickHandler) {
                // Add click handler for mobile
                filterHeaderClickHandler = function() {
                    toggleFilterPanel();
                };
                filterHeader.addEventListener('click', filterHeaderClickHandler);
            } else if (!isMobile && filterHeaderClickHandler) {
                // Remove click handler for desktop
                filterHeader.removeEventListener('click', filterHeaderClickHandler);
                filterHeaderClickHandler = null;
                // Ensure panel is not in expanded state on desktop
                elements.filterPanel.classList.remove('expanded');
            }
        }
        
        // Initial setup
        updateFilterHeaderBehavior();
        
        // Update on window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateFilterHeaderBehavior();
            }, 250);
        });

        // Subscribe to state changes
        StateManager.subscribe('officialsChange', handleOfficialsChange);
        StateManager.subscribe('filterChange', handleFilterChange);
        StateManager.subscribe('viewModeChange', handleViewModeChange);

        // View mode toggle buttons
        elements.markersViewBtn.addEventListener('click', function() {
            StateManager.setViewMode('markers');
        });

        elements.heatmapViewBtn.addEventListener('click', function() {
            StateManager.setViewMode('heatmap');
        });
    }

    /**
     * Populate state dropdown
     */
    function populateStateDropdown() {
        const states = DataLoader.VALID_STATE_CODES;
        const stateNames = {
            'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
            'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
            'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
            'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
            'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
            'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
            'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
            'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
            'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
            'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
            'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
            'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
            'WI': 'Wisconsin', 'WY': 'Wyoming'
        };

        states.forEach(stateCode => {
            const option = document.createElement('option');
            option.value = stateCode;
            option.textContent = stateNames[stateCode] || stateCode;
            elements.stateSelect.appendChild(option);
        });
    }

    /**
     * Populate affiliation checkboxes
     * @param {Array} affiliations - Array of unique affiliation strings
     */
    function populateAffiliationCheckboxes(affiliations) {
        elements.affiliationCheckboxes.innerHTML = '';

        affiliations.forEach(affiliation => {
            const label = document.createElement('label');
            label.className = 'checkbox-label';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'affiliation';
            checkbox.value = affiliation;
            checkbox.checked = true;
            checkbox.setAttribute('aria-label', affiliation);

            checkbox.addEventListener('change', function() {
                const selectedAffiliations = Array.from(
                    elements.affiliationCheckboxes.querySelectorAll('input[type="checkbox"]:checked')
                ).map(cb => cb.value);
                StateManager.updateFilters({ affiliations: selectedAffiliations });
            });

            const span = document.createElement('span');
            span.textContent = affiliation;

            label.appendChild(checkbox);
            label.appendChild(span);
            elements.affiliationCheckboxes.appendChild(label);
        });
    }

    /**
     * Handle officials change event
     * @param {Object} data - Officials data
     */
    function handleOfficialsChange(data) {
        const { filteredOfficials, allOfficials } = data;

        // Update results count
        updateResultsCount(filteredOfficials.length, allOfficials.length);

        // Update visualization based on current view mode
        const viewMode = StateManager.getViewMode();
        if (viewMode === 'heatmap') {
            HeatmapManager.updateHeatmap(filteredOfficials);
        } else {
            MapManager.updateMarkers(filteredOfficials);
        }

        // Show/hide no results message
        if (filteredOfficials.length === 0) {
            elements.noResults.style.display = 'block';
        } else {
            elements.noResults.style.display = 'none';
        }

        // Populate affiliations on first load
        if (allOfficials.length > 0 && elements.affiliationCheckboxes.children.length === 0) {
            const affiliations = DataLoader.getUniqueValues(allOfficials, 'politicalAffiliation');
            populateAffiliationCheckboxes(affiliations);
        }
    }

    /**
     * Handle filter change event
     * @param {Object} filters - Current filters
     */
    function handleFilterChange(filters) {
        // Update UI to reflect current filters
        console.log('Filters updated:', filters);
    }

    /**
     * Handle view mode change event
     * @param {string} viewMode - New view mode
     */
    function handleViewModeChange(viewMode) {
        // Update toggle button states
        if (viewMode === 'heatmap') {
            elements.markersViewBtn.classList.remove('active');
            elements.markersViewBtn.setAttribute('aria-checked', 'false');
            elements.heatmapViewBtn.classList.add('active');
            elements.heatmapViewBtn.setAttribute('aria-checked', 'true');
        } else {
            elements.heatmapViewBtn.classList.remove('active');
            elements.heatmapViewBtn.setAttribute('aria-checked', 'false');
            elements.markersViewBtn.classList.add('active');
            elements.markersViewBtn.setAttribute('aria-checked', 'true');
        }
        console.log('View mode UI updated:', viewMode);
    }

    /**
     * Update results count display
     * @param {number} filteredCount - Number of filtered officials
     * @param {number} totalCount - Total number of officials
     */
    function updateResultsCount(filteredCount, totalCount) {
        if (totalCount === 0) {
            elements.resultsText.textContent = 'No officials loaded';
        } else if (filteredCount === totalCount) {
            elements.resultsText.textContent = `Showing all ${totalCount} officials`;
        } else {
            elements.resultsText.textContent = `Showing ${filteredCount} of ${totalCount} officials`;
        }
    }

    /**
     * Reset filter UI to default state
     */
    function resetFilterUI() {
        // Clear search
        elements.searchInput.value = '';

        // Reset state select
        elements.stateSelect.value = '';

        // Check all office level checkboxes
        elements.officeLevelCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        });

        // Check all affiliation checkboxes
        const affiliationCheckboxes = elements.affiliationCheckboxes.querySelectorAll('input[type="checkbox"]');
        affiliationCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        });

        // Clear year inputs
        elements.yearStart.value = '';
        elements.yearEnd.value = '';
    }

    /**
     * Toggle filter panel visibility (for mobile)
     */
    function toggleFilterPanel() {
        const isExpanded = elements.filterPanel.classList.toggle('expanded');
        elements.toggleFiltersBtn.setAttribute('aria-expanded', isExpanded);
    }

    /**
     * Show loading state
     */
    function showLoading() {
        elements.resultsText.textContent = 'Loading officials...';
    }

    /**
     * Hide loading state
     */
    function hideLoading() {
        // Results count will be updated by handleOfficialsChange
    }

    // Public API
    return {
        init,
        populateStateDropdown,
        populateAffiliationCheckboxes,
        showLoading,
        hideLoading,
        resetFilterUI
    };
})();
