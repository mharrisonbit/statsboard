import { useState } from "react";
import useNHLDataManager from "../Data/DataManager";
import { Standing } from "../Models/Standing";


const useGameStatsViewModel = () => {
    const {isLoading, getTeamStats} = useNHLDataManager();
    const {games, setGames} = useState<Standing[]>([]);

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

        // let results = await getTeamStats(dateString);
        
        // setStandings(results.standings);
        getTeamStats(dateString).then(result =>{
            setGames(result.standings ?? []);
        });
    }

    return {isLoading, games, loadGames}
}

export default useGameStatsViewModel;