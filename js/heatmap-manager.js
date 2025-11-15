// Heatmap Manager Module
// Manages the heatmap layer for visualizing official density

const HeatmapManager = (function() {
    'use strict';

    let heatmapLayer = null;
    let map = null;

    // Heatmap configuration
    const HEATMAP_CONFIG = {
        radius: 30,
        blur: 18,
        maxZoom: 18,
        max: 1.0,
        gradient: {
            0.0: 'rgba(0, 0, 255, 0)',
            0.2: 'rgba(0, 0, 255, 0.5)',
            0.4: 'rgba(0, 255, 255, 0.6)',
            0.6: 'rgba(0, 255, 0, 0.7)',
            0.8: 'rgba(255, 255, 0, 0.8)',
            1.0: 'rgba(255, 0, 0, 0.9)'
        }
    };

    /**
     * Initialize heatmap manager with map instance
     * @param {L.Map} mapInstance - Leaflet map instance
     */
    function init(mapInstance) {
        map = mapInstance;
        console.log('Heatmap manager initialized');
    }

    /**
     * Convert officials array to heatmap data points
     * @param {Array} officials - Array of official objects
     * @returns {Array} Array of [latitude, longitude, intensity] points
     */
    function convertToHeatmapData(officials) {
        return officials
            .filter(official => official.location && official.location.latitude && official.location.longitude)
            .map(official => [
                official.location.latitude,
                official.location.longitude,
                1.0 // Each official has equal weight
            ]);
    }

    /**
     * Create heatmap layer from officials data
     * @param {Array} officials - Array of official objects
     */
    function createHeatmap(officials) {
        if (!map) {
            console.error('Map not initialized');
            return;
        }

        // Remove existing heatmap if present
        if (heatmapLayer) {
            map.removeLayer(heatmapLayer);
            heatmapLayer = null;
        }

        // Convert officials to heatmap data format
        const heatmapData = convertToHeatmapData(officials);

        // Create new heatmap layer
        if (heatmapData.length > 0) {
            heatmapLayer = L.heatLayer(heatmapData, HEATMAP_CONFIG);
            console.log(`Heatmap created with ${heatmapData.length} data points`);
        } else {
            console.log('No data points for heatmap');
        }
    }

    /**
     * Show the heatmap layer on the map
     */
    function showHeatmap() {
        if (heatmapLayer && map) {
            map.addLayer(heatmapLayer);
            console.log('Heatmap layer shown');
        }
    }

    /**
     * Hide the heatmap layer from the map
     */
    function hideHeatmap() {
        if (heatmapLayer && map) {
            map.removeLayer(heatmapLayer);
            console.log('Heatmap layer hidden');
        }
    }

    /**
     * Update heatmap with new officials data
     * @param {Array} officials - Array of official objects
     */
    function updateHeatmap(officials) {
        createHeatmap(officials);
        
        // If we're in heatmap view mode, show the updated heatmap
        if (StateManager.getViewMode() === 'heatmap') {
            showHeatmap();
        }
    }

    /**
     * Get current heatmap layer
     * @returns {L.HeatLayer|null} Heatmap layer instance
     */
    function getHeatmapLayer() {
        return heatmapLayer;
    }

    /**
     * Check if heatmap is currently visible
     * @returns {boolean} True if heatmap is on the map
     */
    function isVisible() {
        return heatmapLayer && map && map.hasLayer(heatmapLayer);
    }

    // Public API
    return {
        init,
        createHeatmap,
        showHeatmap,
        hideHeatmap,
        updateHeatmap,
        getHeatmapLayer,
        isVisible
    };
})();
