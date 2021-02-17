import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

import { LocationInterface } from '../../models';

export enum KEY_CODE {
    ENTER = 13,
    UP_ARROW = 38,
    DOWN_ARROW = 40
}

@Component({
    selector: 'select-city',
    templateUrl: './select-city.component.html',
    styleUrls: ['./select-city.component.scss']
})
export class SelectCityComponent {
    @Input() locations: LocationInterface[] | null = [];

    @Output() locationChange: EventEmitter<LocationInterface> = new EventEmitter<LocationInterface>();

    indexFocused = 0;
    locationSearch: string | null = null;
    locationSelected: LocationInterface;
    options: LocationInterface[] = [];

    constructor() {}

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        console.log(event.keyCode);
        if (event.keyCode === KEY_CODE.UP_ARROW && this.indexFocused > 0) {
            //opción clásica para decrementar una unidad
            // this.indexFocused = this.indexFocused-1;
            //opción ninja de javascript
            this.indexFocused--;
        }

        if (event.keyCode === KEY_CODE.DOWN_ARROW && this.indexFocused < this.options.length - 1) {
            //opción clásica para aumentar una unidad
            // this.indexFocused = this.indexFocused+1;
            //opción ninja de javascript
            this.indexFocused++;
        }

        if (event.keyCode === KEY_CODE.ENTER) {
            this.locationSelected = this.options[this.indexFocused];
            this.locationSearch = this.locationSelected.name;
            this.locationChange.emit(this.locationSelected);
            this.cleanOptions();
        }
    }
    private cleanOptions() {
        this.options = [];
    }

    focusOption(index: number) {
        this.indexFocused = index;
    }
    searchChange() {
        if (this.locationSearch) {
            if (this.locations) {
                this.options = this.locations.filter((location: LocationInterface) => {
                    console.log(location.name.toLocaleLowerCase());
                    return location.name.toLocaleLowerCase().includes(this.locationSearch.toLocaleLowerCase());
                });
                console.log(this.options);
            }
        } else {
            this.cleanOptions();
        }
    }

    selectOption(location: LocationInterface) {
        this.locationSearch = location.name;
        this.locationSelected = location;
        this.locationChange.emit(location);
        this.cleanOptions();
    }
}
