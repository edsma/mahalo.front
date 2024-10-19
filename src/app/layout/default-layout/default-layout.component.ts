import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  INavData,
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
  constructor(private translate: TranslateService,
    private localService: LocalService
  ){


    this.loadNavItems();
  }

  ngOnInit(): void {
    //this.getBrowserLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadNavItems();
    });

  }

  loadNavItems(): void {
    const screens: string = this.localService.getData("screens") || '';
    let options: string[] =  screens.split(','); 
    this.navItems = getNavItems(this.translate);
    for( var it of this.navItems ){
      if(it.children){
        it.children = it.children.filter( ch => options.includes(ch.screen || ''));
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
