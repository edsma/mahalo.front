import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'IA'
    },
    children: [
      {
        path: '',
        redirectTo: 'therapies',
        pathMatch: 'full'
      },
      {
        path: 'Feeling',
        loadComponent: () => import('./../pages/feeling-ia/feeling-ia.component').then(m => m.FeelingIAComponent),
        data: {
          title: 'Feeling'
        }
      },
      
    ]
  },
  {
    path: '',
    data: {
      title: 'resource'
    },
    children: [
      {
        path: '',
        redirectTo: 'therapies',
        pathMatch: 'full'
      },
      {
        path: 'prueba2',
        loadComponent: () => import('../pages/resources-basic/resources-basic.component').then(m => m.ResourcesBasicComponent),
        data: {
          title: 'prueba2'
        }
      },
      
    ]
  },
  {
    path: '',
    data: {
      title: 'Cruds'
    },
    children: [
      {
        path: '',
        redirectTo: 'therapies',
        pathMatch: 'full'
      },
      {
        path: 'cities',
        loadComponent: () => import('./city/city.component').then(m => m.CityComponent),
        data: {
          title: 'Cities'
        }
      },

      {
        path: 'countries',
        loadComponent: () => import('./country/country.component').then(m => m.CountryComponent),
        data: {
          title: 'Countries'
        }
      },
      {
        path: 'disorders',
        loadComponent: () => import('./disorder/disorder.component').then(m => m.DisorderComponent),
        data: {
          title: 'Disorders'
        }
      },
      {
        path: 'documents-types',
        loadComponent: () => import('./document-type/document-type.component').then(m => m.DocumentTypeComponent),
        data: {
          title: 'Document types'
        }
      },
      {
        path: 'notification-history',
        loadComponent: () => import('./notification-history/notification-history.component').then(m => m.NotificationHistoryComponent),
        data: {
          title: 'Notification History'
        }
      },
      {
        path: 'notification-scheduling',
        loadComponent: () => import('./notification-scheduling/notification-scheduling.component').then(m => m.NotificationSchedulingComponent),
        data: {
          title: 'Scheduling'
        }
      },
      {
        path: 'psychologists',
        loadComponent: () => import('./psychologist/psychologist.component').then(m => m.PsychologistComponent),
        data: {
          title: 'Psychologists'
        }
      },
      {
        path: 'resources',
        loadComponent: () => import('./resource/resource.component').then(m => m.ResourceComponent),
        data: {
          title: 'Resources'
        }
      },
      {
        path: 'resourcesDisorder',
        loadComponent: () => import('./resources-disorder/resources-disorder.component').then(m => m.ResourcesDisorderComponent),
        data: {
          title: 'ResourcesDisorder'
        }
      },
      {
        path: 'states',
        loadComponent: () => import('./state/state.component').then(m => m.StateComponent),
        data: {
          title: 'States'
        }
      },
      {
        path: 'therapies',
        loadComponent: () => import('./therapy/therapy.component').then(m => m.TherapyComponent),
        data: {
          title: 'Therapies'
        }
      },
      {
        path: 'users',
        loadComponent: () => import('./user/user.component').then(m => m.UserComponent),
        data: {
          title: 'Users'
        }
      }
    ]
  }
];
