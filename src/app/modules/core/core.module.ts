import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent, ToolbarComponent } from './components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ToolbarComponent, FooterComponent],
    imports: [CommonModule, MatToolbarModule, HttpClientModule, FlexLayoutModule, RouterModule],
    exports: [ToolbarComponent, FooterComponent, FlexLayoutModule]
})
export class CoreModule {}
