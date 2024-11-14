import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  INavData,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
 import { getNavItems } from './_nav';
import { TranslationModule } from 'src/app/services/Transalation.module';
import { LocalService } from 'src/app/services/local.service';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    TranslationModule,
    SidebarBrandComponent,
    RouterLink,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    DropdownDividerDirective,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent
  ]
})
export class DefaultLayoutComponent {
  public navItems: INavData[] | undefined;

  language: string = this.getNavigatorLang();
  public copyNavItems: INavData[] | undefined;
  constructor(private translate: TranslateService,
    private localService: LocalService,
    private cdr: ChangeDetectorRef
  ){


    this.loadNavItems();
    this.translate.use('es');
  }

  private getNavigatorLang(): string {
    const lang = navigator.language || navigator.languages[0]; // Obtener el idioma del navegador
    return lang.split('-')[0]; // Retorna solo el c�digo del idioma (por ejemplo, "en" en lugar de "en-US")
  }

  ngOnInit(): void {
    //this.getBrowserLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadNavItems();
    });

  }

  changeLanguage(lang: string){
    this.language = lang;
    localStorage.setItem('language', lang);
    this.translate.use(this.language); // Cambia esto si deseas otro idioma por defecto
    this.translate.use(this.language).subscribe(() => {
      this.cdr.detectChanges(); // Fuerza la actualización
    });
  }

  loadNavItems(): void {
    this.copyNavItems = [];
    const screens: string = this.localService.getData("screens") || '';
    let options: string[] =  screens.split(',');
    this.navItems = getNavItems(this.translate);
    for( var it of this.navItems ){
      if(it.children && options.includes(it.name)){
        it.children = it.children.filter( ch => options.includes(ch.screen || ''));
        this.copyNavItems.push(it);
      }
    }
  }


  // private getBrowserLang() {
  //   let result = this.getNavigatorLang();
  //   //this.translate.use(result); // Cambia esto si deseas otro idioma por defecto
  // }


  // private getNavigatorLang(): string {
  //   const lang = navigator.language || navigator.languages[0]; // Obtener el idioma del navegador
  //   return lang.split('-')[0]; // Retorna solo el c�digo del idioma (por ejemplo, "en" en lugar de "en-US")
  // }


  onScrollbarUpdate($event: any) {
    // this.getBrowserLang();
    // if ($event.verticalUsed) {
    // }
  }
}
