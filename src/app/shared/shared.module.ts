import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WaitingComponent } from './waiting.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ErrorMessageComponent, WaitingComponent],
    exports: [
        CommonModule,
        ErrorMessageComponent,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        WaitingComponent,
    ],
})
export class SharedModule {}
