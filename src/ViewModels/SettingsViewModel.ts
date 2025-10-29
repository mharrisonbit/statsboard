import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import useCustomModalPopup from "../Components/CustomPopup";
import { twelveHoursDiff } from "../Helpers/Utils";
import { Team } from "../Models/NHLTeam";
import { Game } from "../Models/Scores";

const useSettingsViewModel = () => {
  const { openModal, ModalComponent } = useCustomModalPopup();
  
  const [ showClear, setShowClear ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ savedGames, setSavedGames ] = useState<Game[]>([]);
  const [ savedTeams, setSavedTeams ] = useState<Team[]>([]);


  const getAllSavedOptions = async () => {
    setIsLoading(true);
    const keys = await AsyncStorage.getAllKeys();

    if (Array.isArray(keys) && keys.length >= 1) {
      setShowClear(true);
      const listOfData = await AsyncStorage.multiGet(keys);

      const parsedGames: Game[] = [];
      const parsedTeams: Team[] = [];

      for (const [key, value] of listOfData) {
        if (!value) continue;

        try {
          if (key.includes("game")) {
            const json = JSON.parse(value);

            if (Array.isArray(json)) {
              json.forEach((s: any) => {
                if (s.games?.length) parsedGames.push(...s.games);
              });
            } else if (json.games) {
              parsedGames.push(...json.games);
            } else {
              let gameStarted = new Date(json.startTime);
              let today = new Date();
              const differenceMs = today.getTime() - gameStarted.getTime();
              if(differenceMs >= twelveHoursDiff){
                AsyncStorage.removeItem(key);
              }else{
                parsedGames.push(json);
              }
            }
          } else if (key.includes("team")) {
            const json = JSON.parse(value);

            if (json.data && Array.isArray(json.data)) {
              parsedTeams.push(...json.data);
            } else {
              parsedTeams.push(json);
            }
          }
        } catch (err) {
          console.error(`Error parsing data for key ${key}:`, err);
        }
      }
      buildButtonsForModal
      setSavedGames(parsedGames);
      setSavedTeams(parsedTeams);
    } else {
      setShowClear(false);
      setSavedGames([]);
      setSavedTeams([]);
    }
    setIsLoading(false);
  };

  const clearAllItemsSaved = async () => {
    let buttonsArray = await buildButtonsForModal();

    let result = await openModal(
      "Clear Data",
      "What of the saved data would you like to clear?",
      buttonsArray
    );
  
    setIsLoading(true);
    if(result === 'cancel'){
      setIsLoading(false);
      return;
    }
    
    let savedItems = await AsyncStorage.getAllKeys();

    switch (result) {
      case 'games':
        let games = savedItems.filter(x => x.includes('game'));

        await AsyncStorage.multiRemove(games);
        break;
      case 'teams':
        let teams = savedItems.filter(x => x.includes('team'));

        await AsyncStorage.multiRemove(teams);
        break;
      case 'confirm':
        await AsyncStorage.clear();
       
        break;
    }
    
    getAllSavedOptions();
    setIsLoading(false);
  };
  
  const buildButtonsForModal = async (): Promise<{ label: string, value: string }[]> =>{
    const keys = await AsyncStorage.getAllKeys();
    
    let buttonsArray = [
      { label: "Cancel", value: "cancel" },
      { label: "All Data", value: "confirm" },
    ];
    
    const teamFound = keys.some(obj => obj.includes("team"));
    const gameFound = keys.some(obj => obj.includes("game"));
    
    if(teamFound) { buttonsArray.splice(1, 0, { label: "Teams", value: "teams" })};
    if(gameFound) { buttonsArray.splice(1, 0, { label: "Games", value: "games" })};

    return buttonsArray;
  }

  return { savedGames, savedTeams, isLoading, showClear, getAllSavedOptions, clearAllItemsSaved, ModalComponent };
};

export default useSettingsViewModel;
