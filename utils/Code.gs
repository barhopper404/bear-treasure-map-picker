// Google Apps Script to handle BEAR Treasure Map Events
// Paste this into Extensions → Apps Script in your Google Sheet

// ⚠️ IMPORTANT: Replace these with your actual Discord credentials!
const DISCORD_CLIENT_ID = '1428188591263191120';
const DISCORD_CLIENT_SECRET = 'HVJ39mFwNIzxLZJfS8TyuR28Lm1EEnaq';
const REDIRECT_URI = 'https://barhopper404.github.io/bear-treasure-map-picker/';

function doGet(e) {
  try {
    const eventsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Events') || 
                        SpreadsheetApp.getActiveSpreadsheet().insertSheet('Events');
    const statsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stats') || 
                       SpreadsheetApp.getActiveSpreadsheet().insertSheet('Stats');
    
    const action = e.parameter.action;
    
    // Get leaderboard - top 10 players by wins
    if (action === 'getLeaderboard') {
      return getLeaderboard(statsSheet);
    }

    // ============================================
    // ADD TO YOUR GOOGLE APPS SCRIPT CODE.gs
    // ============================================

    // ADD THIS FUNCTION (place it after getLeaderboard function)
    function getLiveEvents(eventsSheet) {
      const dataRange = eventsSheet.getDataRange();
      const values = dataRange.getValues();
      
      const liveEvents = [];
      
      for (let i = 1; i < values.length; i++) {
        if (values[i][0]) {
          try {
            const eventData = JSON.parse(values[i][1]);
            
            // Include events that are not started OR events that are started but not completed
            if (!eventData.started || (eventData.started && !eventData.completed)) {
              liveEvents.push({
                id: eventData.id,
                marshall: eventData.marshall,
                participantCount: eventData.participants ? eventData.participants.length : 0,
                timestamp: eventData.timestamp,
                started: eventData.started || false
              });
            }
          } catch (e) {
            // Skip invalid JSON
            continue;
          }
        }
      }
      
      // Sort by most recent first
      liveEvents.sort(function(a, b) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      // Limit to 10
      return liveEvents.slice(0, 10);
    }

    // ============================================
    // ADD THIS CASE TO YOUR doGet FUNCTION
    // (Add it right after the getLeaderboard case)
    // ============================================

    // Get live events
    if (action === 'getLiveEvents') {
      const liveEvents = getLiveEvents(eventsSheet);
      return createResponse({ success: true, liveEvents: liveEvents });
    }

    // Get admin list
    if (action === 'getAdmins') {
      const admins = getAdminList();
      return createResponse({ success: true, admins: admins });
    }

    // Change Marshall (Admin only)
    if (action === 'changeMarshall') {
      const eventId = e.parameter.eventId;
      const newMarshallDiscordId = e.parameter.newMarshallDiscordId;
      return changeMarshall(eventId, newMarshallDiscordId, eventsSheet);
    }

    // Delete/Cancel Event
    if (action === 'deleteEvent') {
      const eventId = e.parameter.eventId;
      return deleteEvent(eventId, eventsSheet);
    }

    // Reset Event (Re-roll captains)
    if (action === 'resetEvent') {
      const eventId = e.parameter.eventId;
      return resetEvent(eventId, eventsSheet);
    }

    // Record winner
    if (action === 'recordWinner') {
      return recordWinner(e, eventsSheet, statsSheet);
    }
    
    // Handle Discord OAuth callback
    if (action === 'exchangeCode') {
      return exchangeDiscordCode(e.parameter.code);
    }
    
    // Create event
    if (action === 'createEvent') {
      return createEvent(e, eventsSheet);
    }
    
    // Add participant
    if (action === 'addParticipant') {
      return addParticipant(e, eventsSheet);
    }
    
    // Update event
    if (action === 'updateEvent') {
      return updateEvent(e, eventsSheet);
    }
    
    // Get event
    if (action === 'getEvent' || e.parameter.eventId) {
      return getEvent(e, eventsSheet);
    }
    
    return createResponse({ success: false, error: 'Unknown action' });
  } catch (error) {
    return createResponse({ success: false, error: error.toString(), stack: error.stack });
  }
}

function getLeaderboard(statsSheet) {
  const dataRange = statsSheet.getDataRange();
  const values = dataRange.getValues();
  
  if (values.length <= 1) {
    return createResponse({ success: true, leaderboard: [] });
  }
  
  const players = [];
  for (let i = 1; i < values.length; i++) {
    if (values[i][0]) {
      players.push({
        discordId: values[i][0],
        username: values[i][1],
        wins: values[i][2] || 0,
        losses: values[i][3] || 0,
        mapsCompleted: values[i][4] || 0
      });
    }
  }
  
  players.sort(function(a, b) { return b.wins - a.wins; });
  const top10 = players.slice(0, 10);
  
  return createResponse({ success: true, leaderboard: top10 });
}

function recordWinner(e, eventsSheet, statsSheet) {
  const eventId = e.parameter.eventId;
  const winningTeam = e.parameter.winningTeam;
  
  const eventRange = eventsSheet.getDataRange();
  const eventValues = eventRange.getValues();
  
  let eventData = null;
  let eventRowIndex = -1;
  
  for (let i = 0; i < eventValues.length; i++) {
    if (eventValues[i][0] === eventId) {
      eventData = JSON.parse(eventValues[i][1]);
      eventRowIndex = i;
      break;
    }
  }
  
  if (!eventData) {
    return createResponse({ success: false, error: 'Event not found' });
  }
  
  eventData.completed = true;
  eventData.winner = winningTeam;
  eventData.completedAt = new Date().toISOString();
  
  eventsSheet.getRange(eventRowIndex + 1, 2).setValue(JSON.stringify(eventData));
  
  const statsRange = statsSheet.getDataRange();
  const statsValues = statsRange.getValues();
  
  if (statsValues.length === 0 || !statsValues[0][0]) {
    statsSheet.appendRow(['Discord ID', 'Username', 'Wins', 'Losses', 'Maps Completed']);
  }
  
  const captainIndex = winningTeam === 'captain1' ? 0 : 1;
  const winningCaptain = eventData.captains[captainIndex];
  const losingCaptain = eventData.captains[captainIndex === 0 ? 1 : 0];
  
  const winningTeamMembers = [winningCaptain];
  if (eventData.teams && eventData.teams[winningTeam]) {
    winningTeamMembers.push.apply(winningTeamMembers, eventData.teams[winningTeam]);
  }
  
  const losingTeamKey = winningTeam === 'captain1' ? 'captain2' : 'captain1';
  const losingTeamMembers = [losingCaptain];
  if (eventData.teams && eventData.teams[losingTeamKey]) {
    losingTeamMembers.push.apply(losingTeamMembers, eventData.teams[losingTeamKey]);
  }
  
  for (let i = 0; i < winningTeamMembers.length; i++) {
    if (winningTeamMembers[i] && winningTeamMembers[i].discordUser && !winningTeamMembers[i].isAnonymous && !winningTeamMembers[i].discordUser.isAnonymous) {
      updatePlayerStats(statsSheet, winningTeamMembers[i].discordUser, 'win');
    }
  }

  for (let i = 0; i < losingTeamMembers.length; i++) {
    if (losingTeamMembers[i] && losingTeamMembers[i].discordUser && !losingTeamMembers[i].isAnonymous && !losingTeamMembers[i].discordUser.isAnonymous) {
      updatePlayerStats(statsSheet, losingTeamMembers[i].discordUser, 'loss');
    }
  }
  
  return createResponse({ success: true, eventData: eventData });
}

function exchangeDiscordCode(code) {
  const tokenResponse = UrlFetchApp.fetch('https://discord.com/api/oauth2/token', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    payload: {
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI
    },
    muteHttpExceptions: true
  });
  
  const tokenData = JSON.parse(tokenResponse.getContentText());
  
  if (tokenData.access_token) {
    const userResponse = UrlFetchApp.fetch('https://discord.com/api/users/@me', {
      headers: {
        'Authorization': 'Bearer ' + tokenData.access_token
      }
    });
    
    const userData = JSON.parse(userResponse.getContentText());
    
    return createResponse({
      success: true,
      user: {
        id: userData.id,
        username: userData.username,
        discriminator: userData.discriminator,
        avatar: userData.avatar
      }
    });
  }
  
  return createResponse({ success: false, error: 'Failed to get access token', details: tokenData });
}

