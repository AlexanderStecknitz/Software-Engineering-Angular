// eslint-disable-next-line import/no-unresolved
import { MatFormFieldModule } from '@angular/material/form-field';
// eslint-disable-next-line import/no-unresolved
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
// eslint-disable-next-line import/no-unresolved
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateNachnameComponent } from './update-nachname.component';

@NgModule({
    imports: [MatFormFieldModule, MatInputModule, SharedModule],
    declarations: [UpdateNachnameComponent],
    exports: [UpdateNachnameComponent],
})
export class UpdateNachnameModule {}
