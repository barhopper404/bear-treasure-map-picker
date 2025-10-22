window.CompleteView = ({
    characterName,
    discordUser,
    captains,
    teams,
    eventData,
    selectedMaps,
    setView,
    onRecordWinner,
    getRoleIcons,
    theme,
    isDarkMode,
    onToggleTheme,
    onBannerClick,
    eventType,
    numTeams
}) => {
    const { Shield } = window.Icons;
    const isMarshall = eventData?.participants?.[0]?.name === characterName;
    const hasWinner = eventData?.winner;

    // Determine if this is pit trial or treasure map
    const isPitTrial = eventType === 'pitTrial';
    const numberOfTeams = numTeams || captains.length || 2;

    // Team color schemes for N teams
    const teamColors = [
        { bg: theme.team1Bg, border: theme.team1Border, text: theme.team1Text, btn: theme.team1Btn, captainBg: 'bg-blue-800/60', borderColor: 'border-blue-700', textColor: 'text-blue-200' },
        { bg: theme.team2Bg, border: theme.team2Border, text: theme.team2Text, btn: theme.team2Btn, captainBg: 'bg-red-800/60', borderColor: 'border-red-700', textColor: 'text-red-200' },
        { bg: 'bg-purple-900/30', border: 'border-purple-500', text: 'text-purple-300', btn: 'bg-purple-600 hover:bg-purple-700', captainBg: 'bg-purple-800/60', borderColor: 'border-purple-700', textColor: 'text-purple-200' },
        { bg: 'bg-orange-900/30', border: 'border-orange-500', text: 'text-orange-300', btn: 'bg-orange-600 hover:bg-orange-700', captainBg: 'bg-orange-800/60', borderColor: 'border-orange-700', textColor: 'text-orange-200' },
        { bg: 'bg-green-900/30', border: 'border-green-500', text: 'text-green-300', btn: 'bg-green-600 hover:bg-green-700', captainBg: 'bg-green-800/60', borderColor: 'border-green-700', textColor: 'text-green-200' },
    ];

    return (
        <div className={`min-h-screen ${theme.pageBg} p-8`}>
            <window.ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
            <div className="max-w-6xl mx-auto">
                <window.Banner onBannerClick={onBannerClick} />
                <window.CharacterBadge characterName={characterName} discordUser={discordUser} theme={theme} />
                <div className={`${theme.cardBg} backdrop-blur-sm rounded-lg p-8 border-2 ${theme.borderPrimary}`}>
                    <h2 className={`text-4xl font-bold ${theme.headingPrimary} mb-8 text-center`}>
                        {isPitTrial ? 'Pit Trials Complete!' : 'Teams Ready!'}
                    </h2>

                    {/* Winner Badge */}
                    {hasWinner && (
                        <div className="mb-8 text-center">
                            {(() => {
                                const winnerIndex = isPitTrial
                                    ? parseInt(hasWinner.replace('team', '')) - 1
                                    : parseInt(hasWinner.replace('captain', '')) - 1;
                                const teamKey = hasWinner;
                                const colors = teamColors[winnerIndex] || teamColors[0];
                                const teamName = eventData?.teamNames?.[teamKey] || `Team ${winnerIndex + 1}: ${captains[winnerIndex]?.name}`;

                                return (
                                    <div className={`inline-block px-8 py-4 rounded-lg ${colors.bg} border-4 ${theme.winnerBorder}`}>
                                        <p className="text-yellow-400 text-2xl font-bold">🏆 WINNER 🏆</p>
                                        <p className="text-white text-3xl font-bold mt-2">{teamName}</p>
                                    </div>
                                );
                            })()}
                        </div>
                    )}

                    {/* Dynamic team display */}
                    <div className={`grid gap-8 mb-8`} style={{ gridTemplateColumns: `repeat(${Math.min(numberOfTeams, 3)}, 1fr)` }}>
                        {Array.from({ length: numberOfTeams }).map((_, teamIndex) => {
                            const teamKey = isPitTrial ? `team${teamIndex + 1}` : `captain${teamIndex + 1}`;
                            const colors = teamColors[teamIndex] || teamColors[teamIndex % teamColors.length];
                            const captain = captains[teamIndex];
                            const teamMembers = teams[teamKey] || [];
                            const teamName = eventData?.teamNames?.[teamKey] || `Team ${teamIndex + 1}: ${captain?.name}`;
                            const isWinner = hasWinner === teamKey;

                            return (
                                <div key={teamKey} className={`p-6 rounded ${
                                    isWinner ? `${colors.bg} border-4 ${theme.winnerBorder}` : `${colors.bg} border-2 ${colors.border}`
                                }`}>
                                    <h3 className={`text-2xl ${colors.text} mb-4 flex items-center gap-2`}>
                                        <Shield className="w-6 h-6" />
                                        {teamName}
                                        {isWinner && <span className="text-yellow-400 ml-auto">👑</span>}
                                    </h3>
                                    <div className="space-y-2 mb-4">
                                        <div className={`${colors.captainBg} p-3 rounded text-white font-bold flex items-center gap-2`}>
                                            <window.Avatar discordUser={captain?.discordUser} size="sm" />
                                            {captain?.name} (Captain)
                                        </div>
                                        {teamMembers.map((p, idx) => (
                                            <div key={idx} className={`${theme.overlayBg} p-3 rounded ${theme.textPrimary} flex justify-between items-center`}>
                                                <div className="flex items-center gap-2">
                                                    <window.Avatar discordUser={p.discordUser} size="sm" />
                                                    <span>{p.name}</span>
                                                </div>
                                                <div className="flex gap-1">{getRoleIcons(p)}</div>
                                            </div>
                                        ))}
                                    </div>
                                    {!isPitTrial && selectedMaps && selectedMaps.filter(m => m.pickedBy === teamKey).length > 0 && (
                                        <div className={`mt-4 pt-4 border-t ${colors.borderColor}`}>
                                            <h4 className={`${colors.textColor} font-bold mb-2`}>Selected Maps:</h4>
                                            <div className="space-y-1">
                                                {selectedMaps.filter(m => m.pickedBy === teamKey).map((m, idx) => (
                                                    <div key={idx} className={`${colors.text} text-sm`}>
                                                        <a href={m.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                            📍 {m.x}, {m.y}
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mb-8">
                        <div className={`text-6xl font-bold ${theme.headingPrimary} mb-2`}>
                            {isPitTrial ? 'Battle Complete!' : 'Ready to Hunt!'}
                        </div>
                        <div className={`text-xl ${theme.headingSecondary}`}>
                            {isPitTrial ? 'May the best team claim victory!' : 'Good luck with your treasure maps!'}
                        </div>
                        {!isPitTrial && eventData?.deferredFirstPick && (
                            <div className={`mt-4 ${theme.statusInfo} p-4 rounded`}>
                                <p className="text-purple-200 text-lg">
                                    <strong>{captains[eventData.firstPicker]?.name}</strong> deferred and will pick the first treasure map!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Winner Selection (Marshall Only) */}
                    {isMarshall && !hasWinner && (
                        <div className="mb-8 bg-yellow-900/40 p-6 rounded border-2 border-yellow-600">
                            <h3 className="text-2xl text-yellow-300 font-bold mb-4 text-center">🏆 Record Winner</h3>
                            <p className="text-yellow-200 text-center mb-4">Marshall: Select the winning team to record stats</p>
                            <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${Math.min(numberOfTeams, 4)}, 1fr)` }}>
                                {Array.from({ length: numberOfTeams }).map((_, teamIndex) => {
                                    const teamKey = isPitTrial ? `team${teamIndex + 1}` : `captain${teamIndex + 1}`;
                                    const colors = teamColors[teamIndex] || teamColors[teamIndex % teamColors.length];
                                    const teamName = eventData?.teamNames?.[teamKey] || `Team ${teamIndex + 1}`;

                                    return (
                                        <button
                                            key={teamKey}
                                            onClick={() => onRecordWinner(teamKey)}
                                            className={`${colors.btn} text-white font-bold py-4 px-6 rounded-lg transition-colors text-xl`}
                                        >
                                            {teamName} Won
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    
                    <div className="flex justify-end">
                        <button
                            onClick={() => setView('home')}
                            className={`${theme.btnSuccess} ${theme.btnSuccessText} font-bold py-4 px-8 rounded-lg transition-colors text-xl`}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
            <div className={`text-center mt-4 ${theme.versionText} text-sm`}>
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};