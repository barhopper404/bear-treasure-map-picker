// localStorage helper functions
window.StorageUtils = {
    saveCharacterName: (name) => {
        try {
            localStorage.setItem('bearCharacterName', name);
        } catch (e) {
            console.log('localStorage not available:', e);
        }
    },

    getCharacterName: () => {
        try {
            return localStorage.getItem('bearCharacterName');
        } catch (e) {
            console.log('localStorage not available:', e);
            return null;
        }
    },

    saveDiscordUser: (user) => {
        try {
            localStorage.setItem('bearDiscordUser', JSON.stringify(user));
        } catch (e) {
            console.log('localStorage not available:', e);
        }
    },

    getDiscordUser: () => {
        try {
            const saved = localStorage.getItem('bearDiscordUser');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.log('localStorage not available:', e);
            return null;
        }
    },

    removeDiscordUser: () => {
        try {
            localStorage.removeItem('bearDiscordUser');
        } catch (e) {
            console.log('localStorage not available:', e);
        }
    }
};