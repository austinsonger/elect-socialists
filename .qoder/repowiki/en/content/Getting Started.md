# Getting Started

<cite>
**Referenced Files in This Document**   
- [README.md](file://README.md)
- [package.json](file://package.json)
- [app.js](file://js/app.js)
- [data-loader.js](file://js/data-loader.js)
- [index.html](file://index.html)
- [data/officials.json](file://data/officials.json)
</cite>

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation and Setup](#installation-and-setup)
3. [Running the Application](#running-the-application)
4. [Configuration Options](#configuration-options)
5. [Common Setup Scenarios](#common-setup-scenarios)
6. [Troubleshooting](#troubleshooting)
7. [Performance Considerations](#performance-considerations)

## Prerequisites

Before setting up the application, ensure your development environment meets the following requirements:

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Python 3 installed on your system for running the local development server
- Node.js and npm (optional, for using the npm start script)

The application is designed to run as a static web application, requiring no complex backend infrastructure. All data is loaded client-side from a JSON file, making it lightweight and easy to deploy.

**Section sources**
- [README.md](file://README.md#L26-L30)

## Installation and Setup

To set up the application locally, follow these steps:

1. Clone or download the repository to your local machine
2. Navigate to the project directory using your terminal or command prompt
3. Verify that all required files are present in the directory structure

The project structure consists of:
- `index.html`: Main HTML file that loads all components
- `css/styles.css`: Application styling
- `js/` directory containing all JavaScript modules
- `data/officials.json`: Data file containing official information
- `package.json`: Project metadata and scripts

No additional installation steps are required for dependencies, as the application uses CDN-hosted libraries (Leaflet.js and Leaflet.markercluster) referenced directly in the HTML file.

**Section sources**
- [README.md](file://README.md#L53-L70)
- [index.html](file://index.html#L10-L17)

## Running the Application

You can run the application locally using either of the following methods:

### Method 1: Using npm start (Recommended)

If you have Node.js installed, you can use the predefined npm script:

```bash
npm start
```

This command executes the start script defined in package.json, which runs the Python HTTP server on port 8000.

### Method 2: Manual Python Server

If you prefer to run the server manually or don't have npm available:

```bash
python3 -m http.server 8000
```

After starting the server, open your web browser and navigate to:

```
http://localhost:8000
```

The application will load the interactive map displaying Democratic Socialist and Socialist officials across the United States.

**Section sources**
- [README.md](file://README.md#L31-L51)
- [package.json](file://package.json#L7-L8)

## Configuration Options

The application provides several configuration options that can be modified to customize behavior:

### Data Configuration

The primary data source is `data/officials.json`. Each official record must include the required fields:
- `id`: Unique identifier
- `name`: Full name
- `position`: Official title
- `officeLevel`: One of "federal", "state", "county", "city", or "town"
- `politicalAffiliation`: Party or organization name
- `location`: Object containing state, latitude, and longitude
- `contact`: Object (can be empty but must exist)
- `bio`: Biography or description
- `termStart`: ISO 8601 date format
- `yearElected`: Year first elected to current position

Optional fields include photo URL, term end date, additional location details, contact information, committee memberships, and voting record.

### Application Configuration

The `package.json` file contains the start script configuration, which can be modified to use a different port if needed:

```json
"scripts": {
  "start": "python3 -m http.server 8000"
}
```

To use a different port, change the port number in this script.

**Section sources**
- [README.md](file://README.md#L72-L95)
- [data/officials.json](file://data/officials.json#L1-L493)
- [package.json](file://package.json#L7-L8)

## Common Setup Scenarios

### Scenario 1: Development Environment Setup

For developers contributing to the project:

1. Fork and clone the repository
2. Install Python 3 if not already installed
3. Run `npm start` to launch the development server
4. Make changes to `data/officials.json` to add or update officials
5. Test changes in the browser

### Scenario 2: Quick Preview

For users who want to quickly view the application:

1. Download the repository as a ZIP file
2. Extract the contents to a local directory
3. Open a terminal in the extracted directory
4. Run `python3 -m http.server 8000`
5. Visit `http://localhost:8000` in your browser

### Scenario 3: Custom Data Integration

To use the application with custom data:

1. Modify `data/officials.json` with your data, ensuring all required fields are present
2. Validate the JSON structure using a JSON validator
3. Start the server and verify the data displays correctly
4. Adjust the filtering and display as needed

**Section sources**
- [README.md](file://README.md#L72-L95)
- [data/officials.json](file://data/officials.json#L1-L493)

## Troubleshooting

### Common Issues and Solutions

**Issue: Page won't load or shows blank screen**
- Solution: Ensure you're running a local server (using `npm start` or `python3 -m http.server`). Do not open index.html directly in the browser, as this will cause CORS issues with the JSON data loading.

**Issue: Officials data not loading**
- Solution: Check the browser console for errors. Verify that `data/officials.json` is in the correct location and contains valid JSON. Ensure the server is properly serving the file.

**Issue: Map tiles not displaying**
- Solution: Check your internet connection, as map tiles are loaded from OpenStreetMap via CDN. If you're in a region with restricted access to these services, you may need to configure an alternative tile provider.

**Issue: Filter controls not working**
- Solution: Verify that all JavaScript files are loading correctly by checking the network tab in browser developer tools. Ensure there are no JavaScript errors in the console.

**Issue: Python server command not found**
- Solution: Ensure Python 3 is installed and accessible from your command line. You may need to use `python` instead of `python3` depending on your system configuration.

### Debugging Tips

- Open browser developer tools (F12) to check the console for error messages
- Verify network requests are successful in the Network tab
- Use the application's built-in error handling, which displays user-friendly error messages with a reload option
- Check that all file paths in index.html match the actual file structure

**Section sources**
- [README.md](file://README.md#L148-L153)
- [app.js](file://js/app.js#L48-L52)
- [data-loader.js](file://js/data-loader.js#L145-L148)

## Performance Considerations

### Local Development Performance

The application is optimized for performance with the following characteristics:

- Data loads once on page load, enabling instant filtering without additional requests
- Pin clustering automatically groups nearby officials when zoomed out, maintaining performance with many markers
- Official photos are lazy-loaded only when a popup is opened
- The entire application is designed to work efficiently with datasets under 5MB

### Hosting Environment Recommendations

**Development Environment**
- Use the built-in Python HTTP server for local development
- No special configuration needed
- Automatic reloading can be implemented with additional tools if desired

**Production Deployment**
- Host all files on any static web server
- Ensure `data/officials.json` is accessible to the application
- Configure CORS if needed for external resources
- Consider using a CDN for better global performance
- Implement caching headers for static assets to improve load times

**Performance Monitoring**
- Monitor the size of `data/officials.json` as it grows
- Test application performance with the expected number of records
- Consider implementing pagination or additional filtering if the dataset becomes very large
- Monitor loading times, especially on mobile networks

The application's client-side architecture ensures that once loaded, all interactions are fast and responsive without requiring additional server requests.

**Section sources**
- [README.md](file://README.md#L134-L145)
- [app.js](file://js/app.js#L25-L35)
- [map-manager.js](file://js/map-manager.js#L49-L74)