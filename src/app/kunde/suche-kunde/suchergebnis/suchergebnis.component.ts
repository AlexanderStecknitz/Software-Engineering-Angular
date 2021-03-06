/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, Input } from '@angular/core';
import { type Kunde } from '../../shared';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-suchergebnis</code>, um das Ergebnis der
 * Suche anzuzeigen, d.h. die gefundenen B&uuml;cher oder eine Fehlermeldung.
 */
@Component({
    selector: 'hs-suchergebnis',
    templateUrl: './suchergebnis.component.html',
})
export class SuchergebnisComponent {
    // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
    // eine Flux-Bibliothek wie beispielsweise Redux http://redux.js.org

    // Property Binding: <hs-suchergebnis [kunden]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    kunden: Kunde[] = [];

    @Input()
    errorMsg: string | undefined;

    constructor() {
        log.debug('SuchergebnisComponent.constructor()');
        log.debug('Kunden: ', this.kunden);
    }
}
