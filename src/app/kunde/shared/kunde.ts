import type { Temporal } from '@js-temporal/polyfill';

export type GeschlechtType = 'DIVERS' | 'MAENNLICH' | 'WEIBLICH';

export const EMAIL_REGEX = /@.*?\./u;

export type Familienstand =
    | 'GESCHIEDEN'
    | 'LEDIG'
    | 'VERHEIRATET'
    | 'VERWITWET';

export type InteresseType = 'LESEN' | 'REISEN' | 'SPORT';

export interface Umsatz {
    id?: string;
    betrag: bigint;
    waehrung: string;
}

export interface Adresse {
    id?: string;
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
    interessen: Set<InteresseType> | undefined;
    umsatz: Umsatz | undefined;
    postleitzahl: Adresse;
    username: string;
}

export interface KundeShared {
    nachname: string;
    email: string;
    kategorie: number;
    newsletter: boolean;
    postleitzahl: Adresse;
    username: string;
}
