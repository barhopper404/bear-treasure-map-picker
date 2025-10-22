window.HomeView = ({ characterName, discordUser, error, setView, setEventId, theme, isDarkMode, onToggleTheme, onBannerClick }) => {
    const { Shield, Key, Heart, Music, Trophy, Users, Clock } = window.Icons;
    const [treasureMapLeaderboard, setTreasureMapLeaderboard] = React.useState([]);
    const [pitTrialsLeaderboard, setPitTrialsLeaderboard] = React.useState([]);
    const [liveEvents, setLiveEvents] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // Fetch both leaderboards and live events on mount
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch treasure map leaderboard
                const tmLeaderboardResult = await window.ApiUtils.getLeaderboard();
                if (tmLeaderboardResult.success) {
                    setTreasureMapLeaderboard(tmLeaderboardResult.leaderboard || []);
                }

                // Fetch pit trials leaderboard
                const ptLeaderboardResult = await window.ApiUtils.getPitTrialsLeaderboard();
                if (ptLeaderboardResult.success) {
                    setPitTrialsLeaderboard(ptLeaderboardResult.leaderboard || []);
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
                <window.Banner onBannerClick={onBannerClick} />
                <window.CharacterBadge characterName={characterName} discordUser={discordUser} theme={theme} />

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

                {/* Live Events - Horizontal Scrollable */}
                <div className={`${theme.cardBg} backdrop-blur-sm rounded-lg p-6 border-2 ${theme.borderSuccess} mb-6`}>
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-6 h-6 text-green-400" />
                        <h3 className="text-2xl font-bold text-green-400">Live Events</h3>
                    </div>

                    {loading ? (
                        <div className={`text-center ${theme.textMuted} py-8`}>Loading events...</div>
                    ) : liveEvents.length === 0 ? (
                        <div className={`text-center ${theme.textMuted} py-8`}>No live events right now</div>
                    ) : (
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {liveEvents.slice(0, 4).map((event) => {
                                const eventType = event.eventType || 'treasureMap';
                                const isPitTrial = eventType === 'pitTrial';

                                return (
                                    <div
                                        key={event.id}
                                        className={`${theme.overlayBg} border ${theme.borderSuccess} p-4 rounded hover:opacity-80 transition-colors flex-shrink-0 w-72`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${
                                                    event.started ? `${theme.liveActive} animate-pulse` : theme.liveWaiting
                                                }`}></div>
                                                <span className={`${theme.textPrimary} font-bold`}>Event {event.id}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`text-xs px-2 py-1 rounded ${
                                                event.started
                                                    ? 'bg-green-600/30 text-green-300 border border-green-500'
                                                    : 'bg-yellow-600/30 text-yellow-300 border border-yellow-500'
                                            }`}>
                                                {event.started ? 'IN PROGRESS' : 'WAITING'}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded ${
                                                isPitTrial
                                                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500'
                                                    : 'bg-blue-600/30 text-blue-300 border border-blue-500'
                                            }`}>
                                                {isPitTrial ? '⚔️ PIT TRIALS' : '🗺️ TREASURE MAPS'}
                                            </span>
                                        </div>
                                        <div className="text-sm mb-2">
                                            <div className={theme.textSecondary}>
                                                Marshall: <span className={theme.headingPrimary}>{event.marshall}</span>
                                            </div>
                                            <div className={`flex items-center gap-1 ${theme.textMuted} mt-1`}>
                                                <Users className="w-4 h-4" />
                                                {event.participantCount} players
                                            </div>
                                        </div>
                                        {!event.started && (
                                            <button
                                                onClick={() => {
                                                    setEventId(event.id);
                                                    setView('join');
                                                }}
                                                className={`w-full ${theme.btnSuccess} ${theme.btnSuccessText} text-xs font-bold py-2 px-3 rounded transition-colors`}
                                            >
                                                Join Event
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Dual Leaderboards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Treasure Map Leaderboard */}
                    <div className={`${theme.cardBg} backdrop-blur-sm rounded-lg p-6 border-2 ${theme.borderPrimary}`}>
                        <div className="flex items-center gap-2 mb-4">
                            <Trophy className={`w-6 h-6 ${theme.headingPrimary}`} />
                            <h3 className={`text-2xl font-bold ${theme.headingPrimary}`}>🗺️ Treasure Maps</h3>
                        </div>

                        {loading ? (
                            <div className={`text-center ${theme.textMuted} py-8`}>Loading leaderboard...</div>
                        ) : treasureMapLeaderboard.length === 0 ? (
                            <div className={`text-center ${theme.textMuted} py-8`}>No stats recorded yet</div>
                        ) : (
                            <div className="space-y-2">
                                {treasureMapLeaderboard.map((player, idx) => {
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

                    {/* Pit Trials Leaderboard */}
                    <div className={`${theme.cardBg} backdrop-blur-sm rounded-lg p-6 border-2 border-purple-500`}>
                        <div className="flex items-center gap-2 mb-4">
                            <Trophy className="w-6 h-6 text-purple-400" />
                            <h3 className="text-2xl font-bold text-purple-400">⚔️ Pit Trials</h3>
                        </div>

                        {loading ? (
                            <div className={`text-center ${theme.textMuted} py-8`}>Loading leaderboard...</div>
                        ) : pitTrialsLeaderboard.length === 0 ? (
                            <div className={`text-center ${theme.textMuted} py-8`}>No stats recorded yet</div>
                        ) : (
                            <div className="space-y-2">
                                {pitTrialsLeaderboard.map((player, idx) => {
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
                                                        {player.trialsCompleted} trials completed
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
                </div>
            </div>
            <div className={`text-center mt-4 ${theme.versionText} text-sm`}>
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};