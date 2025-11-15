# Pin Clustering

<cite>
**Referenced Files in This Document**   
- [map-manager.js](file://js/map-manager.js)
- [styles.css](file://css/styles.css)
</cite>

## Table of Contents
1. [Pin Clustering](#pin-clustering)
2. [Cluster Configuration](#cluster-configuration)
3. [Custom Icon Creation](#custom-icon-creation)
4. [Integration with Map Instance](#integration-with-map-instance)
5. [Performance Considerations](#performance-considerations)
6. [Troubleshooting Guide](#troubleshooting-guide)

## Cluster Configuration

The pin clustering implementation in the MapManager module utilizes the Leaflet.markercluster plugin to efficiently manage the display of multiple officials on the map. The clustering functionality is initialized during map setup through the `L.markerClusterGroup` configuration object.

The clustering behavior is controlled by three key settings: `maxClusterRadius`, `spiderfyOnMaxZoom`, and `zoomToBoundsOnClick`. The `maxClusterRadius` is set to 60 pixels, determining the maximum distance between markers that can be grouped into a single cluster. This value balances between creating meaningful clusters and maintaining spatial accuracy. When users zoom to the maximum zoom level, `spiderfyOnMaxZoom` is enabled (set to true), which automatically spreads out clustered markers in a spider-like pattern when clicked, allowing users to access individual markers that are geographically close. The `zoomToBoundsOnClick` setting is enabled, allowing users to click on a cluster to automatically zoom the map to a level where the individual markers within the cluster become visible and separated.

**Section sources**
- [map-manager.js](file://js/map-manager.js#L49-L82)

## Custom Icon Creation

The cluster visualization is enhanced through a custom `iconCreateFunction` that dynamically generates cluster icons based on the number of contained markers. This function receives a cluster object and determines the appropriate size classification (small, medium, or large) by examining the count of child markers returned by `cluster.getChildCount()`.

The sizing logic follows a tiered approach: clusters with 5 or fewer markers are classified as 'small', clusters with 6-10 markers are 'medium', and clusters with more than 10 markers are 'large'. This dynamic sizing provides visual feedback about cluster density at a glance. The function returns a `L.divIcon` configuration with HTML content containing a div with the class 'cluster-count' that displays the marker count. The CSS classes 'custom-cluster-icon' and 'cluster-size' (where size is small, medium, or large) are applied to style the cluster appropriately.

**Section sources**
- [map-manager.js](file://js/map-manager.js#L55-L70)

## Integration with Map Instance

The clustering functionality is tightly integrated with the main map instance through the `markerClusterGroup` object. During map initialization, the marker cluster group is created and immediately added to the map using `map.addLayer(markerClusterGroup)`. Individual markers are added to the cluster group rather than directly to the map by calling `markerClusterGroup.addLayer(marker)` for each official's marker.

The integration extends to the application's state management system, where the MapManager subscribes to view mode changes. When switching between markers and heatmap views, the marker cluster layer is properly managed by the `hideMarkers()` and `showMarkers()` methods, which check the layer's presence before removing or adding it to the map. This ensures that the clustering functionality works seamlessly with the application's other visualization modes.

**Section sources**
- [map-manager.js](file://js/map-manager.js#L73-L74)
- [map-manager.js](file://js/map-manager.js#L131-L134)
- [map-manager.js](file://js/map-manager.js#L199-L211)

## Performance Considerations

The clustering implementation significantly improves map performance when rendering large datasets of officials. Without clustering, rendering hundreds of individual markers would result in severe performance degradation, particularly on mobile devices or lower-powered systems. The clustering reduces the number of DOM elements on the map at higher zoom levels, dramatically improving rendering efficiency and user experience.

The current configuration with a `maxClusterRadius` of 60 pixels effectively balances visual clarity with performance optimization. For datasets with hundreds of officials, this clustering approach ensures smooth panning and zooming operations. The implementation also includes proper cleanup methods like `clearMarkers()` which calls `markerClusterGroup.clearLayers()`, preventing memory leaks when updating marker sets. The use of `L.divIcon` for both individual markers and clusters is more lightweight than image-based icons, further enhancing performance.

**Section sources**
- [map-manager.js](file://js/map-manager.js#L51-L54)
- [map-manager.js](file://js/map-manager.js#L163-L164)

## Troubleshooting Guide

Common issues with cluster rendering typically relate to visibility at different zoom levels and proper integration with the map lifecycle. If clusters are not appearing, verify that the `markerClusterGroup` has been properly added to the map with `map.addLayer()`. When switching between view modes, ensure that the cluster layer is correctly managed by the `hideMarkers()` and `showMarkers()` methods, which check for the layer's presence before adding or removing it.

For issues with cluster click behavior, confirm that both `zoomToBoundsOnClick` and `spiderfyOnMaxZoom` are properly configured. If clusters are not responding to clicks, check that no other map interactions or UI elements are intercepting click events. Performance issues with large datasets can often be addressed by adjusting the `maxClusterRadius` value or ensuring that markers are properly removed from the cluster group when updating the dataset. The `clearMarkers()` method should always be called before adding a new set of markers to prevent duplication and memory issues.

**Section sources**
- [map-manager.js](file://js/map-manager.js#L52-L54)
- [map-manager.js](file://js/map-manager.js#L199-L211)
- [map-manager.js](file://js/map-manager.js#L163-L164)