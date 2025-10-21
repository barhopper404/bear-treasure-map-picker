// Avatar component - displays Discord avatar or fallback image
window.Avatar = ({ discordUser, size = 'md', className = '' }) => {
    // Size variants
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-10 h-10',
        xl: 'w-12 h-12',
        '2xl': 'w-16 h-16'
    };

    // Get avatar URL
    const getAvatarUrl = () => {
        // If user has Discord info and avatar
        if (discordUser && discordUser.id && discordUser.avatar) {
            // Discord CDN URL format
            return `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
        }

        // Fallback to Bearhop.png for manual users or users not logged in
        return 'utils/Bearhop.png';
    };

    return (
        <img
            src={getAvatarUrl()}
            alt="Avatar"
            className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
            onError={(e) => {
                // Fallback if Discord CDN fails
                e.target.src = 'utils/Bearhop.png';
            }}
        />
    );
};
