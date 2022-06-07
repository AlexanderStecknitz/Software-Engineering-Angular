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
import {
    type Familienstand,
    type GeschlechtType,
    type InteresseType,
    type Kunde,
    type KundeShared,
    type Umsatz,
} from '../shared';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

/**
 * Daten aus einem Formular:
 * <ul>
 *  <li> je 1 Control fuer jede Checkbox und
 *  <li> au&szlig;erdem Strings f&uuml;r Eingabefelder f&uuml;r Zahlen.
 * </ul>
 */
export interface KundeForm extends KundeShared {
    geschlecht: GeschlechtType;
    geburtsdatum: Date;
    homepage: URL;
    familienstand: Familienstand;
    umsatz: Umsatz;
    interessen: Set<InteresseType>;
}

/**
 * Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
 * @param kunde JSON-Objekt mit Daten vom Formular
 * @return Das initialisierte Kunde-Objekt
 */
export const toKunde = (kundeForm: KundeForm) => {
    log.debug('toKunde: kundeForm=', kundeForm);

    const {
        nachname,
        email,
        kategorie,
        newsletter,
        geschlecht,
        geburtsdatum,
        postleitzahl,
        homepage,
        familienstand,
        umsatz,
        interessen,
        username,
    } = kundeForm;

    const datumTemporal = new Temporal.PlainDate(
        geburtsdatum.getFullYear(),
        geburtsdatum.getMonth() + 1,
        geburtsdatum.getDate(),
    );
    log.debug('toBuch: datumTemporal=', datumTemporal);

    const kunde: Kunde = {
        nachname,
        email,
        kategorie,
        newsletter,
        geschlecht,
        geburtsdatum: datumTemporal,
        postleitzahl,
        homepage,
        familienstand,
        umsatz,
        interessen,
        username,
        version: 0,
    };
    log.debug('toKunde: kunde=', kunde);
    return kunde;
};
