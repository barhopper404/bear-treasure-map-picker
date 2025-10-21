// CharacterBadge - displays character name with Discord avatar
window.CharacterBadge = ({ characterName, discordUser, theme }) => {
    if (!characterName) return null;

    return (
        <div className="text-center mb-4">
            <span className={`${theme.badgeCharacter} px-4 py-2 rounded-full text-sm font-bold inline-flex items-center gap-2`}>
                <window.Avatar discordUser={discordUser} size="md" />
                <span>Character: {characterName}</span>
            </span>
        </div>
    );
};
