import { Routes } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { AuthGuard } from '../services/guards/auth.guard';

export const BoutiqueRoutes: Routes = [
    {
        path: '',
        children: [


            {
                path: 'details',
                component: DetailsComponent,
                canActivate: [AuthGuard],

                data: {
                    /*   title: 'boutique Details', */
                    urls: [
                        { title: 'details', url: '/boutique/details' },
                        { title: 'Details boutique' }
                    ]
                }
            },
            {
                path: 'edit',
                component: EditComponent,
                canActivate: [AuthGuard],

                data: {
                    /* title: 'Edit Boutique', */
                    urls: [
                        { title: 'Edit', url: '/boutique/edit' },
                        { title: 'Créer une boutique' }
                    ]
                }
            },
            {
                path: 'update/:id',
                component: UpdateComponent,
                canActivate: [AuthGuard],

                data: {
                    /*  title: 'update boutique', */
                    urls: [
                        { title: 'Update', url: '/boutique/update' },
                        { title: 'Mise à jour boutique' }
                    ]
                }
            },

            {
                path: 'list',
                component: ListComponent,
                canActivate: [AuthGuard],

                data: {
                    /*   title: ' List boutique', */
                    urls: [
                        { title: 'List', url: '/boutique/list' },
                        { title: 'Boutique' }
                    ]
                }
            }
        ]
    }
];
