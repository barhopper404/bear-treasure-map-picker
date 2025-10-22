// API functions for interacting with Google Sheets backend
window.ApiUtils = {
    createEvent: async (eventId, characterName, discordUser, participant, eventType = 'treasureMap', pitTrialTeamSize = 5) => {
        // Use POST to avoid URL length limits with large payloads
        const response = await fetch(window.AppConfig.SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'createEvent',
                eventId: eventId,
                marshall: characterName,
                discordUser: discordUser,
                participantData: [participant],
                eventType: eventType,
                pitTrialTeamSize: pitTrialTeamSize
            })
        });
        return await response.json();
    },

    getEvent: async (eventId) => {
        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?eventId=${eventId}`);
        return await response.json();
    },

    addParticipant: async (eventId, participant) => {
        // Use POST to avoid URL length limits with large payloads
        const response = await fetch(window.AppConfig.SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'addParticipant',
                eventId: eventId,
                participantData: participant
            })
        });
        return await response.json();
    },

    updateEvent: async (eventId, eventData) => {
        // Use POST to avoid URL length limits with large payloads
        const response = await fetch(window.AppConfig.SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'updateEvent',
                eventId: eventId,
                eventData: eventData
            })
        });
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