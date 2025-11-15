## Adding a New Elected Official

Thank you for contributing to the Socialist and Democratic Socialist Officials map! Please follow this template to ensure all necessary information is provided.

---

### Official Information

#### Basic Details
- **Full Name**: 
- **Position/Title**: _(e.g., "U.S. Representative, NY-14" or "Mayor of Jackson")_
- **Office Level**: _(federal / state / county / city)_
- **Political Affiliation**: _(e.g., "Democratic Socialist", "Socialist Alternative")_
- **Year Elected**: _(Year first elected to current position)_
- **Term Start Date**: _(Format: YYYY-MM-DD)_
- **Term End Date**: _(Format: YYYY-MM-DD, or leave blank if currently serving)_

#### Location Details
- **State**: _(Two-letter state code, e.g., NY, CA, TX)_
- **County**: _(County name, or leave blank if not applicable)_
- **City**: _(City name)_
- **District**: _(District number/name if applicable, otherwise leave blank)_
- **Latitude**: _(Decimal degrees, e.g., 40.8448)_
- **Longitude**: _(Decimal degrees, e.g., -73.8648)_

> **Tip**: Use [LatLong.net](https://www.latlong.net/) or Google Maps to find coordinates for the official's primary office or district center.

#### Contact Information
- **Email**: _(Official government email)_
- **Phone**: _(Format: (XXX) XXX-XXXX)_
- **Official Website**: _(Full URL)_
- **Twitter/X Handle**: _(Include @ symbol, e.g., @AOC)_
- **Instagram Handle**: _(Include @ symbol, or leave blank)_
- **Other Social Media**: _(Optional - specify platform and handle)_

#### Additional Information
- **Biography**: _(2-3 sentence summary of the official's background, key policy focuses, and accomplishments. Keep it factual and concise.)_

- **Photo URL**: _(Direct link to official headshot from government website, or leave blank)_

- **Committee Memberships**: _(List all committee assignments, one per line. Leave blank if none.)_
  - 
  - 
  - 

- **Voting Record URL**: _(Link to official voting record if available, otherwise leave blank)_

---

### Checklist

Before submitting this PR, please verify:

- [ ] I have verified this person is currently an elected official
- [ ] I have confirmed their Democratic Socialist or Socialist political affiliation through reliable sources
- [ ] All contact information is from official government sources
- [ ] Coordinates accurately represent the district/jurisdiction center or main office location
- [ ] The biography is factual, neutral in tone, and properly summarizes their platform
- [ ] I have used the correct date format (YYYY-MM-DD) for term dates
- [ ] I have assigned a unique ID following the naming pattern: `[initials]-[number]` (e.g., "aoc-001", "bs-001")
- [ ] I have validated the JSON syntax using a JSON validator
- [ ] I have placed the new entry in the appropriate location in the array (alphabetically by last name is preferred)

---

### JSON Entry

Please provide the complete JSON object for this official below. Use this template and fill in all fields:

```json
{
  "id": "",
  "name": "",
  "position": "",
  "officeLevel": "",
  "politicalAffiliation": "",
  "location": {
    "state": "",
    "county": null,
    "city": "",
    "district": null,
    "latitude": 0.0,
    "longitude": 0.0
  },
  "contact": {
    "email": null,
    "phone": "",
    "website": "",
    "socialMedia": {
      "twitter": null,
      "instagram": null
    }
  },
  "photo": null,
  "bio": "",
  "termStart": "",
  "termEnd": null,
  "committeeMemberships": [],
  "votingRecord": null,
  "yearElected": 0
}
```

**Your JSON entry:**
```json

```

---

### Sources

Please list your sources for verification (official government websites, news articles, etc.):

1. 
2. 
3. 

---

### Additional Notes

_(Optional: Any additional context, special circumstances, or notes for reviewers)_

