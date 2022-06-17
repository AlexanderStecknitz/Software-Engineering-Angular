import { Component, Output } from '@angular/core';
import type { MatCheckboxChange } from '@angular/material/checkbox';
import { Subject } from 'rxjs';
import log from 'loglevel';

@Component({
    selector: 'hs-suche-interessen',
    templateUrl: './suche-interessen.component.html',
    styleUrls: ['../suchformular.component.scss'],
})
export class SucheInteressenComponent {
    lesen = false;

    sport = false;

    reisen = false;

    @Output()
    readonly lesen$ = new Subject<boolean>();

    @Output()
    readonly sport$ = new Subject<boolean>();

    @Output()
    readonly reisen$ = new Subject<boolean>();

    constructor() {
        log.debug('SucheInteressenComponent.constructor()');
    }

    onChangeLesen(event: MatCheckboxChange) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-reisen
        log.debug(
            `SucheInteressenComponent.onChangeLesen: checked=${event.checked}`,
        );
        this.lesen$.next(event.checked);
    }

    onChangeSport(event: MatCheckboxChange) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-reisen
        log.debug(
            `SucheInteressenComponent.onChangeSport: checked=${event.checked}`,
        );
        this.sport$.next(event.checked);
    }

    onChangeReisen(event: MatCheckboxChange) {
        log.debug(
            `SucheInteressenComponent.onChangeReisen: checked=${event.checked}`,
        );
        this.reisen$.next(event.checked);
    }
}
