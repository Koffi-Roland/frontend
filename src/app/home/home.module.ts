import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';

import { HomeRoutes } from './home.routing';

import { DashboardComponent } from './dashboard/dashboard.component';


import {
  InfocardComponent,
  MixstatsComponent,
 
} from './dashboard-components';
import { HomeService } from './service/home.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ChartsModule,
    ChartistModule,
    RouterModule.forChild(HomeRoutes),
    PerfectScrollbarModule,
    CalendarModule.forRoot(),
    NgxChartsModule,
    NgxDatatableModule
  ],
  declarations: [
    DashboardComponent,
    InfocardComponent,
    MixstatsComponent,
   
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule {}
