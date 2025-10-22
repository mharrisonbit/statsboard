// To parse this data:
//
//   import { Convert, NHLGameListing } from "./file";
//
//   const nHLGameListing = Convert.toNHLGameListing(json);

export interface NHLGameListing {
    broadcasts?: Broadcast[];
    date?:       Date;
    endDate?:    Date;
    startDate?:  Date;
}

export interface Broadcast {
    broadcastImageUrl?: BroadcastImageURL;
    broadcastStatus?:   BroadcastStatus;
    broadcastType?:     BroadcastType;
    description?:       string;
    durationSeconds?:   number;
    endTime?:           Date;
    houseNumber?:       string;
    startTime?:         Date;
    title?:             string;
}

export enum BroadcastImageURL {
    NhlPNG = "nhl.png",
    NhlnetworkPNG = "nhlnetwork.png",
}

export enum BroadcastStatus {
    Empty = "",
    Live = "LIVE",
}

export enum BroadcastType {
    HD = "HD",
}

// Converts JSON strings to/from your types
export class Convert {
    public static toNHLGameListing(json: string): NHLGameListing {
        return JSON.parse(json);
    }

    public static nHLGameListingToJson(value: NHLGameListing): string {
        return JSON.stringify(value);
    }
}