function createEvent(e, eventsSheet) {
  const eventId = e.parameter.eventId;
  const marshall = e.parameter.marshall;
  const discordUser = JSON.parse(e.parameter.discordUser);
  const participants = JSON.parse(e.parameter.participantData || '[]');
  
  const eventData = {
    id: eventId,
    marshall: marshall,
    marshallDiscord: discordUser,
    participants: participants,
    started: false,
    timestamp: new Date().toISOString()
  };
  
  eventsSheet.appendRow([eventId, JSON.stringify(eventData)]);
  return createResponse({ success: true, eventData: eventData });
}

function addParticipant(e, eventsSheet) {
  const eventId = e.parameter.eventId;
  const participant = JSON.parse(e.parameter.participantData);
  const dataRange = eventsSheet.getDataRange();
  const values = dataRange.getValues();
  
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === eventId) {
      const eventData = JSON.parse(values[i][1]);
      eventData.participants.push(participant);
      eventsSheet.getRange(i + 1, 2).setValue(JSON.stringify(eventData));
      return createResponse({ success: true, eventData: eventData });
    }
  }
  
  return createResponse({ success: false, error: 'Event not found' });
}

function updateEvent(e, eventsSheet) {
  const eventId = e.parameter.eventId;
  const updatedEventData = JSON.parse(e.parameter.eventData);
  const dataRange = eventsSheet.getDataRange();
  const values = dataRange.getValues();
  
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === eventId) {
      eventsSheet.getRange(i + 1, 2).setValue(JSON.stringify(updatedEventData));
      return createResponse({ success: true, eventData: updatedEventData });
    }
  }
  
  return createResponse({ success: false, error: 'Event not found' });
}

