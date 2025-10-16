window.HomeView = ({ characterName, error, setView }) => {
    const { Shield, Key, Heart, Music } = window.Icons;
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 p-8">
            <div className="max-w-2xl mx-auto">
                {characterName && (
                    <div className="text-center mb-4">
                        <span className="bg-amber-600 text-white px-4 py-2 rounded-full text-sm">
                            Character: {characterName}
                        </span>
                    </div>
                )}
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border-2 border-amber-600">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-amber-400 mb-2">BEAR GUILD</h1>
                        <h2 className="text-2xl text-orange-300">Treasure Map Team Picker</h2>
                    </div>
                    
                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        <button 
                            onClick={() => setView('create')} 
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-xl"
                        >
                            Create New Event
                        </button>
                        <button 
                            onClick={() => setView('join')} 
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-xl"
                        >
                            Join Existing Event
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