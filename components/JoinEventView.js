window.JoinEventView = ({ 
    discordUser,
    eventId,
    setEventId,
    characterName, 
    setCharacterName,
    wantsCaptain,
    setWantsCaptain,
    isLockpicker,
    setIsLockpicker,
    isHealer,
    setIsHealer,
    isBard,
    setIsBard,
    error,
    loading,
    onJoinEvent,
    onLoginWithDiscord,
    setView 
}) => {
    const { Shield, Key, Heart, Music, Discord } = window.Icons;
    
    if (!discordUser) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border-2 border-amber-600 text-center">
                        <h2 className="text-3xl font-bold text-amber-400 mb-6">Authentication Required</h2>
                        <p className="text-orange-300 mb-6">You must log in with Discord to join an event.</p>
                        <button
                            onClick={onLoginWithDiscord}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-xl flex items-center justify-center gap-3 mx-auto"
                        >
                            <Discord className="w-6 h-6" />
                            Login with Discord
                        </button>
                        <button
                            onClick={() => setView('home')}
                            className="mt-4 text-orange-300 hover:text-orange-400 underline"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
                <div className="text-center mt-4 text-amber-600 text-sm">
                    {window.AppConfig.VERSION}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-4">
                    <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 inline-flex">
                        <Discord className="w-4 h-4" />
                        {discordUser.username}
                    </span>
                </div>
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border-2 border-amber-600">
                    <h2 className="text-3xl font-bold text-amber-400 mb-6">Join Event</h2>
                    
                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-orange-300 mb-2">Event ID</label>
                            <input 
                                type="text" 
                                value={eventId} 
                                onChange={(e) => setEventId(e.target.value.toUpperCase())} 
                                className="w-full px-4 py-2 bg-black/60 border border-amber-600 rounded text-white uppercase" 
                                placeholder="Enter event ID" 
                            />
                        </div>
                        <div>
                            <label className="block text-orange-300 mb-2">Your Character Name</label>
                            <input 
                                type="text" 
                                value={characterName} 
                                onChange={(e) => setCharacterName(e.target.value)} 
                                className="w-full px-4 py-2 bg-black/60 border border-amber-600 rounded text-white" 
                                placeholder="Enter your name" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-orange-300 cursor-pointer">
                                <input type="checkbox" checked={wantsCaptain} onChange={(e) => setWantsCaptain(e.target.checked)} className="w-5 h-5" />
                                <Shield className="w-5 h-5" />
                                I want to be a Captain
                            </label>
                            <label className="flex items-center gap-2 text-orange-300 cursor-pointer">
                                <input type="checkbox" checked={isLockpicker} onChange={(e) => setIsLockpicker(e.target.checked)} className="w-5 h-5" />
                                <Key className="w-5 h-5 text-yellow-500" />
                                Lockpicker
                            </label>
                            <label className="flex items-center gap-2 text-orange-300 cursor-pointer">
                                <input type="checkbox" checked={isHealer} onChange={(e) => setIsHealer(e.target.checked)} className="w-5 h-5" />
                                <Heart className="w-5 h-5 text-red-500" />
                                Healer
                            </label>
                            <label className="flex items-center gap-2 text-orange-300 cursor-pointer">
                                <input type="checkbox" checked={isBard} onChange={(e) => setIsBard(e.target.checked)} className="w-5 h-5" />
                                <Music className="w-5 h-5 text-purple-500" />
                                Bard
                            </label>
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={onJoinEvent} 
                                disabled={!characterName.trim() || !eventId.trim() || loading} 
                                className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                            >
                                {loading ? 'Joining...' : 'Join Event'}
                            </button>
                            <button 
                                onClick={() => setView('home')} 
                                disabled={loading} 
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 text-amber-600 text-sm">
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};