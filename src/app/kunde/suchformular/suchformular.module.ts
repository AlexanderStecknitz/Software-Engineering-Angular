// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable sort-imports */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SuchformularComponent } from './suchformular.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { SucheNachnameModule } from './nachname/suche-nachname.module';

@NgModule({
    declarations: [SuchformularComponent],
    exports: [SuchformularComponent],
    imports: [
        FormsModule,
        HttpClientModule,
        MatIconModule,
        SucheNachnameModule,
    ],
})
export class SuchformularModule {}
