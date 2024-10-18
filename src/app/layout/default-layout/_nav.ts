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
        name: translate.instant('Cities'),
        url: '/cruds/cities',
        icon: 'nav-icon-bullet'
      },
      {
        name: translate.instant('Countries'),
        url: '/cruds/countries',
        icon: 'nav-icon-bullet'
      },
      {
        name: translate.instant('Disorders'),
        url: '/cruds/disorders',
        icon: 'nav-icon-bullet'
      },
      {
        name: translate.instant('Document Types'),
        url: '/cruds/documents-types',
        icon: 'nav-icon-bullet'
      },
      {
        name: translate.instant('Notification History'),
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
        name: translate.instant('States'),
        url: '/cruds/states',
        icon: 'nav-icon-bullet'
      },
      {
        name: translate.instant('Therapies'),
        url: '/cruds/therapies',
        icon: 'nav-icon-bullet'
      },
      {
        name: translate.instant('Users'),
        url: '/cruds/users',
        icon: 'nav-icon-bullet'
      },
    ]
  },
];
}
