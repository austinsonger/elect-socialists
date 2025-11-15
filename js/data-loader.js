// Data Loader Module
// Responsible for loading and validating official data from JSON file

const DataLoader = (function() {
    'use strict';

    // Validation rules for official records
    const VALID_OFFICE_LEVELS = ['federal', 'state', 'county', 'city', 'town'];
    const VALID_STATE_CODES = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    /**
     * Validate a single official record
     * @param {Object} official - Official record to validate
     * @returns {Object} Validation result {valid: boolean, errors: string[]}
     */
    function validateOfficial(official) {
        const errors = [];

        // Required fields validation
        if (!official.id) errors.push('Missing required field: id');
        if (!official.name) errors.push('Missing required field: name');
        if (!official.position) errors.push('Missing required field: position');
        if (!official.officeLevel) errors.push('Missing required field: officeLevel');
        if (!official.politicalAffiliation) errors.push('Missing required field: politicalAffiliation');
        if (!official.bio) errors.push('Missing required field: bio');
        if (!official.termStart) errors.push('Missing required field: termStart');
        if (!official.yearElected) errors.push('Missing required field: yearElected');

        // Office level validation
        if (official.officeLevel && !VALID_OFFICE_LEVELS.includes(official.officeLevel)) {
            errors.push(`Invalid officeLevel: ${official.officeLevel}`);
        }

        // Location validation
        if (!official.location) {
            errors.push('Missing required field: location');
        } else {
            if (!official.location.state) errors.push('Missing required field: location.state');
            if (official.location.state && !VALID_STATE_CODES.includes(official.location.state)) {
                errors.push(`Invalid state code: ${official.location.state}`);
            }
            if (typeof official.location.latitude !== 'number') {
                errors.push('Missing or invalid location.latitude');
            }
            if (typeof official.location.longitude !== 'number') {
                errors.push('Missing or invalid location.longitude');
            }
            
            // Validate US boundaries
            if (official.location.latitude && (official.location.latitude < 24 || official.location.latitude > 50)) {
                errors.push('Latitude outside US boundaries');
            }
            if (official.location.longitude && (official.location.longitude < -125 || official.location.longitude > -66)) {
                errors.push('Longitude outside US boundaries');
            }
        }

        // Contact validation
        if (!official.contact) {
            errors.push('Missing required field: contact');
        }

        // Date validation
        if (official.termStart && !isValidDate(official.termStart)) {
            errors.push('Invalid termStart date format (expected ISO 8601)');
        }
        if (official.termEnd && !isValidDate(official.termEnd)) {
            errors.push('Invalid termEnd date format (expected ISO 8601)');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Validate ISO 8601 date format
     * @param {string} dateString - Date string to validate
     * @returns {boolean} True if valid
     */
    function isValidDate(dateString) {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    }

    /**
     * Load officials data from JSON file
     * @param {string} url - URL to JSON file
     * @returns {Promise<Object>} Promise resolving to {officials: Array, errors: Array}
     */
    async function loadOfficials(url = 'data/officials.json') {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                throw new Error('Invalid data format: expected array of officials');
            }

            // Validate each official
            const validOfficials = [];
            const validationErrors = [];

            data.forEach((official, index) => {
                const validation = validateOfficial(official);
                
                if (validation.valid) {
                    validOfficials.push(official);
                } else {
                    console.warn(`Official at index ${index} failed validation:`, validation.errors);
                    validationErrors.push({
                        index: index,
                        id: official.id || 'unknown',
                        name: official.name || 'unknown',
                        errors: validation.errors
                    });
                }
            });

            console.log(`Loaded ${validOfficials.length} valid officials out of ${data.length} total`);
            
            if (validationErrors.length > 0) {
                console.warn('Validation errors encountered:', validationErrors);
            }

            return {
                officials: validOfficials,
                errors: validationErrors,
                totalCount: data.length,
                validCount: validOfficials.length
            };

        } catch (error) {
            console.error('Error loading officials data:', error);
            throw error;
        }
    }

    /**
     * Get unique values for a specific field across all officials
     * @param {Array} officials - Array of official objects
     * @param {string} field - Field path (e.g., 'location.state' or 'politicalAffiliation')
     * @returns {Array} Array of unique values
     */
    function getUniqueValues(officials, field) {
        const values = new Set();
        
        officials.forEach(official => {
            const fieldParts = field.split('.');
            let value = official;
            
            for (const part of fieldParts) {
                value = value?.[part];
            }
            
            if (value != null) {
                values.add(value);
            }
        });
        
        return Array.from(values).sort();
    }

    // Public API
    return {
        loadOfficials,
        validateOfficial,
        getUniqueValues,
        VALID_OFFICE_LEVELS,
        VALID_STATE_CODES
    };
})();
// Data Loader Module
// Responsible for loading and validating official data from JSON file

