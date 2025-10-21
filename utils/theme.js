// Theme configuration for dark and light modes
window.ThemeUtils = {
    // Get theme classes based on current mode
    getTheme: (isDarkMode) => {
        if (isDarkMode) {
            return {
                // Page backgrounds
                pageBg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
                cardBg: 'bg-gray-800/60',
                overlayBg: 'bg-gray-700/30',
                darkOverlayBg: 'bg-gray-700/40',

                // Text colors
                headingPrimary: 'text-yellow-400',
                headingSecondary: 'text-yellow-300',
                textPrimary: 'text-white',
                textSecondary: 'text-gray-300',
                textMuted: 'text-gray-400',

                // Borders
                borderPrimary: 'border-yellow-500',
                borderSecondary: 'border-gray-600',
                borderSuccess: 'border-green-500',

                // Buttons - Primary (Yellow)
                btnPrimary: 'bg-yellow-600 hover:bg-yellow-700',
                btnPrimaryText: 'text-gray-900',

                // Buttons - Success (Green)
                btnSuccess: 'bg-green-600 hover:bg-green-700',
                btnSuccessText: 'text-white',

                // Buttons - Danger (Red)
                btnDanger: 'bg-red-600 hover:bg-red-700',
                btnDangerText: 'text-white',

                // Buttons - Secondary (Gray)
                btnSecondary: 'bg-gray-600 hover:bg-gray-700',
                btnSecondaryText: 'text-white',

                // Buttons - Discord
                btnDiscord: 'bg-indigo-600 hover:bg-indigo-700',
                btnDiscordText: 'text-white',

                // Buttons - Disabled
                btnDisabled: 'bg-gray-700 opacity-50',

                // Team colors
                team1Bg: 'bg-blue-900/60',
                team1Border: 'border-blue-500',
                team1Text: 'text-blue-300',
                team1Btn: 'bg-blue-600 hover:bg-blue-700',
                team1Avatar: 'bg-blue-600',

                team2Bg: 'bg-red-900/60',
                team2Border: 'border-red-500',
                team2Text: 'text-red-300',
                team2Btn: 'bg-red-600 hover:bg-red-700',
                team2Avatar: 'bg-red-600',

                // Status colors
                statusActive: 'bg-green-900/60 border-green-500 text-green-200',
                statusWaiting: 'bg-gray-900/60 border-gray-500 text-gray-300',
                statusAlert: 'bg-red-600/80 border-red-400 text-white',
                statusInfo: 'bg-purple-900/60 border-purple-500 text-purple-200',

                // Badges
                badgeMarshall: 'bg-purple-600',
                badgeAdmin: 'bg-indigo-600',
                badgeGuest: 'bg-gray-500',
                badgeCaptain: 'bg-yellow-600 text-gray-900',
                badgeCharacter: 'bg-yellow-600 text-gray-900',
                badgeAnonymous: 'bg-gray-600',

                // Live status indicators
                liveActive: 'bg-green-500',
                liveWaiting: 'bg-yellow-500',

                // Alerts
                alertError: 'bg-red-500/20 border border-red-500 text-red-200',
                alertWarning: 'bg-yellow-600/20 border border-yellow-500 text-yellow-200',
                alertInfo: 'bg-blue-600/20 border border-blue-500 text-blue-200',

                // Inputs
                inputBg: 'bg-gray-700 border-gray-600',
                inputText: 'text-white',
                inputPlaceholder: 'placeholder-gray-400',
                inputFocus: 'focus:border-yellow-500 focus:ring focus:ring-yellow-500/20',

                // Timer
                timerNormal: 'bg-yellow-600',
                timerAlert: 'bg-red-600 animate-pulse',
                timerText: 'text-yellow-400',

                // Version footer
                versionText: 'text-yellow-500',

                // Leaderboard
                leaderboard1st: 'bg-yellow-600/30 border border-yellow-500',
                leaderboard2nd: 'bg-gray-600/30 border border-gray-400',
                leaderboard3rd: 'bg-amber-700/30 border border-amber-600',
                leaderboardOther: 'bg-gray-700/30 border border-gray-600',

                // Winner highlight
                winnerBorder: 'border-yellow-400',
                winnerBadge: 'border-4 border-yellow-400',

                // Treasure map theme (for MapPickingView and CompleteView)
                treasurePageBg: 'bg-gradient-to-br from-amber-900 via-orange-800 to-red-900',
                treasureCardBg: 'bg-black/40',
                treasureOverlayBg: 'bg-black/60',
                treasureHeading: 'text-amber-400',
                treasureSubheading: 'text-orange-300',
                treasureBorder: 'border-amber-600',
                treasureBtn: 'bg-amber-600 hover:bg-amber-700',
                treasureVersion: 'text-amber-600',
            };
        } else {
            // Light mode theme
            return {
                // Page backgrounds
                pageBg: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50',
                cardBg: 'bg-white/90',
                overlayBg: 'bg-gray-100/80',
                darkOverlayBg: 'bg-gray-200/60',

                // Text colors
                headingPrimary: 'text-amber-700',
                headingSecondary: 'text-amber-600',
                textPrimary: 'text-gray-900',
                textSecondary: 'text-gray-700',
                textMuted: 'text-gray-500',

                // Borders
                borderPrimary: 'border-amber-400',
                borderSecondary: 'border-gray-300',
                borderSuccess: 'border-green-400',

                // Buttons - Primary (Amber/Gold)
                btnPrimary: 'bg-amber-500 hover:bg-amber-600',
                btnPrimaryText: 'text-white',

                // Buttons - Success (Green)
                btnSuccess: 'bg-green-500 hover:bg-green-600',
                btnSuccessText: 'text-white',

                // Buttons - Danger (Red)
                btnDanger: 'bg-red-500 hover:bg-red-600',
                btnDangerText: 'text-white',

                // Buttons - Secondary (Gray)
                btnSecondary: 'bg-gray-400 hover:bg-gray-500',
                btnSecondaryText: 'text-white',

                // Buttons - Discord
                btnDiscord: 'bg-indigo-500 hover:bg-indigo-600',
                btnDiscordText: 'text-white',

                // Buttons - Disabled
                btnDisabled: 'bg-gray-300 opacity-50',

                // Team colors
                team1Bg: 'bg-blue-100/90',
                team1Border: 'border-blue-400',
                team1Text: 'text-blue-700',
                team1Btn: 'bg-blue-500 hover:bg-blue-600',
                team1Avatar: 'bg-blue-500',

                team2Bg: 'bg-red-100/90',
                team2Border: 'border-red-400',
                team2Text: 'text-red-700',
                team2Btn: 'bg-red-500 hover:bg-red-600',
                team2Avatar: 'bg-red-500',

                // Status colors
                statusActive: 'bg-green-100 border-green-400 text-green-800',
                statusWaiting: 'bg-gray-100 border-gray-400 text-gray-700',
                statusAlert: 'bg-red-100 border-red-400 text-red-800',
                statusInfo: 'bg-purple-100 border-purple-400 text-purple-800',

                // Badges
                badgeMarshall: 'bg-purple-500',
                badgeAdmin: 'bg-indigo-500',
                badgeGuest: 'bg-gray-400',
                badgeCaptain: 'bg-amber-500 text-white',
                badgeCharacter: 'bg-amber-500 text-white',
                badgeAnonymous: 'bg-gray-400',

                // Live status indicators
                liveActive: 'bg-green-500',
                liveWaiting: 'bg-yellow-500',

                // Alerts
                alertError: 'bg-red-100 border border-red-400 text-red-800',
                alertWarning: 'bg-yellow-100 border border-yellow-400 text-yellow-800',
                alertInfo: 'bg-blue-100 border border-blue-400 text-blue-800',

                // Inputs
                inputBg: 'bg-white border-gray-300',
                inputText: 'text-gray-900',
                inputPlaceholder: 'placeholder-gray-400',
                inputFocus: 'focus:border-amber-500 focus:ring focus:ring-amber-500/20',

                // Timer
                timerNormal: 'bg-amber-500',
                timerAlert: 'bg-red-500 animate-pulse',
                timerText: 'text-amber-700',

                // Version footer
                versionText: 'text-amber-600',

                // Leaderboard
                leaderboard1st: 'bg-yellow-200 border border-yellow-400',
                leaderboard2nd: 'bg-gray-200 border border-gray-400',
                leaderboard3rd: 'bg-orange-200 border border-orange-400',
                leaderboardOther: 'bg-gray-100 border border-gray-300',

                // Winner highlight
                winnerBorder: 'border-amber-500',
                winnerBadge: 'border-4 border-amber-500',

                // Treasure map theme (for MapPickingView and CompleteView)
                treasurePageBg: 'bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100',
                treasureCardBg: 'bg-white/90',
                treasureOverlayBg: 'bg-amber-50/80',
                treasureHeading: 'text-amber-800',
                treasureSubheading: 'text-orange-700',
                treasureBorder: 'border-amber-500',
                treasureBtn: 'bg-amber-500 hover:bg-amber-600',
                treasureVersion: 'text-amber-700',
            };
        }
    },

    // Get current theme from localStorage or default to dark
    getStoredTheme: () => {
        const stored = localStorage.getItem('bear-treasure-theme');
        return stored === 'light' ? false : true; // Returns isDarkMode boolean
    },

    // Save theme preference
    saveTheme: (isDarkMode) => {
        localStorage.setItem('bear-treasure-theme', isDarkMode ? 'dark' : 'light');
    }
};
