import { NgModule } from '@angular/core';
import { UpdateKundeComponent } from './update-kunde.component';
import { UpdateTitelModule } from './update-titel.module';

@NgModule({
    imports: [UpdateTitelModule],
    declarations: [UpdateKundeComponent],
    exports: [UpdateKundeComponent],
})
export class UpdateKundeModule {}
