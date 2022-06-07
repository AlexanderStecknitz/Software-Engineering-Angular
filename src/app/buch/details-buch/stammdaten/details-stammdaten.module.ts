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

import { DetailsArtComponent } from './details-art.component';
import { DetailsBewertungComponent } from './details-bewertung.component';
import { DetailsDatumComponent } from './details-datum.component';
import { DetailsIsbnComponent } from './details-isbn.component';
import { DetailsLieferbarComponent } from './details-lieferbar.component';
import { DetailsPreisComponent } from './details-preis.component';
import { DetailsRabattComponent } from './details-rabatt.component';
import { DetailsStammdatenComponent } from './details-stammdaten.component';
import { DetailsTitelComponent } from './details-titel.component';
import { DetailsVerlagComponent } from './details-verlag.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [
        DetailsArtComponent,
        DetailsBewertungComponent,
        DetailsDatumComponent,
        DetailsIsbnComponent,
        DetailsLieferbarComponent,
        DetailsPreisComponent,
        DetailsRabattComponent,
        DetailsStammdatenComponent,
        DetailsTitelComponent,
        DetailsVerlagComponent,
    ],
    exports: [DetailsStammdatenComponent],
})
export class DetailsStammdatenModule {}
