# Adding/Updating Officials

<cite>
**Referenced Files in This Document**   
- [officials.json](file://data/officials.json)
- [data-loader.js](file://js/data-loader.js)
- [README.md](file://README.md)
</cite>

## Table of Contents
1. [Implementation Details](#implementation-details)
2. [Domain Model](#domain-model)
3. [Usage Patterns](#usage-patterns)
4. [Configuration Options](#configuration-options)
5. [Common Issues and Solutions](#common-issues-and-solutions)

## Implementation Details

The process of adding or updating officials is primarily managed through the `data/officials.json` file, which serves as the central data store for all official records. The application uses the DataLoader module to validate and load this data when the application initializes. The validation process ensures that all required fields are present and correctly formatted before the data is made available to other components.

When the application starts, the `initApp` function in `app.js` calls `DataLoader.loadOfficials()` to fetch and validate the JSON data. This function performs comprehensive validation on each official record, checking for required fields, valid office levels, proper state codes, and correct date formats. Any records that fail validation are logged as warnings but excluded from the final dataset.

The validation rules are defined in `data-loader.js` and include checks for:
- Required fields (id, name, position, officeLevel, politicalAffiliation, bio, termStart, yearElected)
- Valid office levels (federal, state, county, city, town)
- Valid US state codes
- Proper geographic coordinates within US boundaries
- Correct ISO 8601 date format for term dates

**Section sources**
- [data-loader.js](file://js/data-loader.js#L21-L80)
- [app.js](file://js/app.js#L25-L38)

## Domain Model

The domain model for officials is defined by the structure of objects in `data/officials.json`. Each official is represented as a JSON object with a specific schema that includes both required and optional properties.

The core structure consists of several nested objects that organize information logically:
- Basic identification and position information
- Location data with geographic coordinates
- Contact information including digital presence
- Biographical and tenure details
- Political and committee affiliations

The model supports hierarchical location data from state level down to district, enabling precise mapping and filtering capabilities. Geographic coordinates are essential for map rendering, while the office level field determines both visual representation (marker color) and interaction behavior (zoom level on selection).

**Section sources**
- [officials.json](file://data/officials.json#L1-L493)
- [README.md](file://README.md#L74-L163)

## Usage Patterns

To add a new official, contributors must edit the `data/officials.json` file directly, following the established JSON structure. The recommended pattern is to add new entries at the end of the array while maintaining alphabetical order by last name. Each new entry must include all required fields and adhere to the validation rules enforced by the DataLoader.

For updating existing officials, the process involves locating the specific official by ID or name and modifying the relevant fields. Common updates include:
- Adding or updating contact information
- Extending or ending terms of office
- Updating committee memberships
- Adding voting records
- Correcting biographical information

The system is designed to handle partial information gracefully, allowing fields to be set to null when data is unavailable. This enables incremental updates as information becomes available.

**Section sources**
- [README.md](file://README.md#L197-L245)
- [data-loader.js](file://js/data-loader.js#L97-L148)

## Configuration Options

The officials data model includes several configuration options that control how officials are displayed and categorized within the application:

**Required Fields:**
- `id`: Unique identifier following the pattern "abbreviation-number"
- `name`: Full legal name of the official
- `position`: Official title and jurisdiction
- `officeLevel`: Categorization of office type (federal, state, county, city, town)
- `politicalAffiliation`: Political party or organization affiliation
- `location.state`: Two-letter US state code
- `location.latitude` and `location.longitude`: Geographic coordinates
- `contact`: Container object for contact information
- `bio`: Brief biographical description
- `termStart`: ISO 8601 formatted date when term began
- `yearElected`: Calendar year when first elected to current position

**Optional Fields:**
- `photo`: URL to official portrait
- `termEnd`: ISO 8601 date when term ends (null for ongoing)
- `location.county`, `location.city`, `location.district`: Additional location specificity
- `contact.email`, `contact.phone`, `contact.website`: Official contact methods
- `contact.socialMedia`: Social media handles
- `committeeMemberships`: Array of current committee assignments
- `votingRecord`: URL to official voting record or descriptive text

Special handling exists for officials-elect who have won election but not yet taken office. These entries should use the actual future `termStart` date and include explanatory text in the biography field.

**Section sources**
- [README.md](file://README.md#L76-L163)
- [officials.json](file://data/officials.json#L1-L493)

## Common Issues and Solutions

Several common issues arise when adding or updating officials, along with established solutions:

**Invalid JSON Format:**
- *Issue*: Syntax errors in JSON prevent data loading
- *Solution*: Use a JSON validator to check syntax before submission
- *Prevention*: Edit JSON files using editors with JSON syntax highlighting

**Missing Required Fields:**
- *Issue*: Records fail validation due to missing mandatory fields
- *Solution*: Ensure all required fields are present, using null for unknown values
- *Prevention*: Follow the complete template provided in the documentation

**Geographic Coordinate Errors:**
- *Issue*: Invalid latitude/longitude values or coordinates outside US boundaries
- *Solution*: Verify coordinates using reliable sources like LatLong.net
- *Prevention*: Double-check that latitude is between 24-50 and longitude between -125 to -66

**Date Format Problems:**
- *Issue*: Incorrect date formatting causes validation failures
- *Solution*: Use ISO 8601 format (YYYY-MM-DD) for all date fields
- *Prevention*: Copy date format from existing valid entries

**Duplicate or Conflicting Entries:**
- *Issue*: Multiple entries for the same official
- *Solution*: Search existing entries before adding new ones
- *Prevention*: Maintain consistent naming conventions and ID patterns

**Image Loading Issues:**
- *Issue*: Photo URLs that don't load or display
- *Solution*: Use direct image URLs rather than page URLs
- *Prevention*: Test image URLs in a browser before adding

The system provides feedback through browser console messages, logging validation errors and warnings that can help diagnose and fix issues with official records.

**Section sources**
- [data-loader.js](file://js/data-loader.js#L21-L80)
- [README.md](file://README.md#L263-L274)