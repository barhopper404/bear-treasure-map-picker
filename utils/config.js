// Configuration constants
window.AppConfig = {
    DISCORD_CLIENT_ID: '1428188591263191120',
    REDIRECT_URI: 'https://barhopper404.github.io/bear-treasure-map-picker/',
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwSZmzTPP43TD36KdccG4rw6P6NJtN2KbWBK8VW_OOHUzC3vE5NkrKN990EKThKAYU1/exec',

    // Version info - UPDATE THIS WITH EACH CHANGE
    VERSION_NUMBER: 'v2.3.0',
    VERSION_NAME: 'Auto-refresh, Sounds, & Randomizer',
    BUILD_DATE: '2025-01-21', // Update this date when making changes

    // Computed version string
    get VERSION() {
        return `${this.VERSION_NUMBER} - ${this.VERSION_NAME} (${this.BUILD_DATE})`;
    }
};