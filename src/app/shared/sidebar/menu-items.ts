import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  /* {
     path: '',
     title: 'Personal',
     icon: 'mdi mdi-dots-horizontal',
     class: 'nav-small-cap',
     extralink: true,
     submenu: []
   },*/
  {
    path: '/home/dashboard',
    title: 'Accueil',
    icon: 'fas fa-home',
    class: '',
    extralink: false,
    submenu: []

  },


  {
    path: '',
    title: 'Produit',
    icon: 'fab fa-product-hunt',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/product/list',
        title: 'Liste de produits',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/product/edit',
        title: 'Ajouter un produit',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },

    ]
  },
  {
    path: '',
    title: 'Boutique',
    icon: 'fab fa-app-store',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/boutique/list',
        title: 'Liste de boutiques',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/boutique/edit',
        title: 'Ajouter un boutique',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },

    ]
  },
  /*  {
     path: '',
     title: 'Personnel',
     icon: 'mdi mdi-dots-horizontal',
     class: 'nav-small-cap',
     extralink: true,
     submenu: [
 
      
     ]
   }, */
  {
    path: '',
    title: 'Agent',
    icon: 'fas fa-user',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/agent/list',
        title: 'Liste des agents',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/agent/edit',
        title: 'Ajouter un agent',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },

    ]
  },

  {
    path: '',
    title: 'Client',
    icon: 'fas fa-user',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/client/list',
        title: 'Liste des clients',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/client/edit',
        title: 'Ajouter un client',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },

    ]
  },
  {
    path: '',
    title: 'Approvisionnement',
    icon: 'fab fa-app-store',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/appro/edit',
        title: 'Ajouter un appro',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/appro/list',
        title: 'Liste approvisionnement',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },

    ]
  },
  {
    path: '',
    title: 'Pre-configuration',
    icon: 'fas fa-cog',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/pre-config/gamme',
        title: 'Ajouter une gamme',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/pre-config/type',
        title: 'Ajouter un type produit ',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },

      {
        path: '/pre-config/droit',
        title: 'Ajouter un droit ',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },

    ]
  },


  

];
