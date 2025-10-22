import { useRef, useState } from "react";
import { Alert, ScrollView } from "react-native";
import useNHLDataManager from "../Data/DataManager";
import { Standing } from "../Models/Standing";


const useGameStatsViewModel = () => {
    const {isLoading, getTeamStats} = useNHLDataManager();
    const [games, setGames] = useState<Standing[]>([]);
    const [searchText, onChangeText] = useState("");

    const scrollViewRef = useRef<ScrollView>(null);

    const loadGames = async() => {
        const effectiveDate = new Date();
        const estDateString = effectiveDate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const [month, day, year] = estDateString.split('/');
        const dateString = `${year}-${month}-${day}`;

        getTeamStats(dateString).then(result =>{
            setGames(result.standings ?? []);
        });
    }

    const searchStandings = (query: string) => {
        if (!games || !query.trim()) {
          Alert.alert("Please enter a search term.");
          return;
        }
        const lowerQuery = query.toLowerCase();
        const results = games?.filter(
          (item: Standing) =>
            item?.teamCommonName?.default!.toLowerCase().includes(lowerQuery) ||
            item?.placeName?.default!.toLocaleLowerCase().includes(lowerQuery)
        );
        
        if (results?.length === 0) {
            Alert.alert("No results found");
        } else {
          const result = results?.[0];
          if (result) {
            let foundItemIndex = games?.findIndex(
              (i: Standing) => i?.teamCommonName?.default === result.teamCommonName?.default
            );
            if (foundItemIndex !== undefined && foundItemIndex !== -1 && scrollViewRef.current) {
              scrollViewRef.current.scrollTo({
                y: foundItemIndex * 420, // Assuming each item is approximately 40px tall
                animated: true,
              });
            }

            // onChangeText("");
          }
        }
      };

    return {
        isLoading,
        games,
        loadGames,
        searchText,
        scrollViewRef,
        searchStandings,
        onChangeText,
    }
}

export default useGameStatsViewModel;