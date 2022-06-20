/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import type {
    Familienstand,
    GeschlechtType,
    Kunde,
    KundeShared,
    Umsatz,
} from './kunde';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

interface Link {
    href: string;
}

/**
 * Daten vom und zum REST-Server:
 * <ul>
 *  <li> Arrays f&uuml;r mehrere Werte, die in einem Formular als Checkbox
 *       dargestellt werden.
 *  <li> Daten mit Zahlen als Datentyp, die in einem Formular nur als
 *       String handhabbar sind.
 * </ul>
 */
export interface KundeServer extends KundeShared {
    geschlecht?: GeschlechtType;
    geburtsdatum?: string;
    homepage?: URL;
    familienstand?: Familienstand;
    umsatz?: Umsatz;
    interessen?: string[];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _links?: {
        self: Link;
        list?: Link;
        add?: Link;
        update?: Link;
        remove?: Link;
    };
}

/**
 * Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
 * Service kommen.
 * @param kunde JSON-Objekt mit Daten vom RESTful Web Server
 * @return Das initialisierte Kunde-Objekt
 */
// eslint-disable-next-line max-lines-per-function
export const toKunde = (kundeServer: KundeServer, etag?: string) => {
    let selfLink: string | undefined;
    const { _links } = kundeServer; // eslint-disable-line @typescript-eslint/naming-convention
    if (_links !== undefined) {
        const { self } = _links;
        selfLink = self.href;
    }
    let id: string | undefined;
    if (selfLink !== undefined) {
        const lastSlash = selfLink.lastIndexOf('/');
        id = selfLink.slice(lastSlash + 1);
    }

    let version: number | undefined;
    if (etag !== undefined) {
        // Anfuehrungszeichen am Anfang und am Ende entfernen
        const versionStr = etag.slice(1, -1);
        version = Number.parseInt(versionStr, 10);
    }

    const {
        nachname,
        email,
        kategorie,
        newsletter,
        geschlecht,
        geburtsdatum,
        adresse,
        homepage,
        familienstand,
        umsatz,
        interessen,
    } = kundeServer;

    let datumTemporal: Temporal.PlainDate | undefined;
    // TODO Parsing, ob der Datum-String valide ist
    if (geburtsdatum !== undefined) {
        const [yearStr, monthStr, dayStr] = geburtsdatum
            .replace(/T.*/gu, '')
            .split('-');
        const year = Number(yearStr);
        const month = Number(monthStr);
        const day = Number(dayStr);
        datumTemporal = new Temporal.PlainDate(year, month, day);
    }

    const kunde: Kunde = {
        id,
        nachname,
        email,
        kategorie,
        newsletter,
        geschlecht,
        geburtsdatum: datumTemporal,
        adresse,
        homepage,
        familienstand,
        umsatz,
        interessen,
        version,
    };
    log.debug('Kunde.fromServer: kunde=', kunde);
    return kunde;
};

/**
 * Konvertierung des Kundeobjektes in ein JSON-Objekt f&uuml;r den RESTful
 * Web Service.
 * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
 */
export const toKundeServer = (kunde: Kunde): KundeServer => {
    const geburtsdatum =
        kunde.geburtsdatum === undefined
            ? undefined
            : kunde.geburtsdatum.toString();
    return {
        nachname: kunde.nachname,
        email: kunde.email,
        kategorie: kunde.kategorie,
        newsletter: kunde.newsletter,
        geschlecht: kunde.geschlecht,
        geburtsdatum,
        adresse: kunde.adresse,
        homepage: kunde.homepage,
        familienstand: kunde.familienstand,
        umsatz: kunde.umsatz,
        interessen: kunde.interessen,
    };
};
