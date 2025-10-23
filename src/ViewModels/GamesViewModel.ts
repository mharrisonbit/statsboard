import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import useNHLDataManager from "../Data/DataManager";
import { Game, Scores } from "../Models/Scores";


const useGamesViewModel = () => {
    const navigation = useNavigation<any>();
    const { getTodaysScores, getScoresForDate, getTeamStats, isLoading } = useNHLDataManager();
    const pageTitle = "this is the scores page";
    const [games, setGames] = useState<Game[]>([]);
    const [gamesToSave, setGmesToSave] = useState<Scores[]>([]);
    const [gameReminder, setGameReminder] = useState(false);
    const [dateToDisplay, setDateToDisplay] = useState("");
    const [date, setDate] = useState(new Date());

    const [open, setOpen] = useState(false);

    const onDateChange = (selectedDate: Date) => {
        setDate(selectedDate);
    };

    const getScoresForToday = async (selectedDate?: Date) =>{
        const effectiveDate = selectedDate ?? date;
        if(effectiveDate){

            const estDateString = effectiveDate.toLocaleString('en-US', {
                timeZone: 'America/New_York',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
            const [month, day, year] = estDateString.split('/');
            const dateString = `${year}-${month}-${day}`;

            let data = await getScoresForDate(dateString);
            setGmesToSave(data);
            let updated = await updateGameData(data?.[0].games ?? []);
            
            setGames(updated);
            setDateToDisplay(data?.[0]?.date?.raw ?? "");
            
            return;
        }


        let data = await getTodaysScores();
        
        setDateToDisplay(data?.[0]?.date?.raw ?? "");
        setGames(data?.[0]?.games ?? []);
    }

    const showGameData = (data:Game) => {
        navigation.navigate("Game", { 
            gameData: data, 
            pageTitle: `${data.teams?.home?.teamName} vs ${data.teams?.away?.teamName}` 
        });
    }

    const SaveGame = async (game:Game) => {
        let saveKey = game?.teams?.away?.abbreviation + "-" + game?.teams?.home?.abbreviation + " game";
        if(game.isSaved){
            await AsyncStorage.removeItem(saveKey);
        }else{
            await AsyncStorage.setItem(saveKey, JSON.stringify(game));
        }

        const updatedGames = games.map((g) =>
            g.teams?.away === game.teams?.away ? { ...g, isSaved: !game.isSaved } : g
          );
        
          setGames(updatedGames);

          // https://wix.github.io/react-native-notifications/docs/getting-started/
          // https://github.com/wix/react-native-notifications
          //TODO: add logic so that the app will send a reminder before the game starts.


    }

    const updateGameData = async (data:Game[]):Promise<Game[]> => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i].teams?.away?.abbreviation + "-" + data[i].teams?.home?.abbreviation + " game";
            let saved = await AsyncStorage.getItem(element);
            data[i].isSaved = saved ? true : false;
        }
        return data;
    }


    return {
        pageTitle,
        games,
        date,
        dateToDisplay,
        open,
        isLoading,
        onDateChange,
        setOpen,
        setDate,
        getScoresForToday,
        showGameData,
        SaveGame,
    }
}

export default useGamesViewModel;