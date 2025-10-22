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
    onBannerClick,
    eventType,
    numTeams
}) => {
    const { Shield, Edit } = window.Icons;
    const isCurrentCaptain = captains[pickingCaptain]?.name === characterName;

    // Determine if this is pit trial (team1/team2/team3) or treasure map (captain1/captain2)
    const isPitTrial = eventType === 'pitTrial';
    const numberOfTeams = numTeams || captains.length || 2;

    // Helper to check if current user is a specific captain
    const isCaptain = (index) => captains[index]?.name === characterName;

    // Team color schemes for N teams
    const teamColors = [
        { bg: theme.team1Bg, border: theme.team1Border, text: theme.team1Text, captainBg: 'bg-blue-800/60', editColor: 'blue' },
        { bg: theme.team2Bg, border: theme.team2Border, text: theme.team2Text, captainBg: 'bg-red-800/60', editColor: 'red' },
        { bg: 'bg-purple-900/30', border: 'border-purple-500', text: 'text-purple-300', captainBg: 'bg-purple-800/60', editColor: 'purple' },
        { bg: 'bg-orange-900/30', border: 'border-orange-500', text: 'text-orange-300', captainBg: 'bg-orange-800/60', editColor: 'orange' },
        { bg: 'bg-green-900/30', border: 'border-green-500', text: 'text-green-300', captainBg: 'bg-green-800/60', editColor: 'green' },
    ];

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

                    {/* Dynamic grid: 2 teams = 3 cols, 3+ teams = flexible grid with available players at bottom */}
                    {numberOfTeams === 2 ? (
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {/* Team 1 */}
                            {[0, 1].map((teamIndex) => {
                                if (teamIndex === 1) {
                                    // Middle column: Available Players
                                    return (
                                        <div key="available" className={`${theme.overlayBg} p-4 rounded border-2 ${theme.borderPrimary}`}>
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
                                    );
                                }

                                // Team columns
                                const actualTeamIndex = teamIndex === 0 ? 0 : 1;
                                const teamKey = `captain${actualTeamIndex + 1}`;
                                const colors = teamColors[actualTeamIndex];
                                const captain = captains[actualTeamIndex];
                                const teamMembers = teams[teamKey] || [];

                                return (
                                    <div key={teamKey} className={`${colors.bg} p-4 rounded border-2 ${colors.border}`}>
                                        {editingTeamName === teamKey && isCaptain(actualTeamIndex) ? (
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    value={tempTeamName}
                                                    onChange={(e) => setTempTeamName(e.target.value)}
                                                    className={`w-full px-2 py-1 mb-2 ${theme.overlayBg} border border-${colors.editColor}-400 rounded ${theme.textPrimary} text-lg`}
                                                    placeholder="Team name..."
                                                    autoFocus
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => onUpdateTeamName(teamKey)}
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
                                            <h3 className={`text-xl ${colors.text} mb-3 flex items-center gap-2`}>
                                                <Shield className="w-5 h-5" />
                                                {teamNames[teamKey] || `Team ${actualTeamIndex + 1}: ${captain?.name}`}
                                                {isCaptain(actualTeamIndex) && (
                                                    <button
                                                        onClick={() => {
                                                            setEditingTeamName(teamKey);
                                                            setTempTeamName(teamNames[teamKey] || '');
                                                        }}
                                                        className={`text-${colors.editColor}-400 hover:text-${colors.editColor}-300 ml-auto`}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </h3>
                                        )}
                                        <div className="space-y-2">
                                            <div className={`${colors.captainBg} p-2 rounded ${theme.textPrimary} font-bold flex items-center gap-2`}>
                                                <window.Avatar discordUser={captain?.discordUser} size="sm" />
                                                {captain?.name} (Captain)
                                            </div>
                                            {teamMembers.map((p, idx) => (
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
                                );
                            })}
                        </div>
                    ) : (
                        // N-team layout (3+ teams): Teams in grid, available players at bottom
                        <div>
                            <div className={`grid gap-4 mb-6`} style={{ gridTemplateColumns: `repeat(${Math.min(numberOfTeams, 4)}, 1fr)` }}>
                                {Array.from({ length: numberOfTeams }).map((_, teamIndex) => {
                                    const teamKey = isPitTrial ? `team${teamIndex + 1}` : `captain${teamIndex + 1}`;
                                    const colors = teamColors[teamIndex] || teamColors[teamIndex % teamColors.length];
                                    const captain = captains[teamIndex];
                                    const teamMembers = teams[teamKey] || [];

                                    return (
                                        <div key={teamKey} className={`${colors.bg} p-4 rounded border-2 ${colors.border}`}>
                                            {editingTeamName === teamKey && isCaptain(teamIndex) ? (
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        value={tempTeamName}
                                                        onChange={(e) => setTempTeamName(e.target.value)}
                                                        className={`w-full px-2 py-1 mb-2 ${theme.overlayBg} border border-${colors.editColor}-400 rounded ${theme.textPrimary} text-lg`}
                                                        placeholder="Team name..."
                                                        autoFocus
                                                    />
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => onUpdateTeamName(teamKey)}
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
                                                <h3 className={`text-xl ${colors.text} mb-3 flex items-center gap-2`}>
                                                    <Shield className="w-5 h-5" />
                                                    {teamNames[teamKey] || `Team ${teamIndex + 1}: ${captain?.name}`}
                                                    {isCaptain(teamIndex) && (
                                                        <button
                                                            onClick={() => {
                                                                setEditingTeamName(teamKey);
                                                                setTempTeamName(teamNames[teamKey] || '');
                                                            }}
                                                            className={`text-${colors.editColor}-400 hover:text-${colors.editColor}-300 ml-auto`}
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </h3>
                                            )}
                                            <div className="space-y-2">
                                                <div className={`${colors.captainBg} p-2 rounded ${theme.textPrimary} font-bold flex items-center gap-2`}>
                                                    <window.Avatar discordUser={captain?.discordUser} size="sm" />
                                                    {captain?.name} (Captain)
                                                </div>
                                                {teamMembers.map((p, idx) => (
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
                                    );
                                })}
                            </div>

                            {/* Available Players - Full width at bottom for N-team layout */}
                            <div className={`${theme.overlayBg} p-4 rounded border-2 ${theme.borderPrimary}`}>
                                <h3 className="text-xl text-yellow-300 mb-3 text-center">Available Players</h3>
                                {availablePlayers.length === 0 ? (
                                    <div className="text-center text-gray-400">All picked!</div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                        {availablePlayers.map((p, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => isCurrentCaptain && !isDrafting ? onPickPlayer(p) : null}
                                                disabled={!isCurrentCaptain || isDrafting}
                                                className={`p-2 rounded ${theme.textPrimary} flex justify-between items-center transition-colors ${
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
