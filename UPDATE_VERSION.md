# ⚡ Quick Version Update Guide

## Every Time You Make Code Changes:

### Step 1: Update `utils/config.js`

Open `utils/config.js` and update these 3 lines:

```javascript
VERSION_NUMBER: 'v2.1.0',           // ← Bump this number
VERSION_NAME: 'Your Feature Name',  // ← Describe the change
BUILD_DATE: '2025-01-10',          // ← Today's date (YYYY-MM-DD)
```

### Step 2: Update `VERSION_HISTORY.md`

Add a new entry at the top with your changes:

```markdown
### v2.1.0 - Your Feature Name (2025-01-10)

**Features:**
- ✅ What you added

**Bug Fixes:**
- 🐛 What you fixed

**Files Modified:**
- filename.js - what changed
```

### Step 3: Done! 🎉

The version will automatically appear at the bottom of every page.

---

## Version Number Guide

**When to bump which number:**

### Patch (v2.0.0 → v2.0.1)
- Small bug fixes
- Typo corrections
- Minor UI tweaks
- Performance improvements

**Example:**
```javascript
VERSION_NUMBER: 'v2.0.1',
VERSION_NAME: 'Bug Fixes',
BUILD_DATE: '2025-01-11',
```

### Minor (v2.0.0 → v2.1.0)
- New features
- New components
- Significant improvements
- New functionality

**Example:**
```javascript
VERSION_NUMBER: 'v2.1.0',
VERSION_NAME: 'Add Player Stats',
BUILD_DATE: '2025-01-11',
```

### Major (v2.0.0 → v3.0.0)
- Complete redesign
- Breaking changes
- Major rewrites
- Fundamental changes

**Example:**
```javascript
VERSION_NUMBER: 'v3.0.0',
VERSION_NAME: 'Complete Redesign',
BUILD_DATE: '2025-01-11',
```

---

## Examples

### Adding a new feature:
```javascript
VERSION_NUMBER: 'v2.1.0',
VERSION_NAME: 'Team Statistics',
BUILD_DATE: '2025-01-15',
```

### Fixing bugs:
```javascript
VERSION_NUMBER: 'v2.0.1',
VERSION_NAME: 'Timer Bug Fix',
BUILD_DATE: '2025-01-12',
```

### Multiple features:
```javascript
VERSION_NUMBER: 'v2.2.0',
VERSION_NAME: 'Stats & Notifications',
BUILD_DATE: '2025-01-20',
```

---

## Current Version Display

The version appears at the bottom of every page:

```
v2.0.0 - Theme System & Avatars (2025-01-10)
```

Format: `{VERSION_NUMBER} - {VERSION_NAME} ({BUILD_DATE})`

---

## Quick Checklist

Before deploying changes:

- [ ] Updated `VERSION_NUMBER` in config.js
- [ ] Updated `VERSION_NAME` in config.js
- [ ] Updated `BUILD_DATE` in config.js
- [ ] Added entry to VERSION_HISTORY.md
- [ ] Tested the application
- [ ] Committed changes to Git (if using)

---

**That's it!** The version will automatically update across all pages. 🚀
