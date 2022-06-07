// eslint-disable-next-line eslint-comments/disable-enable-pair
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

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from './shared/shared.module';
import { appInitializer } from './app.initializer';
import { authInterceptorProvider } from './auth/auth.interceptor';
import { environment } from '../environments/environment';

// https://angular.io/guide/roadmap

// "Application Root Module" (= Einstiegsmodul):
// Der Name "AppModule" ist per Konvention bzw. ng-cli festgelegt
// Ein Modul enthaelt logisch zusammengehoerige Funktionalitaet
// https://angular.io/guide/ngmodulesl
// https://angular.io/guide/ngmodule-faq
// https://angular.io/api/core/NgModule
// https://blog.angular-university.io/angular2-ngmodule
// https://itnext.io/understanding-angular-modules-5f1215130bc8
@NgModule({
    // Von den importierten Modulen sind alle exportierten Komponenten nutzbar
    // Ein Modul muss die Module importieren, von denen es Funktionalitaet nutzt
    imports: [
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),

        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        HomeModule,
        HttpClientModule,
        LayoutModule,
        SharedModule,
        // NICHT BuchModule wegen Lazy Loading
    ],

    // Eigene Komponenten des Moduls oder Direktiven oder Pipes
    // Jede nutzbare Komponente muss in genau 1 Modul deklariert sein
    declarations: [
        // Eigentliche Komponente
        AppComponent,
    ],

    // Services mit @Injectable()
    providers: [
        {
            // Aufruf waehrend der Initialisierung
            provide: APP_INITIALIZER,
            useFactory: appInitializer,
            multi: true,
        },
        authInterceptorProvider,
    ],

    // Nur das Rootmodul hat die Property "bootstrap", um die
    // Einstiegskomponente zu deklarieren
    // https://angular.io/guide/entry-components
    // https://blog.angularindepth.com/how-to-manually-bootstrap-an-angular-application-9a36ccf86429
    bootstrap: [AppComponent],
})
export class AppModule {}
