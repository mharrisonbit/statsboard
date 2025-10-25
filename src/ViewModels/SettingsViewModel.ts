import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { twelveHoursDiff } from "../Helpers/Utils";
import { Team } from "../Models/NHLTeam";
import { Game } from "../Models/Scores";

const useSettingsViewModel = () => {
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
    setIsLoading(true);
    await AsyncStorage.clear();
    setShowClear(false);
    setSavedGames([]);
    setSavedTeams([]);
    setIsLoading(false);
  };

  return { savedGames, savedTeams, isLoading, showClear, getAllSavedOptions, clearAllItemsSaved };
};

export default useSettingsViewModel;
