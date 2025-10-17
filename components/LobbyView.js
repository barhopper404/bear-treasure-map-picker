window.LobbyView = ({
    characterName,
    eventId,
    eventData,
    linkCopied,
    spinningWheel,
    currentWheelName,
    editingPlayer,
    tempRoles,
    setTempRoles,
    showAddPlayer,
    setShowAddPlayer,
    newPlayerName,
    setNewPlayerName,
    newPlayerCaptain,
    setNewPlayerCaptain,
    newPlayerLockpicker,
    setNewPlayerLockpicker,
    newPlayerHealer,
    setNewPlayerHealer,
    newPlayerBard,
    setNewPlayerBard,
    captainChoiceTimerSetting,
    setCaptainChoiceTimerSetting,
    draftTimerSetting,
    setDraftTimerSetting,
    mapPickTimerSetting,
    setMapPickTimerSetting,
    totalMaps,
    setTotalMaps,
    mapCoords,
    setMapCoords,
    error,
    loading,
    onCopyEventLink,
    onStartEditingRoles,
    onUpdatePlayerRoles,
    onRemovePlayer,
    onAddManualPlayer,
    onStartEvent,
    setEditingPlayer,
    getRoleIcons
}) => {
    const { Users, Shield, Key, Heart, Music, Copy, Check, Edit, Trash } = window.Icons;
    const isMarshall = eventData?.participants?.[0]?.name === characterName;

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 p-8">
            <div className="max-w-4xl mx-auto">
                {characterName && (
                    <div className="text-center mb-4">
                        <span className="bg-amber-600 text-white px-4 py-2 rounded-full text-sm">
                            Character: {characterName}
                        </span>
                    </div>
                )}
                
                {spinningWheel && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                        <div className="bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 p-12 rounded-lg border-4 border-amber-600 text-center">
                            <h2 className="text-4xl font-bold text-amber-400 mb-8">Spinning the Wheel!</h2>
                            <div className="w-64 h-64 mx-auto mb-8 bg-amber-600 rounded-full flex items-center justify-center border-8 border-amber-400 animate-spin">
                                <div className="bg-black/60 w-48 h-48 rounded-full flex items-center justify-center">
                                    <span className="text-white text-3xl font-bold">{currentWheelName}</span>
                                </div>
                            </div>
                            <p className="text-orange-300 text-xl">Selecting Captain...</p>
                        </div>
                    </div>
                )}
                
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border-2 border-amber-600">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-amber-400">Event Lobby</h2>
                        <div className="text-right">
                            <div className="text-orange-300 text-sm">Event ID</div>
                            <div className="text-2xl font-bold text-white">{eventId}</div>
                            {eventData?.started && (
                                <div className="text-red-400 text-sm mt-1">🔒 LOCKED</div>
                            )}
                        </div>
                    </div>
                    
                    <button 
                        onClick={onCopyEventLink} 
                        className="w-full mb-6 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        {linkCopied ? (
                            <>
                                <Check className="w-5 h-5" />
                                Link Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-5 h-5" />
                                Copy Event Link
                            </>
                        )}
                    </button>
                    
                    <div className="mb-6">
                        <h3 className="text-xl text-orange-300 mb-4 flex items-center gap-2">
                            <Users className="w-6 h-6" />
                            Participants ({eventData?.participants?.length || 0})
                        </h3>
                        <div className="space-y-2">
                            {eventData?.participants?.map((p, idx) => (
                                <div key={idx} className="bg-black/60 p-4 rounded border border-amber-600">
                                    {editingPlayer === idx ? (
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-white font-bold">{p.name}</span>
                                                <button 
                                                    onClick={() => { 
                                                        setEditingPlayer(null); 
                                                        setTempRoles({}); 
                                                    }} 
                                                    className="text-gray-400 hover:text-white"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-orange-300 cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={tempRoles.wantsCaptain} 
                                                        onChange={(e) => setTempRoles({ ...tempRoles, wantsCaptain: e.target.checked })} 
                                                        className="w-5 h-5" 
                                                    />
                                                    <Shield className="w-5 h-5" />
                                                    Wants to be Captain
                                                </label>
                                                <label className="flex items-center gap-2 text-orange-300 cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={tempRoles.lockpicker} 
                                                        onChange={(e) => setTempRoles({ ...tempRoles, lockpicker: e.target.checked })} 
                                                        className="w-5 h-5" 
                                                    />
                                                    <Key className="w-5 h-5 text-yellow-500" />
                                                    Lockpicker
                                                </label>
                                                <label className="flex items-center gap-2 text-orange-300 cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={tempRoles.healer} 
                                                        onChange={(e) => setTempRoles({ ...tempRoles, healer: e.target.checked })} 
                                                        className="w-5 h-5" 
                                                    />
                                                    <Heart className="w-5 h-5 text-red-500" />
                                                    Healer
                                                </label>
                                                <label className="flex items-center gap-2 text-orange-300 cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={tempRoles.bard} 
                                                        onChange={(e) => setTempRoles({ ...tempRoles, bard: e.target.checked })} 
                                                        className="w-5 h-5" 
                                                    />
                                                    <Music className="w-5 h-5 text-purple-500" />
                                                    Bard
                                                </label>
                                            </div>
                                            <button 
                                                onClick={() => onUpdatePlayerRoles(idx, tempRoles)}
                                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <span className="text-white font-bold">{p.name}</span>
                                                    {p.discordUser && !p.isManual && (
                                                        <span className="text-indigo-300 text-sm ml-2">({p.discordUser.username})</span>
                                                    )}
                                                    {p.isManual && (
                                                        <span className="text-gray-400 text-sm ml-2">(Manual)</span>
                                                    )}
                                                </div>
                                                {p.isMarshall && <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">MARSHALL</span>}
                                                {p.wantsCaptain && (
                                                    <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                                        <Shield className="w-3 h-3" />
                                                        CAPTAIN
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex gap-2">{getRoleIcons(p)}</div>
                                                {isMarshall && (
                                                    <div className="flex gap-2">
                                                        <button 
                                                            onClick={() => onStartEditingRoles(idx, p)} 
                                                            className="text-orange-300 hover:text-orange-400 p-1" 
                                                            title="Edit roles"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        {!p.isMarshall && (
                                                            <button 
                                                                onClick={() => onRemovePlayer(idx)} 
                                                                className="text-red-400 hover:text-red-500 p-1" 
                                                                title="Kick player"
                                                            >
                                                                <Trash className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Add Player Manually Button */}
                    {isMarshall && !eventData?.started && (
                        <div className="mb-6">
                            <button 
                                onClick={() => setShowAddPlayer(true)}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Users className="w-5 h-5" />
                                Add Player Manually
                            </button>
                        </div>
                    )}
                    
                    {/* Add Player Modal */}
                    {showAddPlayer && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                            <div className="bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 p-8 rounded-lg border-4 border-amber-600 max-w-md w-full mx-4">
                                <h3 className="text-2xl font-bold text-amber-400 mb-4">Add Player Manually</h3>
                                
                                {error && (
                                    <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
                                        {error}
                                    </div>
                                )}
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-orange-300 mb-2">Character Name</label>
                                        <input 
                                            type="text" 
                                            value={newPlayerName}
                                            onChange={(e) => setNewPlayerName(e.target.value)}
                                            className="w-full px-4 py-2 bg-black/60 border border-amber-600 rounded text-white" 
                                            placeholder="Enter player name"
                                            autoFocus
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="block text-orange-300 mb-2">Roles</label>
                                        <label className="flex items-center gap-2 text-orange-300 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={newPlayerCaptain}
                                                onChange={(e) => setNewPlayerCaptain(e.target.checked)}
                                                className="w-5 h-5" 
                                            />
                                            <Shield className="w-5 h-5" />
                                            Captain
                                        </label>
                                        <label className="flex items-center gap-2 text-orange-300 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={newPlayerLockpicker}
                                                onChange={(e) => setNewPlayerLockpicker(e.target.checked)}
                                                className="w-5 h-5" 
                                            />
                                            <Key className="w-5 h-5 text-yellow-500" />
                                            Lockpicker
                                        </label>
                                        <label className="flex items-center gap-2 text-orange-300 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={newPlayerHealer}
                                                onChange={(e) => setNewPlayerHealer(e.target.checked)}
                                                className="w-5 h-5" 
                                            />
                                            <Heart className="w-5 h-5 text-red-500" />
                                            Healer
                                        </label>
                                        <label className="flex items-center gap-2 text-orange-300 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={newPlayerBard}
                                                onChange={(e) => setNewPlayerBard(e.target.checked)}
                                                className="w-5 h-5" 
                                            />
                                            <Music className="w-5 h-5 text-purple-500" />
                                            Bard
                                        </label>
                                    </div>
                                    
                                    <div className="flex gap-4 mt-6">
                                        <button 
                                            onClick={onAddManualPlayer}
                                            disabled={!newPlayerName.trim() || loading}
                                            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                                        >
                                            {loading ? 'Adding...' : 'Add Player'}
                                        </button>
                                        <button 
                                            onClick={() => {
                                                setShowAddPlayer(false);
                                                setNewPlayerName('');
                                                setNewPlayerCaptain(false);
                                                setNewPlayerLockpicker(false);
                                                setNewPlayerHealer(false);
                                                setNewPlayerBard(false);
                                            }}
                                            disabled={loading}
                                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Timer Settings */}
                    {isMarshall && !eventData?.started && (
                        <>
                            <div className="mb-6 bg-purple-900/40 p-4 rounded border border-purple-600">
                                <h3 className="text-lg text-purple-300 mb-3 font-bold">⚙️ Timer Settings</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-purple-200 text-sm mb-2">
                                            Captain Choice Timer (10-300s)
                                        </label>
                                        <input 
                                            type="number" 
                                            min="10" 
                                            max="300"
                                            value={captainChoiceTimerSetting}
                                            onChange={(e) => setCaptainChoiceTimerSetting(parseInt(e.target.value) || 45)}
                                            className="w-full px-3 py-2 bg-black/60 border border-purple-600 rounded text-white"
                                        />
                                        <p className="text-purple-300 text-xs mt-1">Currently: {captainChoiceTimerSetting}s</p>
                                    </div>
                                    <div>
                                        <label className="block text-purple-200 text-sm mb-2">
                                            Draft Timer (10-300s)
                                        </label>
                                        <input 
                                            type="number" 
                                            min="10" 
                                            max="300"
                                            value={draftTimerSetting}
                                            onChange={(e) => setDraftTimerSetting(parseInt(e.target.value) || 60)}
                                            className="w-full px-3 py-2 bg-black/60 border border-purple-600 rounded text-white"
                                        />
                                        <p className="text-purple-300 text-xs mt-1">Currently: {draftTimerSetting}s</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mb-6 bg-orange-900/40 p-4 rounded border border-orange-600">
                                <h3 className="text-lg text-orange-300 mb-3 font-bold">🗺️ Treasure Map Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-orange-200 text-sm mb-2">
                                            Total Maps (e.g., 10+10=20)
                                        </label>
                                        <input 
                                            type="number" 
                                            min="1" 
                                            max="100"
                                            value={totalMaps}
                                            onChange={(e) => setTotalMaps(parseInt(e.target.value) || 20)}
                                            className="w-full px-3 py-2 bg-black/60 border border-orange-600 rounded text-white"
                                        />
                                        <p className="text-orange-300 text-xs mt-1">Total treasure maps to complete</p>
                                    </div>
                                    <div>
                                        <label className="block text-orange-200 text-sm mb-2">
                                            Map Coordinates (Optional)
                                        </label>
                                        <textarea 
                                            value={mapCoords}
                                            onChange={(e) => setMapCoords(e.target.value)}
                                            placeholder="1863,1991|2456,1234|3789,2456"
                                            className="w-full px-3 py-2 bg-black/60 border border-orange-600 rounded text-white h-24 font-mono text-sm"
                                        />
                                        <p className="text-orange-300 text-xs mt-1">
                                            Format: XXXX,YYYY|XXXX,YYYY|XXXX,YYYY (separated by |)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    
                    {/* Start Event Button */}
                    {isMarshall && !eventData?.started && (
                        <button 
                            onClick={onStartEvent} 
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-xl"
                        >
                            Start Event
                        </button>
                    )}
                    {eventData?.started && (
                        <div className="bg-gray-900/60 p-4 rounded border-2 border-gray-500 text-center">
                            <p className="text-gray-300 text-lg">Event has started! Selecting captains...</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="text-center mt-4 text-amber-600 text-sm">
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};
