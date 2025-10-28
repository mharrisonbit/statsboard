import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Alert, ScrollView } from "react-native";
import useNHLDataManager from "../Data/DataManager";
import { Standing } from "../Models/Standing";

const useTeamStatsViewModel = () => {
  const { getTeamStats } = useNHLDataManager();
  const [searchText, onChangeText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  // Compute current date string in EST
  const effectiveDate = new Date();
  const estDateString = effectiveDate.toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [month, day, year] = estDateString.split("/");
  const dateString = `${year}-${month}-${day}`;

  const {
    data,
    isFetching,
    isLoading,
    isError,
    status,
    refetch,
    error,
  } = useQuery({
    queryKey: ["teamStats", dateString],
    queryFn: () => getTeamStats(dateString),
    enabled: true, 
  });

  const games: Standing[] = data?.standings ?? [];

  const searchStandings = (query: string) => {
    if (!games || !query.trim()) {
      Alert.alert("Please enter a search term.");
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = games.filter(
      (item: Standing) =>
        item?.teamCommonName?.default?.toLowerCase().includes(lowerQuery) ||
        item?.placeName?.default?.toLowerCase().includes(lowerQuery)
    );

    if (results?.length === 0) {
      Alert.alert("No results found");
    } else {
      const result = results?.[0];
      if (result) {
        const foundItemIndex = games.findIndex(
          (i: Standing) =>
            i?.teamCommonName?.default === result.teamCommonName?.default
        );
        if (foundItemIndex !== undefined && foundItemIndex !== -1 && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            y: foundItemIndex * 420,
            animated: true,
          });
        }
        onChangeText("");
      }
    }
  };

  return {
    isFetching,
    isError,
    error,
    status,
    games,
    searchText,
    scrollViewRef,
    refetch,
    searchStandings,
    onChangeText,
  };
};

export default useTeamStatsViewModel;
