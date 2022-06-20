// eslint-disable-next-line import/no-unresolved
import { MatCheckboxModule } from '@angular/material/checkbox';
// eslint-disable-next-line import/no-unresolved
import { MatFormFieldModule } from '@angular/material/form-field';
// eslint-disable-next-line import/no-unresolved
import { MatInputModule } from '@angular/material/input';
// eslint-disable-next-line import/no-unresolved
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
// eslint-disable-next-line import/no-unresolved
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateInteressenComponent } from './update-interessen.component';

@NgModule({
    imports: [
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        SharedModule,
    ],
    declarations: [UpdateInteressenComponent],
    exports: [UpdateInteressenComponent],
})
export class UpdateInteressenModule {}
