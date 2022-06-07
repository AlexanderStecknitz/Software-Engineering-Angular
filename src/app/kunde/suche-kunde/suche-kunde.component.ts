// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, OnInit } from '@angular/core';
import { FindError, Kunde, KundeReadService, Suchkriterien } from '../shared';
import { first, tap } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import log from 'loglevel';

@Component({
    selector: 'hs-suche-kunde',
    templateUrl: './suche-kunde.component.html',
})
export class SucheKundenComponent implements OnInit {
    waiting = false;

    kunden: Kunde[] = [];

    errorMsg: string | undefined;

    // Wird von der JS-Engine aufgerufen
    constructor(
        private readonly kundeService: KundeReadService,
        private readonly titleService: Title,
    ) {
        log.debug('SucheKundenComponent.constructor()');
    }

    // Wird von Angular aufgerufen, wenn der DOM-Baum fertig ist,
    // d.h. nach dem "Rendering".
    // Wird immer generiert, wenn Angular-CLI genutzt wird.
    ngOnInit() {
        this.titleService.setTitle('Suche');
    }

    /**
     * Das Attribut <code>suchkriterien</code> wird auf den Wert des Ereignisses
     * <code>$suchkriterien</code> vom Typ Suchkriterien gesetzt. Diese Methode
     * wird aufgerufen, wenn in der Kindkomponente f&uuml;r
     * <code>hs-suchformular</code> das Ereignis ausgel&ouml;st wird.
     *
     * @param suchkriterien f&uuml;r die Suche.
     */
    suchen(suchkriterien: Suchkriterien) {
        log.debug(
            'SucheKundenComponent.suchen(): suchkriterien=',
            suchkriterien,
        );

        this.kunden = [];
        this.errorMsg = undefined;

        this.waiting = true;

        // Observable: mehrere Werte werden "lazy" bereitgestellt, statt in einem JSON-Array
        // pipe ist eine "pure" Funktion, die ein Observable in ein NEUES Observable transformiert
        this.kundeService
            .find(suchkriterien) // eslint-disable-line unicorn/no-array-callback-reference
            .pipe(
                first(),
                tap(result => this.#setProps(result)),
            )
            .subscribe();
    }

    #setProps(result: FindError | Kunde[]) {
        this.waiting = false;

        if (result instanceof FindError) {
            this.#handleFindError(result);
            return;
        }

        this.kunden = result;
        log.debug('SucheKundenComponent.setProps(): kunden=', this.kunden);
    }

    #handleFindError(err: FindError) {
        const { statuscode } = err;
        log.debug(
            `SucheKundenComponent.handleError(): statuscode=${statuscode}`,
        );

        switch (statuscode) {
            case HttpStatusCode.NotFound:
                this.errorMsg = 'Keine Bücher gefunden.';
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

        log.debug(
            'SucheKundenComponent.#setErrorMsg: errorMsg=',
            this.errorMsg,
        );
    }
}
