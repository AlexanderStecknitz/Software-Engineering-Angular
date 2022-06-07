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

import { HomeComponent } from './home.component';
// eslint-disable-next-line import/no-unresolved
import { MatCardModule } from '@angular/material/card';
// eslint-disable-next-line import/no-unresolved
import { MatIconModule } from '@angular/material/icon';
// eslint-disable-next-line import/no-unresolved
import { MatListModule } from '@angular/material/list';
// eslint-disable-next-line import/no-unresolved
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

@NgModule({
    imports: [MatCardModule, MatIconModule, MatListModule, MatTabsModule],
    declarations: [HomeComponent],
    // Der Singleton-Service "Title" wird benoetigt
    providers: [Title],
})
export class HomeModule {}
