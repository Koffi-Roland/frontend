import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/authentication/login', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      },
      /*{
        path: 'starter',
        loadChildren: './starter/starter.module#StarterModule'
      },*/


      { path: 'product', loadChildren: './produit/produit.module#ProduitModule' },
      { path: 'pre-config', loadChildren: './pre-config/pre-config.module#PreconfigModule' },
      { path: 'boutique', loadChildren: './boutique/boutique.module#BoutiqueModule' },
      { path: 'agent', loadChildren: './agent/agent.module#AgentModule' },
      { path: 'client', loadChildren: './client/client.module#ClientModule' },
      { path: 'appro', loadChildren: './approvisionnement/appro.module#ApproModule' },






    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren:
          './authentication/authentication.module#AuthenticationModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
