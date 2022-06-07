/*
 * Copyright (C) 2018 - present Juergen Zimmermann, Hochschule Karlsruhe
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
 * Komponente f&uuml;r das Tag <code>hs-update-kategorie</code>
 */
@Component({
    selector: 'hs-update-kategorie',
    templateUrl: './update-kategorie.component.html',
})
export class UpdateKategorieComponent implements OnInit {
    // <hs-update-kategorie [form]="form" [currentValue]="...">
    @Input()
    form!: FormGroup;

    @Input()
    currentValue: number | undefined;

    kategorie!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateKategorieComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.kategorie = new FormControl(this.currentValue);
        this.form.addControl('kategorie', this.kategorie);
    }
}
