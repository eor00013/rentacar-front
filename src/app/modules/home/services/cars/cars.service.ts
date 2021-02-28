import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CarInterface, SearchInterface } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class CarsService {
    private carSubject: BehaviorSubject<CarInterface[] | null> = new BehaviorSubject([] as CarInterface[] | null);
    private searchCarsSubject: BehaviorSubject<SearchInterface | null> = new BehaviorSubject(null);
    readonly cars$: Observable<CarInterface[] | null> = this.carSubject.asObservable();
    readonly searchCars$: Observable<SearchInterface | null> = this.searchCarsSubject.asObservable();

    constructor(private http: HttpClient) {}

    loadAvailableCars(cityId: number, cityName: string, dateStart: Date = null, dateEnd: Date = null) {
        let httpParams;
        if (dateStart && dateEnd) {
            dateStart.setHours(0, 0, 0, 0);
            dateEnd.setHours(0, 0, 0, 0);
            httpParams = new HttpParams()
                .append('date_start', new Date(dateStart).toISOString())
                .append('date_end', new Date(dateEnd).toISOString());
        }

        httpParams = httpParams.append('city', cityId.toString());

        this.newSearchTrigguered(cityId, cityName, dateStart, dateEnd);

        this.http
            .get<CarInterface[]>(`${environment.apiURL}/cars/`, { params: httpParams })
            .subscribe(
                (cars: CarInterface[]) => {
                    //cuando va bien la llamada
                    console.log(cars);
                    this.carSubject.next(cars);
                },
                () => {
                    // cuando hay errores
                    // this.createCarsMock();
                    // En producción nunca creamos mocks
                    // this.showErrorMessage()
                }
            );
    }
    private newSearchTrigguered(cityId: number, cityName: string, dateStart: Date, dateEnd: Date) {
        // this.searchCarsSubject.next({
        //     cityId: cityId,
        //     cityName: cityName,
        //     dateStart: dateStart,
        //     dateEnd: dateEnd
        // } as SearchInterface);
        // ninja version(just in case the key and the value have the same name)
        this.searchCarsSubject.next({ cityId, cityName, dateStart, dateEnd } as SearchInterface);
    }

    getSearch(): SearchInterface {
        return this.searchCarsSubject.value;
    }
}
