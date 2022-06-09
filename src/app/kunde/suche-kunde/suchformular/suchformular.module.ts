// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable sort-imports */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SuchformularComponent } from './suchformular.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { SucheFamilienstandModule } from './familienstand/suche-familienstand.module';
import { SucheGeschlechtTypeModule } from './geschlecht/suche-geschlechttype.module';
import { SucheNachnameModule } from './nachname/suche-nachname.module';
import { SucheInteressenModule } from './interessen/suche-interessen.module';
@NgModule({
    declarations: [SuchformularComponent],
    exports: [SuchformularComponent],
    imports: [
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatGridListModule,
        MatIconModule,
        MatTooltipModule,
        SucheFamilienstandModule,
        SucheGeschlechtTypeModule,
        SucheInteressenModule,
        SucheNachnameModule,
    ],
})
export class SuchformularModule {}
