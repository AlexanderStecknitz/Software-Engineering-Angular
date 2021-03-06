/*
 * Copyright (C) 2019 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import { GefundeneKundenComponent } from './gefundene-kunden.component';
// eslint-disable-next-line import/no-unresolved
import { MatButtonModule } from '@angular/material/button';
// eslint-disable-next-line import/no-unresolved
import { MatCardModule } from '@angular/material/card';
// eslint-disable-next-line import/no-unresolved
import { MatIconModule } from '@angular/material/icon';
// eslint-disable-next-line import/no-unresolved
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatTableModule,
        SharedModule,
    ],
    declarations: [GefundeneKundenComponent],
    exports: [GefundeneKundenComponent],
})
export class GefundeneKundenModule {}
