import { Component } from '@angular/core';
import log from 'loglevel';

@Component({
    selector: 'hs-waiting',
    templateUrl: './waiting.component.html',
})
export class WaitingComponent {
    constructor() {
        log.debug('WaitingComponent.constructor()');
    }
}
