import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { NgxPaginationModule } from 'ngx-pagination';
import { ApproRoutes } from './appro.routing';

import { EditComponent } from '../approvisionnement/edit/edit.component';
import { ListComponent } from '../approvisionnement/list/list.component';

import { BoutiqueService } from '../boutique/service/boutique.service';
import { ApproService } from './service/approvisionnement.service';
import { ProduitService } from '../produit/service/produit.service';
import { PreconfigService } from '../pre-config/service/pre-config.service';



@NgModule({
  imports: [CommonModule, RouterModule.forChild(ApproRoutes), FormsModule, NgbModule, NgxPaginationModule],
  declarations: [
    EditComponent,
    ListComponent,

  ],
  providers: [
    BoutiqueService,
    ApproService,
    ProduitService,
    PreconfigService
  ]
})
export class ApproModule { }
