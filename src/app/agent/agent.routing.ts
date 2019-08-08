import { Routes } from '@angular/router';

import { DetailsComponent } from '../agent/details/details.component';
import { EditComponent } from '../agent/edit/edit.component';
import { ListComponent } from '../agent/list/list.component';
import { UpdateComponent } from '../agent/update/update.component';
import { AuthGuard } from '../services/guards/auth.guard';

export const AgentRoutes: Routes = [
    {
        path: '',
        children: [


            {
                path: 'details',
                component: DetailsComponent,
                canActivate: [AuthGuard],

                data: {
                    /* title: 'Agent Details', */
                    urls: [
                        { title: 'details', url: '/agent/details' },
                        { title: 'Details Agent' }
                    ]
                }
            },
            {
                path: 'edit',
                component: EditComponent,
                canActivate: [AuthGuard],

                data: {
                    /*  title: 'Edit Agent', */
                    urls: [
                        { title: 'Edit', url: '/agent/edit' },
                        { title: 'Créer un agent' }
                    ]
                }
            },
            {
                path: 'update/:id',
                component: UpdateComponent,
                canActivate: [AuthGuard],

                data: {
                    /* title: 'update agent', */
                    urls: [
                        { title: 'Update', url: '/agent/update' },
                        { title: 'Mise à jour agent' }
                    ]
                }
            },

            {
                path: 'list',
                component: ListComponent,
                canActivate: [AuthGuard],

                data: {
                    /*  title: ' List agent', */
                    urls: [
                        { title: 'List', url: '/agent/list' },
                        { title: 'Agent' }
                    ]
                }
            }
        ]
    }
];
