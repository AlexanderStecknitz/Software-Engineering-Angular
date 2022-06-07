import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SucheKundenComponent } from './suche-kunde.component';
import { SuchformularModule } from './suchformular/suchformular.module';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [SucheKundenComponent],
    exports: [SucheKundenComponent],
    imports: [CommonModule, SuchformularModule],
    providers: [Title],
})
export class SucheKundeModule {}
