// To parse this data:
//
//   import { Convert, NHLTeamStats } from "./file";
//
//   const nHLTeamStats = Convert.toNHLTeamStats(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface NHLTeamStats {
    season?:   string;
    gameType?: number;
    skaters?:  Skater[];
    goalies?:  Goalie[];
}

export interface Goalie {
    playerId?:            number;
    headshot?:            string;
    firstName?:           StName;
    lastName?:            StName;
    gamesPlayed?:         number;
    gamesStarted?:        number;
    wins?:                number;
    losses?:              number;
    overtimeLosses?:      number;
    goalsAgainstAverage?: number;
    savePercentage?:      number;
    shotsAgainst?:        number;
    saves?:               number;
    goalsAgainst?:        number;
    shutouts?:            number;
    goals?:               number;
    assists?:             number;
    points?:              number;
    penaltyMinutes?:      number;
    timeOnIce?:           number;
}

export interface StName {
    default?: string;
}

export interface Skater {
    playerId?:            number;
    headshot?:            string;
    firstName?:           FirstName;
    lastName?:            LastName;
    positionCode?:        PositionCode;
    gamesPlayed?:         number;
    goals?:               number;
    assists?:             number;
    points?:              number;
    plusMinus?:           number;
    penaltyMinutes?:      number;
    powerPlayGoals?:      number;
    shorthandedGoals?:    number;
    gameWinningGoals?:    number;
    overtimeGoals?:       number;
    shots?:               number;
    shootingPctg?:        number;
    avgTimeOnIcePerGame?: number;
    avgShiftsPerGame?:    number;
    faceoffWinPctg?:      number;
}

export interface FirstName {
    default?: string;
    cs?:      string;
    de?:      string;
    es?:      string;
    fi?:      string;
    sk?:      string;
    sv?:      string;
}

export interface LastName {
    default?: string;
    cs?:      string;
    fi?:      string;
    sk?:      string;
    sv?:      string;
}

export enum PositionCode {
    C = "C",
    D = "D",
    L = "L",
    R = "R",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toNHLTeamStats(json: string): NHLTeamStats {
        return cast(JSON.parse(json), r("NHLTeamStats"));
    }

    public static nHLTeamStatsToJson(value: NHLTeamStats): string {
        return JSON.stringify(uncast(value, r("NHLTeamStats")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "NHLTeamStats": o([
        { json: "season", js: "season", typ: u(undefined, "") },
        { json: "gameType", js: "gameType", typ: u(undefined, 0) },
        { json: "skaters", js: "skaters", typ: u(undefined, a(r("Skater"))) },
        { json: "goalies", js: "goalies", typ: u(undefined, a(r("Goalie"))) },
    ], false),
    "Goalie": o([
        { json: "playerId", js: "playerId", typ: u(undefined, 0) },
        { json: "headshot", js: "headshot", typ: u(undefined, "") },
        { json: "firstName", js: "firstName", typ: u(undefined, r("StName")) },
        { json: "lastName", js: "lastName", typ: u(undefined, r("StName")) },
        { json: "gamesPlayed", js: "gamesPlayed", typ: u(undefined, 0) },
        { json: "gamesStarted", js: "gamesStarted", typ: u(undefined, 0) },
        { json: "wins", js: "wins", typ: u(undefined, 0) },
        { json: "losses", js: "losses", typ: u(undefined, 0) },
        { json: "overtimeLosses", js: "overtimeLosses", typ: u(undefined, 0) },
        { json: "goalsAgainstAverage", js: "goalsAgainstAverage", typ: u(undefined, 3.14) },
        { json: "savePercentage", js: "savePercentage", typ: u(undefined, 3.14) },
        { json: "shotsAgainst", js: "shotsAgainst", typ: u(undefined, 0) },
        { json: "saves", js: "saves", typ: u(undefined, 0) },
        { json: "goalsAgainst", js: "goalsAgainst", typ: u(undefined, 0) },
        { json: "shutouts", js: "shutouts", typ: u(undefined, 0) },
        { json: "goals", js: "goals", typ: u(undefined, 0) },
        { json: "assists", js: "assists", typ: u(undefined, 0) },
        { json: "points", js: "points", typ: u(undefined, 0) },
        { json: "penaltyMinutes", js: "penaltyMinutes", typ: u(undefined, 0) },
        { json: "timeOnIce", js: "timeOnIce", typ: u(undefined, 0) },
    ], false),
    "StName": o([
        { json: "default", js: "default", typ: u(undefined, "") },
    ], false),
    "Skater": o([
        { json: "playerId", js: "playerId", typ: u(undefined, 0) },
        { json: "headshot", js: "headshot", typ: u(undefined, "") },
        { json: "firstName", js: "firstName", typ: u(undefined, r("FirstName")) },
        { json: "lastName", js: "lastName", typ: u(undefined, r("LastName")) },
        { json: "positionCode", js: "positionCode", typ: u(undefined, r("PositionCode")) },
        { json: "gamesPlayed", js: "gamesPlayed", typ: u(undefined, 0) },
        { json: "goals", js: "goals", typ: u(undefined, 0) },
        { json: "assists", js: "assists", typ: u(undefined, 0) },
        { json: "points", js: "points", typ: u(undefined, 0) },
        { json: "plusMinus", js: "plusMinus", typ: u(undefined, 0) },
        { json: "penaltyMinutes", js: "penaltyMinutes", typ: u(undefined, 0) },
        { json: "powerPlayGoals", js: "powerPlayGoals", typ: u(undefined, 0) },
        { json: "shorthandedGoals", js: "shorthandedGoals", typ: u(undefined, 0) },
        { json: "gameWinningGoals", js: "gameWinningGoals", typ: u(undefined, 0) },
        { json: "overtimeGoals", js: "overtimeGoals", typ: u(undefined, 0) },
        { json: "shots", js: "shots", typ: u(undefined, 0) },
        { json: "shootingPctg", js: "shootingPctg", typ: u(undefined, 3.14) },
        { json: "avgTimeOnIcePerGame", js: "avgTimeOnIcePerGame", typ: u(undefined, 3.14) },
        { json: "avgShiftsPerGame", js: "avgShiftsPerGame", typ: u(undefined, 3.14) },
        { json: "faceoffWinPctg", js: "faceoffWinPctg", typ: u(undefined, 3.14) },
    ], false),
    "FirstName": o([
        { json: "default", js: "default", typ: u(undefined, "") },
        { json: "cs", js: "cs", typ: u(undefined, "") },
        { json: "de", js: "de", typ: u(undefined, "") },
        { json: "es", js: "es", typ: u(undefined, "") },
        { json: "fi", js: "fi", typ: u(undefined, "") },
        { json: "sk", js: "sk", typ: u(undefined, "") },
        { json: "sv", js: "sv", typ: u(undefined, "") },
    ], false),
    "LastName": o([
        { json: "default", js: "default", typ: u(undefined, "") },
        { json: "cs", js: "cs", typ: u(undefined, "") },
        { json: "fi", js: "fi", typ: u(undefined, "") },
        { json: "sk", js: "sk", typ: u(undefined, "") },
        { json: "sv", js: "sv", typ: u(undefined, "") },
    ], false),
    "PositionCode": [
        "C",
        "D",
        "L",
        "R",
    ],
};
