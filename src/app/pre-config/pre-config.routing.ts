import { Routes } from '@angular/router';
import { GammeComponent } from './gamme/gamme.component';
import { TypeComponent } from './type/type.component';
import { DroitComponent } from './droit/droit.component';

export const PreconfigRoutes: Routes = [
    {
        path: '',
        children: [


            {
                path: 'gamme',
                component: GammeComponent,
                data: {
/*                     title: 'Gamme',
 */                    urls: [
                        { title: 'Gamme', url: '/pre-config/gamme' },
                        { title: 'Gamme information' }
                    ]
                }
            },
            {
                path: 'type',
                component: TypeComponent,
                data: {
/*                     title: 'type',
 */                    urls: [
                        { title: 'Type', url: '/pre-config/type' },
                        { title: 'Type Produit' }
                    ]
                }
            },
            {
                path: 'droit',
                component: DroitComponent,
                data: {
/*                     title: 'droit',
 */                    urls: [
                        { title: 'Droit', url: '/pre-config/droit' },
                        { title: ' Créer Droit' }
                    ]
                }
            },
        ]
    }
];
