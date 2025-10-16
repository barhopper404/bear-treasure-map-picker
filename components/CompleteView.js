window.CompleteView = ({
    characterName,
    captains,
    teams,
    eventData,
    setView,
    getRoleIcons
}) => {
    const { Shield } = window.Icons;

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
                    <h2 className="text-4xl font-bold text-amber-400 mb-8 text-center">Teams Ready!</h2>
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="bg-blue-900/60 p-6 rounded border-2 border-blue-500">
                            <h3 className="text-2xl text-blue-300 mb-4 flex items-center gap-2">
                                <Shield className="w-6 h-6" />
                                {eventData?.teamNames?.captain1 || `Team 1: ${captains[0]?.name}`}
                            </h3>
                            <div className="space-y-2">
                                <div className="bg-blue-800/60 p-3 rounded text-white font-bold">
                                    {captains[0]?.name} (Captain)
                                </div>
                                {teams.captain1.map((p, idx) => (
                                    <div key={idx} className="bg-black/60 p-3 rounded text-white flex justify-between items-center">
                                        <span>{p.name}</span>
                                        <div className="flex gap-1">{getRoleIcons(p)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-red-900/60 p-6 rounded border-2 border-red-500">
                            <h3 className="text-2xl text-red-300 mb-4 flex items-center gap-2">
                                <Shield className="w-6 h-6" />
                                {eventData?.teamNames?.captain2 || `Team 2: ${captains[1]?.name}`}
                            </h3>
                            <div className="space-y-2">
                                <div className="bg-red-800/60 p-3 rounded text-white font-bold">
                                    {captains[1]?.name} (Captain)
                                </div>
                                {teams.captain2.map((p, idx) => (
                                    <div key={idx} className="bg-black/60 p-3 rounded text-white flex justify-between items-center">
                                        <span>{p.name}</span>
                                        <div className="flex gap-1">{getRoleIcons(p)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="text-center mb-8">
                        <div className="text-6xl font-bold text-amber-400 mb-2">Ready to Hunt!</div>
                        <div className="text-xl text-orange-300">Good luck with your treasure maps!</div>
                        {eventData?.deferredFirstPick && (
                            <div className="mt-4 bg-purple-900/60 p-4 rounded border-2 border-purple-500">
                                <p className="text-purple-200 text-lg">
                                    <strong>{captains[eventData.firstPicker]?.name}</strong> deferred and will pick the first treasure map!
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button 
                            onClick={() => setView('home')} 
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-xl"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 text-amber-600 text-sm">
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};