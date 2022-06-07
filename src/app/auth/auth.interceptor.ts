/*
 * Copyright (C) 2017 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import { type ClassProvider, Injectable } from '@angular/core';
import {
    HTTP_INTERCEPTORS,
    type HttpEvent,
    type HttpHandler,
    type HttpInterceptor,
    type HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { type Observable } from 'rxjs';
import log from 'loglevel';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly authService: AuthService) {
        log.debug('AuthInterceptor.constructor()');
    }

    intercept(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: HttpRequest<any>,
        next: HttpHandler,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Observable<HttpEvent<any>> {
        const authorizationStr = `${this.authService.authorization}`;
        log.debug('authorizationStr=', authorizationStr);

        const requestWithAuthorization = request.clone({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            setHeaders: { Authorization: authorizationStr },
        });

        return next.handle(requestWithAuthorization);
    }
}

// https://angular.io/guide/http#intercepting-requests-and-responses
// https://next.angular.io/guide/http#intercepting-requests-and-responses
export const authInterceptorProvider: ClassProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
