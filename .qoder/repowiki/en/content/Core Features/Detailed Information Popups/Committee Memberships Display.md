# Committee Memberships Display

<cite>
**Referenced Files in This Document**   
- [popup-component.js](file://js/popup-component.js)
- [officials.json](file://data/officials.json)
- [styles.css](file://css/styles.css)
</cite>

## Table of Contents
1. [Conditional Rendering of Committee Memberships](#conditional-rendering-of-committee-memberships)
2. [HTML Structure and CSS Styling](#html-structure-and-css-styling)
3. [XSS Prevention with escapeHtml Function](#xss-prevention-with-escapehtml-function)
4. [Data Structure in officials.json](#data-structure-in-officialsjson)
5. [Handling Edge Cases](#handling-edge-cases)
6. [Accessibility Considerations](#accessibility-considerations)
7. [Styling Guidance](#styling-guidance)

## Conditional Rendering of Committee Memberships

The committee memberships section in the official popup is conditionally rendered based on whether the official has one or more committee affiliations. This conditional logic prevents unnecessary UI elements from appearing when no committee data exists. The implementation uses a JavaScript conditional check that evaluates both the existence of the `committeeMemberships` property and its length.

The rendering occurs within the `createPopupContent` function in the popup component, where the system checks `if (official.committeeMemberships && official.committeeMemberships.length > 0)`. This dual-condition check ensures safe access to the property while verifying that at least one committee affiliation exists before rendering the section.

**Section sources**
- [popup-component.js](file://js/popup-component.js#L133-L144)

## HTML Structure and CSS Styling

When committee memberships are present, the system generates a structured HTML output using a bulleted list (`ul` element) with the CSS class `popup-committees`. The list container is wrapped in a `popup-section` div with a section title "Committee Memberships". Each committee name is rendered as a list item (`li` element) within this unordered list.

The implementation uses a `forEach` loop to iterate through the `committeeMemberships` array, dynamically generating list items. This approach ensures that each committee affiliation is properly represented in the DOM structure while maintaining clean separation between data and presentation.

```mermaid
flowchart TD
A[Start: committeeMemberships exists and has length > 0] --> B[Create popup-section container]
B --> C[Add section title "Committee Memberships"]
C --> D[Create ul element with class popup-committees]
D --> E[Iterate through committeeMemberships array]
E --> F[For each committee, create li element]
F --> G[Escape committee name with escapeHtml function]
G --> H[Append escaped name to li element]
H --> I[Add li to ul]
I --> J{More committees?}
J --> |Yes| E
J --> |No| K[Close ul and popup-section]
K --> L[Render complete committee section]
```

**Diagram sources**
- [popup-component.js](file://js/popup-component.js#L133-L144)

**Section sources**
- [popup-component.js](file://js/popup-component.js#L133-L144)
- [styles.css](file://css/styles.css#L507-L521)

## XSS Prevention with escapeHtml Function

To prevent cross-site scripting (XSS) vulnerabilities, all committee names are properly escaped using the `escapeHtml` function before being inserted into the DOM. This security measure ensures that any potentially malicious content within committee names is neutralized by converting HTML special characters to their corresponding HTML entities.

The `escapeHtml` function works by creating a temporary DOM element, setting its `textContent` to the input string, and then returning the `innerHTML` of that element. This technique leverages the browser's built-in HTML escaping mechanism to safely convert potentially dangerous characters like `<`, `>`, `&`, and quotes into their safe equivalents.

Each committee name is processed through this function within the `forEach` loop: `html += <li>${escapeHtml(committee)}</li>`. This consistent application of escaping across all dynamic content insertion points maintains the application's security posture.

**Section sources**
- [popup-component.js](file://js/popup-component.js#L139)
- [popup-component.js](file://js/popup-component.js#L190-L194)

## Data Structure in officials.json

The `officials.json` file contains an array of official objects, each of which may include a `committeeMemberships` property. This property is expected to be an array of strings, where each string represents the name of a committee to which the official belongs.

The data structure follows this pattern:
```json
"committeeMemberships": [
  "Committee on Financial Services",
  "Committee on Oversight and Reform"
]
```

Examples from the data file show various committee naming conventions, including formal committee titles with descriptive parentheticals (e.g., "Committee on the Budget (Chair)"). The system is designed to handle these variations without requiring special processing, as the display logic treats all entries as plain text strings after escaping.

**Section sources**
- [officials.json](file://data/officials.json#L29-L32)
- [officials.json](file://data/officials.json#L62-L65)

## Handling Edge Cases

The implementation gracefully handles several edge cases related to committee membership data:

1. **Empty arrays**: When an official has a `committeeMemberships` property but it's an empty array (as seen with Chokwe Antar Lumumba), the conditional rendering logic prevents the section from appearing.

2. **Missing property**: If the `committeeMemberships` property is entirely absent from an official object, the null-safe conditional check prevents JavaScript errors.

3. **Long committee names**: The CSS styling accommodates long committee names through responsive design principles and proper text wrapping. The `word-break: break-all` rule in related styles ensures that extremely long names or URLs don't overflow their containers.

4. **Special characters**: The `escapeHtml` function properly handles special characters, quotes, and other potentially problematic content that might appear in committee names.

**Section sources**
- [popup-component.js](file://js/popup-component.js#L133-L144)
- [officials.json](file://data/officials.json#L392)

## Accessibility Considerations

The committee memberships list is designed with accessibility in mind. As a standard unordered list, it provides inherent semantic meaning to screen readers and other assistive technologies. The list structure announces to users that they are navigating a collection of related items, and screen readers typically indicate the number of items in the list.

The hierarchical structure with the "Committee Memberships" section title followed by the list provides clear context for the content. This heading-list pattern allows users of assistive technologies to understand the relationship between the section header and the list items that follow.

No additional ARIA attributes are required for this simple list structure, as the native HTML elements provide sufficient semantic information. The consistent styling across list items ensures visual predictability for users with cognitive disabilities.

**Section sources**
- [popup-component.js](file://js/popup-component.js#L135)
- [popup-component.js](file://js/popup-component.js#L136)
- [styles.css](file://css/styles.css#L507-L521)

## Styling Guidance

The `popup-committees` CSS class and its associated rules in `styles.css` control the visual presentation of the committee list. The styling approach uses CSS custom properties (variables) for consistent theming across the application.

Key styling features include:
- Removal of default list styling with `list-style: none`
- Custom bullet points created with the `::before` pseudo-element using a colored dot
- Consistent vertical spacing between list items through padding
- Text color inheritance from the `--text-color` CSS variable
- Primary color application to bullet points via the `--primary-color` variable

The responsive design ensures that the committee list displays appropriately across different screen sizes, with the overall popup container adapting to mobile viewports while maintaining readability of the list content.

**Section sources**
- [styles.css](file://css/styles.css#L507-L521)