// To parse this data:
//
//   import { Convert } from "./file";
//
//   const gameStream = Convert.toGameStream(json);

export interface GameStream {
    id?:                        string;
    active?:                    boolean;
    countryCode?:               string;
    countryName?:               string;
    streamingName?:             StreamingName;
    streamingSiteUrl?:          string;
    streamingLogoUrl?:          string;
    primaryBroadcastName?:      string;
    primaryBroadcastSiteUrl?:   string;
    primaryBroadcastLogoUrl?:   string;
    secondaryBroadcastName?:    string;
    secondaryBroadcastSiteUrl?: string;
    secondaryBroadcastLogoUrl?: string;
}

export enum StreamingName {
    Disney = "Disney+",
    DisneyPlus = "Disney Plus",
    ESPNPlay = "ESPN Play",
    Empty = "",
    Espn = "ESPN+",
    NHLLive = "NHL Live",
    NhlTvIntl = "NHL.TV INTL",
    Tv24 = "TV24",
    Tv3 = "TV3",
    Viaplay = "Viaplay",
}

// Converts JSON strings to/from your types
export class Convert {
    public static toGameStream(json: string): GameStream[] {
        return JSON.parse(json);
    }

    public static gameStreamToJson(value: GameStream[]): string {
        return JSON.stringify(value);
    }
}
