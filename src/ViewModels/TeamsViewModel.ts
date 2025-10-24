import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import useNHLDataManager from "../Data/DataManager";
import { Team } from "../Models/NHLTeam";

const useTeamsViewModel = () => {
  const { getTeams } = useNHLDataManager();
  const [teams, setTeams] = useState<Team[]>([]);

  const buildTeamsForView = async () => {
    const result = await getTeams();
    if (result !== undefined && result?.data?.length! > 0) {
      const updatedTeams = await checkForSavedTeam(result.data!);
      updatedTeams.sort((a, b) => b.isSaved - a.isSaved);
      setTeams(updatedTeams);
    } else {
      setTeams([]);
    }
  };

  const saveTeam = async (team: Team) => {
    const key = team.triCode + " team";
    if (!key) return;

    const existing = await AsyncStorage.getItem(key);

    if (existing) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(team));
    }

    setTeams((prevTeams) =>
      prevTeams.map((t) =>
        t.triCode === team.triCode
          ? { ...t, isSaved: !t.isSaved }
          : t
      ).sort((a,b) => b.isSaved - a.isSaved)
    );
  };

  const checkForSavedTeam = async (data: Team[]): Promise<Team[]> => {
    const keys = await AsyncStorage.getAllKeys();

    if (keys.length === 0) return data;

    return data.map((team) => ({
      ...team,
      isSaved: keys.includes(team.triCode + ' team' || ""),
    }));
  };

  return { teams, buildTeamsForView, saveTeam };
};

export default useTeamsViewModel;
