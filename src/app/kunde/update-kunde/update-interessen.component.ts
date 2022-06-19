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

import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-updateForm-art&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    selector: 'hs-update-interessen',
    templateUrl: './update-interessen.component.html',
    styleUrls: ['./update.component.scss'],
})
export class UpdateInteressenComponent implements OnInit {
    @Input()
    updateForm!: FormGroup;

    readonly sport = new FormControl(false);

    readonly lesen = new FormControl(false);

    readonly reisen = new FormControl(false);

    ngOnInit() {
        log.debug('UpdateInteressenComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.updateForm.addControl('sport', this.sport);
        this.updateForm.addControl('lesen', this.lesen);
        this.updateForm.addControl('reisen', this.reisen);
    }
}
