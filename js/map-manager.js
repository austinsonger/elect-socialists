// Map Manager Module
// Handles map initialization, pin rendering, and clustering

const MapManager = (function() {
    'use strict';

    let map = null;
    let markerClusterGroup = null;
    const markers = new Map(); // officialId -> marker

    // Zoom levels for different office types
    const ZOOM_LEVELS = {
        federal: 7,
        state: 7,
        county: 9,
        city: 11,
        town: 12
    };

    // Pin colors by office level
    const OFFICE_COLORS = {
        federal: '#e63946',
        state: '#f77f00',
        county: '#06a77d',
        city: '#457b9d',
        town: '#9b59b6'
    };

    /**
     * Initialize the Leaflet map
     * @param {string} containerId - ID of the map container element
     */
    function initMap(containerId = 'map') {
        // Create map centered on continental US
        map = L.map(containerId, {
            center: [39.8283, -98.5795], // Geographic center of continental US
            zoom: 4,
            minZoom: 3,
            maxZoom: 18,
            zoomControl: true
        });

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);

        // Initialize marker cluster group
        markerClusterGroup = L.markerClusterGroup({
            maxClusterRadius: 60,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            iconCreateFunction: function(cluster) {
                const count = cluster.getChildCount();
                let size = 'small';
                
                if (count > 10) {
                    size = 'large';
                } else if (count > 5) {
                    size = 'medium';
                }
                
                return L.divIcon({
                    html: '<div class="cluster-count">' + count + '</div>',
                    className: 'custom-cluster-icon cluster-' + size,
                    iconSize: L.point(40, 40)
                });
            }
        });

        map.addLayer(markerClusterGroup);

        console.log('Map initialized');
    }

    /**
     * Create a custom marker icon for an official
     * @param {Object} official - Official object
     * @returns {L.DivIcon} Leaflet div icon
     */
    function createMarkerIcon(official) {
        const color = OFFICE_COLORS[official.officeLevel] || '#457b9d';
        const firstInitial = official.name.charAt(0).toUpperCase();
        
        return L.divIcon({
            html: `<div class="custom-marker marker-${official.officeLevel}" 
                        style="border-color: ${color}; background-color: ${color};">
                        ${firstInitial}
                   </div>`,
            className: '',
            iconSize: L.point(30, 30),
            iconAnchor: L.point(15, 15)
        });
    }

    /**
     * Add markers for officials to the map
     * @param {Array} officials - Array of official objects
     */
    function addMarkers(officials) {
        // Clear existing markers
        clearMarkers();

        officials.forEach(official => {
            const { latitude, longitude } = official.location;
            
            if (latitude && longitude) {
                const marker = L.marker([latitude, longitude], {
                    icon: createMarkerIcon(official),
                    title: official.name,
                    alt: `${official.name}, ${official.position}`
                });

                // Store official data with marker
                marker.officialData = official;

                // Add click handler
                marker.on('click', function() {
                    handleMarkerClick(official);
                });

                // Add to cluster group
                markerClusterGroup.addLayer(marker);
                
                // Store marker reference
                markers.set(official.id, marker);
            }
        });

        console.log(`Added ${officials.length} markers to map`);
    }

    /**
     * Handle marker click event
     * @param {Object} official - Official object
     */
    function handleMarkerClick(official) {
        // Update state
        StateManager.setSelectedOfficial(official);

        // Zoom to location
        const zoomLevel = ZOOM_LEVELS[official.officeLevel] || 10;
        map.flyTo([official.location.latitude, official.location.longitude], zoomLevel, {
            duration: 0.8
        });

        // Show popup
        PopupComponent.showPopup(official, [official.location.latitude, official.location.longitude]);
    }

    /**
     * Clear all markers from the map
     */
    function clearMarkers() {
        markerClusterGroup.clearLayers();
        markers.clear();
    }

    /**
     * Update visible markers based on filtered officials
     * @param {Array} filteredOfficials - Array of filtered official objects
     */
    function updateMarkers(filteredOfficials) {
        addMarkers(filteredOfficials);
    }

    /**
     * Reset map view to initial position
     */
    function resetView() {
        if (map) {
            map.setView([39.8283, -98.5795], 4);
        }
    }

    /**
     * Get the map instance
     * @returns {L.Map} Leaflet map instance
     */
    function getMap() {
        return map;
    }

    /**
     * Fit map bounds to show all markers
     */
    function fitBounds() {
        if (markerClusterGroup && markerClusterGroup.getLayers().length > 0) {
            const bounds = markerClusterGroup.getBounds();
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }

    /**
     * Get marker for a specific official
     * @param {string} officialId - Official ID
     * @returns {L.Marker|undefined} Marker object
     */
    function getMarker(officialId) {
        return markers.get(officialId);
    }

    // Public API
    return {
        initMap,
        addMarkers,
        updateMarkers,
        clearMarkers,
        resetView,
        getMap,
        fitBounds,
        getMarker,
        handleMarkerClick
    };
})();
// Map Manager Module
// Handles map initialization, pin rendering, and clustering

