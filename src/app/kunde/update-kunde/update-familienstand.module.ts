// eslint-disable-next-line import/no-unresolved
import { MatFormFieldModule } from '@angular/material/form-field';
// eslint-disable-next-line import/no-unresolved
import { MatInputModule } from '@angular/material/input';
// eslint-disable-next-line import/no-unresolved
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
// eslint-disable-next-line import/no-unresolved
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateFamilienstandComponent } from './update-familienstand.component';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        SharedModule,
    ],
    declarations: [UpdateFamilienstandComponent],
    exports: [UpdateFamilienstandComponent],
})
export class UpdateFamilienstandModule {}
