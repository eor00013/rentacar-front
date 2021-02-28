import { Router } from '@angular/router';
import { OrderService } from './../../services/order.service';
import { CarsService } from './../../../home/services/cars/cars.service';
import { Component, OnInit } from '@angular/core';
import { CarInterface } from 'src/app/modules/home/models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-offerlist',
    templateUrl: './offerlist.component.html',
    styleUrls: ['./offerlist.component.scss']
})
export class OfferlistComponent implements OnInit {
    cars$: Observable<CarInterface[]>;

    constructor(private carsService: CarsService, private orderService: OrderService, private router: Router) {}

    ngOnInit() {
        this.cars$ = this.carsService.cars$;
    }

    confirmOrder(car: CarInterface) {
        this.orderService.setCarToOrder(car);
        this.router.navigateByUrl('offerlist/confirm');
    }
}
