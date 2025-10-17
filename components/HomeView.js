window.HomeView = ({ characterName, error, setView }) => {
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
            <div className="max-w-6xl mx-auto">
                {characterName && (
                    <div className="text-center mb-4">
                        <span className="bg-yellow-600 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                            Character: {characterName}
                        </span>
                    </div>
                )}
                
                {/* Header */}
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-8 border-2 border-yellow-500 mb-6">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-yellow-400 mb-2">BEAR GUILD</h1>
                        <h2 className="text-2xl text-yellow-300">Treasure Map Team Picker</h2>
                    </div>
                    
                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button 
                            onClick={() => setView('create')} 
                            className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold py-4 px-6 rounded-lg transition-colors text-xl"
                        >
                            Create New Event
                        </button>
                        <button 
                            onClick={() => setView('join')} 
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-xl"
                        >
                            Join Existing Event
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Leaderboard */}
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-6 border-2 border-yellow-500">
                        <div className="flex items-center gap-2 mb-4">
                            <Trophy className="w-6 h-6 text-yellow-400" />
                            <h3 className="text-2xl font-bold text-yellow-400">Top 10 Winners</h3>
                        </div>
                        
                        {loading ? (
                            <div className="text-center text-gray-400 py-8">Loading leaderboard...</div>
                        ) : leaderboard.length === 0 ? (
                            <div className="text-center text-gray-400 py-8">No stats recorded yet</div>
                        ) : (
                            <div className="space-y-2">
                                {leaderboard.map((player, idx) => (
                                    <div 
                                        key={player.discordId}
                                        className={`flex items-center justify-between p-3 rounded ${
                                            idx === 0 ? 'bg-yellow-600/30 border border-yellow-500' :
                                            idx === 1 ? 'bg-gray-600/30 border border-gray-400' :
                                            idx === 2 ? 'bg-amber-700/30 border border-amber-600' :
                                            'bg-gray-700/30 border border-gray-600'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`text-2xl font-bold ${
                                                idx === 0 ? 'text-yellow-400' :
                                                idx === 1 ? 'text-gray-300' :
                                                idx === 2 ? 'text-amber-600' :
                                                'text-gray-400'
                                            }`}>
                                                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                                            </span>
                                            <div>
                                                <div className="text-white font-bold">{player.username}</div>
                                                <div className="text-xs text-gray-400">
                                                    {player.mapsCompleted} maps completed
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-green-400 font-bold text-lg">{player.wins}W</div>
                                            <div className="text-red-400 text-sm">{player.losses}L</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Live Events */}
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-6 border-2 border-green-500">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-6 h-6 text-green-400" />
                            <h3 className="text-2xl font-bold text-green-400">Live Events</h3>
                        </div>
                        
                        {loading ? (
                            <div className="text-center text-gray-400 py-8">Loading events...</div>
                        ) : liveEvents.length === 0 ? (
                            <div className="text-center text-gray-400 py-8">No live events right now</div>
                        ) : (
                            <div className="space-y-2">
                                {liveEvents.map((event) => (
                                    <div 
                                        key={event.id}
                                        className="bg-gray-700/30 border border-green-600 p-4 rounded hover:bg-gray-700/50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${
                                                    event.started ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
                                                }`}></div>
                                                <span className="text-white font-bold">Event {event.id}</span>
                                                <span className={`text-xs px-2 py-1 rounded ${
                                                    event.started 
                                                        ? 'bg-green-600/30 text-green-300 border border-green-500' 
                                                        : 'bg-yellow-600/30 text-yellow-300 border border-yellow-500'
                                                }`}>
                                                    {event.started ? 'IN PROGRESS' : 'WAITING'}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {new Date(event.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="text-gray-300">
                                                Marshall: <span className="text-yellow-400">{event.marshall}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <Users className="w-4 h-4" />
                                                {event.participantCount}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 text-yellow-500 text-sm">
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};