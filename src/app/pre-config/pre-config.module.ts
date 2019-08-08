import { DroitComponent } from './droit/droit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GammeComponent } from './gamme/gamme.component';
import { TypeComponent } from './type/type.component';
import { PreconfigRoutes } from './pre-config.routing';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PreconfigService } from './service/pre-config.service';
import { PagerService } from '../pager/index';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(PreconfigRoutes), FormsModule, NgbModule, NgxDatatableModule,
        Ng2SmartTableModule, NgxPaginationModule],
    declarations: [
        GammeComponent,
        TypeComponent,
        DroitComponent

    ],
    providers: [
        PreconfigService,

    ]
})
export class PreconfigModule { }
