import { useState } from 'react';
import { GameStream } from '../Models/GameStream';
import { NHLGameListing } from '../Models/NHLGameListing';
import { NHLGlossary } from '../Models/NHLGlossary';
import { NHLTeam } from '../Models/NHLTeam';
import { NHLTeamStats } from '../Models/NHLTeamStats';
import { Scores } from '../Models/Scores';
import { Standings } from '../Models/Standing';

const basicUrl = 'https://api.nhle.com/';
const statsUrl = 'https://api-web.nhle.com/';
const scoresUrl = 'https://nhl-score-api.herokuapp.com/';

const useNHLDataManager = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const callApi = async (url: string): Promise<any> => {
        setIsLoading(true);
        setError(null); // reset any previous error

        try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
        } catch (err) {
            const apiError = err instanceof Error ? err : new Error('Unknown error');
            console.error('Error fetching data:', apiError);
            setError(apiError);
        return null;
        } finally {
            setIsLoading(false);
        }
    };

    const getTeams = async (): Promise<NHLTeam> => {
        return await callApi(basicUrl + 'stats/rest/en/team');
    };

    const getTeamByTricode = async (triCode: string): Promise<NHLTeamStats> => {
        return await callApi(statsUrl + 'v1/club-stats/' + triCode + '/now');
    };

    const getTeamById = async (gameType: number, season: string): Promise<NHLTeamStats> => {
        return await callApi(
            basicUrl +
            'stats/rest/en/team/summary?sort=shotsForPerGame&cayenneExp=seasonId=' +
            season +
            '%20and%20gameTypeId=' +
            gameType
        );
    };

    const getWatchInfo = async (): Promise<GameStream[]> => {
        return await callApi(statsUrl + 'v1/where-to-watch');
    };

    const getTodaysWatchInfo = async (date: string): Promise<NHLGameListing> => {
        return await callApi(statsUrl + 'v1/network/tv-schedule/' + date);
    };

    const getGlossaryInfo = async (): Promise<NHLGlossary> => {
        return await callApi(basicUrl + 'stats/rest/en/glossary');
    };

    const getTodaysScores = async (): Promise<Scores[]> => {
        const now = new Date();
        const estDateString = now.toLocaleString('en-US', {
            timeZone: 'America/New_York',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const [month, day, year] = estDateString.split('/');
        const today = `${year}-${month}-${day}`;
        return await callApi(`${scoresUrl}api/scores?startDate=${today}&endDate=${today}`);
    };

    const getScoresForDate = async (dateString: string): Promise<Scores[]> => {
        return await callApi(`${scoresUrl}api/scores?startDate=${dateString}&endDate=${dateString}`);
    };

    const getTeamStats = async (date: string): Promise<Standings> => {
        return await callApi(statsUrl + 'v1/standings/' + date);
    };

    return {
        isLoading,
        error,
        getTeams,
        getTeamByTricode,
        getTeamById,
        getWatchInfo,
        getTodaysWatchInfo,
        getGlossaryInfo,
        getTodaysScores,
        getScoresForDate,
        getTeamStats,
    };
};

export default useNHLDataManager;
