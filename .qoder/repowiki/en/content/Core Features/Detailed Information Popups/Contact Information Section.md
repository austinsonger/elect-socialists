# Contact Information Section

<cite>
**Referenced Files in This Document**   
- [popup-component.js](file://js/popup-component.js)
- [styles.css](file://css/styles.css)
- [officials.json](file://data/officials.json)
</cite>

## Table of Contents
1. [Contact Information Implementation](#contact-information-implementation)
2. [Conditional Rendering](#conditional-rendering)
3. [Accessibility and User Experience](#accessibility-and-user-experience)
4. [Social Media URL Transformation](#social-media-url-transformation)
5. [Styling and Visual Design](#styling-and-visual-design)
6. [Common Issues and Best Practices](#common-issues-and-best-practices)

## Contact Information Implementation

The contact information section in the official popup displays various communication methods including email, phone, website, and social media links. Each contact method is implemented as an anchor element with appropriate href protocols and accessibility attributes. The implementation follows web standards for accessibility and usability.

Email addresses are implemented using the mailto: protocol, which triggers the user's default email client when clicked. Phone numbers use the tel: protocol, which enables calling functionality on mobile devices. Website links open in a new tab with proper security attributes (target="_blank" rel="noopener noreferrer") to prevent potential security vulnerabilities.

The contact section is structured within a dedicated div with class "popup-contact-links" that contains individual links for each available contact method. Each link includes an emoji icon (📧 for email, 📞 for phone, 🌐 for website) to provide visual cues for users.

**Section sources**
- [popup-component.js](file://js/popup-component.js#L54-L77)

## Conditional Rendering

The contact information section employs conditional rendering based on data availability in the official's contact object. The implementation checks for the existence of each contact method before creating the corresponding HTML element, ensuring that only available contact options are displayed.

The conditional logic follows a hierarchical approach:
1. First checks if the contact object exists for the official
2. Then checks for each specific contact method (email, phone, website, social media)
3. Only renders the corresponding HTML when the data is present

This prevents the display of empty or broken links in the popup. For example, if an official doesn't have a phone number listed in their data, the phone link will not be rendered at all, maintaining a clean interface.

The implementation also handles social media links conditionally, checking for the presence of Twitter, Facebook, and Instagram handles before creating their respective links.

**Section sources**
- [popup-component.js](file://js/popup-component.js#L54-L108)

## Accessibility and User Experience

The contact information implementation prioritizes accessibility through the use of aria-label attributes on all contact links. These attributes provide descriptive text for screen readers, enhancing the experience for users with visual impairments.

Each contact link includes an aria-label that clearly describes the action and the official's name:
- Email links use "Email [Official Name]"
- Phone links use "Call [Official Name]"
- Website links use "Visit [Official Name]'s website"
- Social media links use "[Official Name]'s [Platform Name]"

The links are styled with appropriate hover effects and color contrast to meet WCAG 2.1 AA standards. The CSS includes focus states for keyboard navigation, supporting users who navigate without a mouse.

The implementation also considers mobile device compatibility by using appropriate link protocols that trigger native device functionality (email apps, phone dialers, etc.) when accessed on mobile devices.

**Section sources**
- [popup-component.js](file://js/popup-component.js#L60-L104)
- [styles.css](file://css/styles.css#L477-L488)

## Social Media URL Transformation

Social media links require special handling as they need to transform social media handles into full URLs. The implementation includes logic to convert Twitter and Instagram handles (which may include the @ symbol) into proper URLs by removing the @ prefix.

For Twitter links, the code uses the replace() method to remove the @ symbol from the handle before constructing the URL:
```javascript
`https://twitter.com/${official.contact.socialMedia.twitter.replace('@', '')}`
```

Instagram links follow the same pattern, ensuring consistent URL formatting. Facebook links use a slightly different format, appending the handle directly to facebook.com/ without modification.

The social media links are grouped in a separate div with class "popup-social" and displayed with horizontal spacing using flexbox layout. This creates a clean, organized presentation of social media options.

**Section sources**
- [popup-component.js](file://js/popup-component.js#L82-L100)
- [styles.css](file://css/styles.css#L489-L505)

## Styling and Visual Design

The contact information section is styled using CSS classes defined in styles.css. The styling follows a consistent design system with proper spacing, typography, and color usage.

The contact links container (popup-contact-links) uses flexbox with column direction and gap spacing to create vertical separation between links. Each link (popup-link) has consistent styling with a defined color scheme that changes on hover to provide visual feedback.

Social media links (popup-social) are displayed horizontally with appropriate spacing using flexbox. The links inherit the base popup-link styling but have additional font weight for emphasis.

The implementation includes responsive design considerations, with the contact section adapting to different screen sizes. On mobile devices, the links maintain adequate touch targets and spacing for easy interaction.

**Section sources**
- [styles.css](file://css/styles.css#L472-L505)

## Common Issues and Best Practices

Several common issues are addressed in the implementation:

1. **Missing protocols**: The implementation ensures all links have appropriate protocols (mailto:, tel:, https:) to prevent broken links.

2. **Privacy considerations**: The system handles null values appropriately, not rendering contact methods when data is unavailable rather than displaying "null" or empty links.

3. **Mobile compatibility**: The use of standard href protocols ensures that links work correctly on mobile devices, triggering native apps for email and phone functions.

4. **Security**: Website links use the "noopener noreferrer" attributes to prevent potential security vulnerabilities when opening external links.

Best practices followed in the implementation include:
- Using semantic HTML for accessibility
- Implementing proper error handling for missing data
- Following consistent naming conventions
- Using CSS variables for maintainable styling
- Ensuring adequate color contrast for readability
- Providing visual feedback for interactive elements

When adding new contact methods, developers should follow the existing pattern: check for data availability, use appropriate href protocols, include aria-label attributes, and apply consistent styling.

**Section sources**
- [popup-component.js](file://js/popup-component.js#L54-L108)
- [styles.css](file://css/styles.css#L472-L505)
- [officials.json](file://data/officials.json#L16-L24)