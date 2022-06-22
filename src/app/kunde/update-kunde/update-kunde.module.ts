// eslint-disable-next-line import/no-unresolved
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UpdateFamilienstandModule } from './update-familienstand.module';
import { UpdateGeschlechtModule } from './update-geschlecht.module';
import { UpdateInteressenModule } from './update-interessen.module';
import { UpdateKundeComponent } from './update-kunde.component';
import { UpdateNachnameModule } from './update-nachname.module';

@NgModule({
    imports: [
        MatButtonModule,
        ReactiveFormsModule,
        UpdateFamilienstandModule,
        UpdateGeschlechtModule,
        UpdateInteressenModule,
        UpdateNachnameModule,
    ],
    declarations: [UpdateKundeComponent],
    providers: [Title],
    exports: [UpdateKundeComponent],
})
export class UpdateKundeModule {}
