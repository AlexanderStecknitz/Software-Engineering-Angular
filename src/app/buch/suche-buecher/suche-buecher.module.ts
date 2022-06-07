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
import { SucheBuecherComponent } from './suche-buecher.component';
import { SuchergebnisModule } from './suchergebnis/suchergebnis.module';
import { SuchformularModule } from './suchformular/suchformular.module';
import { Title } from '@angular/platform-browser';

// Ein Modul enthaelt logisch zusammengehoerige Funktionalitaet.
// Exportierte Komponenten koennen bei einem importierenden Modul in dessen
// Komponenten innerhalb deren Templates (= HTML-Fragmente) genutzt werden.
// SucheBuecherModule ist ein "FeatureModule", das Features fuer die Suche nach
// Buecher bereitstellt
@NgModule({
    imports: [SharedModule, SuchergebnisModule, SuchformularModule],
    declarations: [SucheBuecherComponent],
    providers: [Title],
})
export class SucheBuecherModule {}
