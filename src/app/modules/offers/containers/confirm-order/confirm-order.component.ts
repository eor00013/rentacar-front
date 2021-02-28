import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarInterface, SearchInterface } from 'src/app/modules/home/models';
import { CarsService } from 'src/app/modules/home/services/cars/cars.service';
import { OrderService } from '../../services/order.service';
import { OrderInterface } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../../components';

@Component({
    selector: 'app-confirm-order',
    templateUrl: './confirm-order.component.html',
    styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
    carToOrder$: Observable<CarInterface>;
    searchCars$: Observable<SearchInterface>;

    // searchCar: SearchInterface;
    constructor(
        private orderService: OrderService,
        private carsService: CarsService,
        private snackBar: MatSnackBar,
        private router: Router,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.carToOrder$ = this.orderService.carToOrder$;
        this.searchCars$ = this.carsService.searchCars$;
        // second option load SearchInterface from typescript
        // this.carsService.searchCars$.subscribe((search:SearchInterface)=>{this.searchCar=search})
    }
    saveOrder() {
        const car = this.orderService.getCarToOrder();
        const dateStart = this.carsService.getSearch().dateStart;
        const dateEnd = this.carsService.getSearch().dateEnd;

        dateStart.setHours(0, 0, 0, 0);
        dateEnd.setHours(0, 0, 0, 0);

        const orderToSave = {
            car: car.id,
            date_start: dateStart,
            date_end: dateEnd
        } as OrderInterface;

        this.orderService.saveOrder(orderToSave).subscribe((order: OrderInterface) => {
            this.snackBar.open('Order Create', null, {
                duration: 2000
            });
            this.router.navigateByUrl('home');
        });
    }

    openUserLogin() {
        this.dialog.open(DialogLoginComponent);
    }
}
