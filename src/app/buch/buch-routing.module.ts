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

import { RouterModule, type Routes } from '@angular/router';
import { AdminGuard } from '../auth/admin.guard';
import { BalkendiagrammComponent } from './diagramme/balkendiagramm.component';
import { BuchModule } from './buch.module';
import { CreateBuchComponent } from './create-buch/create-buch.component';
import { CreateBuchGuard } from './create-buch/create-buch.guard';
import { DetailsBuchComponent } from './details-buch/details-buch.component';
import { LiniendiagrammComponent } from './diagramme/liniendiagramm.component';
import { NgModule } from '@angular/core';
import { SucheBuecherComponent } from './suche-buecher/suche-buecher.component';
import { TortendiagrammComponent } from './diagramme/tortendiagramm.component';
import { UpdateBuchComponent } from './update-buch/update-buch.component';

// Route-Definitionen fuer das Feature-Modul "buch":
// Zuordnung von Pfaden und Komponenten mit HTML-Templates
const routes: Routes = [
    {
        path: 'suche',
        component: SucheBuecherComponent,
    },
    {
        path: 'create',
        component: CreateBuchComponent,
        canActivate: [AdminGuard],
        canDeactivate: [CreateBuchGuard],
    },
    {
        path: 'balkendiagramm',
        component: BalkendiagrammComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'liniendiagramm',
        component: LiniendiagrammComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'tortendiagramm',
        component: TortendiagrammComponent,
        canActivate: [AdminGuard],
    },

    // id als Pfad-Parameter
    {
        path: 'update/:id',
        component: UpdateBuchComponent,
        canActivate: [AdminGuard],
    },
    {
        path: ':id',
        component: DetailsBuchComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), BuchModule],
    exports: [RouterModule],
})
export class BuchRoutingModule {}
