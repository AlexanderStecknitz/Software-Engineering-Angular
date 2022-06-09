// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-unresolved */
import { Component, Output } from '@angular/core';
import type { Familienstand } from '../../../shared';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MatSelectChange } from '@angular/material/select';
import { Subject } from 'rxjs';
import log from 'loglevel';

@Component({
    selector: 'hs-suche-familienstand',
    templateUrl: './suche-familienstand.component.html',
    styleUrls: ['../suchformular.component.scss'],
})
export class SucheFamilienstandComponent {
    familienstand: Familienstand | '' = '';

    @Output()
    readonly familienstand$ = new Subject<Familienstand | ''>();

    constructor() {
        log.debug('SucheFamilienstandComponent.constructor()');
    }

    onChange(event: MatSelectChange) {
        log.debug(
            `SucheFamilienstandComponent.onChange: familienstand=${this.familienstand}`,
        );
        const value = event.value as string;
        this.familienstand$.next(value as Familienstand | '');
    }
}
