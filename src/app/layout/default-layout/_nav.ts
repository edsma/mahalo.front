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
        screen: 'Cities',
        name: translate.instant('Cities'),
        url: '/cruds/cities',
        icon: 'nav-icon-bullet'
      },
      {
        screen: 'Countries',
        name: translate.instant('Countries'),
        url: '/cruds/countries',
        icon: 'nav-icon-bullet'
      },
      {
        screen: 'Disorders',
        name: translate.instant('Disorders'),
        url: '/cruds/disorders',
        icon: 'nav-icon-bullet'
      },
      {
        screen: 'Document Types',
        name: translate.instant('Document Types'),
        url: '/cruds/documents-types',
        icon: 'nav-icon-bullet'
      },
      {
        screen: 'Notification History',
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
        screen: 'Psychologists',
        name: translate.instant('Psychologists'),
        url: '/cruds/psychologists',
        icon: 'nav-icon-bullet'
      },
      {
        screen: 'States',
        name: translate.instant('States'),
        url: '/cruds/states',
        icon: 'nav-icon-bullet'
      },
      {
        screen: 'Therapies',
        name: translate.instant('Therapies'),
        url: '/cruds/therapies',
        icon: 'nav-icon-bullet'
      },
      {
        screen: 'Users',
        name: translate.instant('Users'),
        url: '/cruds/users',
        icon: 'nav-icon-bullet'
      },
    ]
  },
];
}
