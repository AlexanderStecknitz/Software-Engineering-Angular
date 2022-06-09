import { FormsModule } from '@angular/forms';
// eslint-disable-next-line import/no-unresolved
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { SucheNachnameComponent } from './suche-nachname.component';

@NgModule({
    declarations: [SucheNachnameComponent],
    exports: [SucheNachnameComponent],
    imports: [FormsModule, MatInputModule],
})
export class SucheNachnameModule {}
