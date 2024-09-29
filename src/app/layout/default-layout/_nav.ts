import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Components',
    title: true,    
  },
  {
    name: 'Cruds',
    url: '/cruds',
    iconComponent: { name: 'cil-puzzle' },
    badge: {
      color: 'warning',
      text: 'NEW'
    },
    children: [      
      {
        name: 'City',
        url: '/cruds/cities',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Country',
        url: '/cruds/countries',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Disorder',
        url: '/cruds/disorders',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'DocumentsTypes',
        url: '/cruds/documents-types',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Notification History',
        url: '/cruds/notification-history',
        icon: 'nav-icon-bullet'
      },
      /*
      {
        name: 'Scheduling',
        url: '/cruds/notification-scheduling',
        icon: 'nav-icon-bullet'
      },
      */
      {
        name: 'psychologists',
        url: '/cruds/psychologists',
        icon: 'nav-icon-bullet'
      },
      /*
      {
        name: 'State',
        url: '/cruds/states',
        icon: 'nav-icon-bullet'
      },
      */
      {
        name: 'Therapy',
        url: '/cruds/therapies',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'User',
        url: '/cruds/users',
        icon: 'nav-icon-bullet'
      },
    ]
  },  
];
