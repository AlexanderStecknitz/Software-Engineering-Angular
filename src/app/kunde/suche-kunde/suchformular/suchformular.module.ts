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
import { SucheFamilienstandModule } from './suche-familienstand.module';
import { SucheGeschlechtTypeModule } from './suche-geschlechttype.module';
import { SucheNachnameModule } from './suche-nachname.module';
import { SucheInteressenModule } from './suche-interessen.module';
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
