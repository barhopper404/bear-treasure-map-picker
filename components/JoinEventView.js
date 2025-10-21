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
    setView,
    theme,
    isDarkMode,
    onToggleTheme,
    onBannerClick
}) => {
    const { Shield, Key, Heart, Music, Discord, Sword, Target, Zap, Skull, User } = window.Icons;

    // Allow joining without Discord, but show notice about limitations

    return (
        <div className={`min-h-screen ${theme.pageBg} p-8`}>
            <window.ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
            <div className="max-w-2xl mx-auto">
                <window.Banner onBannerClick={onBannerClick} />
                <div className="text-center mb-4">
                    {discordUser ? (
                        <span className={`${theme.btnDiscord} px-4 py-2 rounded-full text-sm flex items-center gap-2 inline-flex`}>
                            <Discord className="w-4 h-4" />
                            {discordUser.username}
                        </span>
                    ) : (
                        <div className="space-y-2">
                            <span className={`${theme.badgeAnonymous} px-4 py-2 rounded-full text-sm inline-block`}>
                                Anonymous User
                            </span>
                            <button
                                onClick={onLoginWithDiscord}
                                className={`${theme.btnDiscord} font-bold py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 mx-auto`}
                            >
                                <Discord className="w-4 h-4" />
                                Login with Discord
                            </button>
                        </div>
                    )}
                </div>
                <div className={`${theme.cardBg} backdrop-blur-sm rounded-lg p-8 border-2 ${theme.borderPrimary}`}>
                    <h2 className={`text-3xl font-bold ${theme.headingPrimary} mb-6`}>Join Event</h2>

                    {!discordUser && (
                        <div className={`${theme.alertWarning} px-4 py-3 rounded mb-4`}>
                            <p className="font-bold mb-1">Playing as Guest</p>
                            <p className="text-sm">Your stats won't be tracked. You cannot be Marshall.</p>
                        </div>
                    )}

                    {error && (
                        <div className={`${theme.alertError} px-4 py-3 rounded mb-4`}>
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        <div>
                            <label className={`block ${theme.textSecondary} mb-2`}>Event ID</label>
                            <input
                                type="text"
                                value={eventId}
                                onChange={(e) => setEventId(e.target.value.toUpperCase())}
                                className={`w-full px-4 py-2 ${theme.inputBg} border ${theme.borderPrimary} rounded ${theme.inputText} ${theme.inputPlaceholder} ${theme.inputFocus} uppercase`}
                                placeholder="Enter event ID"
                            />
                        </div>
                        <div>
                            <label className={`block ${theme.textSecondary} mb-2`}>Your Character Name</label>
                            <input
                                type="text"
                                value={characterName}
                                onChange={(e) => setCharacterName(e.target.value)}
                                className={`w-full px-4 py-2 ${theme.inputBg} border ${theme.borderPrimary} rounded ${theme.inputText} ${theme.inputPlaceholder} ${theme.inputFocus}`}
                                placeholder="Enter your name"
                            />
                        </div>
                        
                        <div>
                            <label className={`block ${theme.textSecondary} mb-3 font-bold`}>Your Roles</label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className={`flex items-center gap-2 ${theme.textSecondary} p-3 rounded border ${theme.borderSecondary} transition-colors ${!discordUser ? 'opacity-50 cursor-not-allowed' : `cursor-pointer ${theme.overlayBg} hover:${theme.borderPrimary}`}`}>
                                    <input
                                        type="checkbox"
                                        checked={wantsCaptain}
                                        onChange={(e) => setWantsCaptain(e.target.checked)}
                                        className="w-5 h-5"
                                        disabled={!discordUser}
                                        title={!discordUser ? 'Login with Discord to be Captain' : ''}
                                    />
                                    <Shield className="w-5 h-5 text-yellow-400" />
                                    <span>Captain {!discordUser && '(Discord Required)'}</span>
                                </label>
                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-3 rounded border ${theme.borderSecondary} hover:${theme.borderPrimary} transition-colors`}>
                                    <input type="checkbox" checked={isLockpicker} onChange={(e) => setIsLockpicker(e.target.checked)} className="w-5 h-5" />
                                    <Key className="w-5 h-5 text-yellow-500" />
                                    <span>Lockpicker</span>
                                </label>
                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-3 rounded border ${theme.borderSecondary} hover:border-green-500 transition-colors`}>
                                    <input type="checkbox" checked={isHealer} onChange={(e) => setIsHealer(e.target.checked)} className="w-5 h-5" />
                                    <Heart className="w-5 h-5 text-red-500" />
                                    <span>Healer</span>
                                </label>
                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-3 rounded border ${theme.borderSecondary} hover:border-green-500 transition-colors`}>
                                    <input type="checkbox" checked={isBard} onChange={(e) => setIsBard(e.target.checked)} className="w-5 h-5" />
                                    <Music className="w-5 h-5 text-purple-500" />
                                    <span>Bard</span>
                                </label>
                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-3 rounded border ${theme.borderSecondary} hover:border-green-500 transition-colors`}>
                                    <input type="checkbox" checked={isMeleeDPS} onChange={(e) => setIsMeleeDPS(e.target.checked)} className="w-5 h-5" />
                                    <Sword className="w-5 h-5 text-orange-500" />
                                    <span>Melee DPS</span>
                                </label>
                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-3 rounded border ${theme.borderSecondary} hover:border-green-500 transition-colors`}>
                                    <input type="checkbox" checked={isRangedDPS} onChange={(e) => setIsRangedDPS(e.target.checked)} className="w-5 h-5" />
                                    <Target className="w-5 h-5 text-blue-500" />
                                    <span>Ranged DPS</span>
                                </label>
                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-3 rounded border ${theme.borderSecondary} hover:border-green-500 transition-colors`}>
                                    <input type="checkbox" checked={isTamer} onChange={(e) => setIsTamer(e.target.checked)} className="w-5 h-5" />
                                    <Zap className="w-5 h-5 text-green-500" />
                                    <span>Tamer</span>
                                </label>
                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-3 rounded border ${theme.borderSecondary} hover:border-green-500 transition-colors`}>
                                    <input type="checkbox" checked={isSummoner} onChange={(e) => setIsSummoner(e.target.checked)} className="w-5 h-5" />
                                    <Skull className="w-5 h-5 text-purple-400" />
                                    <span>Summoner</span>
                                </label>
                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-3 rounded border ${theme.borderSecondary} hover:border-green-500 transition-colors`}>
                                    <input type="checkbox" checked={isTank} onChange={(e) => setIsTank(e.target.checked)} className="w-5 h-5" />
                                    <Shield className="w-5 h-5 text-gray-400" />
                                    <span>Tank</span>
                                </label>
                                <label className={`flex items-center gap-2 ${theme.textSecondary} cursor-pointer ${theme.overlayBg} p-3 rounded border ${theme.borderSecondary} hover:border-green-500 transition-colors`}>
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
                                className={`flex-1 ${theme.btnPrimary} disabled:${theme.btnSecondary} font-bold py-3 px-6 rounded-lg transition-colors`}
                            >
                                {loading ? 'Joining...' : 'Join Event'}
                            </button>
                            <button
                                onClick={() => setView('home')}
                                disabled={loading}
                                className={`flex-1 ${theme.btnSecondary} font-bold py-3 px-6 rounded-lg transition-colors`}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`text-center mt-4 ${theme.versionText} text-sm`}>
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};