function getEvent(e, eventsSheet) {
  const eventId = e.parameter.eventId;
  
  if (!eventId) {
    return createResponse({ success: false, error: 'No event ID provided' });
  }
  
  const dataRange = eventsSheet.getDataRange();
  const values = dataRange.getValues();
  
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === eventId) {
      const eventData = JSON.parse(values[i][1]);
      return createResponse({ success: true, eventData: eventData });
    }
  }
  
  return createResponse({ success: false, error: 'Event not found' });
}

function updatePlayerStats(statsSheet, discordUser, result) {
  const dataRange = statsSheet.getDataRange();
  const values = dataRange.getValues();
  
  let playerRow = -1;
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === discordUser.id) {
      playerRow = i;
      break;
    }
  }
  
  if (playerRow === -1) {
    const wins = result === 'win' ? 1 : 0;
    const losses = result === 'loss' ? 1 : 0;
    statsSheet.appendRow([
      discordUser.id,
      discordUser.username,
      wins,
      losses,
      1
    ]);
  } else {
    const wins = (values[playerRow][2] || 0) + (result === 'win' ? 1 : 0);
    const losses = (values[playerRow][3] || 0) + (result === 'loss' ? 1 : 0);
    const mapsCompleted = (values[playerRow][4] || 0) + 1;
    
    statsSheet.getRange(playerRow + 1, 2).setValue(discordUser.username);
    statsSheet.getRange(playerRow + 1, 3).setValue(wins);
    statsSheet.getRange(playerRow + 1, 4).setValue(losses);
    statsSheet.getRange(playerRow + 1, 5).setValue(mapsCompleted);
  }
}

function createResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// ADMIN FUNCTIONS
// ============================================

function getAdminList() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let adminSheet = ss.getSheetByName('admin');

  // Create admin sheet if it doesn't exist
  if (!adminSheet) {
    adminSheet = ss.insertSheet('admin');
    adminSheet.appendRow(['Discord ID', 'Username', 'Notes']);
  }

  const data = adminSheet.getDataRange().getValues();
  const admins = [];

  // Skip header row (index 0)
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]) { // If Discord ID exists
      admins.push({
        discordId: data[i][0].toString(),
        username: data[i][1] || '',
        notes: data[i][2] || ''
      });
    }
  }

  return admins;
}

function changeMarshall(eventId, newMarshallDiscordId, eventsSheet) {
  if (!eventsSheet) {
    return createResponse({ success: false, error: 'Events sheet not found' });
  }

  const data = eventsSheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === eventId) {
      const eventData = JSON.parse(data[i][1]);

      // Find the new marshall in participants
      const newMarshall = eventData.participants.find(function(p) {
        return p.discordUser && p.discordUser.id === newMarshallDiscordId;
      });

      if (!newMarshall) {
        return createResponse({ success: false, error: 'New marshall not found in participants' });
      }

      // Update all participants - remove old marshall flag, add new one
      eventData.participants = eventData.participants.map(function(p) {
        return {
          name: p.name,
          discordUser: p.discordUser,
          wantsCaptain: p.wantsCaptain,
          lockpicker: p.lockpicker,
          healer: p.healer,
          bard: p.bard,
          meleeDPS: p.meleeDPS,
          rangedDPS: p.rangedDPS,
          tamer: p.tamer,
          summoner: p.summoner,
          tank: p.tank,
          jester: p.jester,
          isMarshall: p.discordUser && p.discordUser.id === newMarshallDiscordId,
          isAdmin: p.isAdmin || false,
          isManual: p.isManual || false
        };
      });

      eventData.marshall = newMarshall.name;

      eventsSheet.getRange(i + 1, 2).setValue(JSON.stringify(eventData));

      return createResponse({ success: true, eventData: eventData });
    }
  }

  return createResponse({ success: false, error: 'Event not found' });
}

function deleteEvent(eventId, eventsSheet) {
  if (!eventsSheet) {
    return createResponse({ success: false, error: 'Events sheet not found' });
  }

  const data = eventsSheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === eventId) {
      // Delete the row
      eventsSheet.deleteRow(i + 1);
      return createResponse({ success: true, message: 'Event deleted successfully' });
    }
  }

  return createResponse({ success: false, error: 'Event not found' });
}

function resetEvent(eventId, eventsSheet) {
  if (!eventsSheet) {
    return createResponse({ success: false, error: 'Events sheet not found' });
  }

  const data = eventsSheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === eventId) {
      try {
        const eventData = JSON.parse(data[i][1]);

        // Reset the event back to lobby state
        eventData.started = false;
        eventData.captains = [];
        eventData.teams = { captain1: [], captain2: [] };
        eventData.currentPicker = 0;
        eventData.firstPicker = 0;
        eventData.deferredFirstPick = false;
        eventData.availablePlayers = [];
        eventData.wheelSpinning = false;
        eventData.wheelSpinPhase = null;
        eventData.wheelCandidates = null;
        eventData.wheelWinner = null;

        // Keep all participants intact - they stay in the event
        // Keep marshall, settings, and other configuration

        eventsSheet.getRange(i + 1, 2).setValue(JSON.stringify(eventData));
        return createResponse({ success: true, eventData: eventData, message: 'Event reset successfully' });
      } catch (e) {
        return createResponse({ success: false, error: 'Failed to parse event data: ' + e.toString() });
      }
    }
  }

  return createResponse({ success: false, error: 'Event not found' });
}

