import { Component, Input } from '@angular/core';
import log from 'loglevel';

@Component({
    selector: 'hs-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
    @Input()
    text: string | undefined;

    constructor() {
        log.debug('ErrorMessageComponent.constructor()');
    }
}
