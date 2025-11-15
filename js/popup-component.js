// Popup Component Module
// Handles creation and display of official information popups

const PopupComponent = (function() {
    'use strict';

    let currentPopup = null;

    /**
     * Format a date string for display
     * @param {string} dateString - ISO date string
     * @returns {string} Formatted date
     */
    function formatDate(dateString) {
        if (!dateString) return 'Present';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    /**
     * Create HTML content for official popup
     * @param {Object} official - Official object
     * @returns {string} HTML content
     */
    function createPopupContent(official) {
        let html = '<div class="popup-content">';

        // Header Section
        html += '<div class="popup-header">';
        
        if (official.photo) {
            html += `<img src="${official.photo}" alt="${official.name}" class="popup-photo" loading="lazy" onerror="this.style.display='none'">`;
        }
        
        html += `<div class="popup-name">${escapeHtml(official.name)}</div>`;
        html += `<div class="popup-position">${escapeHtml(official.position)}</div>`;
        html += `<span class="popup-badge">${escapeHtml(official.officeLevel)}</span>`;
        html += '</div>'; // End header

        // Body Section
        html += '<div class="popup-body">';

        // Biography
        if (official.bio) {
            html += '<div class="popup-section">';
            html += `<p class="popup-bio">${escapeHtml(official.bio)}</p>`;
            html += '</div>';
        }

        // Contact Information
        if (official.contact) {
            html += '<div class="popup-section">';
            html += '<div class="popup-section-title">Contact</div>';
            html += '<div class="popup-contact-links">';
            
            if (official.contact.email) {
                html += `<a href="mailto:${official.contact.email}" class="popup-link" aria-label="Email ${official.name}">
                    📧 ${escapeHtml(official.contact.email)}
                </a>`;
            }
            
            if (official.contact.phone) {
                html += `<a href="tel:${official.contact.phone}" class="popup-link" aria-label="Call ${official.name}">
                    📞 ${escapeHtml(official.contact.phone)}
                </a>`;
            }
            
            if (official.contact.website) {
                html += `<a href="${official.contact.website}" target="_blank" rel="noopener noreferrer" class="popup-link" aria-label="Visit ${official.name}'s website">
                    🌐 Official Website
                </a>`;
            }
            
            // Social Media
            if (official.contact.socialMedia) {
                html += '<div class="popup-social">';
                
                if (official.contact.socialMedia.twitter) {
                    html += `<a href="https://twitter.com/${official.contact.socialMedia.twitter.replace('@', '')}" 
                            target="_blank" rel="noopener noreferrer" aria-label="${official.name}'s Twitter">
                            ${escapeHtml(official.contact.socialMedia.twitter)}
                    </a>`;
                }
                
                if (official.contact.socialMedia.facebook) {
                    html += `<a href="https://facebook.com/${official.contact.socialMedia.facebook}" 
                            target="_blank" rel="noopener noreferrer" aria-label="${official.name}'s Facebook">
                            Facebook
                    </a>`;
                }
                
                if (official.contact.socialMedia.instagram) {
                    html += `<a href="https://instagram.com/${official.contact.socialMedia.instagram.replace('@', '')}" 
                            target="_blank" rel="noopener noreferrer" aria-label="${official.name}'s Instagram">
                            ${escapeHtml(official.contact.socialMedia.instagram)}
                    </a>`;
                }
                
                html += '</div>';
            }
            
            html += '</div>'; // End contact links
            html += '</div>'; // End section
        }

        // Details Section
        html += '<div class="popup-section">';
        html += '<div class="popup-section-title">Details</div>';
        html += '<div class="popup-info-grid">';
        
        html += '<span class="popup-info-label">Political Affiliation:</span>';
        html += `<span class="popup-info-value">${escapeHtml(official.politicalAffiliation)}</span>`;
        
        html += '<span class="popup-info-label">Term Start:</span>';
        html += `<span class="popup-info-value">${formatDate(official.termStart)}</span>`;
        
        if (official.termEnd) {
            html += '<span class="popup-info-label">Term End:</span>';
            html += `<span class="popup-info-value">${formatDate(official.termEnd)}</span>`;
        }
        
        html += '<span class="popup-info-label">Year Elected:</span>';
        html += `<span class="popup-info-value">${official.yearElected}</span>`;
        
        html += '</div>'; // End info grid
        html += '</div>'; // End section

        // Committee Memberships
        if (official.committeeMemberships && official.committeeMemberships.length > 0) {
            html += '<div class="popup-section">';
            html += '<div class="popup-section-title">Committee Memberships</div>';
            html += '<ul class="popup-committees">';
            
            official.committeeMemberships.forEach(committee => {
                html += `<li>${escapeHtml(committee)}</li>`;
            });
            
            html += '</ul>';
            html += '</div>';
        }

        // Voting Record
        if (official.votingRecord) {
            html += '<div class="popup-section">';
            html += '<div class="popup-section-title">Voting Record</div>';
            
            if (official.votingRecord.startsWith('http')) {
                html += `<a href="${official.votingRecord}" target="_blank" rel="noopener noreferrer" class="popup-link">
                    View Voting Record
                </a>`;
            } else {
                html += `<p>${escapeHtml(official.votingRecord)}</p>`;
            }
            
            html += '</div>';
        }

        // Location Footer
        html += '<div class="popup-location">';
        html += '📍 ';
        
        const locationParts = [];
        if (official.location.city) locationParts.push(official.location.city);
        if (official.location.county) locationParts.push(official.location.county + ' County');
        locationParts.push(official.location.state);
        
        html += escapeHtml(locationParts.join(', '));
        
        if (official.location.district) {
            html += ` - District ${escapeHtml(official.location.district)}`;
        }
        
        html += '</div>';

        html += '</div>'; // End body
        html += '</div>'; // End popup-content

        return html;
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Show popup for an official
     * @param {Object} official - Official object
     * @param {Array} latlng - [latitude, longitude]
     */
    function showPopup(official, latlng) {
        const map = MapManager.getMap();
        
        if (!map) {
            console.error('Map not initialized');
            return;
        }

        // Close existing popup
        if (currentPopup) {
            map.closePopup(currentPopup);
        }

        // Create and show new popup
        const popupContent = createPopupContent(official);
        
        currentPopup = L.popup({
            maxWidth: 400,
            minWidth: 300,
            autoPan: true,
            autoPanPadding: [50, 50],
            closeButton: true,
            className: 'official-popup'
        })
        .setLatLng(latlng)
        .setContent(popupContent)
        .openOn(map);

        // Add close event listener
        currentPopup.on('remove', function() {
            StateManager.setSelectedOfficial(null);
            currentPopup = null;
        });
    }

    /**
     * Close current popup
     */
    function closePopup() {
        const map = MapManager.getMap();
        
        if (map && currentPopup) {
            map.closePopup(currentPopup);
            currentPopup = null;
        }
    }

    /**
     * Get current popup
     * @returns {L.Popup|null} Current popup or null
     */
    function getCurrentPopup() {
        return currentPopup;
    }

    // Public API
    return {
        showPopup,
        closePopup,
        getCurrentPopup,
        createPopupContent
    };
})();
