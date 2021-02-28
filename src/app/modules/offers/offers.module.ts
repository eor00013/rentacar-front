import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferlistComponent } from './containers/offerlist/offerlist.component';
import { CarInfoComponent } from './components/car-info/car-info.component';
import { Route, RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmOrderComponent } from './containers/confirm-order/confirm-order.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogLoginComponent } from './components/dialog-login/dialog-login.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

const childRoutes: Route[] = [
    { path: '', component: OfferlistComponent },
    { path: 'confirm', component: ConfirmOrderComponent }
];

@NgModule({
    declarations: [OfferlistComponent, CarInfoComponent, ConfirmOrderComponent, DialogLoginComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(childRoutes),
        MatChipsModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        MatInputModule,
        FormsModule
    ]
})
export class OffersModule {}
