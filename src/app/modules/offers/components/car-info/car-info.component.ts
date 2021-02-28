import { environment } from './../../../../../environments/environment';
import { CarInterface } from './../../../home/models/cars.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'car-info',
    templateUrl: './car-info.component.html',
    styleUrls: ['./car-info.component.scss']
})
export class CarInfoComponent implements OnInit {
    @Input() car: CarInterface;

    storageURL = environment.storageURL;

    constructor() {}

    ngOnInit(): void {}
}
