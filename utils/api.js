// API functions for interacting with Google Sheets backend
window.ApiUtils = {
    createEvent: async (eventId, characterName, discordUser, participant) => {
        const params = new URLSearchParams({
            action: 'createEvent',
            eventId: eventId,
            marshall: characterName,
            discordUser: JSON.stringify(discordUser),
            participantData: JSON.stringify([participant])
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
        const params = new URLSearchParams({
            action: 'updateEvent',
            eventId: eventId,
            eventData: JSON.stringify(eventData)
        });

        const response = await fetch(`${window.AppConfig.SCRIPT_URL}?${params.toString()}`);
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

    // ============================================
    // ADD TO utils/api.js (after recordWinner)
    // ============================================

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
    }
};