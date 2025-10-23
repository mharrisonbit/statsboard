import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Team } from "../Models/NHLTeam";
import { Game } from "../Models/Scores";

const useSettingsViewModel = () => {
  const [showClear, setShowClear] = useState(false);
  const [savedGames, setSavedGames] = useState<Game[]>([]);
  const [savedTeams, setSavedTeams] = useState<Team[]>([]);

  const getAllSavedOptions = async () => {
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

            // Handle both wrapped Scores[] and raw Game[]
            if (Array.isArray(json)) {
              // If it's a Scores[] array
              json.forEach((s: any) => {
                if (s.games?.length) parsedGames.push(...s.games);
              });
            } else if (json.games) {
              parsedGames.push(...json.games);
            } else {
              // Maybe stored a single game
              parsedGames.push(json);
            }
          } else if (key.includes("team")) {
            const json = JSON.parse(value);

            // Handle both wrapped NHLTeam and raw Team
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
  };

  const clearAllItemsSaved = async () => {
    await AsyncStorage.clear();
    setShowClear(false);
    setSavedGames([]);
    setSavedTeams([]);
  };

  return { savedGames, savedTeams, showClear, getAllSavedOptions, clearAllItemsSaved };
};

export default useSettingsViewModel;
