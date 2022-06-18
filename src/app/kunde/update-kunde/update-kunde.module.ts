import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UpdateGeschlechtModule } from './update-geschlecht.module';
import { UpdateKundeComponent } from './update-kunde.component';
import { UpdateNachnameModule } from './update-nachname.module';

@NgModule({
    imports: [
        ReactiveFormsModule,
        UpdateGeschlechtModule,
        UpdateNachnameModule,
    ],
    declarations: [UpdateKundeComponent],
    providers: [Title],
    exports: [UpdateKundeComponent],
})
export class UpdateKundeModule {}
