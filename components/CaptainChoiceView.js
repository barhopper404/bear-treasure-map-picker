window.CaptainChoiceView = ({
    characterName,
    captains,
    pickingCaptain,
    captainChoiceTimer,
    onStartDrafting,
    onDeferFirstPick,
    onReroll,
    isMarshall,
    theme,
    isDarkMode,
    onToggleTheme
}) => {
    const Shield = (window.Icons && window.Icons.Shield) || (() => <div />);
    const isFirstCaptain = captains[pickingCaptain]?.name === characterName;

    return (
        <div className={`min-h-screen ${theme.pageBg} p-8`}>
            <window.ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
            <div className="max-w-4xl mx-auto">
                {characterName && (
                    <div className="text-center mb-4">
                        <span className={`${theme.badgeCharacter} px-4 py-2 rounded-full text-sm font-bold`}>
                            Character: {characterName}
                        </span>
                    </div>
                )}
                <div className={`${theme.cardBg} backdrop-blur-sm rounded-lg p-8 border-2 ${theme.borderPrimary}`}>
                    <h2 className={`text-4xl font-bold ${theme.headingPrimary} mb-8 text-center`}>Captains Selected!</h2>

                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className={`${theme.team1Bg} p-6 rounded border-2 ${theme.team1Border} text-center`}>
                            <Shield className={`w-16 h-16 mx-auto mb-4 ${theme.team1Text}`} />
                            <h3 className={`text-2xl ${theme.team1Text} font-bold`}>{captains[0]?.name}</h3>
                            <p className={`${theme.team1Text} mt-2`}>Team 1 Captain</p>
                        </div>

                        <div className={`${theme.team2Bg} p-6 rounded border-2 ${theme.team2Border} text-center`}>
                            <Shield className={`w-16 h-16 mx-auto mb-4 ${theme.team2Text}`} />
                            <h3 className={`text-2xl ${theme.team2Text} font-bold`}>{captains[1]?.name}</h3>
                            <p className={`${theme.team2Text} mt-2`}>Team 2 Captain</p>
                        </div>
                    </div>

                    {isFirstCaptain ? (
                        <div className={`${theme.statusActive} p-8 rounded border-2 border-green-500`}>
                            <div className="text-center mb-4">
                                <div className={`text-6xl font-bold ${theme.headingPrimary} mb-2`}>{captainChoiceTimer}</div>
                                <p className={`${theme.headingSecondary}`}>seconds remaining</p>
                            </div>
                            <h3 className="text-3xl text-green-300 font-bold mb-4 text-center">You Pick First!</h3>
                            <p className="text-green-200 text-center mb-6">
                                You can pick your team first, or defer to pick the first treasure map later.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={onStartDrafting}
                                    className={`${theme.btnSuccess} ${theme.btnSuccessText} font-bold py-4 px-6 rounded-lg transition-colors`}
                                >
                                    Pick Team First
                                </button>
                                <button
                                    onClick={onDeferFirstPick}
                                    className={`${theme.btnPrimary} ${theme.btnPrimaryText} font-bold py-4 px-6 rounded-lg transition-colors`}
                                >
                                    Defer (Pick Map First Later)
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={`${theme.statusWaiting} p-8 rounded border-2 text-center`}>
                            <div className={`text-6xl font-bold ${theme.headingPrimary} mb-4`}>{captainChoiceTimer}</div>
                            <h3 className="text-2xl mb-4">Waiting for {captains[pickingCaptain]?.name}</h3>
                            <p className={`${theme.textMuted}`}>
                                {captains[pickingCaptain]?.name} is deciding whether to pick their team first or defer...
                            </p>
                        </div>
                    )}
                </div>

                {isMarshall && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={onReroll}
                            className={`${theme.btnDanger} ${theme.btnDangerText} font-bold py-3 px-8 rounded-lg transition-colors border-2 border-red-400`}
                        >
                            Re-roll Captains (Back to Lobby)
                        </button>
                        <p className={`${theme.textMuted} text-sm mt-2`}>Marshall only: Reset captain selection</p>
                    </div>
                )}
            </div>
            <div className={`text-center mt-4 ${theme.versionText} text-sm`}>
                {window.AppConfig.VERSION}
            </div>
        </div>
    );
};
