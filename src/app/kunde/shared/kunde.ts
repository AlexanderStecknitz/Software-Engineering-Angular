import type { Temporal } from '@js-temporal/polyfill';

export type GeschlechtType = 'DIVERS' | 'MAENNLICH' | 'WEIBLICH';

export const EMAIL_REGEX = /@.*?\./u;

export type Familienstand =
    | 'GESCHIEDEN'
    | 'LEDIG'
    | 'VERHEIRATET'
    | 'VERWITWET';

export type InteresseType = 'L' | 'R' | 'S';

export interface Umsatz {
    betrag: bigint;
    waehrung: string;
}

export interface User {
    username: string;
    password: string;
}

export interface Adresse {
    plz: string;
    ort: string;
}

export interface Kunde {
    id?: string;
    version?: number;
    nachname: string;
    email: string;
    kategorie: number;
    newsletter: boolean;
    geburtsdatum: Temporal.PlainDate | undefined;
    homepage: URL | undefined;
    geschlecht: GeschlechtType | undefined;
    familienstand: Familienstand | undefined;
    interessen: string[] | undefined;
    umsatz: Umsatz | undefined;
    adresse: Adresse;
}

export interface KundeShared {
    nachname: string;
    email: string;
    kategorie: number;
    newsletter: boolean;
    adresse: Adresse;
}
