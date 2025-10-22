// To parse this data:
//
//   import { Convert } from "./file";
//
//   const scores = Convert.toScores(json);

export interface Scores {
    date?:  DateClass;
    games?: Game[];
}

export interface DateClass {
    raw?:    string;
    pretty?: string;
}

export interface Game {
    status?:       Status;
    startTime?:    string; // ISO string from API
    goals?:        any[];
    links?:        Links;
    scores?:       { [key: string]: number };
    teams?:        Teams;
    preGameStats?: Stats;
    currentStats?: Stats;
    isSaved: boolean;
}

export interface Stats {
    records?:   { [key: string]: Record };
    streaks?:   { [key: string]: Streak | null };
    standings?: { [key: string]: Standing };
}

export interface Record {
    wins?:   number;
    losses?: number;
    ot?:     number;
}

export interface Standing {
    divisionRank?:          string;
    conferenceRank?:        string;
    leagueRank?:            string;
    pointsFromPlayoffSpot?: string;
}

export interface Streak {
    type?:  Type;
    count?: number;
}

export enum Type {
    Losses = "LOSSES",
    Ot = "OT",
    WINS = "WINS",
}

export interface Links {
    gameCenter?: string;
}

export interface Status {
    state?: State;
}

export enum State {
    Preview = "PREVIEW",
}

export interface Teams {
    away?: Away;
    home?: Away;
}

export interface Away {
    abbreviation?: string;
    id?:           number;
    locationName?: string;
    shortName?:    string;
    teamName?:     string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toScores(json: string): Scores[] {
        return JSON.parse(json);
    }

    public static scoresToJson(value: Scores[]): string {
        return JSON.stringify(value);
    }
}
