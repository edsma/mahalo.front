import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet, Router, RouterLink, RouterLinkActive} from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
  ProgressBarDirective,
  ProgressComponent,
  SidebarToggleDirective,
  TextColorDirective,
  ThemeDirective
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { TranslationModule } from 'src/app/services/Transalation.module';
import { LoginService } from 'src/app/services/login.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
    imports: [ContainerComponent, TranslationModule, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent, NavItemComponent, NavLinkDirective, RouterLink, RouterLinkActive, NgTemplateOutlet, BreadcrumbRouterComponent, ThemeDirective, DropdownComponent, DropdownToggleDirective, TextColorDirective, AvatarComponent, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective, BadgeComponent, DropdownDividerDirective, ProgressBarDirective, ProgressComponent, NgStyle,
    CommonModule,
    NgIf,    
  ]
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {


  photo: string;

  constructor(private translate: TranslateService,
    private loginService: LoginService,
    private localService: LocalService,
  ) {

    super();
     this.getBrowserLang();

  }
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.use(event.lang);
    });
    this.loadProfilePhoto();
  }

  loadProfilePhoto(){
    this.localService.getData("photo");
  }

  logout(){
    this.loginService.logout();
  }

  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  language: string = this.getNavigatorLang();

  readonly colorModes = [
    { name: 'light', text: this.translate.instant('Light'), icon: 'cilSun' },
    { name: 'dark', text: this.translate.instant('Dark'), icon: 'cilMoon' },
    { name: 'auto', text: this.translate.instant('Auto'), icon: 'cilContrast' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });

  changeLanguage(lang: string){
    this.language = lang;
    localStorage.setItem('language', lang);
    this.translate.use(this.language); // Cambia esto si deseas otro idioma por defecto
  }

  sidebarId = input('sidebar1');

  public newMessages = [
    {
      id: 0,
      from: 'Jessica Williams',
      avatar: '7.jpg',
      status: 'success',
      title: 'Urgent: System Maintenance Tonight',
      time: 'Just now',
      link: 'apps/email/inbox/message',
      message: 'Attention team, we\'ll be conducting critical system maintenance tonight from 10 PM to 2 AM. Plan accordingly...'
    },
    {
      id: 1,
      from: 'Richard Johnson',
      avatar: '6.jpg',
      status: 'warning',
      title: 'Project Update: Milestone Achieved',
      time: '5 minutes ago',
      link: 'apps/email/inbox/message',
      message: 'Kudos on hitting sales targets last quarter! Let\'s keep the momentum. New goals, new victories ahead...'
    },
    {
      id: 2,
      from: 'Angela Rodriguez',
      avatar: '5.jpg',
      status: 'danger',
      title: 'Social Media Campaign Launch',
      time: '1:52 PM',
      link: 'apps/email/inbox/message',
      message: 'Exciting news! Our new social media campaign goes live tomorrow. Brace yourselves for engagement...'
    },
    {
      id: 3,
      from: 'Jane Lewis',
      avatar: '4.jpg',
      status: 'info',
      title: 'Inventory Checkpoint',
      time: '4:03 AM',
      link: 'apps/email/inbox/message',
      message: 'Team, it\'s time for our monthly inventory check. Accurate counts ensure smooth operations. Let\'s nail it...'
    },
    {
      id: 3,
      from: 'Ryan Miller',
      avatar: '4.jpg',
      status: 'info',
      title: 'Customer Feedback Results',
      time: '3 days ago',
      link: 'apps/email/inbox/message',
      message: 'Our latest customer feedback is in. Let\'s analyze and discuss improvements for an even better service...'
    }
  ];

  private getNavigatorLang(): string {
    const lang = navigator.language || navigator.languages[0]; // Obtener el idioma del navegador
    return lang.split('-')[0]; // Retorna solo el c�digo del idioma (por ejemplo, "en" en lugar de "en-US")
  }

  private getBrowserLang() {
    let result = this.getNavigatorLang();
    this.translate.use(result);
    this.translate.currentLang = result;
  }

  public newNotifications = [
    { id: 0, title: 'New user registered', icon: 'cilUserFollow', color: 'success' },
    { id: 1, title: 'User deleted', icon: 'cilUserUnfollow', color: 'danger' },
    { id: 2, title: 'Sales report is ready', icon: 'cilChartPie', color: 'info' },
    { id: 3, title: 'New client', icon: 'cilBasket', color: 'primary' },
    { id: 4, title: 'Server overloaded', icon: 'cilSpeedometer', color: 'warning' }
  ];

  public newStatus = [
    { id: 0, title: 'CPU Usage', value: 25, color: 'info', details: '348 Processes. 1/4 Cores.' },
    { id: 1, title: 'Memory Usage', value: 70, color: 'warning', details: '11444GB/16384MB' },
    { id: 2, title: 'SSD 1 Usage', value: 90, color: 'danger', details: '243GB/256GB' }
  ];

  public newTasks = [
    { id: 0, title: 'Upgrade NPM', value: 0, color: 'info' },
    { id: 1, title: 'ReactJS Version', value: 25, color: 'danger' },
    { id: 2, title: 'VueJS Version', value: 50, color: 'warning' },
    { id: 3, title: 'Add new layouts', value: 75, color: 'info' },
    { id: 4, title: 'Angular Version', value: 100, color: 'success' }
  ];

}
