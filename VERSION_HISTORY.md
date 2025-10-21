# Version History

This file tracks all version updates for the BEAR Guild Treasure Map Team Picker.

## 📝 How to Update Version

When making code changes, update the version in `utils/config.js`:

```javascript
VERSION_NUMBER: 'v2.X.X',      // Increment based on change size
VERSION_NAME: 'Feature Name',  // Brief description of main feature
BUILD_DATE: 'YYYY-MM-DD',      // Today's date
```

### Version Numbering Guide:

- **Major (v2.0.0 → v3.0.0)**: Breaking changes, major redesigns
- **Minor (v2.0.0 → v2.1.0)**: New features, significant additions
- **Patch (v2.0.0 → v2.0.1)**: Bug fixes, small tweaks

---

## Version History

### v2.0.0 - Theme System & Avatars (2025-01-10)

**Major Features:**
- ✅ Dark/Light mode theme toggle on all pages
- ✅ Discord avatar display next to character names
- ✅ Fallback to Bearhop.png for manual/anonymous users
- ✅ Favicon implementation
- ✅ Re-roll button for captain selection
- ✅ Automatic cleanup of stale events (24h+ to Archive)
- ✅ Random map coordinate generator for testing
- ✅ Comprehensive theme system with 50+ variables

**Components Added:**
- Avatar.js - Discord avatar display
- CharacterBadge.js - Avatar + name badge
- ThemeToggle.js - Dark/light mode toggle
- theme.js - Theme configuration

**Backend:**
- resetEvent action - Re-roll captains
- cleanupStaleEvents action - Archive old events
- Archive sheet auto-creation

**Files Modified:**
- All view components updated with theme system
- All views show Discord avatars
- index.html - Added favicon links

---

### v1.4.0 - Manual Player Addition (Previous)

**Features:**
- Manual player addition by Marshall
- Role assignment for manual players
- Discord OAuth integration

---

## 🔄 Changelog Template

When updating, copy this template and fill it in:

```markdown
### vX.X.X - Feature Name (YYYY-MM-DD)

**Features:**
- ✅ Feature description

**Bug Fixes:**
- 🐛 Bug fix description

**Technical:**
- Changes to backend
- Changes to frontend
- New dependencies

**Files Modified:**
- filename.js - what changed

---
```

## 📊 Current Stats

- **Total Versions:** 2
- **Latest Version:** v2.0.0
- **Last Updated:** 2025-01-10
- **Components:** 15+
- **Views:** 9
- **Utility Files:** 4

---

## 🎯 Upcoming Features

Track planned features here:

- [ ] Feature idea 1
- [ ] Feature idea 2
- [ ] Bug fix for X

---

**Note:** Always update this file when bumping the version number!
