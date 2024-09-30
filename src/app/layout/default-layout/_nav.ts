import { INavData } from '@coreui/angular';
import { TranslateService } from '@ngx-translate/core';

export function getNavItems(translate: TranslateService): INavData[]
{
return [
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
        name: translate.instant('City'),
        url: '/cruds/cities',
        icon: 'nav-icon-bullet'
      },
      {
        name: translate.instant('Country'),
        url: '/cruds/countries',
        icon: 'nav-icon-bullet'
      },
      {
        name: translate.instant('Disorder'),
        url: '/cruds/disorders',
        icon: 'nav-icon-bullet'
      },
      {
        name: translate.instant('DocumentsTypes'),
        url: '/cruds/documents-types',
        icon: 'nav-icon-bullet'
      },
      {
        name: translate.instant('NotificationHistory'),
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
        name: translate.instant('psychologists'),
        url: '/cruds/psychologists',
        icon: 'nav-icon-bullet'
      },
      {
        name: translate.instant('State'),
        url: '/cruds/states',
        icon: 'nav-icon-bullet'
      },
      {
        name: translate.instant('Therapy'),
        url: '/cruds/therapies',
        icon: 'nav-icon-bullet'
      },
      {
        name: translate.instant('User'),
        url: '/cruds/users',
        icon: 'nav-icon-bullet'
      },
    ]
  },
];
}
