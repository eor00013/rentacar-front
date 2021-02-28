import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocationInterface } from '../../models';
import { environment } from './../../../../../environments/environment';

@Injectable()
export class LocationsService {
    private locationsSubject: BehaviorSubject<LocationInterface[] | null> = new BehaviorSubject(
        [] as LocationInterface[] | null
    );
    readonly locations$: Observable<LocationInterface[] | null> = this.locationsSubject.asObservable();

    constructor(private http: HttpClient) {}

    createLocationsMock() {
        const locationsMock: LocationInterface[] = [
            { id: 0, name: 'Palma' },
            { id: 1, name: 'Madrid' },
            { id: 2, name: 'Pamplona' }
        ];
        this.locationsSubject.next(locationsMock);
    }

    loadLocations() {
        this.http.get<LocationInterface[]>(`${environment.apiURL}/locations/`).subscribe(
            (locations: LocationInterface[]) => {
                //cuando va bien la llamada
                console.log(locations);
                this.locationsSubject.next(locations);
            },
            () => {
                // cuando hay errores
                this.createLocationsMock();
            }
        );
    }
}
