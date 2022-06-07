import { RouterModule, type Routes } from '@angular/router';
import { CreateKundeComponent } from './create-kunde/create-kunde.component';
import { KundeModule } from './kunde.module';
import { NgModule } from '@angular/core';
import { SucheKundenComponent } from './suche-kunde/suche-kunde.component';

const routes: Routes = [
    {
        path: 'suche',
        component: SucheKundenComponent,
    },
    {
        path: 'create',
        component: CreateKundeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), KundeModule],
    exports: [RouterModule],
})
export class KundeRoutingModule {}
