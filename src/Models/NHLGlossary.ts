// To parse this data:
//
//   import { Convert, NHLGlossary } from "./file";
//
//   const nHLGlossary = Convert.toNHLGlossary(json);

export interface NHLGlossary {
    data?:  Datum[];
    total?: number;
}

export interface Datum {
    abbreviation?:       string;
    definition?:         string;
    firstSeasonForStat?: number | null;
    fullName?:           string;
    id?:                 number;
    languageCode?:       LanguageCode;
    lastUpdated?:        Date;
}

export enum LanguageCode {
    En = "en",
}

// Converts JSON strings to/from your types
export class Convert {
    public static toNHLGlossary(json: string): NHLGlossary {
        return JSON.parse(json);
    }

    public static nHLGlossaryToJson(value: NHLGlossary): string {
        return JSON.stringify(value);
    }
}
