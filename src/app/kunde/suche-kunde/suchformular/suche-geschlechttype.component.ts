// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-unresolved */
import { Component, Output } from '@angular/core';
import type { GeschlechtType } from '../../shared';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MatSelectChange } from '@angular/material/select';
import { Subject } from 'rxjs';
import log from 'loglevel';

@Component({
    selector: 'hs-suche-geschlechttype',
    templateUrl: './suche-geschlechttype.component.html',
    styleUrls: ['./suche-geschlechttype.component.scss'],
})
export class SucheGeschlechtTypeComponent {
    geschlechtType: GeschlechtType | '' = '';

    @Output()
    readonly geschlechtType$ = new Subject<GeschlechtType | ''>();

    constructor() {
        log.debug('SucheGeschlechtTypeComponent.constructor()');
    }

    onChange(event: MatSelectChange) {
        const value = event.value as string;
        log.debug(`SucheNachnameComponent.onChange: geschlechtType=${value}`);
        this.geschlechtType$.next(value as GeschlechtType | '');
    }
}
