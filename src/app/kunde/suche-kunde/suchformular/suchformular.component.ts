// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/consistent-type-imports */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable sort-imports */
import { Familienstand, GeschlechtType, Suchkriterien } from '../../shared';
import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import log from 'loglevel';
@Component({
    selector: 'hs-suchformular',
    templateUrl: './suchformular.component.html',
    styleUrls: ['./suchformular.component.scss'],
})
export class SuchformularComponent {
    @Output()
    readonly suchkriterien$ = new Subject<Suchkriterien>();

    #nachname = '';

    #geschlechtType: GeschlechtType | '' = '';

    #familienstand: Familienstand | '' = '';

    #reisen = false;

    #sport = false;

    #lesen = false;

    // DI: Constructor Injection (React hat uebrigens keine DI)
    // Empfehlung: Konstruktor nur fuer DI
    constructor() {
        log.debug('SuchformularComponent.constructor()');
    }

    setNachname(nachname: string) {
        log.debug('SuchformularComponent.setNachname', nachname);
        this.#nachname = nachname;
    }

    setGeschlechtType(geschlechtType: GeschlechtType | '') {
        log.debug('SuchformularComponent.setGeschlechtType', geschlechtType);
        this.#geschlechtType = geschlechtType;
    }

    setFamilienstand(familienstand: Familienstand | '') {
        log.debug('SuchformularComponent.setFamilienstand', familienstand);
        this.#familienstand = familienstand;
    }

    setLesen(isChecked: boolean) {
        log.debug('SuchformularComponent.setLesen', isChecked);
        this.#lesen = isChecked;
    }

    setReisen(isChecked: boolean) {
        log.debug('SuchformularComponent.setReisen', isChecked);
        this.#reisen = isChecked;
    }

    setSport(isChecked: boolean) {
        log.debug('SuchformularComponent.setSport', isChecked);
        this.#sport = isChecked;
    }

    /**
     * Suche nach B&uuml;chern, die den spezfizierten Suchkriterien entsprechen
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    onSubmit() {
        log.debug(
            'SuchformularComponent.onSubmit: titel / verlag / art / javascript / typescript',
            this.#nachname,
            this.#geschlechtType,
            this.#familienstand,
            this.#lesen,
            this.#reisen,
            this.#sport,
        );

        this.suchkriterien$.next({
            nachname: this.#nachname,
            geschlechtType: this.#geschlechtType,
            familienstand: this.#familienstand,
            interessen: {
                lesen: this.#lesen,
                reisen: this.#reisen,
                sport: this.#sport,
            },
        });

        // Inspektion der Komponente mit dem Tag-Namen "app" im Debugger
        // Voraussetzung: globale Variable ng deklarieren (s.o.)
        // const app = document.querySelector('app')
        // global.ng.probe(app)

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite.
        return false;
    }
}
