import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarInterface } from '../../home/models';
import { OrderInterface } from '../containers/models';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private carToOrderSubject: BehaviorSubject<CarInterface> = new BehaviorSubject(null);
    readonly carToOrder$: Observable<CarInterface> = this.carToOrderSubject.asObservable();

    constructor(private http: HttpClient) {}

    setCarToOrder(car: CarInterface) {
        this.carToOrderSubject.next(car);
    }

    getCarToOrder(): CarInterface {
        return this.carToOrderSubject.value;
    }

    saveOrder(order: OrderInterface): Observable<OrderInterface> {
        return this.http.post<OrderInterface>(`${environment.apiURL}/orders/`, order);
    }
}
