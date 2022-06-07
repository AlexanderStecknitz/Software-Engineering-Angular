/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import { PreloadAllModules, RouterModule, type Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

// Route-Definitionen fuer den Root-Router
// Eine Route leitet zu einer neuen Ansicht ("View") in der SPA, wobei die
// vorherige Ansicht ueberdeckt bzw. ausgeblendet wird.
const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        // redirect erfordert pathMatch full
        pathMatch: 'full',
        component: HomeComponent,
    },
    {
        path: 'buecher',
        // Lazy Loading (statt Eager Loading) durch dynamische Imports (seit ES 2020)
        // loadChildren statt component wie bei '/'
        // zzgl. Preloading von sichtbaren Links (s.u.)
        // https://angular.io/guide/lazy-loading-ngmodules
        loadChildren: () =>
            import('./buch/buch-routing.module').then(m => m.BuchRoutingModule),
    },
];

@NgModule({
    // https://angular.io/guide/router
    // https://next.angular.io/api/router/RouterModule
    /* eslint-disable array-bracket-newline */
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    /* eslint-enable array-bracket-newline */
    exports: [RouterModule],
})
export class AppRoutingModule {}
