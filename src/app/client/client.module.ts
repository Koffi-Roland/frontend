import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from '../client/details/details.component';
import { EditComponent } from '../client/edit/edit.component';
import { ListComponent } from '../client/list/list.component';
import { UpdateComponent } from '../client/update/update.component';
import { ClientRoutes } from './client.routing';
import { ClientService } from './service/client.service';

import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
    imports: [CommonModule, RouterModule.forChild(ClientRoutes), FormsModule, NgbModule,NgxPaginationModule],
    declarations: [
        DetailsComponent,
        EditComponent,
        ListComponent,
        UpdateComponent
    ],
    providers: [
      ClientService
    ]
})
export class ClientModule { }
