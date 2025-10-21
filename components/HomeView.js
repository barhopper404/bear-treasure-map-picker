window.HomeView = ({ characterName, error, setView, setEventId, theme, isDarkMode, onToggleTheme }) => {
    const { Shield, Key, Heart, Music, Trophy, Users, Clock } = window.Icons;
    const [leaderboard, setLeaderboard] = React.useState([]);
    const [liveEvents, setLiveEvents] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // Fetch leaderboard and live events on mount
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch leaderboard
                const leaderboardResult = await window.ApiUtils.getLeaderboard();
                if (leaderboardResult.success) {
                    setLeaderboard(leaderboardResult.leaderboard || []);
                }
                
                // Fetch live events
                const liveEventsResult = await window.ApiUtils.getLiveEvents();
                if (liveEventsResult.success) {
                    setLiveEvents(liveEventsResult.liveEvents || []);
                }
            } catch (err) {
                console.error('Error fetching home data:', err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);
    
    return (
        <div className={`min-h-screen ${theme.pageBg} p-8`}>
            <window.ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
            <div className="max-w-6xl mx-auto">
                {characterName && (
                    <div className="text-center mb-4">
                        <span className={`${theme.badgeCharacter} px-4 py-2 rounded-full text-sm font-bold`}>
                            Character: {characterName}
                        </span>
                    </div>
                )}

                {/* Header */}
                <div className={`${theme.cardBg} backdrop-blur-sm rounded-lg p-8 border-2 ${theme.borderPrimary} mb-6`}>
                    <div className="text-center mb-8">
                        <h1 className={`text-5xl font-bold ${theme.headingPrimary} mb-2`}>BEAR GUILD</h1>
                        <h2 className={`text-2xl ${theme.headingSecondary}`}>Treasure Map Team Picker</h2>
                    </div>

                    {error && (
                        <div className={`${theme.alertError} px-4 py-3 rounded mb-4`}>
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => setView('create')}
                            className={`${theme.btnPrimary} ${theme.btnPrimaryText} font-bold py-4 px-6 rounded-lg transition-colors text-xl`}
                        >
                            Create New Event
                        </button>
                        <button
                            onClick={() => setView('join')}
                            className={`${theme.btnSuccess} ${theme.btnSuccessText} font-bold py-4 px-6 rounded-lg transition-colors text-xl`}
                        >
                            Join Existing Event
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Leaderboard */}
                    <div className={`${theme.cardBg} backdrop-blur-sm rounded-lg p-6 border-2 ${theme.borderPrimary}`}>
                        <div className="flex items-center gap-2 mb-4">
                            <Trophy className={`w-6 h-6 ${theme.headingPrimary}`} />
                            <h3 className={`text-2xl font-bold ${theme.headingPrimary}`}>Top 10 Winners</h3>
                        </div>

                        {loading ? (
                            <div className={`text-center ${theme.textMuted} py-8`}>Loading leaderboard...</div>
                        ) : leaderboard.length === 0 ? (
                            <div className={`text-center ${theme.textMuted} py-8`}>No stats recorded yet</div>
                        ) : (
                            <div className="space-y-2">
                                {leaderboard.map((player, idx) => {
                                    const placement =
                                        idx === 0 ? theme.leaderboard1st :
                                        idx === 1 ? theme.leaderboard2nd :
                                        idx === 2 ? theme.leaderboard3rd :
                                        theme.leaderboardOther;

                                    return (
                                        <div
                                            key={player.discordId}
                                            className={`flex items-center justify-between p-3 rounded ${placement}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl font-bold">
                                                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                                                </span>
                                                <div>
                                                    <div className={`${theme.textPrimary} font-bold`}>{player.username}</div>
                                                    <div className={`text-xs ${theme.textMuted}`}>
                                                        {player.mapsCompleted} maps completed
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-green-400 font-bold text-lg">{player.wins}W</div>
                                                <div className="text-red-400 text-sm">{player.losses}L</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Live Events */}
                    <div className={`${theme.cardBg} backdrop-blur-sm rounded-lg p-6 border-2 ${theme.borderSuccess}`}>
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-6 h-6 text-green-400" />
                            <h3 className="text-2xl font-bold text-green-400">Live Events</h3>
                        </div>

                        {loading ? (
                            <div className={`text-center ${theme.textMuted} py-8`}>Loading events...</div>
                        ) : liveEvents.length === 0 ? (
                            <div className={`text-center ${theme.textMuted} py-8`}>No live events right now</div>
                        ) : (
                            <div className="space-y-2">
                                {liveEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className={`${theme.overlayBg} border ${theme.borderSuccess} p-4 rounded hover:opacity-80 transition-colors`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${
                                                    event.started ? `${theme.liveActive} animate-pulse` : theme.liveWaiting
                                                }`}></div>
                                                <span className={`${theme.textPrimary} font-bold`}>Event {event.id}</span>
                                                <span className={`text-xs px-2 py-1 rounded ${
                                                    event.started
                                                        ? 'bg-green-600/30 text-green-300 border border-green-500'
                                                        : 'bg-yellow-600/30 text-yellow-300 border border-yellow-500'
                                                }`}>
                                                    {event.started ? 'IN PROGRESS' : 'WAITING'}
                                                </span>
                                            </div>
                                            <span className={`text-xs ${theme.textMuted}`}>
                                                {new Date(event.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className={theme.textSecondary}>
                                                Marshall: <span className={theme.headingPrimary}>{event.marshall}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className={`flex items-center gap-1 ${theme.textMuted}`}>
                                                    <Users className="w-4 h-4" />
                                                    {event.participantCount}
                                                </div>
                                                {!event.started && (
                                                    <button
                                                        onClick={() => {
                                                            setEventId(event.id);
                                                            setView('join');
                                                        }}
                                                        className={`${theme.btnSuccess} ${theme.btnSuccessText} text-xs font-bold py-1 px-3 rounded transition-colors`}
                                                    >
                                                        Join
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={`text-center mt-4 ${theme.versionText} text-sm`}>
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};