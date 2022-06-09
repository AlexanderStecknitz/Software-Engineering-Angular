/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-unresolved */
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

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { CreateEmailComponent } from './create-email.component';
import { CreateFamilienstandComponent } from './create-familienstand.component';
import { CreateGeburtsdatumComponent } from './create-geburtsdatum.component';
import { CreateGeschlechtComponent } from './create-geschlecht.component';
import { CreateInteressenComponent } from './create-interessen.component';
import { CreateKategorieComponent } from './create-kategorie-component';
import { CreateKundeComponent } from './create-kunde.component';
import { CreateNachnameComponent } from './create-nachname.component';
import { CreateNewsletterComponent } from './create-newsletter.component';
import { CreateOrtComponent } from './create-ort.component';
import { CreatePlzComponent } from './create-plz.component';
import { CreateUmsatzComponent } from './create-umsatz.component';
import { CreateWaehrungComponent } from './create-waehrung.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// Ein Modul enthaelt logisch zusammengehoerige Funktionalitaet.
// Exportierte Komponenten koennen bei einem importierenden Modul in dessen
// Komponenten innerhalb deren Templates (= HTML-Fragmente) genutzt werden.
// BuchModule ist ein "FeatureModule", das Features fuer Buecher bereitstellt
@NgModule({
    imports: [
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations: [
        CreateEmailComponent,
        CreateFamilienstandComponent,
        CreateGeburtsdatumComponent,
        CreateGeschlechtComponent,
        CreateInteressenComponent,
        CreateKategorieComponent,
        CreateKundeComponent,
        CreateNachnameComponent,
        CreateNewsletterComponent,
        CreateOrtComponent,
        CreatePlzComponent,
        CreateUmsatzComponent,
        CreateWaehrungComponent,
    ],
    providers: [Title],
})
export class CreateKundeModule {}
