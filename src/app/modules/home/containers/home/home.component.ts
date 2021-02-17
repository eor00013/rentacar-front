import { CarsService } from './../../services/cars/cars.service';
import { LocationInterface } from './../../models/location.interface';
import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../../services/locations/locations.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    pickupDateValue: Date = new Date();
    returnDateValue: Date = new Date();
    locationSelected: LocationInterface;

    constructor(public locationsService: LocationsService, private carsService: CarsService, private router: Router) {}

    ngOnInit() {
        this.locationsService.loadLocations();
    }

    locationChange(location: LocationInterface) {
        this.locationSelected = location;
    }

    findCars() {
        if (this.formIsValid()) {
            this.carsService.loadAvailableCars(
                this.locationSelected.id,
                this.locationSelected.name,
                this.pickupDateValue,
                this.returnDateValue
            );
            this.router.navigate(['offerlist']);
        }
    }

    private formIsValid(): boolean {
        // if(this.locationSelected && this.pickupDateValue && this.returnDateValue){
        //     return true;
        //     } else {
        //         return false;
        //     }
        // return((this.locationSelected !=null && this.locationSelected !=undefined) &&
        // (this.pickupDateValue !=null && this.pickupDateValue !=undefined) && (this.returnDateValue !=null && this.returnDateValue !=undefined);

        //nos permite convertir un boolean en una variable de otro tipo
        return !!this.locationSelected && !!this.pickupDateValue && !!this.returnDateValue;
    }
}
