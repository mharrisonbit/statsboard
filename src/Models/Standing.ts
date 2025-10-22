// To parse this data:
//
//   import { Convert, Standings } from "./file";
//
//   const standings = Convert.toStandings(json);

export interface Standings {
    wildCardIndicator?: boolean;
    standings?:         Standing[];
}

export interface Standing {
    conferenceAbbrev?:         ConferenceAbbrev;
    conferenceHomeSequence?:   number;
    conferenceL10Sequence?:    number;
    conferenceName?:           ConferenceName;
    conferenceRoadSequence?:   number;
    conferenceSequence?:       number;
    date?:                     Date;
    divisionAbbrev?:           DivisionAbbrev;
    divisionHomeSequence?:     number;
    divisionL10Sequence?:      number;
    divisionName?:             DivisionName;
    divisionRoadSequence?:     number;
    divisionSequence?:         number;
    gameTypeId?:               number;
    gamesPlayed?:              number;
    goalDifferential?:         number;
    goalDifferentialPctg?:     number;
    goalAgainst?:              number;
    goalFor?:                  number;
    goalsForPctg?:             number;
    homeGamesPlayed?:          number;
    homeGoalDifferential?:     number;
    homeGoalsAgainst?:         number;
    homeGoalsFor?:             number;
    homeLosses?:               number;
    homeOtLosses?:             number;
    homePoints?:               number;
    homeRegulationPlusOtWins?: number;
    homeRegulationWins?:       number;
    homeTies?:                 number;
    homeWins?:                 number;
    l10GamesPlayed?:           number;
    l10GoalDifferential?:      number;
    l10GoalsAgainst?:          number;
    l10GoalsFor?:              number;
    l10Losses?:                number;
    l10OtLosses?:              number;
    l10Points?:                number;
    l10RegulationPlusOtWins?:  number;
    l10RegulationWins?:        number;
    l10Ties?:                  number;
    l10Wins?:                  number;
    leagueHomeSequence?:       number;
    leagueL10Sequence?:        number;
    leagueRoadSequence?:       number;
    leagueSequence?:           number;
    losses?:                   number;
    otLosses?:                 number;
    placeName?:                Name;
    pointPctg?:                number;
    points?:                   number;
    regulationPlusOtWinPctg?:  number;
    regulationPlusOtWins?:     number;
    regulationWinPctg?:        number;
    regulationWins?:           number;
    roadGamesPlayed?:          number;
    roadGoalDifferential?:     number;
    roadGoalsAgainst?:         number;
    roadGoalsFor?:             number;
    roadLosses?:               number;
    roadOtLosses?:             number;
    roadPoints?:               number;
    roadRegulationPlusOtWins?: number;
    roadRegulationWins?:       number;
    roadTies?:                 number;
    roadWins?:                 number;
    seasonId?:                 number;
    shootoutLosses?:           number;
    shootoutWins?:             number;
    streakCode?:               StreakCode;
    streakCount?:              number;
    teamName?:                 Name;
    teamCommonName?:           Name;
    teamAbbrev?:               TeamAbbrev;
    teamLogo?:                 string;
    ties?:                     number;
    waiversSequence?:          number;
    wildcardSequence?:         number;
    winPctg?:                  number;
    wins?:                     number;
}

export enum ConferenceAbbrev {
    E = "E",
    W = "W",
}

export enum ConferenceName {
    Eastern = "Eastern",
    Western = "Western",
}

export enum DivisionAbbrev {
    A = "A",
    C = "C",
    M = "M",
    P = "P",
}

export enum DivisionName {
    Atlantic = "Atlantic",
    Central = "Central",
    Metropolitan = "Metropolitan",
    Pacific = "Pacific",
}

export interface Name {
    default?: string;
    fr?:      string;
}

export enum StreakCode {
    L = "L",
    Ot = "OT",
    W = "W",
}

export interface TeamAbbrev {
    default?: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toStandings(json: string): Standings {
        return JSON.parse(json);
    }

    public static standingsToJson(value: Standings): string {
        return JSON.stringify(value);
    }
}
