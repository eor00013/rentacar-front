import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers';
import { SelectCityComponent } from './components';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocationsService } from './services/locations/locations.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

const childRoutes: Route[] = [{ path: '', component: HomeComponent }];

@NgModule({
    declarations: [HomeComponent, SelectCityComponent],
    imports: [CommonModule, 
        RouterModule.forChild(childRoutes), 
        FormsModule, 
        MatDatepickerModule, 
        MatFormFieldModule, 
        MatNativeDateModule, 
        MatInputModule, 
        MatButtonModule, ],
    providers: [LocationsService, MatNativeDateModule]
})
export class HomeModule {}
