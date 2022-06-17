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

import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';
import { UpdateEmailComponent } from './update-email.component';
import { UpdateFamilienstandComponent } from './update-familienstand.component';
import { UpdateGeschlechtComponent } from './update-geschlecht.component';
import { UpdateInteressenComponent } from './update-interessen.component';
import { UpdateKategorieComponent } from './update-kategorie.component';
import { UpdateKundeComponent } from './update-kunde.component';
import { UpdateNachnameComponent } from './update-nachname.component';

@NgModule({
    imports: [SharedModule],
    declarations: [
        UpdateEmailComponent,
        UpdateFamilienstandComponent,
        UpdateGeschlechtComponent,
        UpdateInteressenComponent,
        UpdateKategorieComponent,
        UpdateKundeComponent,
        UpdateNachnameComponent,
    ],
    providers: [Title],
})
export class UpdateBuchModule {}
