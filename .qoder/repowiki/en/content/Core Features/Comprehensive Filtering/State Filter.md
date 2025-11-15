# State Filter

<cite>
**Referenced Files in This Document**   
- [data-loader.js](file://js/data-loader.js)
- [state-manager.js](file://js/state-manager.js)
- [filter-controller.js](file://js/filter-controller.js)
- [app.js](file://js/app.js)
</cite>

## Table of Contents
1. [State Filter](#state-filter)
2. [Implementation Details](#implementation-details)
3. [Invocation Relationship](#invocation-relationship)
4. [Domain Model](#domain-model)
5. [Usage Patterns](#usage-patterns)
6. [Configuration Options and Parameters](#configuration-options-and-parameters)
7. [Integration with Filtering System](#integration-with-filtering-system)
8. [Common Issues and Solutions](#common-issues-and-solutions)

## Implementation Details

The state filter functionality is implemented through a coordinated interaction between three core modules: `DataLoader`, `StateManager`, and `FilterController`. The state dropdown population begins in the `FilterController` module, which accesses the `VALID_STATE_CODES` array from the `DataLoader` module. This array contains all valid two-letter U.S. state codes that are used to validate official records during data loading.

The `populateStateDropdown()` function in `FilterController` retrieves the `VALID_STATE_CODES` from `DataLoader` and maps each state code to its full name using a local `stateNames` object. For each state code, an HTML option element is created with the state code as the value and the full state name as the display text. These options are then appended to the state select element in the DOM, creating a dropdown menu that allows users to filter officials by state.

When a user selects a state from the dropdown, the change event triggers the `StateManager.updateFilters()` method with the selected state value. This method updates the application's filter state and applies the new filters to the officials data. The filtering process occurs in the `applyFilters()` method of `StateManager`, which checks if a state filter is active and then filters the officials array to include only those whose location state matches the selected state.

**Section sources**
- [filter-controller.js](file://js/filter-controller.js#L113-L137)
- [state-manager.js](file://js/state-manager.js#L75-L82)
- [data-loader.js](file://js/data-loader.js#L9-L15)

## Invocation Relationship

The invocation relationship for the state filter follows a clear chain of responsibility from UI interaction to data filtering. The process begins when the application initializes in `app.js`, where `FilterController.init()` is called, which in turn calls `populateStateDropdown()` to populate the state dropdown with all valid state options.

The event flow proceeds as follows: when a user changes the state selection in the dropdown, the DOM change event listener in `FilterController` captures this interaction and calls `StateManager.updateFilters({ state: value })`. This method call is the central coordination point that updates the application state and triggers the filtering process.

The `updateFilters` method in `StateManager` performs two critical operations: it updates the internal filters object with the new state value, and then calls `applyFilters()` to recompute the filtered officials list. After filtering is complete, `StateManager` notifies all subscribed components of the state change through its event notification system, allowing the map and other UI components to update accordingly.

This invocation chain ensures a unidirectional data flow from user interaction to state update to UI re-rendering, maintaining a clean separation of concerns between the UI controller, state management, and data processing components.

**Section sources**
- [filter-controller.js](file://js/filter-controller.js#L50-L53)
- [state-manager.js](file://js/state-manager.js#L75-L82)
- [app.js](file://js/app.js#L22)

## Domain Model

The domain model for the state filter centers around the state filtering functionality within the application's data architecture. The primary domain entities involved are the state codes, officials data, and filter state. The `VALID_STATE_CODES` in `DataLoader` serves as the authoritative source of truth for valid U.S. state codes, ensuring data consistency across the application.

The filter state is maintained within the `StateManager` module as part of its application state object. The state property within the filters object stores the currently selected state code (or empty string for "All States"). This state is used to filter the collection of officials, each of which has a location object containing a state property that corresponds to one of the valid state codes.

The relationship between these domain elements follows a hierarchical pattern: the `VALID_STATE_CODES` defines the valid values, the filter state selects one of these values, and the officials collection is filtered based on matching the selected state value. This model ensures that only valid state codes can be used for filtering and that the filtering operation is performed consistently across the application.

The domain model also incorporates validation at multiple levels: `DataLoader` validates that all officials have valid state codes during data loading, while the filtering process in `StateManager` ensures that only officials with matching state codes are included in the filtered results.

**Section sources**
- [data-loader.js](file://js/data-loader.js#L9-L15)
- [state-manager.js](file://js/state-manager.js#L13-L14)
- [state-manager.js](file://js/state-manager.js#L104-L107)

## Usage Patterns

The state filter is designed to be used in a specific pattern that follows the application's initialization and interaction flow. During application startup, the `app.js` file initializes the `FilterController` and immediately calls `populateStateDropdown()` to ensure the state dropdown is populated before user interaction.

Users interact with the state filter by selecting a state from the dropdown menu, which triggers the filtering process. The filter maintains its state across different views and interactions, meaning that if a user selects a state, navigates to view an official's details, and returns to the map, the state filter retains the previously selected state.

The state filter can be programmatically reset to its default state (showing all states) by calling `StateManager.resetFilters()`, which is typically triggered by the "Clear Filters" button in the UI. This resets the state filter property to an empty string, which the filtering logic interprets as "show all states."

Developers can also access the current state filter value by calling `StateManager.getFilters().state`, which returns the currently selected state code or an empty string if no specific state is selected. This allows other components to react to the current filtering state without directly manipulating the filter.

**Section sources**
- [app.js](file://js/app.js#L22)
- [state-manager.js](file://js/state-manager.js#L197-L199)
- [filter-controller.js](file://js/filter-controller.js#L77-L79)

## Configuration Options and Parameters

The state filter functionality has several configuration options and parameters that control its behavior. The primary configuration is the `VALID_STATE_CODES` array in the `DataLoader` module, which defines the complete list of valid U.S. state codes that can be used for filtering. This array is hardcoded in the module and serves as the source of truth for state validation throughout the application.

The state filter accepts a single parameter when updating the filter state: the state code as a two-letter string (e.g., "CA" for California). This parameter is passed to the `updateFilters` method of `StateManager` as part of an object with the property `state`. An empty string value represents the "All States" selection, which effectively disables the state filter.

The return value of the state filtering operation is implicit in the application state. After calling `updateFilters`, the filtered officials list is automatically updated, and interested components can retrieve this list by calling `StateManager.getFilteredOfficials()`. The current state filter value can be retrieved by calling `StateManager.getFilters().state`.

No additional configuration options are exposed for the state filter, as its behavior is intentionally kept simple and focused on the core functionality of filtering officials by state.

**Section sources**
- [data-loader.js](file://js/data-loader.js#L9-L15)
- [state-manager.js](file://js/state-manager.js#L75-L79)
- [state-manager.js](file://js/state-manager.js#L197-L199)

## Integration with Filtering System

The state filter is tightly integrated with the overall filtering system through the `StateManager` module, which serves as the central hub for all filter operations. The state filter is one of several filter dimensions (including search, office level, political affiliation, and year elected) that work together to refine the displayed officials.

When the state filter is updated, it triggers the same filtering pipeline as other filters, ensuring consistent behavior across all filter types. The `applyFilters` method in `StateManager` applies all active filters in sequence, with the state filter being applied after the search filter but before office level and affiliation filters.

The integration is facilitated through the event notification system in `StateManager`, which broadcasts filter changes to all interested components. When the state filter is updated, `StateManager` notifies subscribers of the `filterChange` event with the updated filters object, allowing other components to react to the change.

The filtering system also handles the interaction between the state filter and other filters. For example, if a user searches for officials in a specific state, both the search and state filters are applied simultaneously, with officials needing to match both criteria to appear in the results.

**Section sources**
- [state-manager.js](file://js/state-manager.js#L75-L82)
- [state-manager.js](file://js/state-manager.js#L84-L139)
- [filter-controller.js](file://js/filter-controller.js#L97-L99)

## Common Issues and Solutions

Several common issues can occur with the state filter functionality, along with their corresponding solutions. One potential issue is the state dropdown failing to populate, which typically occurs if the `populateStateDropdown()` function is not called during initialization. This can be resolved by ensuring that `FilterController.init()` is called in the application startup sequence in `app.js`.

Another issue is filter updates not reflecting on the map, which usually indicates a problem with the event notification system. This can occur if components fail to subscribe to the `officialsChange` event from `StateManager`. The solution is to verify that the map component has properly subscribed to state changes and updates its display when notified.

A third issue involves state filter values not persisting across page interactions. This can happen if the filter state is being reset unintentionally. The solution is to check that `StateManager.resetFilters()` is only called when explicitly requested by the user through the "Clear Filters" button.

Finally, if officials from the wrong state appear in the results, this may indicate a data validation issue. The solution is to verify that the officials data has been properly validated by `DataLoader` and that all state codes in the data match the `VALID_STATE_CODES` array. This validation occurs automatically during data loading, but corrupted data could potentially bypass it.

**Section sources**
- [app.js](file://js/app.js#L22)
- [filter-controller.js](file://js/filter-controller.js#L97-L99)
- [state-manager.js](file://js/state-manager.js#L134-L138)
- [data-loader.js](file://js/data-loader.js#L44-L47)