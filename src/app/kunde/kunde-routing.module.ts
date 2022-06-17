import { RouterModule, type Routes } from '@angular/router';
import { CreateKundeComponent } from './create-kunde/create-kunde.component';
import { CreateKundeGuard } from './create-kunde/create-kunde.guard';
import { KundeModule } from './kunde.module';
import { NgModule } from '@angular/core';
import { SucheKundenComponent } from './suche-kunde/suche-kunde.component';
import { UpdateKundeComponent } from './update-kunde/update-kunde.component';

const routes: Routes = [
    {
        path: 'suche',
        component: SucheKundenComponent,
    },
    {
        path: 'create',
        component: CreateKundeComponent,
        canDeactivate: [CreateKundeGuard],
    },
    {
        path: 'update',
        component: UpdateKundeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), KundeModule],
    exports: [RouterModule],
})
export class KundeRoutingModule {}
