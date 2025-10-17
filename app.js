const { useState, useEffect } = React;

function TreasureMapTeamPicker() {
    // State management
    const [view, setView] = useState('home');
    const [eventId, setEventId] = useState('');
    const [eventData, setEventData] = useState(null);
    const [characterName, setCharacterName] = useState('');
    const [wantsCaptain, setWantsCaptain] = useState(false);
    const [isLockpicker, setIsLockpicker] = useState(false);
    const [isHealer, setIsHealer] = useState(false);
    const [isBard, setIsBard] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);
    const [captains, setCaptains] = useState([]);
    const [pickingCaptain, setPickingCaptain] = useState(0);
    const [firstPickerDeferred, setFirstPickerDeferred] = useState(false);
    const [teams, setTeams] = useState({ captain1: [], captain2: [] });
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingPlayer, setEditingPlayer] = useState(null);
    const [spinningWheel, setSpinningWheel] = useState(false);
    const [currentWheelName, setCurrentWheelName] = useState('');
    const [captainChoiceTimer, setCaptainChoiceTimer] = useState(45);
    const [draftTimer, setDraftTimer] = useState(60);
    const [hasJoined, setHasJoined] = useState(false);
    const [isAutoPicking, setIsAutoPicking] = useState(false);
    const [justDrafted, setJustDrafted] = useState(null);
    const [isDrafting, setIsDrafting] = useState(false);
    const [draftTimerSetting, setDraftTimerSetting] = useState(60);
    const [captainChoiceTimerSetting, setCaptainChoiceTimerSetting] = useState(45);
    const [teamNames, setTeamNames] = useState({ captain1: '', captain2: '' });
    const [editingTeamName, setEditingTeamName] = useState(null);
    const [tempTeamName, setTempTeamName] = useState('');
    const [tempRoles, setTempRoles] = useState({});
    const [discordUser, setDiscordUser] = useState(null);
    const [totalMaps, setTotalMaps] = useState(20);
    const [mapCoords, setMapCoords] = useState('');
    const [showAddPlayer, setShowAddPlayer] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [newPlayerCaptain, setNewPlayerCaptain] = useState(false);
    const [newPlayerLockpicker, setNewPlayerLockpicker] = useState(false);
    const [newPlayerHealer, setNewPlayerHealer] = useState(false);
    const [newPlayerBard, setNewPlayerBard] = useState(false);
    const [isMeleeDPS, setIsMeleeDPS] = useState(false);
    const [isRangedDPS, setIsRangedDPS] = useState(false);
    const [isTamer, setIsTamer] = useState(false);
    const [isSummoner, setIsSummoner] = useState(false);
    const [isTank, setIsTank] = useState(false);
    const [isJester, setIsJester] = useState(false);
    const [newPlayerMeleeDPS, setNewPlayerMeleeDPS] = useState(false);
    const [newPlayerRangedDPS, setNewPlayerRangedDPS] = useState(false);
    const [newPlayerTamer, setNewPlayerTamer] = useState(false);
    const [newPlayerSummoner, setNewPlayerSummoner] = useState(false);
    const [newPlayerTank, setNewPlayerTank] = useState(false);
    const [newPlayerJester, setNewPlayerJester] = useState(false);
    const [adminList, setAdminList] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [wheelCandidates, setWheelCandidates] = useState([]);


    // Map picking state
    const [parsedMaps, setParsedMaps] = useState([]);
    const [selectedMaps, setSelectedMaps] = useState([]);
    const [currentMapPicker, setCurrentMapPicker] = useState(0);
    const [mapPickingStarted, setMapPickingStarted] = useState(false);
    const [mapPickTimer, setMapPickTimer] = useState(45);
    const [mapPickTimerSetting, setMapPickTimerSetting] = useState(45);
    const [isAutoPickingMap, setIsAutoPickingMap] = useState(false);
    const [isPickingMap, setIsPickingMap] = useState(false);

    // Initialize on mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const eventParam = urlParams.get('event');
        const codeParam = urlParams.get('code');

        if (codeParam) {
            handleDiscordCallback(codeParam);
        } else if (eventParam) {
            setEventId(eventParam);
            setView('join'); // Always go to join view when event link is used
        }

        // Load saved data
        const savedName = window.StorageUtils.getCharacterName();
        if (savedName) setCharacterName(savedName);

        const savedDiscord = window.StorageUtils.getDiscordUser();
        if (savedDiscord) setDiscordUser(savedDiscord);

        // Fetch admin list
        fetchAdminList();
    }, []);

    // Fetch admin list from backend
    const fetchAdminList = async () => {
        try {
            const result = await window.ApiUtils.getAdmins();
            if (result.success) {
                setAdminList(result.admins || []);
            }
        } catch (err) {
            console.error('Error fetching admin list:', err);
        }
    };

    // Save character name and discord user
    useEffect(() => {
        if (characterName) window.StorageUtils.saveCharacterName(characterName);
        if (discordUser) window.StorageUtils.saveDiscordUser(discordUser);
    }, [characterName, discordUser]);

    // Check if user is admin
    useEffect(() => {
        if (discordUser && adminList.length > 0) {
            const isUserAdmin = adminList.some(admin => admin.discordId === discordUser.id);
            setIsAdmin(isUserAdmin);
        } else {
            setIsAdmin(false);
        }
    }, [discordUser, adminList]);

    // Discord authentication
    const handleDiscordCallback = async (code) => {
        try {
            const result = await window.ApiUtils.exchangeDiscordCode(code);
            
            if (result.success) {
                setDiscordUser(result.user);
                window.history.replaceState({}, document.title, window.location.pathname + (eventId ? `?event=${eventId}` : ''));
                
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.get('event')) {
                    setView('join');
                }
            } else {
                setError('Discord authentication failed: ' + result.error);
            }
        } catch (err) {
            setError('Error during Discord authentication: ' + err.message);
        }
    };

    const loginWithDiscord = () => {
        const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${window.AppConfig.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.AppConfig.REDIRECT_URI)}&response_type=code&scope=identify`;
        window.location.href = authUrl;
    };

    // Polling for updates
    useEffect(() => {
        if ((view === 'lobby' || view === 'captainChoice' || view === 'teamPicking') && eventId) {
            const interval = setInterval(async () => {
                try {
                    const result = await window.ApiUtils.getEvent(eventId);
                    if (result.success && result.eventData) {
                        const currentDataStr = JSON.stringify(eventData);
                        const newDataStr = JSON.stringify(result.eventData);

                        if (currentDataStr !== newDataStr) {
                            setEventData(result.eventData);

                            // Sync wheel spinning state
                            if (result.eventData.wheelSpinning !== undefined && result.eventData.wheelSpinning !== spinningWheel) {
                                if (result.eventData.wheelSpinning && result.eventData.wheelCandidates) {
                                    // Start local animation when wheel starts spinning
                                    setWheelCandidates(result.eventData.wheelCandidates);
                                    startWheelAnimation(result.eventData.wheelCandidates, result.eventData.wheelWinner);
                                } else {
                                    setSpinningWheel(false);
                                }
                            }

                            if (result.eventData.started && result.eventData.captains) {
                                setCaptains(result.eventData.captains);

                                if (result.eventData.currentPicker !== pickingCaptain) {
                                    setPickingCaptain(result.eventData.currentPicker || 0);
                                }

                                if (result.eventData.teams) {
                                    setTeams(result.eventData.teams);
                                }

                                if (result.eventData.availablePlayers) {
                                    setAvailablePlayers(result.eventData.availablePlayers);
                                }

                                if (view === 'lobby' && result.eventData.started) {
                                    setView('captainChoice');
                                }
                                if (view === 'captainChoice' && result.eventData.deferredFirstPick !== undefined) {
                                    setFirstPickerDeferred(result.eventData.deferredFirstPick);
                                    if (result.eventData.deferredFirstPick || (result.eventData.teams && (result.eventData.teams.captain1.length > 0 || result.eventData.teams.captain2.length > 0))) {
                                        setView('teamPicking');
                                    }
                                }
                                if (result.eventData.completed) {
                                    setView('complete');
                                }
                            }
                        }
                    }
                } catch (err) {
                    console.error('Error polling for updates:', err);
                }
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [view, eventId, eventData, teams, availablePlayers, pickingCaptain]);

    // Generate random event ID
    const generateEventId = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    // Create event handler
    const handleCreateEvent = async () => {
        setLoading(true);
        setError('');

        const newEventId = generateEventId();
        const participant = {
            name: characterName,
            discordUser: discordUser,
            wantsCaptain: wantsCaptain,
            lockpicker: isLockpicker,
            healer: isHealer,
            bard: isBard,
            meleeDPS: isMeleeDPS,        // ADD
            rangedDPS: isRangedDPS,      // ADD
            tamer: isTamer,              // ADD
            summoner: isSummoner,        // ADD
            tank: isTank,                // ADD
            jester: isJester,
            isMarshall: true,
            isAdmin: isAdmin
        };

        try {
            const result = await window.ApiUtils.createEvent(newEventId, characterName, discordUser, participant);
            
            if (result.success) {
                setEventId(newEventId);
                setEventData(result.eventData);
                setView('lobby');
            } else {
                setError('Failed to create event: ' + result.error);
            }
        } catch (err) {
            setError('Error creating event. Please try again. Error: ' + err.message);
            console.error('Create event error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Join event handler
    const handleJoinEvent = async () => {
        if (hasJoined) {
            setError('You have already joined this event!');
            return;
        }

        setLoading(true);
        setError('');

        // Create anonymous user object if no Discord login
        const userObject = discordUser || {
            id: `anonymous_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            username: `${characterName} (Guest)`,
            isAnonymous: true
        };

        const participant = {
            name: characterName,
            discordUser: userObject,
            wantsCaptain: discordUser ? wantsCaptain : false, // Anonymous users cannot be captain
            lockpicker: isLockpicker,
            healer: isHealer,
            bard: isBard,
            meleeDPS: isMeleeDPS,
            rangedDPS: isRangedDPS,
            tamer: isTamer,
            summoner: isSummoner,
            tank: isTank,
            jester: isJester,
            isMarshall: false,
            isAdmin: discordUser ? isAdmin : false, // Anonymous users cannot be admin
            isAnonymous: !discordUser
        };

        try {
            const checkResult = await window.ApiUtils.getEvent(eventId);
            
            if (!checkResult.success) {
                setError('Event not found: ' + checkResult.error);
                setLoading(false);
                return;
            }

            if (checkResult.eventData.started) {
                setError('This event has already started and is locked.');
                setLoading(false);
                return;
            }

            const existingNames = checkResult.eventData.participants.map(p => p.name.toLowerCase());
            if (existingNames.includes(characterName.toLowerCase())) {
                setError('A player with this name has already joined. Please choose a different character name.');
                setLoading(false);
                return;
            }
            
            const result = await window.ApiUtils.addParticipant(eventId, participant);
            
            if (result.success) {
                setEventData(result.eventData);
                setHasJoined(true);
                setView('lobby');
            } else {
                setError('Failed to join event: ' + (result.error || 'Unknown error'));
            }
        } catch (err) {
            setError('Error joining event. Please check the Event ID and try again. Error: ' + err.message);
            console.error('Join event error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Copy event link
    const copyEventLink = () => {
        const link = `${window.location.origin}${window.location.pathname}?event=${eventId}`;
        navigator.clipboard.writeText(link);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    };

    // Wheel spinning animation
    const spinWheel = (players) => {
        return players[Math.floor(Math.random() * players.length)];
    };

    // Start wheel animation for all clients (slot machine style)
    const startWheelAnimation = (candidates, winner) => {
        setSpinningWheel(true);

        const totalDuration = 5000; // 5 seconds total spin time
        const startTime = Date.now();
        let lastIndex = 0;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / totalDuration;

            if (progress < 1) {
                // Calculate speed based on progress (starts fast, slows down dramatically)
                // Using exponential easeOut for dramatic slowdown
                const easeOut = 1 - Math.pow(1 - progress, 4);

                // Calculate how many "steps" we've taken
                const totalSteps = 50 + (easeOut * 50); // 50-100 total steps
                const currentStep = Math.floor(easeOut * totalSteps);

                // Only update if we've moved to a new step (creates slot machine "tick" effect)
                if (currentStep !== lastIndex) {
                    lastIndex = currentStep;
                    const currentIndex = currentStep % candidates.length;
                    setCurrentWheelName(candidates[currentIndex].name);
                }

                requestAnimationFrame(animate);
            } else {
                // Spin complete - show winner
                setCurrentWheelName(winner.name);

                // Pause on winner for 3 seconds
                setTimeout(() => {
                    setSpinningWheel(false);
                }, 3000);
            }
        };

        requestAnimationFrame(animate);
    };

    const animateWheelSpin = (names, callback) => {
        // Pre-select the winner
        const winner = spinWheel(names);

        // Run animation locally
        startWheelAnimation(names, winner);

        // After animation completes (5s spin + 3s pause = 8s), call callback
        setTimeout(() => {
            callback(winner);
        }, 8000);
    };

    const handleContinueFromReveal = () => {
        setView('captainChoice');
    };

    // Start event and select captains
    const handleStartEvent = async () => {
        if (eventData.participants.length < 4) {
            alert('Need at least 4 participants to start the event!');
            return;
        }

        const potentialCaptains = eventData.participants.filter(p => p.wantsCaptain);

        if (potentialCaptains.length < 2) {
            alert('Need at least 2 people willing to be captain!');
            return;
        }

        // Pre-select both captains
        const captain1 = spinWheel(potentialCaptains);
        const remainingCaptains = potentialCaptains.filter(p => p.name !== captain1.name);
        const captain2 = spinWheel(remainingCaptains);

        // Set first wheel spinning state with candidates and winner
        const updatedEventDataSpinning = {
            ...eventData,
            wheelSpinning: true,
            wheelSpinPhase: 'captain1',
            wheelCandidates: potentialCaptains,
            wheelWinner: captain1
        };

        try {
            await window.ApiUtils.updateEvent(eventId, updatedEventDataSpinning);
            setEventData(updatedEventDataSpinning);
        } catch (err) {
            console.error('Error updating wheel state:', err);
        }

        // Start local animation for Marshall
        animateWheelSpin(potentialCaptains, async () => {
            // Update to show second wheel spinning
            const updatedEventDataSpin2 = {
                ...eventData,
                wheelSpinning: true,
                wheelSpinPhase: 'captain2',
                wheelCandidates: remainingCaptains,
                wheelWinner: captain2,
                captain1Selected: captain1
            };

            try {
                await window.ApiUtils.updateEvent(eventId, updatedEventDataSpin2);
                setEventData(updatedEventDataSpin2);
            } catch (err) {
                console.error('Error updating wheel state:', err);
            }

            // Start second wheel spin after first wheel finishes
            animateWheelSpin(remainingCaptains, async () => {
                const firstPicker = Math.random() < 0.5 ? 0 : 1;

                const selectedCaptains = [captain1, captain2];
                const nonCaptains = eventData.participants.filter(
                    p => p.name !== captain1.name && p.name !== captain2.name
                );

                const updatedEventData = {
                    ...eventData,
                    started: true,
                    captains: selectedCaptains,
                    firstPicker: firstPicker,
                    currentPicker: firstPicker,
                    availablePlayers: nonCaptains,
                    teams: { captain1: [], captain2: [] },
                    deferredFirstPick: false,
                    wheelSpinning: false,
                    wheelSpinPhase: null,
                    wheelCandidates: null,
                    wheelWinner: null
                };

                try {
                    await window.ApiUtils.updateEvent(eventId, updatedEventData);

                    setCaptains(selectedCaptains);
                    setPickingCaptain(firstPicker);
                    setAvailablePlayers(nonCaptains);
                    setTeams({ captain1: [], captain2: [] });
                    setView('captainReveal');
                } catch (err) {
                    setError('Error starting event: ' + err.message);
                }
            });
        });
    };

    // Defer first pick
    const handleDeferFirstPick = async () => {
        setFirstPickerDeferred(true);
        
        const newCurrentPicker = pickingCaptain === 0 ? 1 : 0;
        setPickingCaptain(newCurrentPicker);
        
        const updatedEventData = {
            ...eventData,
            deferredFirstPick: true,
            currentPicker: newCurrentPicker
        };

        try {
            await window.ApiUtils.updateEvent(eventId, updatedEventData);
            setEventData(updatedEventData);
            setView('teamPicking');
        } catch (err) {
            setError('Error deferring pick: ' + err.message);
        }
    };

    // Start drafting
    const handleStartDrafting = () => {
        setDraftTimer(draftTimerSetting);
        setView('teamPicking');
    };

    // Map pick timer effect
    useEffect(() => {
        if (view === 'mapPicking' && parsedMaps.length > 0 && mapPickTimer > 0 && !isAutoPickingMap) {
            const timer = setTimeout(() => {
                setMapPickTimer(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (view === 'mapPicking' && mapPickTimer === 0 && parsedMaps.length > 0 && !isAutoPickingMap) {
            handleMapPickTimeout();
        }
    }, [view, mapPickTimer, parsedMaps, isAutoPickingMap]);

    // Reset map pick timer when picker changes
    useEffect(() => {
        if (view === 'mapPicking' && !isAutoPickingMap) {
            setMapPickTimer(mapPickTimerSetting);
        }
    }, [currentMapPicker, view, selectedMaps.length, mapPickTimerSetting]);

    // Captain choice timeout
    const handleCaptainTimeout = async () => {
        if (pickingCaptain === eventData.firstPicker) {
            const otherCaptain = pickingCaptain === 0 ? 1 : 0;
            setPickingCaptain(otherCaptain);
            setCaptainChoiceTimer(captainChoiceTimerSetting);
            
            const updatedEventData = {
                ...eventData,
                currentPicker: otherCaptain,
                firstPickerTimedOut: true
            };
            
            try {
                await window.ApiUtils.updateEvent(eventId, updatedEventData);
                setEventData(updatedEventData);
            } catch (err) {
                console.error('Error updating after timeout:', err);
            }
        } else {
            const randomDefer = Math.random() < 0.5;
            if (randomDefer) {
                await handleDeferFirstPick();
            } else {
                handleStartDrafting();
            }
        }
    };

    // Draft timeout
    const handleDraftTimeout = async () => {
        if (availablePlayers.length > 0 && !isAutoPicking) {
            setIsAutoPicking(true);
            const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
            await handlePickPlayer(randomPlayer);
            setTimeout(() => setIsAutoPicking(false), 1000);
        }
    };

    // Map pick timeout
    const handleMapPickTimeout = async () => {
        if (parsedMaps.length > 0 && !isAutoPickingMap) {
            setIsAutoPickingMap(true);
            const randomMap = parsedMaps[Math.floor(Math.random() * parsedMaps.length)];
            await handlePickMap(randomMap);
            setTimeout(() => setIsAutoPickingMap(false), 1000);
        }
    };

    // Captain choice timer effect
    useEffect(() => {
        if (view === 'captainChoice' && captainChoiceTimer > 0) {
            const timer = setTimeout(() => {
                setCaptainChoiceTimer(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (view === 'captainChoice' && captainChoiceTimer === 0) {
            handleCaptainTimeout();
        }
    }, [view, captainChoiceTimer]);

    // Draft timer effect
    useEffect(() => {
        if (view === 'teamPicking' && availablePlayers.length > 0 && draftTimer > 0 && !isAutoPicking) {
            const timer = setTimeout(() => {
                setDraftTimer(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (view === 'teamPicking' && draftTimer === 0 && availablePlayers.length > 0 && !isAutoPicking) {
            handleDraftTimeout();
        }
    }, [view, draftTimer, availablePlayers, isAutoPicking]);

    // Reset draft timer when picker changes
    useEffect(() => {
        if (view === 'teamPicking' && !isAutoPicking) {
            setDraftTimer(draftTimerSetting);
        }
    }, [pickingCaptain, view, teams.captain1.length, teams.captain2.length, draftTimerSetting]);

    // Pick player handler
    const handlePickPlayer = async (player) => {
        if (isDrafting) return;
        
        setIsDrafting(true);
        
        const teamKey = pickingCaptain === 0 ? 'captain1' : 'captain2';
        
        const newTeams = {
            ...teams,
            [teamKey]: [...teams[teamKey], player]
        };
        
        const newAvailablePlayers = availablePlayers.filter(p => p.name !== player.name);
        
        setTeams(newTeams);
        setAvailablePlayers(newAvailablePlayers);
        setDraftTimer(draftTimerSetting);
        setJustDrafted(player.name);
        setTimeout(() => setJustDrafted(null), 2000);
        
        const updatedEventData = {
            ...eventData,
            teams: newTeams,
            availablePlayers: newAvailablePlayers,
            currentPicker: pickingCaptain === 0 ? 1 : 0,
            teamNames: teamNames
        };

        try {
            await window.ApiUtils.updateEvent(eventId, updatedEventData);
            setEventData(updatedEventData);
        } catch (err) {
            console.error('Error updating teams:', err);
        }
        
        setTimeout(() => {
            setIsDrafting(false);
        }, 500);
        
        if (newAvailablePlayers.length === 1) {
            const otherTeamKey = pickingCaptain === 0 ? 'captain2' : 'captain1';
            const finalTeams = {
                ...newTeams,
                [otherTeamKey]: [...newTeams[otherTeamKey], newAvailablePlayers[0]]
            };
            
            setTeams(finalTeams);
            setAvailablePlayers([]);
            
            const finalEventData = {
                ...eventData,
                teams: finalTeams,
                availablePlayers: [],
                completed: true,
                teamNames: teamNames
            };

            try {
                await window.ApiUtils.updateEvent(eventId, finalEventData);
                setEventData(finalEventData);
            } catch (err) {
                console.error('Error finalizing teams:', err);
            }
            
            setView('complete');
        } else {
            setPickingCaptain(prev => prev === 0 ? 1 : 0);
        }
    };

    // Pick map handler
    const handlePickMap = async (map) => {
        if (isPickingMap) return; // Prevent spam clicking
        
        setIsPickingMap(true);
        
        const teamKey = currentMapPicker === 0 ? 'captain1' : 'captain2';
        
        const newSelectedMaps = [...selectedMaps, { ...map, pickedBy: teamKey }];
        setSelectedMaps(newSelectedMaps);
        
        const newAvailableMaps = parsedMaps.filter(m => m.id !== map.id);
        setParsedMaps(newAvailableMaps);
        
        setMapPickTimer(mapPickTimerSetting); // Reset timer
        
        const updatedEventData = {
            ...eventData,
            selectedMaps: newSelectedMaps,
            maps: newAvailableMaps,
            currentMapPicker: currentMapPicker === 0 ? 1 : 0
        };
        
        try {
            await window.ApiUtils.updateEvent(eventId, updatedEventData);
            setEventData(updatedEventData);
        } catch (err) {
            console.error('Error updating maps:', err);
        }
        
        setTimeout(() => {
            setIsPickingMap(false);
        }, 500);
        
        // Check if all maps picked
        if (newAvailableMaps.length === 0) {
            setView('complete');
        } else {
            setCurrentMapPicker(prev => prev === 0 ? 1 : 0);
        }
    };

    // Skip map picking (Marshall only)
    const handleSkipMapPicking = async () => {
        if (!confirm('Are you sure you want to skip map selection and go straight to the final screen?')) {
            return;
        }
        
        setView('complete');
    };

    // Record winner - UPDATED VERSION
const handleRecordWinner = async (winningTeam) => {
    const winningTeamName = winningTeam === 'captain1' 
        ? (eventData?.teamNames?.captain1 || `Team 1: ${captains[0]?.name}`)
        : (eventData?.teamNames?.captain2 || `Team 2: ${captains[1]?.name}`);
    
    if (!confirm(`Confirm ${winningTeamName} won?`)) {
        return;
    }

    try {
        setLoading(true);
        
        // Call the dedicated recordWinner API endpoint
        const result = await window.ApiUtils.recordWinner(eventId, winningTeam);

        if (result.success) {
            setEventData(result.eventData);
            alert('Winner recorded! Stats have been saved to the leaderboard.');
        } else {
            alert('Failed to record winner: ' + result.error);
        }
    } catch (err) {
        alert('Error recording winner: ' + err.message);
        console.error('Record winner error:', err);
    } finally {
        setLoading(false);
    }
};

    // Parse map coordinates when entering complete view
    useEffect(() => {
        if (view === 'complete' && mapCoords.trim() && !mapPickingStarted) {
            const coordsList = mapCoords.split('|').map(coord => coord.trim()).filter(coord => coord);
            
            if (coordsList.length > 0) {
                const maps = coordsList.map((coord, index) => {
                    const [x, y] = coord.split(',').map(c => c.trim());
                    return {
                        id: `map_${index}`,
                        x: x,
                        y: y,
                        url: `https://exploreoutlands.com/?c=${x},${y}#pos:${x},${y},9`
                    };
                });
                
                setParsedMaps(maps);
                setSelectedMaps([]);
                setCurrentMapPicker(0); // Team 1 captain always picks first map
                setMapPickingStarted(true);
                setMapPickTimer(mapPickTimerSetting); // Initialize timer
                
                // Small delay to ensure state is set before view change
                setTimeout(() => {
                    setView('mapPicking');
                }, 100);
            }
        }
    }, [view, mapCoords, mapPickingStarted, mapPickTimerSetting]);

    // Add manual player
    const handleAddManualPlayer = async () => {
        if (!newPlayerName.trim()) {
            setError('Player name is required!');
            return;
        }

        const existingNames = eventData.participants.map(p => p.name.toLowerCase());
        if (existingNames.includes(newPlayerName.toLowerCase())) {
            setError('A player with this name already exists!');
            return;
        }

        setLoading(true);
        setError('');

        const manualPlayer = {
            name: newPlayerName,
            discordUser: {
                id: `manual_${Date.now()}`,
                username: `${newPlayerName} (Manual)`
            },
            wantsCaptain: newPlayerCaptain,
            lockpicker: newPlayerLockpicker,
            healer: newPlayerHealer,
            bard: newPlayerBard,
            meleeDPS: newPlayerMeleeDPS,        // ADD
            rangedDPS: newPlayerRangedDPS,      // ADD
            tamer: newPlayerTamer,              // ADD
            summoner: newPlayerSummoner,        // ADD
            tank: newPlayerTank,                // ADD
            jester: newPlayerJester,            // ADD
            isMarshall: false,
            isManual: true,
            isAdmin: false
        };

        try {
            const result = await window.ApiUtils.addParticipant(eventId, manualPlayer);

            if (result.success) {
                setEventData(result.eventData);
                setShowAddPlayer(false);
                setNewPlayerName('');
                setNewPlayerCaptain(false);
                setNewPlayerLockpicker(false);
                setNewPlayerHealer(false);
                setNewPlayerBard(false);
                setNewPlayerMeleeDPS(false);        // ADD
                setNewPlayerRangedDPS(false);       // ADD
                setNewPlayerTamer(false);           // ADD
                setNewPlayerSummoner(false);        // ADD
                setNewPlayerTank(false);            // ADD
                setNewPlayerJester(false);          // ADD
            } else {
                setError('Failed to add player: ' + result.error);
            }
        } catch (err) {
            setError('Error adding player: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Remove player
    const handleRemovePlayer = async (playerIndex) => {
        if (!confirm('Are you sure you want to kick this player?')) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const updatedEventData = { ...eventData };
            updatedEventData.participants.splice(playerIndex, 1);

            const result = await window.ApiUtils.updateEvent(eventId, updatedEventData);

            if (result.success) {
                setEventData(result.eventData);
            } else {
                setError('Failed to remove player: ' + result.error);
            }
        } catch (err) {
            setError('Error removing player: ' + err.message);
            console.error('Remove player error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Update player roles
    const handleUpdatePlayerRoles = async (playerIndex, updates) => {
        setLoading(true);
        setError('');

        try {
            const updatedEventData = { ...eventData };
            updatedEventData.participants[playerIndex] = {
                ...updatedEventData.participants[playerIndex],
                ...updates
            };

            const result = await window.ApiUtils.updateEvent(eventId, updatedEventData);

            if (result.success) {
                setEventData(result.eventData);
                setEditingPlayer(null);
                setTempRoles({});
            } else {
                setError('Failed to update player: ' + result.error);
            }
        } catch (err) {
            setError('Error updating player: ' + err.message);
            console.error('Update player error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Start editing roles
    const handleStartEditingRoles = (playerIndex, participant) => {
        setEditingPlayer(playerIndex);
        setTempRoles({
            wantsCaptain: participant.wantsCaptain,
            lockpicker: participant.lockpicker,
            healer: participant.healer,
            bard: participant.bard,
            meleeDPS: participant.meleeDPS || false,        // ADD
            rangedDPS: participant.rangedDPS || false,      // ADD
            tamer: participant.tamer || false,              // ADD
            summoner: participant.summoner || false,        // ADD
            tank: participant.tank || false,                // ADD
            jester: participant.jester || false             // ADD
        });
    };

    // Update team name
    const handleUpdateTeamName = async (teamKey) => {
        const newName = tempTeamName;
        const updatedTeamNames = { ...teamNames, [teamKey]: newName };
        setTeamNames(updatedTeamNames);

        try {
            const updatedEventData = {
                ...eventData,
                teamNames: updatedTeamNames
            };

            await window.ApiUtils.updateEvent(eventId, updatedEventData);
            setEventData(updatedEventData);
            setEditingTeamName(null);
            setTempTeamName('');
        } catch (err) {
            console.error('Error updating team name:', err);
        }
    };

    // Change Marshall (Admin only)
    const handleChangeMarshall = async (newMarshallDiscordId) => {
        if (!isAdmin) {
            setError('Only admins can change the Marshall');
            return;
        }

        if (!confirm('Are you sure you want to change the Marshall?')) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await window.ApiUtils.changeMarshall(eventId, newMarshallDiscordId);

            if (result.success) {
                setEventData(result.eventData);
                alert('Marshall changed successfully!');
            } else {
                setError('Failed to change Marshall: ' + result.error);
            }
        } catch (err) {
            setError('Error changing Marshall: ' + err.message);
            console.error('Change Marshall error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Leave event
    const handleLeaveEvent = async () => {
        if (!confirm('Are you sure you want to leave this event?')) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Find the current user's participant index
            const participantIndex = eventData.participants.findIndex(p =>
                p.discordUser && discordUser && p.discordUser.id === discordUser.id
            );

            if (participantIndex === -1) {
                setError('You are not in this event');
                setLoading(false);
                return;
            }

            // Check if user is Marshall
            if (eventData.participants[participantIndex].isMarshall) {
                setError('The Marshall cannot leave the event. Please transfer Marshall status first or delete the event.');
                setLoading(false);
                return;
            }

            // Remove the participant
            const updatedEventData = { ...eventData };
            updatedEventData.participants.splice(participantIndex, 1);

            const result = await window.ApiUtils.updateEvent(eventId, updatedEventData);

            if (result.success) {
                // Return to home view
                setView('home');
                setHasJoined(false);
            } else {
                setError('Failed to leave event: ' + result.error);
            }
        } catch (err) {
            setError('Error leaving event: ' + err.message);
            console.error('Leave event error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Transfer Marshall (Marshall only)
    const handleTransferMarshall = async (newMarshallDiscordId) => {
        // Check if current user is Marshall
        const currentUserParticipant = eventData.participants.find(p =>
            p.discordUser && discordUser && p.discordUser.id === discordUser.id
        );

        if (!currentUserParticipant || !currentUserParticipant.isMarshall) {
            setError('Only the Marshall can transfer Marshall status');
            return;
        }

        if (!confirm('Are you sure you want to transfer Marshall status to this player?')) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await window.ApiUtils.changeMarshall(eventId, newMarshallDiscordId);

            if (result.success) {
                setEventData(result.eventData);
                alert('Marshall transferred successfully!');
            } else {
                setError('Failed to transfer Marshall: ' + result.error);
            }
        } catch (err) {
            setError('Error transferring Marshall: ' + err.message);
            console.error('Transfer Marshall error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Cancel Event (Marshall or Admin only)
    const handleCancelEvent = async () => {
        // Check if current user is Marshall or Admin
        const currentUserParticipant = eventData.participants.find(p =>
            p.discordUser && discordUser && p.discordUser.id === discordUser.id
        );

        const canCancel = currentUserParticipant?.isMarshall || isAdmin;

        if (!canCancel) {
            setError('Only the Marshall or an Admin can cancel the event');
            return;
        }

        if (!confirm('Are you sure you want to CANCEL this event? This cannot be undone and all participants will be removed.')) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await window.ApiUtils.deleteEvent(eventId);

            if (result.success) {
                alert('Event cancelled successfully!');
                // Return to home view
                setView('home');
                setEventId('');
                setEventData(null);
                setHasJoined(false);
            } else {
                setError('Failed to cancel event: ' + result.error);
            }
        } catch (err) {
            setError('Error cancelling event: ' + err.message);
            console.error('Cancel event error:', err);
        } finally {
            setLoading(false);
        }
    };




    // Get role icons
    // DEBUG: Log what icons are available
    console.log('Available icons:', Object.keys(window.Icons || {}));

    const getRoleIcons = (participant) => {
        if (!participant) {
            console.log('getRoleIcons: participant is null/undefined');
            return [];
        }
        
        console.log('getRoleIcons called for:', participant.name, participant);
        
        const icons = [];
        const Icons = window.Icons || {};
        
        console.log('Icons object:', Icons);
        console.log('Icons keys:', Object.keys(Icons));
        
        const { Key, Heart, Music, Sword, Target, Zap, Skull, Shield, User } = Icons;
        
        console.log('Destructured icons:', { Key: !!Key, Heart: !!Heart, Music: !!Music, Sword: !!Sword, Target: !!Target, Zap: !!Zap, Skull: !!Skull, Shield: !!Shield, User: !!User });
        
        if (participant.lockpicker && Key) {
            icons.push(<Key key="key" className="w-4 h-4 text-yellow-500" />);
        }
        if (participant.healer && Heart) {
            icons.push(<Heart key="heart" className="w-4 h-4 text-red-500" />);
        }
        if (participant.bard && Music) {
            icons.push(<Music key="music" className="w-4 h-4 text-purple-500" />);
        }
        if (participant.meleeDPS && Sword) {
            icons.push(<Sword key="melee" className="w-4 h-4 text-orange-500" />);
        }
        if (participant.rangedDPS && Target) {
            icons.push(<Target key="ranged" className="w-4 h-4 text-blue-500" />);
        }
        if (participant.tamer && Zap) {
            icons.push(<Zap key="tamer" className="w-4 h-4 text-green-500" />);
        }
        if (participant.summoner && Skull) {
            icons.push(<Skull key="summoner" className="w-4 h-4 text-purple-400" />);
        }
        if (participant.tank && Shield) {
            icons.push(<Shield key="tank" className="w-4 h-4 text-gray-400" />);
        }
        if (participant.jester && User) {
            icons.push(<User key="jester" className="w-4 h-4 text-pink-500" />);
        }
        
        console.log('Returning icons array:', icons.length, icons);
        
        return icons;
    };

    // Render appropriate view
    if (view === 'home') {
        return (
            <window.HomeView
                characterName={characterName}
                error={error}
                setView={setView}
                setEventId={setEventId}
            />
        );
    }

    if (view === 'create') {
        return (
            <window.CreateEventView
                discordUser={discordUser}
                characterName={characterName}
                setCharacterName={setCharacterName}
                wantsCaptain={wantsCaptain}
                setWantsCaptain={setWantsCaptain}
                isLockpicker={isLockpicker}
                setIsLockpicker={setIsLockpicker}
                isHealer={isHealer}
                setIsHealer={setIsHealer}
                isBard={isBard}
                setIsBard={setIsBard}
                isMeleeDPS={isMeleeDPS}              // ADD
                setIsMeleeDPS={setIsMeleeDPS}        // ADD
                isRangedDPS={isRangedDPS}            // ADD
                setIsRangedDPS={setIsRangedDPS}      // ADD
                isTamer={isTamer}                    // ADD
                setIsTamer={setIsTamer}              // ADD
                isSummoner={isSummoner}              // ADD
                setIsSummoner={setIsSummoner}        // ADD
                isTank={isTank}                      // ADD
                setIsTank={setIsTank}                // ADD
                isJester={isJester}                  // ADD
                setIsJester={setIsJester}            // ADD
                error={error}
                loading={loading}
                onCreateEvent={handleCreateEvent}
                onLoginWithDiscord={loginWithDiscord}
                setView={setView}
            />
        );
    }

    if (view === 'join') {
        return (
            <window.JoinEventView
                discordUser={discordUser}
                eventId={eventId}
                setEventId={setEventId}
                characterName={characterName}
                setCharacterName={setCharacterName}
                wantsCaptain={wantsCaptain}
                setWantsCaptain={setWantsCaptain}
                isLockpicker={isLockpicker}
                setIsLockpicker={setIsLockpicker}
                isHealer={isHealer}
                setIsHealer={setIsHealer}
                isBard={isBard}
                setIsBard={setIsBard}
                isMeleeDPS={isMeleeDPS}              // ADD
                setIsMeleeDPS={setIsMeleeDPS}        // ADD
                isRangedDPS={isRangedDPS}            // ADD
                setIsRangedDPS={setIsRangedDPS}      // ADD
                isTamer={isTamer}                    // ADD
                setIsTamer={setIsTamer}              // ADD
                isSummoner={isSummoner}              // ADD
                setIsSummoner={setIsSummoner}        // ADD
                isTank={isTank}                      // ADD
                setIsTank={setIsTank}                // ADD
                isJester={isJester}                  // ADD
                setIsJester={setIsJester}            // ADD
                error={error}
                loading={loading}
                onJoinEvent={handleJoinEvent}
                onLoginWithDiscord={loginWithDiscord}
                setView={setView}
            />
        );
    }

    if (view === 'lobby') {
        return (
            <window.LobbyView
                characterName={characterName}
                discordUser={discordUser}
                isAdmin={isAdmin}
                eventId={eventId}
                eventData={eventData}
                linkCopied={linkCopied}
                spinningWheel={spinningWheel}
                currentWheelName={currentWheelName}
                editingPlayer={editingPlayer}
                tempRoles={tempRoles}
                setTempRoles={setTempRoles}
                showAddPlayer={showAddPlayer}
                setShowAddPlayer={setShowAddPlayer}
                newPlayerName={newPlayerName}
                setNewPlayerName={setNewPlayerName}
                newPlayerCaptain={newPlayerCaptain}
                setNewPlayerCaptain={setNewPlayerCaptain}
                newPlayerLockpicker={newPlayerLockpicker}
                setNewPlayerLockpicker={setNewPlayerLockpicker}
                newPlayerHealer={newPlayerHealer}
                setNewPlayerHealer={setNewPlayerHealer}
                newPlayerBard={newPlayerBard}
                setNewPlayerBard={setNewPlayerBard}
                newPlayerMeleeDPS={newPlayerMeleeDPS}              // ADD
                setNewPlayerMeleeDPS={setNewPlayerMeleeDPS}        // ADD
                newPlayerRangedDPS={newPlayerRangedDPS}            // ADD
                setNewPlayerRangedDPS={setNewPlayerRangedDPS}      // ADD
                newPlayerTamer={newPlayerTamer}                    // ADD
                setNewPlayerTamer={setNewPlayerTamer}              // ADD
                newPlayerSummoner={newPlayerSummoner}              // ADD
                setNewPlayerSummoner={setNewPlayerSummoner}        // ADD
                newPlayerTank={newPlayerTank}                      // ADD
                setNewPlayerTank={setNewPlayerTank}                // ADD
                newPlayerJester={newPlayerJester}                  // ADD
                setNewPlayerJester={setNewPlayerJester}            // ADD
                captainChoiceTimerSetting={captainChoiceTimerSetting}
                setCaptainChoiceTimerSetting={setCaptainChoiceTimerSetting}
                draftTimerSetting={draftTimerSetting}
                setDraftTimerSetting={setDraftTimerSetting}
                mapPickTimerSetting={mapPickTimerSetting}
                setMapPickTimerSetting={setMapPickTimerSetting}
                totalMaps={totalMaps}
                setTotalMaps={setTotalMaps}
                mapCoords={mapCoords}
                setMapCoords={setMapCoords}
                error={error}
                loading={loading}
                onCopyEventLink={copyEventLink}
                onStartEditingRoles={handleStartEditingRoles}
                onUpdatePlayerRoles={handleUpdatePlayerRoles}
                onRemovePlayer={handleRemovePlayer}
                onAddManualPlayer={handleAddManualPlayer}
                onStartEvent={handleStartEvent}
                onChangeMarshall={handleChangeMarshall}
                onTransferMarshall={handleTransferMarshall}
                onLeaveEvent={handleLeaveEvent}
                onCancelEvent={handleCancelEvent}
                setEditingPlayer={setEditingPlayer}
                getRoleIcons={getRoleIcons}
            />
        );
    }

    if (view === 'captainReveal') {
        return (
            <window.CaptainRevealView
                characterName={characterName}
                captains={captains}
                onContinue={handleContinueFromReveal}
            />
        );
    }

    if (view === 'captainChoice') {
        return (
            <window.CaptainChoiceView
                characterName={characterName}
                captains={captains}
                pickingCaptain={pickingCaptain}
                captainChoiceTimer={captainChoiceTimer}
                onStartDrafting={handleStartDrafting}
                onDeferFirstPick={handleDeferFirstPick}
            />
        );
    }

    if (view === 'teamPicking') {
        return (
            <window.TeamPickingView
                characterName={characterName}
                captains={captains}
                pickingCaptain={pickingCaptain}
                teams={teams}
                availablePlayers={availablePlayers}
                draftTimer={draftTimer}
                isAutoPicking={isAutoPicking}
                justDrafted={justDrafted}
                isDrafting={isDrafting}
                teamNames={teamNames}
                editingTeamName={editingTeamName}
                tempTeamName={tempTeamName}
                setTempTeamName={setTempTeamName}
                setEditingTeamName={setEditingTeamName}
                onPickPlayer={handlePickPlayer}
                onUpdateTeamName={handleUpdateTeamName}
                getRoleIcons={getRoleIcons}
            />
        );
    }

    if (view === 'mapPicking') {
        return (
            <window.MapPickingView
                characterName={characterName}
                captains={captains}
                currentMapPicker={currentMapPicker}
                parsedMaps={parsedMaps}
                selectedMaps={selectedMaps}
                eventData={eventData}
                mapPickTimer={mapPickTimer}
                mapPickTimerSetting={mapPickTimerSetting}
                isAutoPickingMap={isAutoPickingMap}
                onPickMap={handlePickMap}
                onSkipMapPicking={handleSkipMapPicking}
                getRoleIcons={getRoleIcons}
            />
        );
    }

    if (view === 'complete') {
        return (
            <window.CompleteView
                characterName={characterName}
                captains={captains}
                teams={teams}
                eventData={eventData}
                selectedMaps={selectedMaps}
                setView={setView}
                onRecordWinner={handleRecordWinner}
                getRoleIcons={getRoleIcons}
            />
        );
    }

    return null;
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TreasureMapTeamPicker />);