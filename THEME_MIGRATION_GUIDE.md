# Theme System Migration Guide

This guide explains how to update all views to use the new theme system for dark/light mode support.

## ✅ Completed

- ✅ Created `utils/theme.js` with theme configuration
- ✅ Added theme state management to `app.js`
- ✅ Created `ThemeToggle.js` component
- ✅ Updated `HomeView.js` to use theme system
- ✅ Added theme script to `index.html`
- ✅ Added ThemeToggle component to `index.html`

## 📋 Remaining Work

### For Each View Component

Each view needs three changes:

#### 1. Add Theme Props to Component Signature

```javascript
// BEFORE:
window.SomeView = ({ characterName, ...otherProps }) => {

// AFTER:
window.SomeView = ({ characterName, ...otherProps, theme, isDarkMode, onToggleTheme }) => {
```

#### 2. Add ThemeToggle Component (at top of returned JSX)

```javascript
return (
    <div className={`min-h-screen ${theme.pageBg} p-8`}>
        <window.ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
        {/* rest of content */}
    </div>
);
```

#### 3. Replace Hardcoded Colors with Theme Variables

Use this mapping guide:

| Old Hardcoded Class | Theme Variable |
|---------------------|----------------|
| `bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900` | `${theme.pageBg}` |
| `bg-gray-800/60` | `${theme.cardBg}` |
| `bg-gray-700/30` | `${theme.overlayBg}` |
| `bg-gray-700/40` | `${theme.darkOverlayBg}` |
| `text-yellow-400` (headings) | `${theme.headingPrimary}` |
| `text-yellow-300` (subheadings) | `${theme.headingSecondary}` |
| `text-white` | `${theme.textPrimary}` |
| `text-gray-300` | `${theme.textSecondary}` |
| `text-gray-400` | `${theme.textMuted}` |
| `border-yellow-500` | `${theme.borderPrimary}` |
| `border-gray-600` | `${theme.borderSecondary}` |
| `border-green-500` | `${theme.borderSuccess}` |
| `bg-yellow-600 hover:bg-yellow-700` | `${theme.btnPrimary}` |
| `text-gray-900` (on yellow buttons) | `${theme.btnPrimaryText}` |
| `bg-green-600 hover:bg-green-700` | `${theme.btnSuccess}` |
| `text-white` (on green buttons) | `${theme.btnSuccessText}` |
| `bg-red-600 hover:bg-red-700` | `${theme.btnDanger}` |
| `text-white` (on red buttons) | `${theme.btnDangerText}` |
| `bg-gray-600 hover:bg-gray-700` | `${theme.btnSecondary}` |
| `text-white` (on gray buttons) | `${theme.btnSecondaryText}` |
| `bg-indigo-600 hover:bg-indigo-700` | `${theme.btnDiscord}` |
| `text-white` (on discord buttons) | `${theme.btnDiscordText}` |
| `bg-gray-700 opacity-50` | `${theme.btnDisabled}` |
| `bg-blue-900/60` | `${theme.team1Bg}` |
| `border-blue-500` | `${theme.team1Border}` |
| `text-blue-300` | `${theme.team1Text}` |
| `bg-blue-600 hover:bg-blue-700` | `${theme.team1Btn}` |
| `bg-blue-600` (avatar) | `${theme.team1Avatar}` |
| `bg-red-900/60` | `${theme.team2Bg}` |
| `border-red-500` | `${theme.team2Border}` |
| `text-red-300` | `${theme.team2Text}` |
| `bg-red-600 hover:bg-red-700` | `${theme.team2Btn}` |
| `bg-red-600` (avatar) | `${theme.team2Avatar}` |
| `bg-green-900/60 border-green-500 text-green-200` | `${theme.statusActive}` |
| `bg-gray-900/60 border-gray-500 text-gray-300` | `${theme.statusWaiting}` |
| `bg-red-600/80 border-red-400 text-white` | `${theme.statusAlert}` |
| `bg-purple-900/60 border-purple-500 text-purple-200` | `${theme.statusInfo}` |
| `bg-purple-600` (marshall badge) | `${theme.badgeMarshall}` |
| `bg-indigo-600` (admin badge) | `${theme.badgeAdmin}` |
| `bg-gray-500` (guest badge) | `${theme.badgeGuest}` |
| `bg-yellow-600 text-gray-900` (captain badge) | `${theme.badgeCaptain}` |
| `bg-yellow-600 text-gray-900` (character badge) | `${theme.badgeCharacter}` |
| `bg-gray-600` (anonymous badge) | `${theme.badgeAnonymous}` |
| `bg-green-500` (live active) | `${theme.liveActive}` |
| `bg-yellow-500` (live waiting) | `${theme.liveWaiting}` |
| `bg-red-500/20 border border-red-500 text-red-200` | `${theme.alertError}` |
| `bg-yellow-600/20 border border-yellow-500 text-yellow-200` | `${theme.alertWarning}` |
| `bg-blue-600/20 border border-blue-500 text-blue-200` | `${theme.alertInfo}` |
| `bg-gray-700 border-gray-600` | `${theme.inputBg}` |
| `text-white` (input text) | `${theme.inputText}` |
| `placeholder-gray-400` | `${theme.inputPlaceholder}` |
| `focus:border-yellow-500 focus:ring focus:ring-yellow-500/20` | `${theme.inputFocus}` |
| `bg-yellow-600` (timer normal) | `${theme.timerNormal}` |
| `bg-red-600 animate-pulse` (timer alert) | `${theme.timerAlert}` |
| `text-yellow-400` (timer text) | `${theme.timerText}` |
| `text-yellow-500` (version footer) | `${theme.versionText}` |
| `border-yellow-400` (winner) | `${theme.winnerBorder}` |
| `border-4 border-yellow-400` (winner badge) | `${theme.winnerBadge}` |

