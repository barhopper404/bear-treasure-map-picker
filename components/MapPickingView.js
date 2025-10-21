window.MapPickingView = ({
    characterName,
    captains,
    currentMapPicker,
    parsedMaps,
    selectedMaps,
    eventData,
    mapPickTimer,
    mapPickTimerSetting,
    isAutoPickingMap,
    onPickMap,
    onSkipMapPicking,
    getRoleIcons,
    theme,
    isDarkMode,
    onToggleTheme
}) => {
    const { Shield } = window.Icons;
    const isCurrentCaptain = captains[currentMapPicker]?.name === characterName;
    const isMarshall = eventData?.participants?.[0]?.name === characterName;

    return (
        <div className={`min-h-screen ${theme.treasurePageBg} p-8`}>
            <window.ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
            <div className="max-w-6xl mx-auto">
                {characterName && (
                    <div className="text-center mb-4">
                        <span className={`${theme.treasureBtn} text-white px-4 py-2 rounded-full text-sm`}>
                            Character: {characterName}
                        </span>
                    </div>
                )}
                <div className={`${theme.treasureCardBg} backdrop-blur-sm rounded-lg p-8 border-2 ${theme.treasureBorder}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className={`text-3xl font-bold ${theme.treasureHeading}`}>🗺️ Treasure Map Selection</h2>
                        {isMarshall && (
                            <button
                                onClick={onSkipMapPicking}
                                className={`${theme.btnDanger} ${theme.btnDangerText} font-bold py-2 px-4 rounded-lg transition-colors text-sm`}
                            >
                                Skip Map Picking
                            </button>
                        )}
                    </div>

                    {parsedMaps.length > 0 && (
                        <div className="text-center mb-4">
                            <div className={`inline-block px-6 py-3 rounded-lg ${mapPickTimer <= 10 ? theme.timerAlert : theme.timerNormal}`}>
                                <span className="text-white text-2xl font-bold">{mapPickTimer}s</span>
                                <span className={`ml-2 ${mapPickTimer <= 10 ? 'text-red-200' : 'text-yellow-200'}`}>to pick</span>
                            </div>
                        </div>
                    )}

                    {isAutoPickingMap && (
                        <div className={`${theme.statusAlert} p-4 rounded mb-6 text-center`}>
                            <p className="text-white text-xl font-bold">⏰ Time's up! Auto-picking random map...</p>
                        </div>
                    )}

                    {isCurrentCaptain && parsedMaps.length > 0 ? (
                        <div className={`${theme.statusActive} p-4 rounded mb-6 text-center`}>
                            <p className="text-green-200 text-xl font-bold">It's your turn to pick a map!</p>
                        </div>
                    ) : parsedMaps.length > 0 ? (
                        <div className={`${theme.statusWaiting} p-4 rounded mb-6 text-center`}>
                            <p className="text-gray-300 text-xl">Waiting for {captains[currentMapPicker]?.name} to pick...</p>
                        </div>
                    ) : null}

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {/* Team 1 Maps */}
                        <div className={`${theme.team1Bg} p-4 rounded border-2 ${theme.team1Border}`}>
                            <h3 className={`text-xl ${theme.team1Text} mb-3`}>
                                {eventData?.teamNames?.captain1 || `Team 1`}
                            </h3>
                            <div className="space-y-2">
                                {selectedMaps.filter(m => m.pickedBy === 'captain1').map((m, idx) => (
                                    <div key={idx} className={`${theme.treasureOverlayBg} p-2 rounded text-white text-sm`}>
                                        <a href={m.url} target="_blank" rel="noopener noreferrer" className={`${theme.team1Text} hover:text-blue-400 underline`}>
                                            {m.x}, {m.y}
                                        </a>
                                    </div>
                                ))}
                                {selectedMaps.filter(m => m.pickedBy === 'captain1').length === 0 && (
                                    <div className={`${theme.team1Text} text-sm italic`}>No maps selected yet</div>
                                )}
                            </div>
                        </div>

                        {/* Available Maps */}
                        <div className={`${theme.treasureOverlayBg} p-4 rounded border-2 ${theme.treasureBorder}`}>
                            <h3 className={`text-xl ${theme.treasureSubheading} mb-3 text-center`}>Available Maps</h3>
                            {parsedMaps.length === 0 ? (
                                <div className="text-center text-gray-400">All picked!</div>
                            ) : (
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {parsedMaps.map((m) => (
                                        <button
                                            key={m.id}
                                            onClick={() => isCurrentCaptain ? onPickMap(m) : null}
                                            disabled={!isCurrentCaptain}
                                            className={`w-full p-3 rounded text-white transition-colors ${
                                                isCurrentCaptain
                                                    ? theme.treasureBtn
                                                    : theme.btnDisabled
                                            }`}
                                        >
                                            <div className="font-bold">{m.x}, {m.y}</div>
                                            <a
                                                href={m.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-xs text-blue-300 hover:text-blue-400 underline"
                                            >
                                                View on ExploreOutlands
                                            </a>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Team 2 Maps */}
                        <div className={`${theme.team2Bg} p-4 rounded border-2 ${theme.team2Border}`}>
                            <h3 className={`text-xl ${theme.team2Text} mb-3`}>
                                {eventData?.teamNames?.captain2 || `Team 2`}
                            </h3>
                            <div className="space-y-2">
                                {selectedMaps.filter(m => m.pickedBy === 'captain2').map((m, idx) => (
                                    <div key={idx} className={`${theme.treasureOverlayBg} p-2 rounded text-white text-sm`}>
                                        <a href={m.url} target="_blank" rel="noopener noreferrer" className={`${theme.team2Text} hover:text-red-400 underline`}>
                                            {m.x}, {m.y}
                                        </a>
                                    </div>
                                ))}
                                {selectedMaps.filter(m => m.pickedBy === 'captain2').length === 0 && (
                                    <div className={`${theme.team2Text} text-sm italic`}>No maps selected yet</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`text-center mt-4 ${theme.treasureVersion} text-sm`}>
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};
