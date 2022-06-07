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

import { ActivatedRoute, Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
    type Buch,
    type BuchArt,
    BuchReadService,
    BuchWriteService,
    FindError,
    UpdateError,
    type Verlag,
} from '../shared';
/* eslint-enable @typescript-eslint/consistent-type-imports */
import { Component, type OnInit } from '@angular/core';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { first, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-buch</code>
 */
@Component({
    selector: 'hs-update-buch',
    templateUrl: './update-buch.component.html',
})
export class UpdateBuchComponent implements OnInit {
    buch: Buch | undefined;

    readonly updateForm = new FormGroup({});

    errorMsg: string | undefined;

    // eslint-disable-next-line max-params
    constructor(
        private readonly service: BuchWriteService,
        private readonly readService: BuchReadService,
        private readonly titleService: Title,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {
        log.debug('UpdateBuchComponent.constructor()');
    }

    ngOnInit() {
        // Pfad-Parameter aus /buecher/:id/update
        const id = this.route.snapshot.paramMap.get('id') ?? undefined;

        this.readService
            .findById(id)
            .pipe(
                first(),
                tap(result => {
                    this.#setProps(result);
                    log.debug('UpdateBuchComponent.ngOnInit: buch=', this.buch);
                }),
            )
            .subscribe();
    }

    /**
     * Die aktuellen Stammdaten f&uuml;r das angezeigte Buch-Objekt
     * zur&uuml;ckschreiben.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    onSubmit() {
        if (this.updateForm.pristine || this.buch === undefined) {
            log.debug('UpdateBuchComponent.onSubmit: keine Aenderungen');
            return;
        }

        const { titel } = this.updateForm.value as { titel: string };
        const { art } = this.updateForm.value as { art: BuchArt };
        const { verlag } = this.updateForm.value as {
            verlag: Verlag | '' | undefined;
        };
        const { rating } = this.updateForm.value as { rating: number };
        const { isbn } = this.updateForm.value as { isbn: string };

        const { buch, service } = this;

        // datum, preis und rabatt koennen im Formular nicht geaendert werden
        buch.titel = titel;
        buch.art = art;
        buch.verlag = verlag;
        buch.rating = rating;
        buch.isbn = isbn;
        log.debug('UpdateBuchComponent.onSubmit: buch=', buch);

        service
            .update(buch)
            .pipe(
                first(),
                tap(result => this.#handleUpdateResult(result)),
            )
            .subscribe({ next: () => this.#navigateHome() });

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite
        return false;
    }

    #setProps(result: Buch | FindError) {
        if (result instanceof FindError) {
            this.#handleFindError(result);
            return;
        }

        this.buch = result;
        this.errorMsg = undefined;

        const titel = `Aktualisieren ${this.buch.id}`;
        this.titleService.setTitle(titel);
    }

    #handleFindError(err: FindError) {
        const { statuscode } = err;
        log.debug('UpdateBuchComponent.#handleError: statuscode=', statuscode);

        this.buch = undefined;

        switch (statuscode) {
            case HttpStatusCode.NotFound:
                this.errorMsg = 'Kein Buch gefunden.';
                break;
            case HttpStatusCode.TooManyRequests:
                this.errorMsg =
                    'Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.';
                break;
            case HttpStatusCode.GatewayTimeout:
                this.errorMsg = 'Ein interner Fehler ist aufgetreten.';
                log.error('Laeuft der Appserver? Port-Forwarding?');
                break;
            default:
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.';
                break;
        }
    }

    #handleUpdateResult(result: Buch | UpdateError) {
        if (!(result instanceof UpdateError)) {
            return;
        }

        const { statuscode } = result;
        log.debug(
            'UpdateStammdatenComponent.#handleError: statuscode=',
            statuscode,
        );

        switch (statuscode) {
            case HttpStatusCode.UnprocessableEntity: {
                const { cause } = result;
                // TODO Aufbereitung der Fehlermeldung: u.a. Anfuehrungszeichen
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.errorMsg =
                    cause instanceof HttpErrorResponse
                        ? cause.error
                        : JSON.stringify(cause);
                break;
            }
            case HttpStatusCode.TooManyRequests:
                this.errorMsg =
                    'Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.';
                break;
            case HttpStatusCode.GatewayTimeout:
                this.errorMsg = 'Ein interner Fehler ist aufgetreten.';
                log.error('Laeuft der Appserver? Port-Forwarding?');
                break;
            default:
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.';
                break;
        }

        log.debug(
            'UpdateStammdatenComponent.#handleError: errorMsg=',
            this.errorMsg,
        );
    }

    async #navigateHome() {
        await this.router.navigate(['/']);
    }
}
