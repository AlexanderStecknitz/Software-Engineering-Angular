/*
 * Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import { CreateBuchModule } from './create-buch/create-buch.module';
import { DetailsBuchModule } from './details-buch/details-buch.module';
import { DiagrammeModule } from './diagramme/diagramme.module';
import { NgModule } from '@angular/core';
import { SucheBuecherModule } from './suche-buecher/suche-buecher.module';
import { UpdateBuchModule } from './update-buch/update-buch.module';

@NgModule({
    imports: [
        CreateBuchModule,
        DetailsBuchModule,
        DiagrammeModule,
        SucheBuecherModule,
        UpdateBuchModule,
    ],
})
export class BuchModule {}
