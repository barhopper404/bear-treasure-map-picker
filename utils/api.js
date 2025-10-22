// API functions for interacting with Google Sheets backend
window.ApiUtils = {
    // Helper to strip unnecessary fields and compress data
    compressParticipant: (p) => {
        const compressed = {
            name: p.name,
            discordUser: p.discordUser,
            wantsCaptain: p.wantsCaptain
        };

        // Only include flags that are true
        if (p.lockpicker) compressed.lockpicker = true;
        if (p.healer) compressed.healer = true;
        if (p.bard) compressed.bard = true;
        if (p.meleeDPS) compressed.meleeDPS = true;
        if (p.rangedDPS) compressed.rangedDPS = true;
        if (p.tamer) compressed.tamer = true;
        if (p.summoner) compressed.summoner = true;
        if (p.tank) compressed.tank = true;
        if (p.jester) compressed.jester = true;
        if (p.isMarshall) compressed.isMarshall = true;
        if (p.isAdmin) compressed.isAdmin = true;
        if (p.isManual) compressed.isManual = true;
        if (p.isAnonymous) compressed.isAnonymous = true;

        return compressed;
    },

    compressEventData: (eventData) => {
        const compressed = {
            id: eventData.id,
            marshall: eventData.marshall,
            marshallDiscord: eventData.marshallDiscord,
            participants: eventData.participants.map(window.ApiUtils.compressParticipant),
            started: eventData.started,
            eventType: eventData.eventType,
            timestamp: eventData.timestamp
        };

        // Only include non-empty/non-default values
        if (eventData.pitTrialSettings) compressed.pitTrialSettings = eventData.pitTrialSettings;
        if (eventData.captains) compressed.captains = eventData.captains.map(window.ApiUtils.compressParticipant);
        if (eventData.teams) compressed.teams = eventData.teams;
        if (eventData.availablePlayers) compressed.availablePlayers = eventData.availablePlayers.map(window.ApiUtils.compressParticipant);
        if (eventData.pickingCaptain !== undefined) compressed.pickingCaptain = eventData.pickingCaptain;
        if (eventData.firstPicker !== undefined) compressed.firstPicker = eventData.firstPicker;
        if (eventData.currentPicker !== undefined) compressed.currentPicker = eventData.currentPicker;
        if (eventData.completed) compressed.completed = eventData.completed;
        if (eventData.winner) compressed.winner = eventData.winner;

        return compressed;
    },

    createEvent: async (eventId, characterName, discordUser, participant, eventType = 'treasureMap', pitTrialTeamSize = 5) => {
        const params = new URLSearchParams({
            action: 'createEvent',
            eventId: eventId,
            marshall: characterName,
            discordUser: JSON.stringify(discordUser),
            participantData: JSON.stringify([participant]),
            eventType: eventType,
            pitTrialTeamSize: pitTrialTeamSize.toString()
        });

        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?${params.toString()}`);
        return await response.json();
    },

    getEvent: async (eventId) => {
        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?eventId=${eventId}`);
        return await response.json();
    },

    addParticipant: async (eventId, participant) => {
        const params = new URLSearchParams({
            action: 'addParticipant',
            eventId: eventId,
            participantData: JSON.stringify(participant)
        });

        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?${params.toString()}`);
        return await response.json();
    },

    updateEvent: async (eventId, eventData) => {
        // Compress data by removing false/null fields
        const compressed = window.ApiUtils.compressEventData(eventData);
        const compressedJSON = JSON.stringify(compressed);

        const params = new URLSearchParams({
            action: 'updateEvent',
            eventId: eventId,
            eventData: compressedJSON
        });

        const url = `${window.AppConfig.SCRIPT_URL}?${params.toString()}`;

        console.log(`URL length: ${url.length} chars (original would be ~${JSON.stringify(eventData).length + 200} chars)`);

        // Check if URL is still too long
        if (url.length > 8000) {
            throw new Error(`URL too long (${url.length} chars). Please reduce number of participants.`);
        }

        const response = await fetch(url);
        return await response.json();
    },

    recordWinner: async (eventId, winningTeam) => {
        const params = new URLSearchParams({
            action: 'recordWinner',
            eventId: eventId,
            winningTeam: winningTeam
        });
    
        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?${params.toString()}`);
        return await response.json();
    },

    getLeaderboard: async () => {
        const params = new URLSearchParams({
            action: 'getLeaderboard'
        });

        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?${params.toString()}`);
        return await response.json();
    },

    getLiveEvents: async () => {
        const params = new URLSearchParams({
            action: 'getLiveEvents'
        });

        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?${params.toString()}`);
        return await response.json();
    },

    exchangeDiscordCode: async (code) => {
        const params = new URLSearchParams({
            action: 'exchangeCode',
            code: code
        });

        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?${params.toString()}`);
        return await response.json();
    },

    getAdmins: async () => {
        const params = new URLSearchParams({
            action: 'getAdmins'
        });

        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?${params.toString()}`);
        return await response.json();
    },

    changeMarshall: async (eventId, newMarshallDiscordId) => {
        const params = new URLSearchParams({
            action: 'changeMarshall',
            eventId: eventId,
            newMarshallDiscordId: newMarshallDiscordId
        });

        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?${params.toString()}`);
        return await response.json();
    },

    deleteEvent: async (eventId) => {
        const params = new URLSearchParams({
            action: 'deleteEvent',
            eventId: eventId
        });

        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?${params.toString()}`);
        return await response.json();
    },

    resetEvent: async (eventId) => {
        const params = new URLSearchParams({
            action: 'resetEvent',
            eventId: eventId
        });

        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?${params.toString()}`);
        return await response.json();
    },

    cleanupStaleEvents: async () => {
        const params = new URLSearchParams({
            action: 'cleanupStaleEvents'
        });

        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?${params.toString()}`);
        return await response.json();
    },

    // Pit Trials endpoints
    getPitTrialsLeaderboard: async () => {
        const params = new URLSearchParams({
            action: 'getPitTrialsLeaderboard'
        });

        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?${params.toString()}`);
        return await response.json();
    },

    recordPitTrialWinner: async (eventId, winningTeam) => {
        const params = new URLSearchParams({
            action: 'recordPitTrialWinner',
            eventId: eventId,
            winningTeam: winningTeam
        });

        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?${params.toString()}`);
        return await response.json();
    }
};