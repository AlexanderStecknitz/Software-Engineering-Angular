import { FormsModule } from '@angular/forms';
// eslint-disable-next-line import/no-unresolved
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { SucheFamilienstandComponent } from './suche-familienstand.component';

@NgModule({
    declarations: [SucheFamilienstandComponent],
    exports: [SucheFamilienstandComponent],
    imports: [FormsModule, MatSelectModule],
})
export class SucheFamilienstandModule {}
