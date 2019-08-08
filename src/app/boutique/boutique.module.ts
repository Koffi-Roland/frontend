import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from '../boutique/details/details.component';
import { EditComponent } from '../boutique/edit/edit.component';
import { ListComponent } from '../boutique/list/list.component';
import { UpdateComponent } from '../boutique/update/update.component';
import { BoutiqueRoutes } from './boutique.routing';
import { BoutiqueService } from './service/boutique.service';

import { NgxPaginationModule } from 'ngx-pagination';






@NgModule({
    imports: [CommonModule, RouterModule.forChild(BoutiqueRoutes), FormsModule, NgbModule,NgxPaginationModule],
    declarations: [
        DetailsComponent,
        EditComponent,
        ListComponent,
        UpdateComponent
    ],
    providers: [
      BoutiqueService
    ]
})
export class BoutiqueModule { }
