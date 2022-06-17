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
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Familienstand, GeschlechtType, type Kunde } from './kunde';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    HttpClient,
    type HttpErrorResponse,
    HttpParams,
    type HttpResponse,
    // eslint-disable-next-line import/no-unresolved
} from '@angular/common/http';
import { type KundeServer, toKunde } from './kundeServer';
import { type Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { FindError } from './errors';
import { Injectable } from '@angular/core';
import log from 'loglevel';
import { paths } from '../../shared';

export interface Suchkriterien {
    nachname: string;
    geschlechtType: GeschlechtType | '';
    familienstand: Familienstand | '';
    interessen: { sport: boolean; lesen: boolean; reisen: boolean };
}

// Todo: Suchkriterien wurden noch nicht eingefügt.

export interface KundenServer {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _embedded: {
        kunden: KundeServer[];
    };
}

// Methoden der Klasse HttpClient
//  * get(url, options) – HTTP GET request
//  * post(url, body, options) – HTTP POST request
//  * put(url, body, options) – HTTP PUT request
//  * patch(url, body, options) – HTTP PATCH request
//  * delete(url, options) – HTTP DELETE request

// Eine Service-Klasse ist eine "normale" Klasse gemaess ES 2015, die mittels
// DI in eine Komponente injiziert werden kann, falls sie innerhalb von
// provider: [...] bei einem Modulbereitgestellt wird.
// Eine Komponente realisiert gemaess MVC-Pattern den Controller und die View.
// Die Anwendungslogik wird vom Controller an Service-Klassen delegiert.
// Service:
// - wiederverwendbarer Code: in ggf. verschiedenen Controller
// - Zugriff auf Daten, z.B. durch Aufruf von RESTful Web Services
// - View (HTML-Template) <- Controller <- Service
// https://angular.io/guide/singleton-services

/**
 * Die Service-Klasse zu B&uuml;cher wird zum "Root Application Injector"
 * hinzugefuegt und ist in allen Klassen der Webanwendung verfuegbar.
 */
@Injectable({ providedIn: 'root' })
export class KundeReadService {
    readonly #baseUrl = paths.api;

    /**
     * @param httpClient injizierter Service HttpClient (von Angular)
     * @return void
     */
    constructor(private readonly httpClient: HttpClient) {
        log.debug('KundeReadService.constructor: baseUrl=', this.#baseUrl);
    }

    /**
     * Kunden anhand von Suchkriterien suchen
     * @param suchkriterien Die Suchkriterien
     * @returns Gefundene Kunden oder Statuscode des fehlerhaften GET-Requests
     */
    find(
        suchkriterien: Suchkriterien | undefined = undefined, // eslint-disable-line unicorn/no-useless-undefined
    ): Observable<FindError | Kunde[]> {
        log.debug('KundeService.find(): suchkriterien=', suchkriterien);
        const params = this.suchkriterienToHttpParams(suchkriterien);
        const url = this.#baseUrl;
        log.debug(`KundeService.find(): url=${url}`);

        return (
            this.httpClient
                .get<KundenServer>(url, { params })

                // Observable: mehrere Werte werden "lazy" bereitgestellt, statt in einem JSON-Array
                // pipe ist eine "pure" Funktion, die ein Observable in ein NEUES Observable transformiert
                .pipe(
                    first(),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    catchError((err: unknown, _$) =>
                        of(this.#buildFindError(err as HttpErrorResponse)),
                    ),

                    // entweder Observable<KundeServer[]> oder Observable<FindError>
                    map(result => this.#toKundeArrayOrError(result)),
                )
        );

        // Same-Origin-Policy verhindert Ajax-Datenabfragen an einen Server in
        // einer anderen Domain. JSONP (= JSON mit Padding) ermoeglicht die
        // Uebertragung von JSON-Daten ueber Domaingrenzen.
        // Falls benoetigt, gibt es in Angular dafuer den Service Jsonp.
    }

    /**
     * Ein Kunde anhand der ID suchen
     * @param id Die ID des gesuchten Kundes
     */
    findById(id: string | undefined): Observable<FindError | Kunde> {
        log.debug('KundeReadService.findById: id=', id);

        if (id === undefined) {
            log.debug('KundeReadService.findById: Keine Id');
            return of(this.#buildFindError());
        }

        // wegen fehlender Versionsnummer (im ETag) nachladen
        const url = `${this.#baseUrl}/${id}`;
        log.debug('KundeReadService.findById: url=', url);

        return (
            this.httpClient
                /* eslint-disable object-curly-newline */
                .get<KundeServer>(url, {
                    observe: 'response',
                })
                /* eslint-enable object-curly-newline */

                .pipe(
                    // 1 Datensatz empfangen und danach implizites "unsubscribe"
                    first(),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    catchError((err: unknown, _$) => {
                        const errResponse = err as HttpErrorResponse;
                        return of(this.#buildFindError(errResponse));
                    }),

                    // entweder Observable<HttpResponse<KundeServer>> oder Observable<FindError>
                    map(restResult => this.#toKundeOrError(restResult)),
                )
        );
    }

    #toKundeArrayOrError(res: FindError | KundenServer): FindError | Kunde[] {
        if (res instanceof FindError) {
            return res;
        }
        // eslint-disable-next-line no-underscore-dangle
        const kunden = res._embedded.kunden.map(kundeServer =>
            toKunde(kundeServer),
        );
        log.debug('KundeService.mapFindResult(): kunden=', kunden);
        return kunden;
    }

    #toKundeOrError(
        restResult: FindError | HttpResponse<KundeServer>,
    ): FindError | Kunde {
        if (restResult instanceof FindError) {
            return restResult;
        }

        const { body, headers } = restResult;
        if (body === null) {
            return this.#buildFindError();
        }

        const etag = headers.get('ETag') ?? undefined;
        log.debug('KundeReadService.#toKundeOrError: etag=', etag);

        const kunde = toKunde(body, etag);
        return kunde;
    }

    /**
     * Suchkriterien in Request-Parameter konvertieren.
     * @param suchkriterien Suchkriterien fuer den GET-Request.
     * @return Parameter fuer den GET-Request
     */
    private suchkriterienToHttpParams(
        suchkriterien: Suchkriterien | undefined,
    ): HttpParams {
        log.debug(
            'KundeService.suchkriterienToHttpParams(): suchkriterien=',
            suchkriterien,
        );
        let httpParams = new HttpParams();

        if (suchkriterien === undefined) {
            return httpParams;
        }

        const { nachname, geschlechtType, familienstand, interessen } =
            suchkriterien;
        const { sport, lesen, reisen } = interessen;

        if (nachname !== '') {
            httpParams = httpParams.set('nachname', nachname);
        }
        if (familienstand !== '') {
            httpParams = httpParams.set('familienstand', familienstand);
        }
        if (geschlechtType !== '') {
            httpParams = httpParams.set('geschlecht', geschlechtType);
        }
        if (sport) {
            httpParams = httpParams.set('interesse', 'S');
        }
        if (lesen) {
            httpParams = httpParams.set('interesse', 'L');
        }
        if (reisen) {
            httpParams = httpParams.set('interesse', 'R');
        }
        return httpParams;
    }

    #buildFindError(err?: HttpErrorResponse) {
        if (err === undefined) {
            return new FindError(-1);
        }

        if (err.error instanceof ProgressEvent) {
            const msg = 'Client-seitiger oder Netzwerkfehler';
            log.error(msg, err.error);
            return new FindError(-1, err);
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { status, error } = err;
        log.debug(
            'KundeReadService.#buildFindError: status / Response-Body=',
            status,
            error,
        );
        return new FindError(status, err);
    }
}
