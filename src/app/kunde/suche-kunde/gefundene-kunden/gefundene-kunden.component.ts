/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable max-classes-per-file */
/* eslint-disable sort-imports */
import { AuthService, ROLLE_ADMIN } from '../../../auth/auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    type Kunde,
    KundeReadService,
    RemoveError,
    KundeWriteService,
} from '../../shared';
import { Component, Input, type OnInit } from '@angular/core';
import { easeIn, easeOut } from '../../../shared';
import { first, tap } from 'rxjs/operators';
import { NgLocalization } from '@angular/common';
import { Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Subject } from 'rxjs';
import log from 'loglevel';

@Component({
    selector: 'hs-gefundene-kunden',
    templateUrl: './gefundene-kunden.component.html',
    styleUrls: ['./gefundene-kunden.component.scss'],
    animations: [easeIn, easeOut],
})
export class GefundeneKundenComponent implements OnInit {
    // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
    // eine Flux-Bibliothek wie beispielsweise Redux http://redux.js.org

    // Property Binding: <hs-gefundene-kunden [buecher]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    kunden: Kunde[] = [];

    isAdmin!: boolean;

    // nachtraegliches Einloggen mit der Rolle "admin" beobachten
    isAdmin$ = new Subject<boolean>();

    displayedColumns: string[] = [
        'nachname',
        'familienstand',
        'geschlecht',
        'interessen',
        'update',
    ];

    // Parameter Properties (Empfehlung: Konstruktor nur fuer DI)
    // eslint-disable-next-line max-params
    constructor(
        private readonly service: KundeReadService,
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly writeService: KundeWriteService,
    ) {
        log.debug('GefundeneKundenComponent.constructor()');
    }

    // Attribute mit @Input() sind undefined im Konstruktor.
    // Methode zum "LifeCycle Hook" OnInit: wird direkt nach dem Konstruktor
    // aufgerufen.
    // Weitere Methoden zum Lifecycle: ngAfterViewInit(), ngAfterContentInit()
    // https://angular.io/docs/ts/latest/guide/cheatsheet.html
    // Die Ableitung vom Interface OnInit ist nicht notwendig, aber erleichtert
    // IntelliSense bei der Verwendung von TypeScript.
    ngOnInit() {
        log.debug('GefundeneKundenComponent.ngOnInit()');
        this.isAdmin = this.authService.isAdmin;

        this.authService.rollen$
            .pipe(
                first(),
                tap((rollen: string[]) =>
                    // ein neues Observable vom Typ boolean
                    this.isAdmin$.next(rollen.includes(ROLLE_ADMIN)),
                ),
            )
            // das Subject von AuthService abonnieren bzw. beobachten
            .subscribe();
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Kunde in der Detailsseite anzeigen.
     * @param kunde Das ausgew&auml;hlte Kunde
     */
    onClick(kunde: Kunde) {
        log.debug('GefundeneBuecherComponent.onClick: kunde=', kunde);

        // URL mit der Kunde-ID, um ein Bookmark zu ermoeglichen
        // Gefundenes Kunde als NavigationExtras im Router puffern
        const state = { kunde };
        return this.router.navigate([`/kunden/${kunde.id}`], { state });
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Kunde l&ouml;schen.
     * @param kunde Das ausgew&auml;hlte Kunde
     */
    onRemove(kunde: Kunde) {
        log.debug('GefundeneBuecherComponent.onRemove: kunde=', kunde);

        return this.writeService
            .remove(kunde)
            .pipe(
                first(),
                tap(result => {
                    if (result instanceof RemoveError) {
                        log.debug(
                            'GefundeneBuecherComponent.onRemove: statuscode=',
                            result.statuscode,
                        );
                        return;
                    }

                    this.kunden = this.kunden.filter(k => k.id !== kunde.id);
                }),
            )
            .subscribe();
    }

    trackBy(_index: number, kunde: Kunde) {
        return kunde.id;
    }
}

export class AnzahlLocalization extends NgLocalization {
    getPluralCategory(count: number) {
        return count === 1 ? 'single' : 'multi';
    }
}
