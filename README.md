# Democratic Socialist Officials Map

An interactive web-based map displaying elected Democratic Socialist and Socialist officials across the United States.

## Features

- **Interactive Map**: View all Democratic Socialist and Socialist elected officials on a US map
- **Pin Clustering**: Automatically groups nearby officials when zoomed out for better visibility
- **Advanced Filtering**: Filter officials by:
  - State
  - Office Level (Federal, State, County, City, Town)
  - Political Affiliation
  - Year Elected
  - Search by name or location
- **Detailed Information**: Click any pin to view comprehensive official information including:
  - Biography
  - Contact information (email, phone, website, social media)
  - Term dates
  - Committee memberships
  - Voting record
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Python 3 (for local development server)

### Running Locally

1. Navigate to the project directory:
   ```bash
   cd democratic-socialist-official-map-1763177504
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   
   Or manually:
   ```bash
   python3 -m http.server 8000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Project Structure

```
.
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Application styles
├── js/
│   ├── app.js             # Main application entry point
│   ├── data-loader.js     # Data loading and validation
│   ├── state-manager.js   # Application state management
│   ├── map-manager.js     # Map initialization and pin management
│   ├── popup-component.js # Official information popups
│   └── filter-controller.js # Filter UI and logic
├── data/
│   └── officials.json     # Official data (edit to add/update officials)
└── package.json           # Project metadata
```

## Adding or Updating Officials

To add new officials or update existing ones, edit the `data/officials.json` file. Each official record should include:

### Required Fields:
- `id`: Unique identifier
- `name`: Full name
- `position`: Official title
- `officeLevel`: "federal", "state", "county", "city", or "town"
- `politicalAffiliation`: Party or organization name
- `location`: Object with `state`, `latitude`, `longitude`
- `contact`: Object (can be empty but must exist)
- `bio`: Biography or description
- `termStart`: ISO 8601 date format (e.g., "2023-01-03")
- `yearElected`: Year first elected to current position

### Optional Fields:
- `photo`: URL to official's photo
- `termEnd`: Term end date (null for ongoing)
- `location.county`, `location.city`, `location.district`
- `contact.email`, `contact.phone`, `contact.website`, `contact.socialMedia`
- `committeeMemberships`: Array of committee names
- `votingRecord`: URL or description

## Technologies Used

- **Leaflet.js**: Interactive map library
- **Leaflet.markercluster**: Pin clustering functionality
- **Vanilla JavaScript**: No framework dependencies
- **CSS Grid & Flexbox**: Responsive layout
- **OpenStreetMap**: Map tiles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

The application follows WCAG 2.1 AA standards:
- Full keyboard navigation
- ARIA labels and landmarks
- High contrast mode support
- Reduced motion support
- Screen reader compatible

## License

ISC

## Contributing

To contribute:
1. Verify all officials data is accurate
2. Ensure data follows the required schema
3. Test on multiple devices and browsers
4. Validate accessibility features

## Deployment

For production deployment:
1. Host all files on a static web server
2. Ensure `data/officials.json` is accessible
3. Configure CORS if needed for external resources
4. Consider using a CDN for better performance

## Performance Notes

- Data loads once on page load for instant filtering
- Pin clustering maintains performance with many officials
- Lazy loading for official photos
- Optimized for files under 5MB

## Support

For issues or questions, please check the console for error messages and ensure:
- All files are properly uploaded
- JSON data is valid
- Network connection is stable
- Browser JavaScript is enabled
# Democratic Socialist Officials Map

An interactive web-based map displaying elected Democratic Socialist and Socialist officials across the United States.

## Features

- **Interactive Map**: View all Democratic Socialist and Socialist elected officials on a US map
- **Pin Clustering**: Automatically groups nearby officials when zoomed out for better visibility
- **Advanced Filtering**: Filter officials by:
  - State
  - Office Level (Federal, State, County, City, Town)
  - Political Affiliation
  - Year Elected
  - Search by name or location
- **Detailed Information**: Click any pin to view comprehensive official information including:
  - Biography
  - Contact information (email, phone, website, social media)
  - Term dates
  - Committee memberships
  - Voting record
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Python 3 (for local development server)

### Running Locally

1. Navigate to the project directory:
   ```bash
   cd democratic-socialist-official-map-1763177504
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   
   Or manually:
   ```bash
   python3 -m http.server 8000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Project Structure

```
.
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Application styles
├── js/
│   ├── app.js             # Main application entry point
│   ├── data-loader.js     # Data loading and validation
│   ├── state-manager.js   # Application state management
│   ├── map-manager.js     # Map initialization and pin management
│   ├── popup-component.js # Official information popups
│   └── filter-controller.js # Filter UI and logic
├── data/
│   └── officials.json     # Official data (edit to add/update officials)
└── package.json           # Project metadata
```

## Adding or Updating Officials

To add new officials or update existing ones, edit the `data/officials.json` file. Each official record should include:

### Required Fields:
- `id`: Unique identifier
- `name`: Full name
- `position`: Official title
- `officeLevel`: "federal", "state", "county", "city", or "town"
- `politicalAffiliation`: Party or organization name
- `location`: Object with `state`, `latitude`, `longitude`
- `contact`: Object (can be empty but must exist)
- `bio`: Biography or description
- `termStart`: ISO 8601 date format (e.g., "2023-01-03")
- `yearElected`: Year first elected to current position

### Optional Fields:
- `photo`: URL to official's photo
- `termEnd`: Term end date (null for ongoing)
- `location.county`, `location.city`, `location.district`
- `contact.email`, `contact.phone`, `contact.website`, `contact.socialMedia`
- `committeeMemberships`: Array of committee names
- `votingRecord`: URL or description

## Technologies Used

- **Leaflet.js**: Interactive map library
- **Leaflet.markercluster**: Pin clustering functionality
- **Vanilla JavaScript**: No framework dependencies
- **CSS Grid & Flexbox**: Responsive layout
- **OpenStreetMap**: Map tiles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

The application follows WCAG 2.1 AA standards:
- Full keyboard navigation
- ARIA labels and landmarks
- High contrast mode support
- Reduced motion support
- Screen reader compatible

## License

ISC

## Contributing

To contribute:
1. Verify all officials data is accurate
2. Ensure data follows the required schema
3. Test on multiple devices and browsers
4. Validate accessibility features

## Deployment

For production deployment:
1. Host all files on a static web server
2. Ensure `data/officials.json` is accessible
3. Configure CORS if needed for external resources
4. Consider using a CDN for better performance

## Performance Notes

- Data loads once on page load for instant filtering
- Pin clustering maintains performance with many officials
- Lazy loading for official photos
- Optimized for files under 5MB

## Support

For issues or questions, please check the console for error messages and ensure:
- All files are properly uploaded
- JSON data is valid
- Network connection is stable
- Browser JavaScript is enabled