const MapManager = (function() {
    'use strict';

    let map = null;
    let markerClusterGroup = null;
    const markers = new Map(); // officialId -> marker

    // Zoom levels for different office types
    const ZOOM_LEVELS = {
        federal: 7,
        state: 7,
        county: 9,
        city: 11,
        town: 12
    };

    // Pin colors by office level
    const OFFICE_COLORS = {
        federal: '#e63946',
        state: '#f77f00',
        county: '#06a77d',
        city: '#457b9d',
        town: '#9b59b6'
    };

    /**
     * Initialize the Leaflet map
     * @param {string} containerId - ID of the map container element
     */
    function initMap(containerId = 'map') {
        // Create map centered on continental US
        map = L.map(containerId, {
            center: [39.8283, -98.5795], // Geographic center of continental US
            zoom: 4,
            minZoom: 3,
            maxZoom: 18,
            zoomControl: true
        });

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);

        // Initialize marker cluster group
        markerClusterGroup = L.markerClusterGroup({
            maxClusterRadius: 60,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            iconCreateFunction: function(cluster) {
                const count = cluster.getChildCount();
                let size = 'small';
                
                if (count > 10) {
                    size = 'large';
                } else if (count > 5) {
                    size = 'medium';
                }
                
                return L.divIcon({
                    html: '<div class="cluster-count">' + count + '</div>',
                    className: 'custom-cluster-icon cluster-' + size,
                    iconSize: L.point(40, 40)
                });
            }
        });

        map.addLayer(markerClusterGroup);

        console.log('Map initialized');
    }

    /**
     * Create a custom marker icon for an official
     * @param {Object} official - Official object
     * @returns {L.DivIcon} Leaflet div icon
     */
    function createMarkerIcon(official) {
        const color = OFFICE_COLORS[official.officeLevel] || '#457b9d';
        const firstInitial = official.name.charAt(0).toUpperCase();
        
        return L.divIcon({
            html: `<div class="custom-marker marker-${official.officeLevel}" 
                        style="border-color: ${color}; background-color: ${color};">
                        ${firstInitial}
                   </div>`,
            className: '',
            iconSize: L.point(30, 30),
            iconAnchor: L.point(15, 15)
        });
    }

    /**
     * Add markers for officials to the map
     * @param {Array} officials - Array of official objects
     */
    function addMarkers(officials) {
        // Clear existing markers
        clearMarkers();

        officials.forEach(official => {
            const { latitude, longitude } = official.location;
            
            if (latitude && longitude) {
                const marker = L.marker([latitude, longitude], {
                    icon: createMarkerIcon(official),
                    title: official.name,
                    alt: `${official.name}, ${official.position}`
                });

                // Store official data with marker
                marker.officialData = official;

                // Add click handler
                marker.on('click', function() {
                    handleMarkerClick(official);
                });

                // Add to cluster group
                markerClusterGroup.addLayer(marker);
                
                // Store marker reference
                markers.set(official.id, marker);
            }
        });

        console.log(`Added ${officials.length} markers to map`);
    }

    /**
     * Handle marker click event
     * @param {Object} official - Official object
     */
    function handleMarkerClick(official) {
        // Update state
        StateManager.setSelectedOfficial(official);

        // Zoom to location
        const zoomLevel = ZOOM_LEVELS[official.officeLevel] || 10;
        map.flyTo([official.location.latitude, official.location.longitude], zoomLevel, {
            duration: 0.8
        });

        // Show popup
        PopupComponent.showPopup(official, [official.location.latitude, official.location.longitude]);
    }

    /**
     * Clear all markers from the map
     */
    function clearMarkers() {
        markerClusterGroup.clearLayers();
        markers.clear();
    }

    /**
     * Update visible markers based on filtered officials
     * @param {Array} filteredOfficials - Array of filtered official objects
     */
    function updateMarkers(filteredOfficials) {
        addMarkers(filteredOfficials);
    }

    /**
     * Reset map view to initial position
     */
    function resetView() {
        if (map) {
            map.setView([39.8283, -98.5795], 4);
        }
    }

    /**
     * Get the map instance
     * @returns {L.Map} Leaflet map instance
     */
    function getMap() {
        return map;
    }

    /**
     * Fit map bounds to show all markers
     */
    function fitBounds() {
        if (markerClusterGroup && markerClusterGroup.getLayers().length > 0) {
            const bounds = markerClusterGroup.getBounds();
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }

    /**
     * Get marker for a specific official
     * @param {string} officialId - Official ID
     * @returns {L.Marker|undefined} Marker object
     */
    function getMarker(officialId) {
        return markers.get(officialId);
    }

    // Public API
    return {
        initMap,
        addMarkers,
        updateMarkers,
        clearMarkers,
        resetView,
        getMap,
        fitBounds,
        getMarker,
        handleMarkerClick
    };
})();
