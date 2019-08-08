import { Routes } from '@angular/router';

import { DetailsComponent } from '../client/details/details.component';
import { EditComponent } from '../client/edit/edit.component';
import { ListComponent } from '../client/list/list.component';
import { UpdateComponent } from '../client/update/update.component';
import { AuthGuard } from '../services/guards/auth.guard';

export const ClientRoutes: Routes = [
    {
        path: '',
        children: [


            {
                path: 'details',
                component: DetailsComponent,
                canActivate: [AuthGuard],

                data: {
                    /* title: 'Client Details', */
                    urls: [
                        { title: 'details', url: '/client/details' },
                        { title: 'Details Client' }
                    ]
                }
            },
            {
                path: 'edit',
                component: EditComponent,
                data: {
                    /*  title: 'Edit Client', */
                    urls: [
                        { title: 'Edit', url: '/client/edit' },
                        { title: 'Créer un client' }
                    ]
                }
            },
            {
                path: 'update/:id',
                component: UpdateComponent,
                canActivate: [AuthGuard],

                data: {
                    /* title: 'update client', */
                    urls: [
                        { title: 'Update', url: '/client/update' },
                        { title: 'Mise à jour client' }
                    ]
                }
            },

            {
                path: 'list',
                component: ListComponent,
                data: {
                    /*  title: ' List client', */
                    urls: [
                        { title: 'List', url: '/client/list' },
                        { title: 'Client' }
                    ]
                }
            }
        ]
    }
];
