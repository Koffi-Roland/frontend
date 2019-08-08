import { Routes } from '@angular/router';
import { EditComponent } from '../approvisionnement/edit/edit.component';
import { ListComponent } from '../approvisionnement/list/list.component';
import { AuthGuard } from '../services/guards/auth.guard';



export const ApproRoutes: Routes = [
    {
        path: '',
        children: [


           /* {
                path: 'details',
                component: DetailsComponent,
                data: {
                    urls: [
                        { title: 'details', url: '/agent/details' },
                        { title: 'Details Agent' }
                    ]
                }
            },*/
            {
                path: 'edit',
                component: EditComponent,
                canActivate: [AuthGuard],

                data: {
                    /*  title: 'Edit Agent', */
                    urls: [
                        { title: 'Edit', url: '/appro/edit' },
                        { title: 'Créer un appro' }
                    ]
                }
            },
           /* {
                path: 'update/:id',
                component: UpdateComponent,
                data: {
                    urls: [
                        { title: 'Update', url: '/agent/update' },
                        { title: 'Mise à jour agent' }
                    ]
                }
            },*/

            {
                path: 'list',
                component: ListComponent,
                canActivate: [AuthGuard],

                data: {
                    urls: [
                        { title: 'List', url: '/appro/list' },
                        { title: 'Agent' }
                    ]
                }
            }
        ]
    }
];
