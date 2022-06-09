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
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-nachname</code>
 */
@Component({
    selector: 'hs-update-newsletter',
    templateUrl: './update-newsletter.component.html',
})
export class UpdateNewsletterComponent implements OnInit {
    // delete later: private static readonly MIN_LENGTH = 2;

    // <hs-update-nachname [form]="form" [currentValue]="...">
    @Input()
    form!: FormGroup;

    @Input()
    currentValue!: boolean;

    newsletter!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateNewsletterComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.newsletter = new FormControl(this.currentValue, [
            Validators.required,
            Validators.pattern(/^\w/u),
        ]);
        this.form.addControl('newsletter', this.newsletter);
    }
}