const DataLoader = (function() {
    'use strict';

    // Validation rules for official records
    const VALID_OFFICE_LEVELS = ['federal', 'state', 'county', 'city', 'town'];
    const VALID_STATE_CODES = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    /**
     * Validate a single official record
     * @param {Object} official - Official record to validate
     * @returns {Object} Validation result {valid: boolean, errors: string[]}
     */
    function validateOfficial(official) {
        const errors = [];

        // Required fields validation
        if (!official.id) errors.push('Missing required field: id');
        if (!official.name) errors.push('Missing required field: name');
        if (!official.position) errors.push('Missing required field: position');
        if (!official.officeLevel) errors.push('Missing required field: officeLevel');
        if (!official.politicalAffiliation) errors.push('Missing required field: politicalAffiliation');
        if (!official.bio) errors.push('Missing required field: bio');
        if (!official.termStart) errors.push('Missing required field: termStart');
        if (!official.yearElected) errors.push('Missing required field: yearElected');

        // Office level validation
        if (official.officeLevel && !VALID_OFFICE_LEVELS.includes(official.officeLevel)) {
            errors.push(`Invalid officeLevel: ${official.officeLevel}`);
        }

        // Location validation
        if (!official.location) {
            errors.push('Missing required field: location');
        } else {
            if (!official.location.state) errors.push('Missing required field: location.state');
            if (official.location.state && !VALID_STATE_CODES.includes(official.location.state)) {
                errors.push(`Invalid state code: ${official.location.state}`);
            }
            if (typeof official.location.latitude !== 'number') {
                errors.push('Missing or invalid location.latitude');
            }
            if (typeof official.location.longitude !== 'number') {
                errors.push('Missing or invalid location.longitude');
            }
            
            // Validate US boundaries
            if (official.location.latitude && (official.location.latitude < 24 || official.location.latitude > 50)) {
                errors.push('Latitude outside US boundaries');
            }
            if (official.location.longitude && (official.location.longitude < -125 || official.location.longitude > -66)) {
                errors.push('Longitude outside US boundaries');
            }
        }

        // Contact validation
        if (!official.contact) {
            errors.push('Missing required field: contact');
        }

        // Date validation
        if (official.termStart && !isValidDate(official.termStart)) {
            errors.push('Invalid termStart date format (expected ISO 8601)');
        }
        if (official.termEnd && !isValidDate(official.termEnd)) {
            errors.push('Invalid termEnd date format (expected ISO 8601)');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Validate ISO 8601 date format
     * @param {string} dateString - Date string to validate
     * @returns {boolean} True if valid
     */
    function isValidDate(dateString) {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    }

    /**
     * Load officials data from JSON file
     * @param {string} url - URL to JSON file
     * @returns {Promise<Object>} Promise resolving to {officials: Array, errors: Array}
     */
    async function loadOfficials(url = 'data/officials.json') {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                throw new Error('Invalid data format: expected array of officials');
            }

            // Validate each official
            const validOfficials = [];
            const validationErrors = [];

            data.forEach((official, index) => {
                const validation = validateOfficial(official);
                
                if (validation.valid) {
                    validOfficials.push(official);
                } else {
                    console.warn(`Official at index ${index} failed validation:`, validation.errors);
                    validationErrors.push({
                        index: index,
                        id: official.id || 'unknown',
                        name: official.name || 'unknown',
                        errors: validation.errors
                    });
                }
            });

            console.log(`Loaded ${validOfficials.length} valid officials out of ${data.length} total`);
            
            if (validationErrors.length > 0) {
                console.warn('Validation errors encountered:', validationErrors);
            }

            return {
                officials: validOfficials,
                errors: validationErrors,
                totalCount: data.length,
                validCount: validOfficials.length
            };

        } catch (error) {
            console.error('Error loading officials data:', error);
            throw error;
        }
    }

    /**
     * Get unique values for a specific field across all officials
     * @param {Array} officials - Array of official objects
     * @param {string} field - Field path (e.g., 'location.state' or 'politicalAffiliation')
     * @returns {Array} Array of unique values
     */
    function getUniqueValues(officials, field) {
        const values = new Set();
        
        officials.forEach(official => {
            const fieldParts = field.split('.');
            let value = official;
            
            for (const part of fieldParts) {
                value = value?.[part];
            }
            
            if (value != null) {
                values.add(value);
            }
        });
        
        return Array.from(values).sort();
    }

    // Public API
    return {
        loadOfficials,
        validateOfficial,
        getUniqueValues,
        VALID_OFFICE_LEVELS,
        VALID_STATE_CODES
    };
})();
