import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ProduitsRoutes } from './produit.routing';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { ProduitService } from './service/produit.service';
import { PreconfigService } from '../pre-config/service/pre-config.service';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ProduitsRoutes), FormsModule, NgbModule, NgxPaginationModule],
  declarations: [
    DetailsComponent,
    EditComponent,
    ListComponent,
    UpdateComponent
  ],
  providers: [
    ProduitService, PreconfigService
  ]
})
export class ProduitModule { }
