import { NgModule } from '@angular/core';
import { UpdateKundeComponent } from './update-kunde.component';
import { UpdateNachnameModule } from './update-nachname.module';

@NgModule({
    imports: [UpdateNachnameModule],
    declarations: [UpdateKundeComponent],
    exports: [UpdateKundeComponent],
})
export class UpdateKundeModule {}
