import { Component, Input } from '@angular/core';
import log from 'loglevel';

@Component({
    selector: 'hs-error',
    templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
    @Input()
    text: string | undefined;

    constructor() {
        log.debug('ErrorMessageComponent.constructor()');
    }
}
