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
    getRoleIcons,
    theme,
    isDarkMode,
    onToggleTheme,
    onBannerClick,
    eventType,
    setEventType,
    pitTrialTeamSize,
    setPitTrialTeamSize,
    onUpdateAllCaptainStatus,
    onRandomizeTeams
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
    const [lastTickSegment, setLastTickSegment] = React.useState(-1);

    // Create audio context for ticking sound
    const playTick = React.useCallback(() => {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800; // High pitched tick
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
        } catch (e) {
            console.log('Audio not supported');
        }
    }, []);

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

                // Calculate which segment is currently at the ticker (right side = 0 degrees)
                const normalizedRotation = degrees % 360;
                const segmentAngle = 360 / wheelCandidates.length;
                const currentSegment = Math.floor(normalizedRotation / segmentAngle);

                // Play tick sound when crossing to a new segment
                if (currentSegment !== lastTickSegment) {
                    setLastTickSegment(currentSegment);
                    playTick();
                }

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
            setLastTickSegment(-1);
        }
    }, [spinningWheel, wheelCandidates, lastTickSegment, playTick]);

    return (
        <div className={`min-h-screen ${theme.pageBg} p-8`}>
            <window.ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
            <div className="max-w-4xl mx-auto">
                <window.Banner onBannerClick={onBannerClick} />
                {characterName && (
                    <div className="text-center mb-4">
                        <span className={`${theme.badgeCharacter} px-4 py-2 rounded-full text-sm font-bold`}>
                            Character: {characterName}
                        </span>
                    </div>
                )}

                {spinningWheel && wheelCandidates && wheelCandidates.length > 0 && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8">
                        <div className={`${theme.pageBg} rounded-2xl border-4 ${theme.borderPrimary} shadow-2xl p-8 max-w-3xl w-full`}>
                            <h2 className={`text-4xl font-bold ${theme.headingPrimary} mb-8 text-center animate-pulse`}>Spinning the Wheel!</h2>

                            <div className="relative w-[500px] h-[500px] mx-auto">
                                {/* Ticker/Pointer at right */}
                                <div className="absolute top-1/2 right-0 transform translate-x-8 -translate-y-1/2 z-20">
                                    <div className={`w-0 h-0 border-t-[20px] border-b-[20px] border-l-[30px] border-t-transparent border-b-transparent ${theme.borderSuccess} drop-shadow-2xl`}></div>
                                </div>

                                {/* Spinning wheel container */}
                                <div
                                    className="absolute inset-0 rounded-full transition-transform"
                                    style={{
                                        transform: `rotate(${wheelRotation}deg)`,
                                        transitionDuration: '0ms'
                                    }}
                                >
                                    {/* Wheel segments with alternating colors */}
                                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
                                        <defs>
                                            {wheelCandidates.map((_, index) => {
                                                const totalCandidates = wheelCandidates.length;
                                                const segmentAngle = 360 / totalCandidates;
                                                const rotation = index * segmentAngle;

                                                return (
                                                    <filter key={`shadow-${index}`} id={`shadow-${index}`}>
                                                        <feDropShadow dx="0" dy="0" stdDeviation="2" floodOpacity="0.3"/>
                                                    </filter>
                                                );
                                            })}
                                        </defs>

                                        {wheelCandidates.map((candidate, index) => {
                                            const totalCandidates = wheelCandidates.length;
                                            const segmentAngle = 360 / totalCandidates;
                                            const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
                                            const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);

                                            const outerRadius = 250;
                                            const innerRadius = 80;

                                            const x1 = 250 + innerRadius * Math.cos(startAngle);
                                            const y1 = 250 + innerRadius * Math.sin(startAngle);
                                            const x2 = 250 + outerRadius * Math.cos(startAngle);
                                            const y2 = 250 + outerRadius * Math.sin(startAngle);
                                            const x3 = 250 + outerRadius * Math.cos(endAngle);
                                            const y3 = 250 + outerRadius * Math.sin(endAngle);
                                            const x4 = 250 + innerRadius * Math.cos(endAngle);
                                            const y4 = 250 + innerRadius * Math.sin(endAngle);

                                            const largeArc = segmentAngle > 180 ? 1 : 0;

                                            // Alternating green shades
                                            const colors = ['#65a30d', '#84cc16', '#a3e635', '#bef264'];
                                            const segmentColor = colors[index % colors.length];

                                            return (
                                                <path
                                                    key={index}
                                                    d={`M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1}`}
                                                    fill={segmentColor}
                                                    stroke="#fbbf24"
                                                    strokeWidth="2"
                                                    filter={`url(#shadow-${index})`}
                                                />
                                            );
                                        })}
                                    </svg>

                                    {/* Name labels positioned on segments - rotating with wheel */}
                                    {wheelCandidates.map((candidate, index) => {
                                        const totalCandidates = wheelCandidates.length;
                                        const segmentAngle = 360 / totalCandidates;
                                        const rotation = index * segmentAngle + (segmentAngle / 2);
                                        const textRadius = 165;

                                        return (
                                            <div
                                                key={index}
                                                className="absolute top-1/2 left-1/2 origin-left"
                                                style={{
                                                    transform: `rotate(${rotation}deg) translateX(${textRadius}px)`,
                                                    width: '1px',
                                                    height: '1px'
                                                }}
                                            >
                                                <div
                                                    className="absolute"
                                                    style={{
                                                        transform: `rotate(90deg) translateX(-50%) translateY(-50%)`,
                                                        left: '0',
                                                        top: '0'
                                                    }}
                                                >
                                                    <span className="text-gray-900 font-bold text-xl whitespace-nowrap drop-shadow-lg">
                                                        {candidate.name}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Center hub */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-500 rounded-full border-8 border-white shadow-2xl flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-gray-800 font-bold text-xl mb-1">BEAR</div>
                                            <div className="text-gray-700 text-xs">Treasure Map</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className={`${theme.headingSecondary} text-xl font-semibold mt-8 text-center`}>Selecting Captain...</p>
                        </div>
                    </div>
                )}

                <div className={`${theme.cardBg} backdrop-blur-sm rounded-lg p-8 border-2 ${theme.borderPrimary}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className={`text-3xl font-bold ${theme.headingPrimary}`}>Event Lobby</h2>
                        <div className="flex items-center gap-4">
                            {/* Event Type Toggle */}
                            <div className="flex flex-col gap-2">
                                <div className={`flex rounded-lg overflow-hidden border-2 ${theme.borderPrimary}`}>
                                    <button
                                        onClick={() => isMarshall && setEventType('treasureMap')}
                                        disabled={!isMarshall || eventData?.started}
                                        className={`px-4 py-2 font-bold text-sm transition-colors ${
                                            eventType === 'treasureMap'
                                                ? `${theme.btnSuccess} ${theme.btnSuccessText}`
                                                : `${theme.overlayBg} ${theme.textMuted} hover:${theme.textSecondary}`
                                        } ${(!isMarshall || eventData?.started) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                                        title={!isMarshall ? 'Marshall only' : eventData?.started ? 'Event locked' : 'Switch to Treasure Maps'}
                                    >
                                        🗺️ Treasure Maps
                                    </button>
                                    <button
                                        onClick={() => isMarshall && setEventType('pitTrial')}
                                        disabled={!isMarshall || eventData?.started}
                                        className={`px-4 py-2 font-bold text-sm transition-colors ${
                                            eventType === 'pitTrial'
                                                ? `bg-purple-600 hover:bg-purple-700 text-white`
                                                : `${theme.overlayBg} ${theme.textMuted} hover:${theme.textSecondary}`
                                        } ${(!isMarshall || eventData?.started) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                                        title={!isMarshall ? 'Marshall only' : eventData?.started ? 'Event locked' : 'Switch to Pit Trials'}
                                    >
                                        ⚔️ Pit Trials
                                    </button>
                                </div>

                                {/* Team Size Toggle - Only visible for Pit Trials */}
                                {eventType === 'pitTrial' && (
                                    <div className={`flex rounded-lg overflow-hidden border-2 border-purple-500`}>
                                        <button
                                            onClick={() => isMarshall && setPitTrialTeamSize(3)}
                                            disabled={!isMarshall || eventData?.started}
                                            className={`px-4 py-2 font-bold text-sm transition-colors ${
                                                pitTrialTeamSize === 3
                                                    ? `bg-purple-600 hover:bg-purple-700 text-white`
                                                    : `${theme.overlayBg} ${theme.textMuted} hover:${theme.textSecondary}`
                                            } ${(!isMarshall || eventData?.started) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                                            title={!isMarshall ? 'Marshall only' : eventData?.started ? 'Event locked' : '3 players per team'}
                                        >
                                            3 Players
                                        </button>
                                        <button
                                            onClick={() => isMarshall && setPitTrialTeamSize(5)}
                                            disabled={!isMarshall || eventData?.started}
                                            className={`px-4 py-2 font-bold text-sm transition-colors ${
                                                pitTrialTeamSize === 5
                                                    ? `bg-purple-600 hover:bg-purple-700 text-white`
                                                    : `${theme.overlayBg} ${theme.textMuted} hover:${theme.textSecondary}`
                                            } ${(!isMarshall || eventData?.started) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                                            title={!isMarshall ? 'Marshall only' : eventData?.started ? 'Event locked' : '5 players per team'}
                                        >
                                            5 Players
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="text-right">
                                <div className={`${theme.textSecondary} text-sm`}>Event ID</div>
                                <div className={`text-2xl font-bold ${theme.textPrimary}`}>{eventId}</div>
                                {eventData?.started && (
                                    <div className="text-red-400 text-sm mt-1">🔒 LOCKED</div>
                                )}
                            </div>
                            {currentUserParticipant && !currentUserParticipant.isMarshall && !eventData?.started && (
                                <button
                                    onClick={onLeaveEvent}
                                    className={`${theme.btnDanger} ${theme.btnDangerText} font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2`}
                                    title="Leave Event"
                                >
                                    <X className="w-5 h-5" />
                                    Leave
                                </button>
                            )}
                            {(isMarshall || isAdmin) && (
                                <button
                                    onClick={onCancelEvent}
                                    className={`${theme.btnDanger} ${theme.btnDangerText} font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2`}
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
                        className={`w-full mb-6 ${theme.btnSuccess} ${theme.btnSuccessText} font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2`}
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
                        <h3 className={`text-xl ${theme.headingSecondary} mb-4 flex items-center gap-2`}>
                            <Users className="w-6 h-6" />
                            Participants ({eventData?.participants?.length || 0})
                        </h3>
                        <div className="space-y-2">
                            {eventData?.participants?.map((p, idx) => (
                                <div key={idx} className={`${theme.overlayBg} p-4 rounded border ${theme.borderPrimary}`}>
                                    {editingPlayer === idx ? (
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={`${theme.textPrimary} font-bold`}>{p.name}</span>
                                                <button
                                                    onClick={() => {
                                                        setEditingPlayer(null);
                                                        setTempRoles({});
                                                    }}
                                                    className={`${theme.textMuted} hover:${theme.textPrimary}`}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempRoles.wantsCaptain}
                                                        onChange={(e) => setTempRoles({ ...tempRoles, wantsCaptain: e.target.checked })}
                                                        className="w-4 h-4"
                                                    />
                                                    <Shield className="w-4 h-4 text-yellow-400" />
                                                    <span className="text-sm">Captain</span>
                                                </label>
                                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempRoles.lockpicker}
                                                        onChange={(e) => setTempRoles({ ...tempRoles, lockpicker: e.target.checked })}
                                                        className="w-4 h-4"
                                                    />
                                                    <Key className="w-4 h-4 text-yellow-500" />
                                                    <span className="text-sm">Lockpicker</span>
                                                </label>
                                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempRoles.healer}
                                                        onChange={(e) => setTempRoles({ ...tempRoles, healer: e.target.checked })}
                                                        className="w-4 h-4"
                                                    />
                                                    <Heart className="w-4 h-4 text-red-500" />
                                                    <span className="text-sm">Healer</span>
                                                </label>
                                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempRoles.bard}
                                                        onChange={(e) => setTempRoles({ ...tempRoles, bard: e.target.checked })}
                                                        className="w-4 h-4"
                                                    />
                                                    <Music className="w-4 h-4 text-purple-500" />
                                                    <span className="text-sm">Bard</span>
                                                </label>
                                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempRoles.meleeDPS}
                                                        onChange={(e) => setTempRoles({ ...tempRoles, meleeDPS: e.target.checked })}
                                                        className="w-4 h-4"
                                                    />
                                                    <Sword className="w-4 h-4 text-orange-500" />
                                                    <span className="text-sm">Melee DPS</span>
                                                </label>
                                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempRoles.rangedDPS}
                                                        onChange={(e) => setTempRoles({ ...tempRoles, rangedDPS: e.target.checked })}
                                                        className="w-4 h-4"
                                                    />
                                                    <Target className="w-4 h-4 text-blue-500" />
                                                    <span className="text-sm">Ranged DPS</span>
                                                </label>
                                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempRoles.tamer}
                                                        onChange={(e) => setTempRoles({ ...tempRoles, tamer: e.target.checked })}
                                                        className="w-4 h-4"
                                                    />
                                                    <Zap className="w-4 h-4 text-green-500" />
                                                    <span className="text-sm">Tamer</span>
                                                </label>
                                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempRoles.summoner}
                                                        onChange={(e) => setTempRoles({ ...tempRoles, summoner: e.target.checked })}
                                                        className="w-4 h-4"
                                                    />
                                                    <Skull className="w-4 h-4 text-purple-400" />
                                                    <span className="text-sm">Summoner</span>
                                                </label>
                                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempRoles.tank}
                                                        onChange={(e) => setTempRoles({ ...tempRoles, tank: e.target.checked })}
                                                        className="w-4 h-4"
                                                    />
                                                    <Shield className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm">Tank</span>
                                                </label>
                                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded`}>
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
                                                className={`w-full ${theme.btnSuccess} ${theme.btnSuccessText} font-bold py-2 px-4 rounded transition-colors`}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <window.Avatar discordUser={p.discordUser} size="lg" />
                                                <div>
                                                    <span className={`${theme.textPrimary} font-bold`}>{p.name}</span>
                                                    {p.discordUser && !p.isManual && (
                                                        <span className="text-indigo-300 text-sm ml-2">({p.discordUser.username})</span>
                                                    )}
                                                    {p.isManual && (
                                                        <span className={`${theme.textMuted} text-sm ml-2`}>(Manual)</span>
                                                    )}
                                                </div>
                                                {p.isMarshall && <span className={`${theme.badgeMarshall} text-white text-xs px-2 py-1 rounded`}>MARSHALL</span>}
                                                {p.isAdmin && <span className={`${theme.badgeAdmin} text-white text-xs px-2 py-1 rounded`}>ADMIN</span>}
                                                {p.isAnonymous && <span className={`${theme.badgeGuest} text-white text-xs px-2 py-1 rounded`}>GUEST</span>}
                                                {p.wantsCaptain && (
                                                    <span className={`${theme.badgeCaptain} text-xs px-2 py-1 rounded flex items-center gap-1`}>
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
                                                            className={`${theme.headingSecondary} hover:${theme.headingPrimary} p-1`}
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

                    {/* Marshall-only controls */}
                    {isMarshall && !eventData?.started && (
                        <>
                            {/* Set All as Captain Checkbox */}
                            <div className={`mb-4 ${theme.darkOverlayBg} p-4 rounded border ${theme.borderPrimary}`}>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={eventData?.participants?.every(p => p.wantsCaptain) || false}
                                        onChange={(e) => {
                                            const allAsCaptain = e.target.checked;
                                            const updatedParticipants = eventData.participants.map(p => ({
                                                ...p,
                                                wantsCaptain: allAsCaptain
                                            }));
                                            onUpdateAllCaptainStatus && onUpdateAllCaptainStatus(updatedParticipants);
                                        }}
                                        className="w-5 h-5"
                                    />
                                    <div className="flex items-center gap-2">
                                        <Shield className={`w-5 h-5 ${theme.headingPrimary}`} />
                                        <span className={`${theme.textPrimary} font-bold`}>Set All Players as Captain</span>
                                    </div>
                                </label>
                                <p className={`${theme.textMuted} text-sm mt-2 ml-8`}>
                                    Enable this to make all participants eligible for captain selection
                                </p>
                            </div>

                            {/* Randomize Full Teams Button */}
                            <div className="mb-4">
                                <button
                                    onClick={onRandomizeTeams}
                                    className={`w-full ${theme.btnPrimary} ${theme.btnPrimaryText} font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2`}
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    Randomize Full Teams
                                </button>
                                <p className={`${theme.textMuted} text-sm mt-2 text-center`}>
                                    Instantly create randomized teams with captains
                                </p>
                            </div>

                            {/* Add Player Manually Button */}
                            <div className="mb-6">
                                <button
                                    onClick={() => setShowAddPlayer(true)}
                                    className={`w-full ${theme.btnSuccess} ${theme.btnSuccessText} font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2`}
                                >
                                    <Users className="w-5 h-5" />
                                    Add Player Manually
                                </button>
                            </div>
                        </>
                    )}

                    {/* Add Player Modal */}
                    {showAddPlayer && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                            <div className={`${theme.pageBg} p-8 rounded-lg border-4 ${theme.borderPrimary} max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto`}>
                                <h3 className={`text-2xl font-bold ${theme.headingPrimary} mb-4`}>Add Player Manually</h3>

                                {error && (
                                    <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
                                        {error}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div>
                                        <label className={`block ${theme.textSecondary} mb-2`}>Character Name</label>
                                        <input
                                            type="text"
                                            value={newPlayerName}
                                            onChange={(e) => setNewPlayerName(e.target.value)}
                                            className={`w-full px-4 py-2 ${theme.overlayBg} border ${theme.borderPrimary} rounded ${theme.textPrimary}`}
                                            placeholder="Enter player name"
                                            autoFocus
                                        />
                                    </div>

                                    <div>
                                        <label className={`block ${theme.textSecondary} mb-3 font-bold`}>Roles</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded border ${theme.borderSecondary} hover:${theme.borderPrimary}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={newPlayerCaptain}
                                                    onChange={(e) => setNewPlayerCaptain(e.target.checked)}
                                                    className="w-4 h-4"
                                                />
                                                <Shield className="w-4 h-4 text-yellow-400" />
                                                <span className="text-sm">Captain</span>
                                            </label>
                                            <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded border ${theme.borderSecondary} hover:${theme.borderPrimary}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={newPlayerLockpicker}
                                                    onChange={(e) => setNewPlayerLockpicker(e.target.checked)}
                                                    className="w-4 h-4"
                                                />
                                                <Key className="w-4 h-4 text-yellow-500" />
                                                <span className="text-sm">Lockpicker</span>
                                            </label>
                                            <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded border ${theme.borderSecondary} hover:${theme.borderSuccess}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={newPlayerHealer}
                                                    onChange={(e) => setNewPlayerHealer(e.target.checked)}
                                                    className="w-4 h-4"
                                                />
                                                <Heart className="w-4 h-4 text-red-500" />
                                                <span className="text-sm">Healer</span>
                                            </label>
                                            <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded border ${theme.borderSecondary} hover:${theme.borderSuccess}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={newPlayerBard}
                                                    onChange={(e) => setNewPlayerBard(e.target.checked)}
                                                    className="w-4 h-4"
                                                />
                                                <Music className="w-4 h-4 text-purple-500" />
                                                <span className="text-sm">Bard</span>
                                            </label>
                                            <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded border ${theme.borderSecondary} hover:${theme.borderSuccess}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={newPlayerMeleeDPS}
                                                    onChange={(e) => setNewPlayerMeleeDPS(e.target.checked)}
                                                    className="w-4 h-4"
                                                />
                                                <Sword className="w-4 h-4 text-orange-500" />
                                                <span className="text-sm">Melee DPS</span>
                                            </label>
                                            <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded border ${theme.borderSecondary} hover:${theme.borderSuccess}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={newPlayerRangedDPS}
                                                    onChange={(e) => setNewPlayerRangedDPS(e.target.checked)}
                                                    className="w-4 h-4"
                                                />
                                                <Target className="w-4 h-4 text-blue-500" />
                                                <span className="text-sm">Ranged DPS</span>
                                            </label>
                                            <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded border ${theme.borderSecondary} hover:${theme.borderSuccess}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={newPlayerTamer}
                                                    onChange={(e) => setNewPlayerTamer(e.target.checked)}
                                                    className="w-4 h-4"
                                                />
                                                <Zap className="w-4 h-4 text-green-500" />
                                                <span className="text-sm">Tamer</span>
                                            </label>
                                            <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded border ${theme.borderSecondary} hover:${theme.borderSuccess}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={newPlayerSummoner}
                                                    onChange={(e) => setNewPlayerSummoner(e.target.checked)}
                                                    className="w-4 h-4"
                                                />
                                                <Skull className="w-4 h-4 text-purple-400" />
                                                <span className="text-sm">Summoner</span>
                                            </label>
                                            <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded border ${theme.borderSecondary} hover:${theme.borderSuccess}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={newPlayerTank}
                                                    onChange={(e) => setNewPlayerTank(e.target.checked)}
                                                    className="w-4 h-4"
                                                />
                                                <Shield className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">Tank</span>
                                            </label>
                                            <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-2 rounded border ${theme.borderSecondary} hover:${theme.borderSuccess}`}>
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
                                            className={`flex-1 ${theme.btnSuccess} ${theme.btnSuccessText} font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50`}
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
                                            className={`flex-1 ${theme.btnSecondary} ${theme.btnSecondaryText} font-bold py-3 px-6 rounded-lg transition-colors`}
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
                            <div className={`mb-6 ${theme.darkOverlayBg} p-4 rounded border ${theme.borderPrimary}`}>
                                <h3 className={`text-lg ${theme.headingSecondary} mb-3 font-bold`}>⚙️ Timer Settings</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={`block ${theme.textPrimary} text-sm mb-2`}>
                                            Captain Choice Timer (10-300s)
                                        </label>
                                        <input
                                            type="number"
                                            min="10"
                                            max="300"
                                            value={captainChoiceTimerSetting}
                                            onChange={(e) => setCaptainChoiceTimerSetting(parseInt(e.target.value) || 45)}
                                            className={`w-full px-3 py-2 ${theme.overlayBg} border ${theme.borderPrimary} rounded ${theme.textPrimary}`}
                                        />
                                        <p className={`${theme.headingSecondary} text-xs mt-1`}>Currently: {captainChoiceTimerSetting}s</p>
                                    </div>
                                    <div>
                                        <label className={`block ${theme.textPrimary} text-sm mb-2`}>
                                            Draft Timer (10-300s)
                                        </label>
                                        <input
                                            type="number"
                                            min="10"
                                            max="300"
                                            value={draftTimerSetting}
                                            onChange={(e) => setDraftTimerSetting(parseInt(e.target.value) || 60)}
                                            className={`w-full px-3 py-2 ${theme.overlayBg} border ${theme.borderPrimary} rounded ${theme.textPrimary}`}
                                        />
                                        <p className={`${theme.headingSecondary} text-xs mt-1`}>Currently: {draftTimerSetting}s</p>
                                    </div>
                                </div>
                            </div>

                            {eventType === 'treasureMap' && (
                                <div className={`mb-6 ${theme.darkOverlayBg} p-4 rounded border ${theme.borderSuccess}`}>
                                    <h3 className="text-lg text-green-300 mb-3 font-bold">🗺️ Treasure Map Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className={`block ${theme.textPrimary} text-sm mb-2`}>
                                            Total Maps (e.g., 10+10=20)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="100"
                                            value={totalMaps}
                                            onChange={(e) => setTotalMaps(parseInt(e.target.value) || 20)}
                                            className={`w-full px-3 py-2 ${theme.overlayBg} border ${theme.borderSuccess} rounded ${theme.textPrimary}`}
                                        />
                                        <p className="text-green-300 text-xs mt-1">Total treasure maps to complete</p>
                                    </div>
                                    <div>
                                        <label className={`block ${theme.textPrimary} text-sm mb-2`}>
                                            Map Coordinates (Optional)
                                        </label>
                                        <textarea
                                            value={mapCoords}
                                            onChange={(e) => setMapCoords(e.target.value)}
                                            placeholder="1863,1991|2456,1234|3789,2456"
                                            className={`w-full px-3 py-2 ${theme.overlayBg} border ${theme.borderSuccess} rounded ${theme.textPrimary} h-24 font-mono text-sm`}
                                        />
                                        <p className="text-green-300 text-xs mt-1">
                                            Format: XXXX,YYYY|XXXX,YYYY|XXXX,YYYY (separated by |)
                                        </p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                // Generate random coordinates between 1-3000
                                                const coords = [];
                                                for (let i = 0; i < totalMaps; i++) {
                                                    const x = Math.floor(Math.random() * 3000) + 1;
                                                    const y = Math.floor(Math.random() * 3000) + 1;
                                                    coords.push(`${x},${y}`);
                                                }
                                                setMapCoords(coords.join('|'));
                                            }}
                                            className={`w-full ${theme.btnPrimary} ${theme.btnPrimaryText} font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2`}
                                        >
                                            🎲 Generate Random Coordinates (Testing/Demo)
                                        </button>
                                        <p className="text-green-300 text-xs mt-1">
                                            Generates {totalMaps} random map coordinates between 1-3000 for testing
                                        </p>
                                    </div>
                                </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Start Event Button */}
                    {isMarshall && !eventData?.started && (
                        <button
                            onClick={onStartEvent}
                            disabled={loading}
                            className={`w-full ${loading ? theme.btnDisabled : `${theme.btnSuccess} ${theme.btnSuccessText}`} font-bold py-4 px-6 rounded-lg transition-colors text-xl ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                        >
                            {loading ? 'Starting Event...' : 'Start Event'}
                        </button>
                    )}
                    {eventData?.started && (
                        <div className={`${theme.overlayBg} p-4 rounded border-2 ${theme.borderSecondary} text-center`}>
                            <p className={`${theme.textSecondary} text-lg`}>Event has started! Selecting captains...</p>
                        </div>
                    )}
                </div>
            </div>
            <div className={`text-center mt-4 ${theme.versionText} text-sm`}>
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};
