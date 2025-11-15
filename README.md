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
   cd elect-socialist
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

We welcome contributions from the community! Here's how you can help:

### Adding a New Official

1. **Fork the repository** and create a new branch
2. **Use the Pull Request template** - When you create a PR, our template will guide you through providing all necessary information
3. **Verify the official** is currently elected and identifies as Democratic Socialist or Socialist
4. **Gather accurate information** from official government sources:
   - Official government email, phone, and website
   - Accurate coordinates for their district/office (use [LatLong.net](https://www.latlong.net/))
   - Committee assignments and voting records
   - Biographical information from official sources

5. **Follow the JSON structure** exactly as shown in `data/officials.json`:
   ```json
   {
     "id": "xx-001",
     "name": "Official Name",
     "position": "Position Title",
     "officeLevel": "federal|state|county|city",
     "politicalAffiliation": "Democratic Socialist",
     "location": {
       "state": "XX",
       "county": null,
       "city": "City Name",
       "district": null,
       "latitude": 0.0,
       "longitude": 0.0
     },
     "contact": {
       "email": null,
       "phone": "(XXX) XXX-XXXX",
       "website": "https://...",
       "socialMedia": {
         "twitter": "@handle",
         "instagram": null
       }
     },
     "photo": null,
     "bio": "Factual 2-3 sentence biography...",
     "termStart": "YYYY-MM-DD",
     "termEnd": null,
     "committeeMemberships": [],
     "votingRecord": null,
     "yearElected": 2024
   }
   ```

6. **Validate your JSON** using a JSON validator before submitting
7. **Test locally** to ensure the new official appears correctly on the map
8. **Submit a pull request** with sources for verification

### Updating Existing Officials

If an official's information has changed (new committee assignment, updated contact info, term ended, etc.):
1. Edit the relevant entry in `data/officials.json`
2. Include sources for the updated information in your PR description
3. Note what changed and why

### Other Contributions

- **Bug reports**: Open an issue with details about the problem
- **Feature requests**: Describe the feature and its benefits
- **Code improvements**: Follow existing code style and include tests
- **Documentation**: Help improve clarity and accuracy

### Contribution Guidelines

✅ **DO:**
- Verify all information from official government sources
- Use neutral, factual language in biographies
- Follow the existing JSON structure exactly
- Include your sources in the PR
- Test your changes locally before submitting

❌ **DON'T:**
- Include political opinions or endorsements
- Use unofficial or campaign websites as primary sources
- Break the JSON structure or syntax
- Submit without testing

### Questions?

If you're unsure about anything, feel free to open an issue and ask before submitting your PR!

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