import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message.component';
// eslint-disable-next-line import/no-unresolved
import { MatCardModule } from '@angular/material/card';
// eslint-disable-next-line import/no-unresolved
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WaitingComponent } from './waiting.component';

@NgModule({
    imports: [CommonModule, MatCardModule, MatIconModule],
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
