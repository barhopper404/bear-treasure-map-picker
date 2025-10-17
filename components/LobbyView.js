window.LobbyView = ({
    characterName,
    discordUser,
    isAdmin,
    eventId,
    eventData,
    linkCopied,
    spinningWheel,
    currentWheelName,
    wheelCandidates,
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
    newPlayerMeleeDPS,
    setNewPlayerMeleeDPS,
    newPlayerRangedDPS,
    setNewPlayerRangedDPS,
    newPlayerTamer,
    setNewPlayerTamer,
    newPlayerSummoner,
    setNewPlayerSummoner,
    newPlayerTank,
    setNewPlayerTank,
    newPlayerJester,
    setNewPlayerJester,
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
    onChangeMarshall,
    onTransferMarshall,
    onLeaveEvent,
    onCancelEvent,
    setEditingPlayer,
    getRoleIcons
}) => {
    const { Users, Shield, Key, Heart, Music, Copy, Check, Edit, Trash, Sword, Target, Zap, Skull, User, RefreshCw, X, UserCheck, XCircle } = window.Icons;

    // Check if current user has joined the event
    const currentUserParticipant = eventData?.participants?.find(p =>
        p.discordUser && discordUser && p.discordUser.id === discordUser.id
    );

    // Check if current user is Marshall based on the isMarshall flag
    const isMarshall = currentUserParticipant?.isMarshall || false;

    // Wheel rotation state for animation
    const [wheelRotation, setWheelRotation] = React.useState(0);

    // Animate wheel rotation
    React.useEffect(() => {
        if (spinningWheel && wheelCandidates && wheelCandidates.length > 0) {
            let animationFrame;
            let startTime = Date.now();
            const totalDuration = 5000;

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / totalDuration, 1);

                // Easing function for deceleration
                const easeOut = 1 - Math.pow(1 - progress, 4);

                // Calculate rotation (multiple full spins + final position)
                const totalRotations = 5 + (easeOut * 3); // 5-8 full rotations
                const degrees = totalRotations * 360;

                setWheelRotation(degrees);

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            animationFrame = requestAnimationFrame(animate);

            return () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
            };
        } else {
            setWheelRotation(0);
        }
    }, [spinningWheel, wheelCandidates]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
            <div className="max-w-4xl mx-auto">
                {characterName && (
                    <div className="text-center mb-4">
                        <span className="bg-yellow-600 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                            Character: {characterName}
                        </span>
                    </div>
                )}
                
                {spinningWheel && wheelCandidates && wheelCandidates.length > 0 && (
                    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
                        <div className="text-center">
                            <h2 className="text-5xl font-bold text-yellow-400 mb-12 animate-pulse">Spinning the Wheel!</h2>

                            <div className="relative w-96 h-96 mx-auto">
                                {/* Ticker/Pointer at top */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 z-20">
                                    <div className="w-0 h-0 border-l-12 border-r-12 border-t-20 border-l-transparent border-r-transparent border-t-red-600 drop-shadow-lg"></div>
                                </div>

                                {/* Spinning wheel */}
                                <div
                                    className="absolute inset-0 rounded-full transition-transform"
                                    style={{
                                        transform: `rotate(${wheelRotation}deg)`,
                                        transitionDuration: '0ms'
                                    }}
                                >
                                    {/* Outer rim */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-600 border-8 border-yellow-400 shadow-2xl shadow-yellow-500/50"></div>

                                    {/* Wheel segments with names */}
                                    {wheelCandidates.map((candidate, index) => {
                                        const totalCandidates = wheelCandidates.length;
                                        const segmentAngle = 360 / totalCandidates;
                                        const rotation = index * segmentAngle;

                                        return (
                                            <div
                                                key={index}
                                                className="absolute inset-0"
                                                style={{
                                                    transform: `rotate(${rotation}deg)`
                                                }}
                                            >
                                                {/* Segment divider line */}
                                                <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-yellow-400 transform -translate-x-1/2"></div>

                                                {/* Name label */}
                                                <div
                                                    className="absolute top-12 left-1/2 transform -translate-x-1/2"
                                                    style={{
                                                        transform: `translateX(-50%) rotate(${-rotation - wheelRotation}deg)`
                                                    }}
                                                >
                                                    <span className="text-white font-bold text-sm whitespace-nowrap bg-gray-900/60 px-2 py-1 rounded">
                                                        {candidate.name}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Center hub */}
                                    <div className="absolute inset-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-full border-4 border-yellow-400 flex items-center justify-center">
                                        <span className="text-yellow-400 text-4xl font-bold">?</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-yellow-300 text-2xl font-semibold mt-12">Selecting Captain...</p>
                        </div>
                    </div>
                )}
                
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-8 border-2 border-yellow-500">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-yellow-400">Event Lobby</h2>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-gray-300 text-sm">Event ID</div>
                                <div className="text-2xl font-bold text-white">{eventId}</div>
                                {eventData?.started && (
                                    <div className="text-red-400 text-sm mt-1">🔒 LOCKED</div>
                                )}
                            </div>
                            {currentUserParticipant && !currentUserParticipant.isMarshall && !eventData?.started && (
                                <button
                                    onClick={onLeaveEvent}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                                    title="Leave Event"
                                >
                                    <X className="w-5 h-5" />
                                    Leave
                                </button>
                            )}
                            {(isMarshall || isAdmin) && (
                                <button
                                    onClick={onCancelEvent}
                                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                                    title="Cancel Event"
                                >
                                    <XCircle className="w-5 h-5" />
                                    Cancel Event
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <button 
                        onClick={onCopyEventLink} 
                        className="w-full mb-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
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
                        <h3 className="text-xl text-yellow-300 mb-4 flex items-center gap-2">
                            <Users className="w-6 h-6" />
                            Participants ({eventData?.participants?.length || 0})
                        </h3>
                        <div className="space-y-2">
                            {eventData?.participants?.map((p, idx) => (
                                <div key={idx} className="bg-gray-700/30 p-4 rounded border border-yellow-500">
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
                                            <div className="grid grid-cols-2 gap-2">
                                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={tempRoles.wantsCaptain} 
                                                        onChange={(e) => setTempRoles({ ...tempRoles, wantsCaptain: e.target.checked })} 
                                                        className="w-4 h-4" 
                                                    />
                                                    <Shield className="w-4 h-4 text-yellow-400" />
                                                    <span className="text-sm">Captain</span>
                                                </label>
                                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={tempRoles.lockpicker} 
                                                        onChange={(e) => setTempRoles({ ...tempRoles, lockpicker: e.target.checked })} 
                                                        className="w-4 h-4" 
                                                    />
                                                    <Key className="w-4 h-4 text-yellow-500" />
                                                    <span className="text-sm">Lockpicker</span>
                                                </label>
                                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={tempRoles.healer} 
                                                        onChange={(e) => setTempRoles({ ...tempRoles, healer: e.target.checked })} 
                                                        className="w-4 h-4" 
                                                    />
                                                    <Heart className="w-4 h-4 text-red-500" />
                                                    <span className="text-sm">Healer</span>
                                                </label>
                                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={tempRoles.bard} 
                                                        onChange={(e) => setTempRoles({ ...tempRoles, bard: e.target.checked })} 
                                                        className="w-4 h-4" 
                                                    />
                                                    <Music className="w-4 h-4 text-purple-500" />
                                                    <span className="text-sm">Bard</span>
                                                </label>
                                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={tempRoles.meleeDPS} 
                                                        onChange={(e) => setTempRoles({ ...tempRoles, meleeDPS: e.target.checked })} 
                                                        className="w-4 h-4" 
                                                    />
                                                    <Sword className="w-4 h-4 text-orange-500" />
                                                    <span className="text-sm">Melee DPS</span>
                                                </label>
                                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={tempRoles.rangedDPS} 
                                                        onChange={(e) => setTempRoles({ ...tempRoles, rangedDPS: e.target.checked })} 
                                                        className="w-4 h-4" 
                                                    />
                                                    <Target className="w-4 h-4 text-blue-500" />
                                                    <span className="text-sm">Ranged DPS</span>
                                                </label>
                                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={tempRoles.tamer} 
                                                        onChange={(e) => setTempRoles({ ...tempRoles, tamer: e.target.checked })} 
                                                        className="w-4 h-4" 
                                                    />
                                                    <Zap className="w-4 h-4 text-green-500" />
                                                    <span className="text-sm">Tamer</span>
                                                </label>
                                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={tempRoles.summoner} 
                                                        onChange={(e) => setTempRoles({ ...tempRoles, summoner: e.target.checked })} 
                                                        className="w-4 h-4" 
                                                    />
                                                    <Skull className="w-4 h-4 text-purple-400" />
                                                    <span className="text-sm">Summoner</span>
                                                </label>
                                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={tempRoles.tank} 
                                                        onChange={(e) => setTempRoles({ ...tempRoles, tank: e.target.checked })} 
                                                        className="w-4 h-4" 
                                                    />
                                                    <Shield className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm">Tank</span>
                                                </label>
                                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={tempRoles.jester} 
                                                        onChange={(e) => setTempRoles({ ...tempRoles, jester: e.target.checked })} 
                                                        className="w-4 h-4" 
                                                    />
                                                    <User className="w-4 h-4 text-pink-500" />
                                                    <span className="text-sm">Jester</span>
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
                                                {p.isAdmin && <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">ADMIN</span>}
                                                {p.isAnonymous && <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded">GUEST</span>}
                                                {p.wantsCaptain && (
                                                    <span className="bg-yellow-600 text-gray-900 text-xs px-2 py-1 rounded flex items-center gap-1">
                                                        <Shield className="w-3 h-3" />
                                                        CAPTAIN
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex gap-2 flex-wrap">{getRoleIcons(p)}</div>
                                                {isMarshall && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => onStartEditingRoles(idx, p)}
                                                            className="text-yellow-300 hover:text-yellow-400 p-1"
                                                            title="Edit roles"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        {!p.isMarshall && p.discordUser && !p.isManual && !p.isAnonymous && !eventData?.started && (
                                                            <button
                                                                onClick={() => onTransferMarshall(p.discordUser.id)}
                                                                className="text-purple-400 hover:text-purple-500 p-1"
                                                                title="Transfer Marshall to this player"
                                                            >
                                                                <UserCheck className="w-4 h-4" />
                                                            </button>
                                                        )}
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
                                                {isAdmin && currentUserParticipant && !eventData?.started && !p.isMarshall && p.discordUser && !p.isManual && (
                                                    <button
                                                        onClick={() => onChangeMarshall(p.discordUser.id)}
                                                        className="text-purple-400 hover:text-purple-500 p-1"
                                                        title="Make Marshall (Admin)"
                                                    >
                                                        <RefreshCw className="w-4 h-4" />
                                                    </button>
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
                            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-lg border-4 border-yellow-500 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Add Player Manually</h3>
                                
                                {error && (
                                    <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
                                        {error}
                                    </div>
                                )}
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-300 mb-2">Character Name</label>
                                        <input 
                                            type="text" 
                                            value={newPlayerName}
                                            onChange={(e) => setNewPlayerName(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-700/30 border border-yellow-500 rounded text-white" 
                                            placeholder="Enter player name"
                                            autoFocus
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-gray-300 mb-3 font-bold">Roles</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded border border-gray-600 hover:border-yellow-500">
                                                <input 
                                                    type="checkbox" 
                                                    checked={newPlayerCaptain}
                                                    onChange={(e) => setNewPlayerCaptain(e.target.checked)}
                                                    className="w-4 h-4" 
                                                />
                                                <Shield className="w-4 h-4 text-yellow-400" />
                                                <span className="text-sm">Captain</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded border border-gray-600 hover:border-yellow-500">
                                                <input 
                                                    type="checkbox" 
                                                    checked={newPlayerLockpicker}
                                                    onChange={(e) => setNewPlayerLockpicker(e.target.checked)}
                                                    className="w-4 h-4" 
                                                />
                                                <Key className="w-4 h-4 text-yellow-500" />
                                                <span className="text-sm">Lockpicker</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded border border-gray-600 hover:border-green-500">
                                                <input 
                                                    type="checkbox" 
                                                    checked={newPlayerHealer}
                                                    onChange={(e) => setNewPlayerHealer(e.target.checked)}
                                                    className="w-4 h-4" 
                                                />
                                                <Heart className="w-4 h-4 text-red-500" />
                                                <span className="text-sm">Healer</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded border border-gray-600 hover:border-green-500">
                                                <input 
                                                    type="checkbox" 
                                                    checked={newPlayerBard}
                                                    onChange={(e) => setNewPlayerBard(e.target.checked)}
                                                    className="w-4 h-4" 
                                                />
                                                <Music className="w-4 h-4 text-purple-500" />
                                                <span className="text-sm">Bard</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded border border-gray-600 hover:border-green-500">
                                                <input 
                                                    type="checkbox" 
                                                    checked={newPlayerMeleeDPS}
                                                    onChange={(e) => setNewPlayerMeleeDPS(e.target.checked)}
                                                    className="w-4 h-4" 
                                                />
                                                <Sword className="w-4 h-4 text-orange-500" />
                                                <span className="text-sm">Melee DPS</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded border border-gray-600 hover:border-green-500">
                                                <input 
                                                    type="checkbox" 
                                                    checked={newPlayerRangedDPS}
                                                    onChange={(e) => setNewPlayerRangedDPS(e.target.checked)}
                                                    className="w-4 h-4" 
                                                />
                                                <Target className="w-4 h-4 text-blue-500" />
                                                <span className="text-sm">Ranged DPS</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded border border-gray-600 hover:border-green-500">
                                                <input 
                                                    type="checkbox" 
                                                    checked={newPlayerTamer}
                                                    onChange={(e) => setNewPlayerTamer(e.target.checked)}
                                                    className="w-4 h-4" 
                                                />
                                                <Zap className="w-4 h-4 text-green-500" />
                                                <span className="text-sm">Tamer</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded border border-gray-600 hover:border-green-500">
                                                <input 
                                                    type="checkbox" 
                                                    checked={newPlayerSummoner}
                                                    onChange={(e) => setNewPlayerSummoner(e.target.checked)}
                                                    className="w-4 h-4" 
                                                />
                                                <Skull className="w-4 h-4 text-purple-400" />
                                                <span className="text-sm">Summoner</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded border border-gray-600 hover:border-green-500">
                                                <input 
                                                    type="checkbox" 
                                                    checked={newPlayerTank}
                                                    onChange={(e) => setNewPlayerTank(e.target.checked)}
                                                    className="w-4 h-4" 
                                                />
                                                <Shield className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">Tank</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-gray-300 cursor-pointer bg-gray-700/20 p-2 rounded border border-gray-600 hover:border-green-500">
                                                <input 
                                                    type="checkbox" 
                                                    checked={newPlayerJester}
                                                    onChange={(e) => setNewPlayerJester(e.target.checked)}
                                                    className="w-4 h-4" 
                                                />
                                                <User className="w-4 h-4 text-pink-500" />
                                                <span className="text-sm">Jester</span>
                                            </label>
                                        </div>
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
                                                setNewPlayerMeleeDPS(false);
                                                setNewPlayerRangedDPS(false);
                                                setNewPlayerTamer(false);
                                                setNewPlayerSummoner(false);
                                                setNewPlayerTank(false);
                                                setNewPlayerJester(false);
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
                            <div className="mb-6 bg-gray-700/40 p-4 rounded border border-yellow-500">
                                <h3 className="text-lg text-yellow-300 mb-3 font-bold">⚙️ Timer Settings</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-200 text-sm mb-2">
                                            Captain Choice Timer (10-300s)
                                        </label>
                                        <input 
                                            type="number" 
                                            min="10" 
                                            max="300"
                                            value={captainChoiceTimerSetting}
                                            onChange={(e) => setCaptainChoiceTimerSetting(parseInt(e.target.value) || 45)}
                                            className="w-full px-3 py-2 bg-gray-700/30 border border-yellow-500 rounded text-white"
                                        />
                                        <p className="text-yellow-300 text-xs mt-1">Currently: {captainChoiceTimerSetting}s</p>
                                    </div>
                                    <div>
                                        <label className="block text-gray-200 text-sm mb-2">
                                            Draft Timer (10-300s)
                                        </label>
                                        <input 
                                            type="number" 
                                            min="10" 
                                            max="300"
                                            value={draftTimerSetting}
                                            onChange={(e) => setDraftTimerSetting(parseInt(e.target.value) || 60)}
                                            className="w-full px-3 py-2 bg-gray-700/30 border border-yellow-500 rounded text-white"
                                        />
                                        <p className="text-yellow-300 text-xs mt-1">Currently: {draftTimerSetting}s</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mb-6 bg-gray-700/40 p-4 rounded border border-green-500">
                                <h3 className="text-lg text-green-300 mb-3 font-bold">🗺️ Treasure Map Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-200 text-sm mb-2">
                                            Total Maps (e.g., 10+10=20)
                                        </label>
                                        <input 
                                            type="number" 
                                            min="1" 
                                            max="100"
                                            value={totalMaps}
                                            onChange={(e) => setTotalMaps(parseInt(e.target.value) || 20)}
                                            className="w-full px-3 py-2 bg-gray-700/30 border border-green-500 rounded text-white"
                                        />
                                        <p className="text-green-300 text-xs mt-1">Total treasure maps to complete</p>
                                    </div>
                                    <div>
                                        <label className="block text-gray-200 text-sm mb-2">
                                            Map Coordinates (Optional)
                                        </label>
                                        <textarea 
                                            value={mapCoords}
                                            onChange={(e) => setMapCoords(e.target.value)}
                                            placeholder="1863,1991|2456,1234|3789,2456"
                                            className="w-full px-3 py-2 bg-gray-700/30 border border-green-500 rounded text-white h-24 font-mono text-sm"
                                        />
                                        <p className="text-green-300 text-xs mt-1">
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
            <div className="text-center mt-4 text-yellow-500 text-sm">
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};