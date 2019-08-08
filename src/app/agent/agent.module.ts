import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from '../agent/details/details.component';
import { EditComponent } from '../agent/edit/edit.component';
import { ListComponent } from '../agent/list/list.component';
import { UpdateComponent } from '../agent/update/update.component';
import { AgentRoutes } from './agent.routing';
import { AgentService } from './service/agent.service';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  imports: [CommonModule, RouterModule.forChild(AgentRoutes), FormsModule, NgbModule, NgxPaginationModule],
  declarations: [
    DetailsComponent,
    EditComponent,
    ListComponent,
    UpdateComponent
  ],
  providers: [
    AgentService
  ]
})
export class AgentModule { }
