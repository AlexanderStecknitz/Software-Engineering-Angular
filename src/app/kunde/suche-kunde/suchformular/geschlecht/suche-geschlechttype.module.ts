import { FormsModule } from '@angular/forms';
// eslint-disable-next-line import/no-unresolved
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { SucheGeschlechtTypeComponent } from './suche-geschlechttype.component';

@NgModule({
    declarations: [SucheGeschlechtTypeComponent],
    exports: [SucheGeschlechtTypeComponent],
    imports: [FormsModule, MatSelectModule],
})
export class SucheGeschlechtTypeModule {}
