window.MapPickingView = ({
    characterName,
    captains,
    currentMapPicker,
    parsedMaps,
    selectedMaps,
    eventData,
    onPickMap,
    getRoleIcons
}) => {
    const { Shield } = window.Icons;
    const isCurrentCaptain = captains[currentMapPicker]?.name === characterName;

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 p-8">
            <div className="max-w-6xl mx-auto">
                {characterName && (
                    <div className="text-center mb-4">
                        <span className="bg-amber-600 text-white px-4 py-2 rounded-full text-sm">
                            Character: {characterName}
                        </span>
                    </div>
                )}
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border-2 border-amber-600">
                    <h2 className="text-3xl font-bold text-amber-400 mb-6 text-center">🗺️ Treasure Map Selection</h2>
                    
                    {isCurrentCaptain ? (
                        <div className="bg-green-900/60 p-4 rounded border-2 border-green-500 mb-6 text-center">
                            <p className="text-green-200 text-xl font-bold">It's your turn to pick a map!</p>
                        </div>
                    ) : (
                        <div className="bg-gray-900/60 p-4 rounded border-2 border-gray-500 mb-6 text-center">
                            <p className="text-gray-300 text-xl">Waiting for {captains[currentMapPicker]?.name} to pick...</p>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {/* Team 1 Maps */}
                        <div className="bg-blue-900/60 p-4 rounded border-2 border-blue-500">
                            <h3 className="text-xl text-blue-300 mb-3">
                                {eventData?.teamNames?.captain1 || `Team 1`}
                            </h3>
                            <div className="space-y-2">
                                {selectedMaps.filter(m => m.pickedBy === 'captain1').map((m, idx) => (
                                    <div key={idx} className="bg-black/60 p-2 rounded text-white text-sm">
                                        <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-400 underline">
                                            {m.x}, {m.y}
                                        </a>
                                    </div>
                                ))}
                                {selectedMaps.filter(m => m.pickedBy === 'captain1').length === 0 && (
                                    <div className="text-blue-300 text-sm italic">No maps selected yet</div>
                                )}
                            </div>
                        </div>
                        
                        {/* Available Maps */}
                        <div className="bg-black/60 p-4 rounded border-2 border-amber-600">
                            <h3 className="text-xl text-orange-300 mb-3 text-center">Available Maps</h3>
                            {parsedMaps.length === 0 ? (
                                <div className="text-center text-gray-400">All picked!</div>
                            ) : (
                                <div className="space-y-2">
                                    {parsedMaps.map((m) => (
                                        <button
                                            key={m.id}
                                            onClick={() => isCurrentCaptain ? onPickMap(m) : null}
                                            disabled={!isCurrentCaptain}
                                            className={`w-full p-3 rounded text-white transition-colors ${
                                                isCurrentCaptain 
                                                    ? 'bg-amber-600 hover:bg-amber-700 cursor-pointer' 
                                                    : 'bg-gray-700 cursor-not-allowed opacity-50'
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
                        <div className="bg-red-900/60 p-4 rounded border-2 border-red-500">
                            <h3 className="text-xl text-red-300 mb-3">
                                {eventData?.teamNames?.captain2 || `Team 2`}
                            </h3>
                            <div className="space-y-2">
                                {selectedMaps.filter(m => m.pickedBy === 'captain2').map((m, idx) => (
                                    <div key={idx} className="bg-black/60 p-2 rounded text-white text-sm">
                                        <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-400 underline">
                                            {m.x}, {m.y}
                                        </a>
                                    </div>
                                ))}
                                {selectedMaps.filter(m => m.pickedBy === 'captain2').length === 0 && (
                                    <div className="text-red-300 text-sm italic">No maps selected yet</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 text-amber-600 text-sm">
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};