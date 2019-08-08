import { AuthGuard } from './../services/guards/auth.guard';
import { Routes } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';

export const ProduitsRoutes: Routes = [
  {
    path: '',
    children: [


      {
        path: 'details',
        component: DetailsComponent,
        canActivate: [AuthGuard],

        data: {
          /* title: 'Product Details', */
          urls: [
            { title: 'details', url: '/product/details' },
            { title: 'Details produits' }
          ]
        }
      },
      {
        path: 'edit',
        component: EditComponent,
        canActivate: [AuthGuard],

        data: {
          /*  title: 'Edit Product', */
          urls: [
            { title: 'Edit', url: '/product/edit' },
            { title: 'Créer un produit' }
          ]
        }
      },
      {
        path: 'update/:id',
        component: UpdateComponent,
        canActivate: [AuthGuard],

        data: {
          /*   title: 'update Product', */
          urls: [
            { title: 'Update', url: '/product/update' },
            { title: 'Mise à jour Produit' }
          ]
        }
      },

      {
        path: 'list',
        component: ListComponent,
        canActivate: [AuthGuard],

        data: {
          /* title: ' List Produits', */
          urls: [
            { title: 'List', url: '/product/list' },
            { title: 'Products' }
          ]
        }
      }
    ]
  }
];
