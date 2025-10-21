window.TeamPickingView = ({
    characterName,
    discordUser,
    captains,
    pickingCaptain,
    teams,
    availablePlayers,
    draftTimer,
    isAutoPicking,
    justDrafted,
    isDrafting,
    teamNames,
    editingTeamName,
    tempTeamName,
    setTempTeamName,
    setEditingTeamName,
    onPickPlayer,
    onUpdateTeamName,
    getRoleIcons,
    theme,
    isDarkMode,
    onToggleTheme,
    onBannerClick
}) => {
    const { Shield, Edit } = window.Icons;
    const isCurrentCaptain = captains[pickingCaptain]?.name === characterName;
    const isCaptain1 = captains[0]?.name === characterName;
    const isCaptain2 = captains[1]?.name === characterName;

    return (
        <div className={`min-h-screen ${theme.pageBg} p-8`}>
            <window.ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
            <div className="max-w-6xl mx-auto">
                <window.Banner onBannerClick={onBannerClick} />
                <window.CharacterBadge characterName={characterName} discordUser={discordUser} theme={theme} />
                <div className={`${theme.cardBg} backdrop-blur-sm rounded-lg p-8 border-2 ${theme.borderPrimary}`}>
                    <h2 className={`text-3xl font-bold ${theme.headingPrimary} mb-6 text-center`}>Team Selection</h2>

                    {availablePlayers.length > 0 && (
                        <div className="text-center mb-4">
                            <div className={`inline-block px-6 py-3 rounded-lg ${draftTimer <= 10 ? theme.timerAlert : theme.timerNormal}`}>
                                <span className={`${theme.textPrimary} text-2xl font-bold`}>{draftTimer}s</span>
                                <span className={`ml-2 ${draftTimer <= 10 ? 'text-red-200' : 'text-gray-900'}`}>to pick</span>
                            </div>
                        </div>
                    )}

                    {isAutoPicking && (
                        <div className={`${theme.statusAlert} p-4 rounded mb-6 text-center`}>
                            <p className={`${theme.textPrimary} text-xl font-bold`}>Time's up! Auto-picking random player...</p>
                        </div>
                    )}

                    {isCurrentCaptain && availablePlayers.length > 0 && (
                        <div className={`${theme.statusActive} p-4 rounded mb-6 text-center`}>
                            <p className="text-green-200 text-xl font-bold">It's your turn to pick!</p>
                        </div>
                    )}

                    {!isCurrentCaptain && availablePlayers.length > 0 && (
                        <div className={`${theme.statusWaiting} p-4 rounded mb-6 text-center`}>
                            <p className={`${theme.textSecondary} text-xl`}>Waiting for {captains[pickingCaptain]?.name} to pick...</p>
                        </div>
                    )}

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {/* Team 1 */}
                        <div className={`${theme.team1Bg} p-4 rounded border-2 ${theme.team1Border}`}>
                            {editingTeamName === 'captain1' && isCaptain1 ? (
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={tempTeamName}
                                        onChange={(e) => setTempTeamName(e.target.value)}
                                        className={`w-full px-2 py-1 mb-2 ${theme.overlayBg} border border-blue-400 rounded ${theme.textPrimary} text-lg`}
                                        placeholder="Team name..."
                                        autoFocus
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onUpdateTeamName('captain1')}
                                            className={`flex-1 ${theme.btnSuccess} ${theme.btnSuccessText} font-bold py-1 px-3 rounded text-sm`}
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => { setEditingTeamName(null); setTempTeamName(''); }}
                                            className={`flex-1 ${theme.btnSecondary} ${theme.textPrimary} font-bold py-1 px-3 rounded text-sm`}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <h3 className={`text-xl ${theme.team1Text} mb-3 flex items-center gap-2`}>
                                    <Shield className="w-5 h-5" />
                                    {teamNames.captain1 || `Team 1: ${captains[0]?.name}`}
                                    {isCaptain1 && (
                                        <button
                                            onClick={() => {
                                                setEditingTeamName('captain1');
                                                setTempTeamName(teamNames.captain1 || '');
                                            }}
                                            className="text-blue-400 hover:text-blue-300 ml-auto"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                    )}
                                </h3>
                            )}
                            <div className="space-y-2">
                                <div className={`bg-blue-800/60 p-2 rounded ${theme.textPrimary} font-bold flex items-center gap-2`}>
                                    <window.Avatar discordUser={captains[0]?.discordUser} size="sm" />
                                    {captains[0]?.name} (Captain)
                                </div>
                                {teams.captain1.map((p, idx) => (
                                    <div
                                        key={idx}
                                        className={`${theme.overlayBg} p-2 rounded ${theme.textPrimary} flex justify-between items-center transition-all ${
                                            justDrafted === p.name ? 'ring-4 ring-green-400 bg-green-900/60 scale-105' : ''
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <window.Avatar discordUser={p.discordUser} size="sm" />
                                            <span>{p.name}</span>
                                        </div>
                                        <div className="flex gap-1 flex-wrap">{getRoleIcons(p)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Available Players */}
                        <div className={`${theme.overlayBg} p-4 rounded border-2 ${theme.borderPrimary}`}>
                            <h3 className="text-xl text-yellow-300 mb-3 text-center">Available Players</h3>
                            {availablePlayers.length === 0 ? (
                                <div className="text-center text-gray-400">All picked!</div>
                            ) : (
                                <div className="space-y-2">
                                    {availablePlayers.map((p, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => isCurrentCaptain && !isDrafting ? onPickPlayer(p) : null}
                                            disabled={!isCurrentCaptain || isDrafting}
                                            className={`w-full p-2 rounded ${theme.textPrimary} flex justify-between items-center transition-colors ${
                                                isCurrentCaptain && !isDrafting
                                                    ? `${theme.btnPrimary} ${theme.btnPrimaryText} cursor-pointer font-bold`
                                                    : `${theme.btnDisabled} cursor-not-allowed opacity-50`
                                            }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <window.Avatar discordUser={p.discordUser} size="sm" />
                                                <span>{p.name}</span>
                                            </div>
                                            <div className="flex gap-1 flex-wrap">{getRoleIcons(p)}</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Team 2 */}
                        <div className={`${theme.team2Bg} p-4 rounded border-2 ${theme.team2Border}`}>
                            {editingTeamName === 'captain2' && isCaptain2 ? (
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={tempTeamName}
                                        onChange={(e) => setTempTeamName(e.target.value)}
                                        className={`w-full px-2 py-1 mb-2 ${theme.overlayBg} border border-red-400 rounded ${theme.textPrimary} text-lg`}
                                        placeholder="Team name..."
                                        autoFocus
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onUpdateTeamName('captain2')}
                                            className={`flex-1 ${theme.btnSuccess} ${theme.btnSuccessText} font-bold py-1 px-3 rounded text-sm`}
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => { setEditingTeamName(null); setTempTeamName(''); }}
                                            className={`flex-1 ${theme.btnSecondary} ${theme.textPrimary} font-bold py-1 px-3 rounded text-sm`}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <h3 className={`text-xl ${theme.team2Text} mb-3 flex items-center gap-2`}>
                                    <Shield className="w-5 h-5" />
                                    {teamNames.captain2 || `Team 2: ${captains[1]?.name}`}
                                    {isCaptain2 && (
                                        <button
                                            onClick={() => {
                                                setEditingTeamName('captain2');
                                                setTempTeamName(teamNames.captain2 || '');
                                            }}
                                            className="text-red-400 hover:text-red-300 ml-auto"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                    )}
                                </h3>
                            )}
                            <div className="space-y-2">
                                <div className={`bg-red-800/60 p-2 rounded ${theme.textPrimary} font-bold flex items-center gap-2`}>
                                    <window.Avatar discordUser={captains[1]?.discordUser} size="sm" />
                                    {captains[1]?.name} (Captain)
                                </div>
                                {teams.captain2.map((p, idx) => (
                                    <div
                                        key={idx}
                                        className={`${theme.overlayBg} p-2 rounded ${theme.textPrimary} flex justify-between items-center transition-all ${
                                            justDrafted === p.name ? 'ring-4 ring-green-400 bg-green-900/60 scale-105' : ''
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <window.Avatar discordUser={p.discordUser} size="sm" />
                                            <span>{p.name}</span>
                                        </div>
                                        <div className="flex gap-1 flex-wrap">{getRoleIcons(p)}</div>
                                    </div>
                                ))}
                            </div>
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
