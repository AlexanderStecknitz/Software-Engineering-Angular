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
import { EMAIL_REGEX } from '../shared/kunde';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-email</code>
 */
@Component({
    selector: 'hs-update-email',
    templateUrl: './update-email.component.html',
})
export class UpdateEmailComponent implements OnInit {
    // <hs-update-email [form]="form" [currentValue]="...">
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue!: string;

    email!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateEmailComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.email = new FormControl(this.currentValue, [
            Validators.required,
            Validators.pattern(EMAIL_REGEX),
        ]);
        this.updateForm.addControl('email', this.email);
    }
}