### Special Cases

#### MapPickingView & CompleteView (Treasure Theme)
These views use a special "treasure" color palette:

```javascript
// Use treasure theme variables instead of regular ones:
${theme.treasurePageBg}      // Instead of pageBg
${theme.treasureCardBg}      // Instead of cardBg
${theme.treasureOverlayBg}   // Instead of overlayBg
${theme.treasureHeading}     // Instead of headingPrimary
${theme.treasureSubheading}  // Instead of headingSecondary
${theme.treasureBorder}      // Instead of borderPrimary
${theme.treasureBtn}         // Instead of btnPrimary
${theme.treasureVersion}     // Instead of versionText
```

#### Input Fields
Full input field example:

```javascript
<input
    type="text"
    className={`w-full ${theme.inputBg} ${theme.inputText} ${theme.inputPlaceholder} border rounded px-4 py-2 ${theme.inputFocus}`}
    placeholder="Enter name..."
/>
```

### 4. Update app.js View Renders

For each view in app.js, add theme props:

```javascript
// BEFORE:
if (view === 'someView') {
    return (
        <window.SomeView
            characterName={characterName}
            // ... other props
        />
    );
}

// AFTER:
if (view === 'someView') {
    return (
        <window.SomeView
            characterName={characterName}
            // ... other props
            theme={theme}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
        />
    );
}
```

## 📝 Views to Update

### Priority 1 (Main User Flow)
1. ✅ HomeView.js - COMPLETED
2. ⏳ CreateEventView.js
3. ⏳ JoinEventView.js
4. ⏳ LobbyView.js

### Priority 2 (Game Flow)
5. ⏳ CaptainRevealView.js
6. ⏳ CaptainChoiceView.js (partially done - has re-roll button)
7. ⏳ TeamPickingView.js
8. ⏳ MapPickingView.js
9. ⏳ CompleteView.js

## 🎨 Testing Light Mode

After migration, test both modes:
1. Click the theme toggle button (top-right)
2. Verify all colors change appropriately
3. Check readability of all text
4. Ensure buttons are clearly visible
5. Verify status badges are distinguishable

## 💡 Tips

- Keep team colors (blue/red) and role icon colors unchanged - they should look the same in both modes
- Green/yellow status indicators can remain the same
- Focus on changing backgrounds, borders, and text colors
- The theme persists in localStorage automatically

## 🔧 Example: Updating a Simple View

```javascript
// BEFORE
window.SimpleView = ({ characterName, onBack }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
            <div className="bg-gray-800/60 rounded-lg p-8 border-2 border-yellow-500">
                <h1 className="text-4xl font-bold text-yellow-400 mb-4">Title</h1>
                <p className="text-gray-300 mb-4">Some text</p>
                <button
                    onClick={onBack}
                    className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold py-2 px-4 rounded"
                >
                    Back
                </button>
            </div>
            <div className="text-center mt-4 text-yellow-500 text-sm">
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};

// AFTER
window.SimpleView = ({ characterName, onBack, theme, isDarkMode, onToggleTheme }) => {
    return (
        <div className={`min-h-screen ${theme.pageBg} p-8`}>
            <window.ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
            <div className={`${theme.cardBg} rounded-lg p-8 border-2 ${theme.borderPrimary}`}>
                <h1 className={`text-4xl font-bold ${theme.headingPrimary} mb-4`}>Title</h1>
                <p className={`${theme.textSecondary} mb-4`}>Some text</p>
                <button
                    onClick={onBack}
                    className={`${theme.btnPrimary} ${theme.btnPrimaryText} font-bold py-2 px-4 rounded`}
                >
                    Back
                </button>
            </div>
            <div className={`text-center mt-4 ${theme.versionText} text-sm`}>
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};
```

## 📊 Progress Tracking

- [ ] CreateEventView.js
- [ ] JoinEventView.js
- [ ] LobbyView.js
- [ ] CaptainRevealView.js
- [ ] CaptainChoiceView.js
- [ ] TeamPickingView.js
- [ ] MapPickingView.js
- [ ] CompleteView.js
- [ ] app.js (update all view renders)

---

**Note:** HomeView is already complete and can serve as a reference example for the pattern to follow.
