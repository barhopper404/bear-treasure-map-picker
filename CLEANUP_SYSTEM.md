# Stale Event Cleanup System

This document explains how the automatic cleanup and archiving system works for events older than 24 hours.

## 📋 Overview

The system automatically moves events older than 24 hours from the "Events" sheet to an "Archive" sheet in Google Sheets. This keeps your active events list clean and prevents clutter.

## 🔧 How It Works

### Automatic Cleanup

**When:** Cleanup runs automatically every time the HomeView loads (when fetching live events)

**What gets archived:**
- Any event with a timestamp older than 24 hours
- Events with invalid JSON data (cleanup for corrupted entries)

**What happens:**
1. Event is copied to the "Archive" sheet with:
   - Original Event ID
   - Original Event Data (JSON)
   - Archive timestamp
2. Event is removed from the "Events" sheet
3. The event no longer appears in live events or can be joined

### Manual Cleanup

Admins can also trigger cleanup manually by calling:

```javascript
const result = await window.ApiUtils.cleanupStaleEvents();
console.log(result.message); // "Archived X stale event(s)"
```

## 📊 Archive Sheet Structure

The Archive sheet has 3 columns:

| Column | Description |
|--------|-------------|
| Event ID | The unique identifier of the event |
| Event Data | Full JSON data of the event (all participants, settings, etc.) |
| Archived Date | ISO timestamp of when the event was archived |

## 🎯 Benefits

1. **Clean Active Events List**
   - Only shows recent, relevant events
   - Improves performance when loading live events
   - Easier to find active games

2. **Data Preservation**
   - Old events aren't deleted, just moved
   - Can review past events in the Archive sheet
   - Useful for debugging or analysis

3. **Automatic Maintenance**
   - No manual intervention needed
   - Runs seamlessly in the background
   - Keeps the system healthy

## 🔍 When Cleanup Runs

Cleanup is triggered in these scenarios:

### 1. **Home Page Load**
When users visit the home page, it fetches live events which triggers cleanup:
```javascript
// Automatically runs when HomeView mounts
useEffect(() => {
    const fetchData = async () => {
        const liveEventsResult = await window.ApiUtils.getLiveEvents();
        // Cleanup happens automatically during this call
    };
    fetchData();
}, []);
```

### 2. **Manual Trigger**
Admins can manually trigger cleanup:
```javascript
await window.ApiUtils.cleanupStaleEvents();
```

## ⚙️ Backend Implementation

### Code.gs Functions

**cleanupStaleEvents(eventsSheet)**
- Lines 527-593 in Code.gs
- Checks all events for age
- Moves events older than 24h to Archive
- Deletes from Events sheet

**Automatic Trigger**
- Lines 72-73 in doGet()
- Runs before getLiveEvents returns
- Silent operation, doesn't affect response time significantly

## 📝 Example Flow

1. User creates event at **Monday 10:00 AM**
2. Event shows in "Live Events" on home page
3. Event is active all day Monday and Tuesday morning
4. **Tuesday 10:01 AM**: 24 hours have passed
5. Next time someone loads the home page:
   - Cleanup runs automatically
   - Event is moved to Archive sheet
   - Event no longer shows in Live Events
6. Event data is safely stored in Archive for future reference

## 🛠️ Configuration

### Changing the Cleanup Threshold

To change from 24 hours to a different duration, edit Code.gs line 544:

```javascript
// Current: 24 hours
const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

// Example: 48 hours
const twentyFourHoursInMs = 48 * 60 * 60 * 1000;

// Example: 12 hours
const twentyFourHoursInMs = 12 * 60 * 60 * 1000;
```

## 🚨 Important Notes

1. **Archive sheet is created automatically** on first cleanup
2. **Cleanup is silent** - no user notification (runs in background)
3. **Archived events can be restored manually** by copying back to Events sheet
4. **Only incomplete/active events appear in Live Events** - completed events don't show but aren't archived
5. **System handles invalid JSON gracefully** - corrupted entries are archived and cleaned up

## 📊 Monitoring

To see how many events were archived:

```javascript
const result = await window.ApiUtils.cleanupStaleEvents();
console.log(`Archived ${result.archivedCount} events`);
```

## 🔄 Recovery Process

If you need to restore an archived event:

1. Open Google Sheets
2. Go to "Archive" tab
3. Find the event by Event ID or Archived Date
4. Copy the Event ID and Event Data
5. Add a new row to "Events" sheet with:
   - Column A: Event ID
   - Column B: Event Data (JSON)
6. The event will appear in Live Events again

## 💡 Tips

- Check the Archive sheet periodically to see cleanup activity
- Use Archive data for analytics (e.g., how many events per day)
- Archive sheet can be exported to CSV for long-term storage
- Consider adding a time-based trigger in Google Apps Script for even more automation

---

**Implementation Complete:** All cleanup functionality is now active and working!
