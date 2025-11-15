## Adding a New Elected Official

Thank you for contributing to the Socialist and Democratic Socialist Officials map! Please follow this template to ensure all necessary information is provided.

> **📌 Note for Officials-Elect:** You may submit this PR for officials who have won elections but haven't taken office yet. Your PR will remain open and will be merged after the official is sworn in and their term begins. This allows you to contribute early while maintaining data accuracy on the live site.

---

### Official Information

#### Basic Details
- **Full Name**: 
- **Position/Title**: _(e.g., "U.S. Representative, NY-14" or "Mayor of Jackson")_
- **Office Level**: _(federal / state / county / city)_
- **Political Affiliation**: _(e.g., "Democratic Socialist", "Socialist Alternative")_
- **Year Elected**: _(Year first elected to current position)_
- **Term Start Date**: _(Format: YYYY-MM-DD - use actual swearing-in date even if in the future)_
- **Term End Date**: _(Format: YYYY-MM-DD, or leave blank if currently serving)_
- **⏳ Official Has Taken Office?**: _(Yes / No - if No, this PR will be merged after they take office)_

#### Location Details
- **State**: _(Two-letter state code, e.g., NY, CA, TX)_
- **County**: _(County name, or leave blank if not applicable)_
- **City**: _(City name)_
- **District**: _(District number/name if applicable, otherwise leave blank)_
- **Latitude**: _(Decimal degrees, e.g., 40.8448)_
- **Longitude**: _(Decimal degrees, e.g., -73.8648)_

> **Tip**: Use [LatLong.net](https://www.latlong.net/) or Google Maps to find coordinates for the official's primary office or district center.

#### Contact Information
- **Email**: _(Official government email - use null if not yet available)_
- **Phone**: _(Format: (XXX) XXX-XXXX - use null if not yet available)_
- **Official Website**: _(Full URL - use null if not yet available)_
- **Twitter/X Handle**: _(Include @ symbol, e.g., @AOC - campaign/personal account OK if official not yet available)_
- **Instagram Handle**: _(Include @ symbol, or leave blank)_
- **Other Social Media**: _(Optional - specify platform and handle)_

#### Additional Information
- **Biography**: _(2-3 sentence summary of the official's background, key policy focuses, and accomplishments. **For officials-elect**, include: "[Name] was elected in [month/year] and will take office on [date]. A [affiliation] member, they advocate for..." Keep it factual and concise.)_

- **Photo URL**: _(Direct link to official headshot from government website, or leave blank)_

- **Committee Memberships**: _(List all committee assignments, one per line. **For officials-elect**, leave blank - committees are typically assigned after taking office.)_
  - 
  - 
  - 

- **Voting Record URL**: _(Link to official voting record if available. **For officials-elect**, leave blank - set to null.)_

---

### Checklist

Before submitting this PR, please verify:

- [ ] I have verified this person has been elected to office (certified election results)
- [ ] I have confirmed their Democratic Socialist or Socialist political affiliation through reliable sources
- [ ] Contact information is from official government sources (or marked as null if not yet available for officials-elect)
- [ ] Coordinates accurately represent the district/jurisdiction center or main office location
- [ ] The biography is factual, neutral in tone, and properly summarizes their platform
- [ ] **For officials-elect:** Bio mentions election date and future term start date
- [ ] I have used the correct date format (YYYY-MM-DD) for term dates
- [ ] I have assigned a unique ID following the naming pattern: `[initials]-[number]` (e.g., "aoc-001", "bs-001")
- [ ] I have validated the JSON syntax using a JSON validator
- [ ] I have placed the new entry in the appropriate location in the array (alphabetically by last name is preferred)
- [ ] **For officials-elect:** I understand this PR will remain open until the official takes office

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

