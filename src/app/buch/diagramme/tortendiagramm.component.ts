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

import { type Buch, BuchReadService, FindError } from '../shared'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, type OnInit } from '@angular/core';
import { first, map, tap } from 'rxjs/operators';
import { type DataItem } from '@swimlane/ngx-charts';
import { KeineBuecherError } from './errors';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-tortendiagramm&gt; zur Visualisierung
 * von Bewertungen durch ein Tortendiagramm.
 */
@Component({
    selector: 'hs-tortendiagramm',
    templateUrl: './tortendiagramm.html',
})
export class TortendiagrammComponent implements OnInit {
    dataItems!: DataItem[];

    constructor(
        private readonly service: BuchReadService,
        private readonly titleService: Title,
    ) {
        log.debug('TortendiagrammComponent.constructor()');
    }

    /**
     * Daten fuer das Tortendiagramm bereitstellen.
     */
    ngOnInit() {
        log.debug('TortendiagrammComponent.ngOnInit()');
        this.#setDataItems();
        this.titleService.setTitle('Tortendiagramm');
    }

    #setDataItems() {
        this.service
            .find()
            .pipe(
                first(),
                map(result => {
                    if (result instanceof FindError) {
                        throw new KeineBuecherError();
                    }

                    return result
                        .filter(buch => buch.rating !== undefined)
                        .map(buch => this.#toDataItem(buch));
                }),
                tap(dataItems => {
                    this.dataItems = dataItems;
                }),
            )
            .subscribe();
    }

    // https://stackblitz.com/edit/swimlane-pie-chart?embed=1&file=app/app.component.ts
    #toDataItem(buch: Buch): DataItem {
        return {
            name: buch.id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
            value: buch.rating!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
        };
    }
}
