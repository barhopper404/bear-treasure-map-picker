window.CaptainRevealView = ({
    characterName,
    discordUser,
    captains,
    onContinue,
    theme,
    isDarkMode,
    onToggleTheme
}) => {
    const { Shield, Crown } = window.Icons;
    const [countdown, setCountdown] = React.useState(5);

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
                <window.CharacterBadge characterName={characterName} discordUser={discordUser} theme={theme} />

                <div className={`bg-gray-800/60 backdrop-blur-sm rounded-lg p-12 border-2 ${theme.borderPrimary}`}>
                    <div className="text-center mb-12">
                        <h2 className={`text-4xl font-bold ${theme.headingPrimary} mb-2`}>🎉 Captains Selected! 🎉</h2>
                        <p className={`${theme.textSecondary} text-lg`}>Your team leaders have been chosen</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Captain 1 */}
                        <div className={`${theme.team1Bg} backdrop-blur-sm rounded-lg p-8 border-2 ${theme.team1Border} transform hover:scale-105 transition-transform`}>
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="border-4 border-blue-400 rounded-full">
                                        <window.Avatar discordUser={captains[0]?.discordUser} size="xl" />
                                    </div>
                                </div>
                                <div className="bg-blue-600/30 px-4 py-2 rounded-full inline-block mb-3">
                                    <span className={`${theme.team1Text} text-sm font-bold`}>CAPTAIN 1</span>
                                </div>
                                <h3 className={`text-3xl font-bold ${theme.textPrimary} mb-2`}>{captains[0]?.name}</h3>
                                {captains[0]?.discordUser && (
                                    <p className={`${theme.team1Text} text-sm`}>@{captains[0].discordUser.username}</p>
                                )}
                            </div>
                        </div>

                        {/* Captain 2 */}
                        <div className={`${theme.team2Bg} backdrop-blur-sm rounded-lg p-8 border-2 ${theme.team2Border} transform hover:scale-105 transition-transform`}>
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="border-4 border-red-400 rounded-full">
                                        <window.Avatar discordUser={captains[1]?.discordUser} size="xl" />
                                    </div>
                                </div>
                                <div className="bg-red-600/30 px-4 py-2 rounded-full inline-block mb-3">
                                    <span className={`${theme.team2Text} text-sm font-bold`}>CAPTAIN 2</span>
                                </div>
                                <h3 className={`text-3xl font-bold ${theme.textPrimary} mb-2`}>{captains[1]?.name}</h3>
                                {captains[1]?.discordUser && (
                                    <p className={`${theme.team2Text} text-sm`}>@{captains[1].discordUser.username}</p>
                                )}
                            </div>
                        </div>
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
