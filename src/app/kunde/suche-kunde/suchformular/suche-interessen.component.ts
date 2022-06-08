import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import log from 'loglevel';

@Component({
    selector: 'hs-suche-interessen',
    templateUrl: './suche-interessen.component.html',
    styleUrls: ['./suchformular.component.scss'],
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

    onChangeLesen(event: Event) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-reisen
        const { checked } = event.target as HTMLInputElement;
        log.debug(`SucheInteressenComponent.onChangeLesen: checked=${checked}`);
        this.lesen$.next(checked);
    }

    onChangeSport(event: Event) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-reisen
        const { checked } = event.target as HTMLInputElement;
        log.debug(`SucheInteressenComponent.onChangeSport: checked=${checked}`);
        this.sport$.next(checked);
    }

    onChangeReisen(event: Event) {
        const { checked } = event.target as HTMLInputElement;
        log.debug(
            `SucheInteressenComponent.onChangeReisen: checked=${checked}`,
        );
        this.reisen$.next(checked);
    }
}
