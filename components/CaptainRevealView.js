window.CaptainRevealView = ({
    characterName,
    discordUser,
    captains,
    onContinue,
    theme,
    isDarkMode,
    onToggleTheme,
    onBannerClick,
    eventType,
    numTeams
}) => {
    const { Shield, Crown } = window.Icons;
    const [countdown, setCountdown] = React.useState(5);

    // Determine if this is pit trial or treasure map
    const isPitTrial = eventType === 'pitTrial';
    const numberOfTeams = numTeams || captains.length || 2;

    // Team color schemes for N teams
    const teamColors = [
        { bg: theme.team1Bg, border: theme.team1Border, text: theme.team1Text, borderColor: 'border-blue-400' },
        { bg: theme.team2Bg, border: theme.team2Border, text: theme.team2Text, borderColor: 'border-red-400' },
        { bg: 'bg-purple-900/30', border: 'border-purple-500', text: 'text-purple-300', borderColor: 'border-purple-400' },
        { bg: 'bg-orange-900/30', border: 'border-orange-500', text: 'text-orange-300', borderColor: 'border-orange-400' },
        { bg: 'bg-green-900/30', border: 'border-green-500', text: 'text-green-300', borderColor: 'border-green-400' },
    ];

    // Auto-advance after 5 seconds
    React.useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            onContinue();
        }
    }, [countdown, onContinue]);

    return (
        <div className={`min-h-screen ${theme.pageBg} p-8`}>
            <window.ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
            <div className="max-w-4xl mx-auto">
                <window.Banner onBannerClick={onBannerClick} />
                <window.CharacterBadge characterName={characterName} discordUser={discordUser} theme={theme} />

                <div className={`bg-gray-800/60 backdrop-blur-sm rounded-lg p-12 border-2 ${theme.borderPrimary}`}>
                    <div className="text-center mb-12">
                        <h2 className={`text-4xl font-bold ${theme.headingPrimary} mb-2`}>🎉 Captains Selected! 🎉</h2>
                        <p className={`${theme.textSecondary} text-lg`}>
                            {isPitTrial ? 'Your team leaders are ready for battle!' : 'Your team leaders have been chosen'}
                        </p>
                    </div>

                    <div className={`grid gap-8 mb-12`} style={{
                        gridTemplateColumns: numberOfTeams === 2
                            ? 'repeat(2, 1fr)'
                            : `repeat(${Math.min(numberOfTeams, 4)}, 1fr)`
                    }}>
                        {captains.map((captain, index) => {
                            const colors = teamColors[index] || teamColors[index % teamColors.length];

                            return (
                                <div key={index} className={`${colors.bg} backdrop-blur-sm rounded-lg p-8 border-2 ${colors.border} transform hover:scale-105 transition-transform`}>
                                    <div className="text-center">
                                        <div className="flex justify-center mb-4">
                                            <div className={`border-4 ${colors.borderColor} rounded-full`}>
                                                <window.Avatar discordUser={captain?.discordUser} size="xl" />
                                            </div>
                                        </div>
                                        <div className={`${colors.bg} px-4 py-2 rounded-full inline-block mb-3`}>
                                            <span className={`${colors.text} text-sm font-bold`}>
                                                {isPitTrial ? `TEAM ${index + 1} CAPTAIN` : `CAPTAIN ${index + 1}`}
                                            </span>
                                        </div>
                                        <h3 className={`text-3xl font-bold ${theme.textPrimary} mb-2`}>{captain?.name}</h3>
                                        {captain?.discordUser && (
                                            <p className={`${colors.text} text-sm`}>@{captain.discordUser.username}</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center space-y-4">
                        <div className="bg-yellow-600/20 border border-yellow-500 rounded-lg p-4 inline-block">
                            <p className="text-yellow-300 text-lg">
                                Auto-continuing in <span className="text-yellow-400 font-bold text-2xl">{countdown}</span> seconds...
                            </p>
                        </div>

                        <button
                            onClick={onContinue}
                            className={`${theme.btnPrimary} ${theme.btnPrimaryText} font-bold py-4 px-8 rounded-lg transition-colors text-xl`}
                        >
                            Continue Now →
                        </button>
                    </div>
                </div>
            </div>
            <div className={`text-center mt-4 ${theme.versionText} text-sm`}>
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};
