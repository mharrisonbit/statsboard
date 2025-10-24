import { useState } from "react";
import useNHLDataManager from "../Data/DataManager";
import { GameStream } from "../Models/GameStream";
import { NHLGameListing } from "../Models/NHLGameListing";


const useShowsViewModel = () => {
    const { isLoading, getTodaysWatchInfo, getWatchInfo} = useNHLDataManager();
    const [ todaysGames, setTodaysGames ] = useState<NHLGameListing>();
    const [ streams, setStreams ] = useState<GameStream>();

    const buildTodaysGames = async (date:string) => {
        let data = await getTodaysWatchInfo(date);
        console.log('this is the games for a date string', data);
        setTodaysGames(data);
    }

    const buildWatchList = async() => {
        let data = await getWatchInfo();
        console.log(data?.find(x => x.countryCode?.toLocaleLowerCase() === 'us'));
        setStreams(data?.find(x => x.countryCode?.toLocaleLowerCase() === 'us'))
    }


    return { isLoading, streams, todaysGames, buildWatchList, buildTodaysGames }
}

export default useShowsViewModel;