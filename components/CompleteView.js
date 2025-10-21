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
    onToggleTheme
}) => {
    const { Shield } = window.Icons;
    const isMarshall = eventData?.participants?.[0]?.name === characterName;
    const hasWinner = eventData?.winner;

    return (
        <div className={`min-h-screen ${theme.treasurePageBg} p-8`}>
            <window.ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
            <div className="max-w-6xl mx-auto">
                <window.CharacterBadge characterName={characterName} discordUser={discordUser} theme={theme} />
                <div className={`${theme.treasureCardBg} backdrop-blur-sm rounded-lg p-8 border-2 ${theme.treasureBorder}`}>
                    <h2 className={`text-4xl font-bold ${theme.treasureHeading} mb-8 text-center`}>Teams Ready!</h2>
                    
                    {/* Winner Badge */}
                    {hasWinner && (
                        <div className="mb-8 text-center">
                            <div className={`inline-block px-8 py-4 rounded-lg ${
                                hasWinner === 'captain1' ? theme.team1Bg : theme.team2Bg
                            } border-4 ${theme.winnerBorder}`}>
                                <p className="text-yellow-400 text-2xl font-bold">🏆 WINNER 🏆</p>
                                <p className="text-white text-3xl font-bold mt-2">
                                    {hasWinner === 'captain1'
                                        ? (eventData?.teamNames?.captain1 || `Team 1: ${captains[0]?.name}`)
                                        : (eventData?.teamNames?.captain2 || `Team 2: ${captains[1]?.name}`)
                                    }
                                </p>
                            </div>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className={`p-6 rounded ${
                            hasWinner === 'captain1' ? `${theme.team1Bg} border-4 ${theme.winnerBorder}` : `${theme.team1Bg} border-2 ${theme.team1Border}`
                        }`}>
                            <h3 className={`text-2xl ${theme.team1Text} mb-4 flex items-center gap-2`}>
                                <Shield className="w-6 h-6" />
                                {eventData?.teamNames?.captain1 || `Team 1: ${captains[0]?.name}`}
                                {hasWinner === 'captain1' && <span className="text-yellow-400 ml-auto">👑</span>}
                            </h3>
                            <div className="space-y-2 mb-4">
                                <div className="bg-blue-800/60 p-3 rounded text-white font-bold">
                                    {captains[0]?.name} (Captain)
                                </div>
                                {teams.captain1.map((p, idx) => (
                                    <div key={idx} className={`${theme.treasureOverlayBg} p-3 rounded text-white flex justify-between items-center`}>
                                        <span>{p.name}</span>
                                        <div className="flex gap-1">{getRoleIcons(p)}</div>
                                    </div>
                                ))}
                            </div>
                            {selectedMaps && selectedMaps.filter(m => m.pickedBy === 'captain1').length > 0 && (
                                <div className="mt-4 pt-4 border-t border-blue-700">
                                    <h4 className="text-blue-200 font-bold mb-2">Selected Maps:</h4>
                                    <div className="space-y-1">
                                        {selectedMaps.filter(m => m.pickedBy === 'captain1').map((m, idx) => (
                                            <div key={idx} className={`${theme.team1Text} text-sm`}>
                                                <a href={m.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                    📍 {m.x}, {m.y}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={`p-6 rounded ${
                            hasWinner === 'captain2' ? `${theme.team2Bg} border-4 ${theme.winnerBorder}` : `${theme.team2Bg} border-2 ${theme.team2Border}`
                        }`}>
                            <h3 className={`text-2xl ${theme.team2Text} mb-4 flex items-center gap-2`}>
                                <Shield className="w-6 h-6" />
                                {eventData?.teamNames?.captain2 || `Team 2: ${captains[1]?.name}`}
                                {hasWinner === 'captain2' && <span className="text-yellow-400 ml-auto">👑</span>}
                            </h3>
                            <div className="space-y-2 mb-4">
                                <div className="bg-red-800/60 p-3 rounded text-white font-bold">
                                    {captains[1]?.name} (Captain)
                                </div>
                                {teams.captain2.map((p, idx) => (
                                    <div key={idx} className={`${theme.treasureOverlayBg} p-3 rounded text-white flex justify-between items-center`}>
                                        <span>{p.name}</span>
                                        <div className="flex gap-1">{getRoleIcons(p)}</div>
                                    </div>
                                ))}
                            </div>
                            {selectedMaps && selectedMaps.filter(m => m.pickedBy === 'captain2').length > 0 && (
                                <div className="mt-4 pt-4 border-t border-red-700">
                                    <h4 className="text-red-200 font-bold mb-2">Selected Maps:</h4>
                                    <div className="space-y-1">
                                        {selectedMaps.filter(m => m.pickedBy === 'captain2').map((m, idx) => (
                                            <div key={idx} className={`${theme.team2Text} text-sm`}>
                                                <a href={m.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                    📍 {m.x}, {m.y}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <div className={`text-6xl font-bold ${theme.treasureHeading} mb-2`}>Ready to Hunt!</div>
                        <div className={`text-xl ${theme.treasureSubheading}`}>Good luck with your treasure maps!</div>
                        {eventData?.deferredFirstPick && (
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
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => onRecordWinner('captain1')}
                                    className={`${theme.team1Btn} text-white font-bold py-4 px-6 rounded-lg transition-colors text-xl`}
                                >
                                    {eventData?.teamNames?.captain1 || `Team 1`} Won
                                </button>
                                <button
                                    onClick={() => onRecordWinner('captain2')}
                                    className={`${theme.team2Btn} text-white font-bold py-4 px-6 rounded-lg transition-colors text-xl`}
                                >
                                    {eventData?.teamNames?.captain2 || `Team 2`} Won
                                </button>
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
            <div className={`text-center mt-4 ${theme.treasureVersion} text-sm`}>
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};