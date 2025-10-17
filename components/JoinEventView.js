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
    isMeleeDPS,
    setIsMeleeDPS,
    isRangedDPS,
    setIsRangedDPS,
    isTamer,
    setIsTamer,
    isSummoner,
    setIsSummoner,
    isTank,
    setIsTank,
    isJester,
    setIsJester,
    error,
    loading,
    onJoinEvent,
    onLoginWithDiscord,
    setView 
}) => {
    const { Shield, Key, Heart, Music, Discord, Sword, Target, Zap, Skull, User } = window.Icons;
    
    if (!discordUser) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-8 border-2 border-yellow-500 text-center">
                        <h2 className="text-3xl font-bold text-yellow-400 mb-6">Authentication Required</h2>
                        <p className="text-gray-300 mb-6">You must log in with Discord to join an event.</p>
                        <button
                            onClick={onLoginWithDiscord}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-xl flex items-center justify-center gap-3 mx-auto"
                        >
                            <Discord className="w-6 h-6" />
                            Login with Discord
                        </button>
                        <button
                            onClick={() => setView('home')}
                            className="mt-4 text-yellow-300 hover:text-yellow-400 underline"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
                <div className="text-center mt-4 text-yellow-500 text-sm">
                    {window.AppConfig.VERSION}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-4">
                    <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 inline-flex">
                        <Discord className="w-4 h-4" />
                        {discordUser.username}
                    </span>
                </div>
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-8 border-2 border-yellow-500">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-6">Join Event</h2>
                    
                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-300 mb-2">Event ID</label>
                            <input 
                                type="text" 
                                value={eventId} 
                                onChange={(e) => setEventId(e.target.value.toUpperCase())} 
                                className="w-full px-4 py-2 bg-gray-700/30 border border-yellow-500 rounded text-white uppercase" 
                                placeholder="Enter event ID" 
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Your Character Name</label>
                            <input 
                                type="text" 
                                value={characterName} 
                                onChange={(e) => setCharacterName(e.target.value)} 
                                className="w-full px-4 py-2 bg-gray-700/30 border border-yellow-500 rounded text-white" 
                                placeholder="Enter your name" 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-300 mb-3 font-bold">Your Roles</label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-3 rounded border border-gray-600 hover:border-yellow-500 transition-colors">
                                    <input type="checkbox" checked={wantsCaptain} onChange={(e) => setWantsCaptain(e.target.checked)} className="w-5 h-5" />
                                    <Shield className="w-5 h-5 text-yellow-400" />
                                    <span>Captain</span>
                                </label>
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-3 rounded border border-gray-600 hover:border-yellow-500 transition-colors">
                                    <input type="checkbox" checked={isLockpicker} onChange={(e) => setIsLockpicker(e.target.checked)} className="w-5 h-5" />
                                    <Key className="w-5 h-5 text-yellow-500" />
                                    <span>Lockpicker</span>
                                </label>
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-3 rounded border border-gray-600 hover:border-green-500 transition-colors">
                                    <input type="checkbox" checked={isHealer} onChange={(e) => setIsHealer(e.target.checked)} className="w-5 h-5" />
                                    <Heart className="w-5 h-5 text-red-500" />
                                    <span>Healer</span>
                                </label>
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-3 rounded border border-gray-600 hover:border-green-500 transition-colors">
                                    <input type="checkbox" checked={isBard} onChange={(e) => setIsBard(e.target.checked)} className="w-5 h-5" />
                                    <Music className="w-5 h-5 text-purple-500" />
                                    <span>Bard</span>
                                </label>
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-3 rounded border border-gray-600 hover:border-green-500 transition-colors">
                                    <input type="checkbox" checked={isMeleeDPS} onChange={(e) => setIsMeleeDPS(e.target.checked)} className="w-5 h-5" />
                                    <Sword className="w-5 h-5 text-orange-500" />
                                    <span>Melee DPS</span>
                                </label>
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-3 rounded border border-gray-600 hover:border-green-500 transition-colors">
                                    <input type="checkbox" checked={isRangedDPS} onChange={(e) => setIsRangedDPS(e.target.checked)} className="w-5 h-5" />
                                    <Target className="w-5 h-5 text-blue-500" />
                                    <span>Ranged DPS</span>
                                </label>
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-3 rounded border border-gray-600 hover:border-green-500 transition-colors">
                                    <input type="checkbox" checked={isTamer} onChange={(e) => setIsTamer(e.target.checked)} className="w-5 h-5" />
                                    <Zap className="w-5 h-5 text-green-500" />
                                    <span>Tamer</span>
                                </label>
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-3 rounded border border-gray-600 hover:border-green-500 transition-colors">
                                    <input type="checkbox" checked={isSummoner} onChange={(e) => setIsSummoner(e.target.checked)} className="w-5 h-5" />
                                    <Skull className="w-5 h-5 text-purple-400" />
                                    <span>Summoner</span>
                                </label>
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-3 rounded border border-gray-600 hover:border-green-500 transition-colors">
                                    <input type="checkbox" checked={isTank} onChange={(e) => setIsTank(e.target.checked)} className="w-5 h-5" />
                                    <Shield className="w-5 h-5 text-gray-400" />
                                    <span>Tank</span>
                                </label>
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-3 rounded border border-gray-600 hover:border-green-500 transition-colors">
                                    <input type="checkbox" checked={isJester} onChange={(e) => setIsJester(e.target.checked)} className="w-5 h-5" />
                                    <User className="w-5 h-5 text-pink-500" />
                                    <span>Jester</span>
                                </label>
                            </div>
                        </div>
                        
                        <div className="flex gap-4 pt-4">
                            <button 
                                onClick={onJoinEvent} 
                                disabled={!characterName.trim() || !eventId.trim() || loading} 
                                className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
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
            <div className="text-center mt-4 text-yellow-500 text-sm">
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};