window.CaptainRevealView = ({
    characterName,
    captains,
    onContinue
}) => {
    const { Shield, Crown } = window.Icons;
    const [countdown, setCountdown] = React.useState(5);

    // Auto-advance after 5 seconds
    React.useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            onContinue();
        }
    }, [countdown, onContinue]);

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
                
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-12 border-2 border-yellow-500">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-yellow-400 mb-2">🎉 Captains Selected! 🎉</h2>
                        <p className="text-gray-300 text-lg">Your team leaders have been chosen</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Captain 1 */}
                        <div className="bg-blue-900/40 backdrop-blur-sm rounded-lg p-8 border-2 border-blue-500 transform hover:scale-105 transition-transform">
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center border-4 border-blue-400">
                                        <Shield className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                                <div className="bg-blue-600/30 px-4 py-2 rounded-full inline-block mb-3">
                                    <span className="text-blue-300 text-sm font-bold">CAPTAIN 1</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">{captains[0]?.name}</h3>
                                {captains[0]?.discordUser && (
                                    <p className="text-blue-300 text-sm">@{captains[0].discordUser.username}</p>
                                )}
                            </div>
                        </div>
                        
                        {/* Captain 2 */}
                        <div className="bg-red-900/40 backdrop-blur-sm rounded-lg p-8 border-2 border-red-500 transform hover:scale-105 transition-transform">
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center border-4 border-red-400">
                                        <Shield className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                                <div className="bg-red-600/30 px-4 py-2 rounded-full inline-block mb-3">
                                    <span className="text-red-300 text-sm font-bold">CAPTAIN 2</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">{captains[1]?.name}</h3>
                                {captains[1]?.discordUser && (
                                    <p className="text-red-300 text-sm">@{captains[1].discordUser.username}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center space-y-4">
                        <div className="bg-yellow-600/20 border border-yellow-500 rounded-lg p-4 inline-block">
                            <p className="text-yellow-300 text-lg">
                                Auto-continuing in <span className="text-yellow-400 font-bold text-2xl">{countdown}</span> seconds...
                            </p>
                        </div>
                        
                        <button
                            onClick={onContinue}
                            className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold py-4 px-8 rounded-lg transition-colors text-xl"
                        >
                            Continue Now →
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 text-yellow-500 text-sm">
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};