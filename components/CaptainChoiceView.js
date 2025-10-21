window.CaptainChoiceView = ({
    characterName,
    captains,
    pickingCaptain,
    captainChoiceTimer,
    onStartDrafting,
    onDeferFirstPick,
    onReroll,
    isMarshall
}) => {
    const Shield = (window.Icons && window.Icons.Shield) || (() => <div />);
    const isFirstCaptain = captains[pickingCaptain]?.name === characterName;

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
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-8 border-2 border-yellow-500">
                    <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center">Captains Selected!</h2>
                    
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="bg-blue-900/60 p-6 rounded border-2 border-blue-500 text-center">
                            <Shield className="w-16 h-16 mx-auto mb-4 text-blue-300" />
                            <h3 className="text-2xl text-blue-300 font-bold">{captains[0]?.name}</h3>
                            <p className="text-blue-200 mt-2">Team 1 Captain</p>
                        </div>
                        
                        <div className="bg-red-900/60 p-6 rounded border-2 border-red-500 text-center">
                            <Shield className="w-16 h-16 mx-auto mb-4 text-red-300" />
                            <h3 className="text-2xl text-red-300 font-bold">{captains[1]?.name}</h3>
                            <p className="text-red-200 mt-2">Team 2 Captain</p>
                        </div>
                    </div>
                    
                    {isFirstCaptain ? (
                        <div className="bg-green-900/60 p-8 rounded border-2 border-green-500">
                            <div className="text-center mb-4">
                                <div className="text-6xl font-bold text-yellow-400 mb-2">{captainChoiceTimer}</div>
                                <p className="text-yellow-200">seconds remaining</p>
                            </div>
                            <h3 className="text-3xl text-green-300 font-bold mb-4 text-center">You Pick First!</h3>
                            <p className="text-green-200 text-center mb-6">
                                You can pick your team first, or defer to pick the first treasure map later.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={onStartDrafting}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
                                >
                                    Pick Team First
                                </button>
                                <button 
                                    onClick={onDeferFirstPick}
                                    className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold py-4 px-6 rounded-lg transition-colors"
                                >
                                    Defer (Pick Map First Later)
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-900/60 p-8 rounded border-2 border-gray-500 text-center">
                            <div className="text-6xl font-bold text-yellow-400 mb-4">{captainChoiceTimer}</div>
                            <h3 className="text-2xl text-gray-300 mb-4">Waiting for {captains[pickingCaptain]?.name}</h3>
                            <p className="text-gray-400">
                                {captains[pickingCaptain]?.name} is deciding whether to pick their team first or defer...
                            </p>
                        </div>
                    )}
                </div>

                {isMarshall && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={onReroll}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors border-2 border-red-400"
                        >
                            Re-roll Captains (Back to Lobby)
                        </button>
                        <p className="text-gray-400 text-sm mt-2">Marshall only: Reset captain selection</p>
                    </div>
                )}
            </div>
            <div className="text-center mt-4 text-yellow-500 text-sm">
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};