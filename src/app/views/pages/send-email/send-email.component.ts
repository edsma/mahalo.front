import { NgStyle } from '@angular/common';
import { ButtonDirective, CardBodyComponent, CardComponent, CardGroupComponent, ColComponent, ContainerComponent, FormControlDirective, FormDirective, INavData, InputGroupComponent, InputGroupTextDirective, RowComponent, ShadowOnScrollDirective, SidebarBrandComponent, SidebarComponent, SidebarFooterComponent, SidebarHeaderComponent, SidebarNavComponent, SidebarToggleDirective, SidebarTogglerDirective, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { NgScrollbar } from 'ngx-scrollbar';
import { DefaultHeaderComponent } from "../../../layout/default-layout/default-header/default-header.component";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DefaultFooterComponent } from 'src/app/layout';
import { TranslateService } from '@ngx-translate/core';
import { getNavItems } from 'src/app/layout/default-layout/_nav';

import { TranslationModule } from 'src/app/services/Transalation.module';
import { ParamsCustomTable } from '../../../models/params-custom-table';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalService } from 'src/app/services/local.service';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent,
    FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective,
     NgStyle, DefaultHeaderComponent,
     NgScrollbar,
     TranslationModule,
     ShadowOnScrollDirective,
     RouterOutlet,
     DefaultFooterComponent,
     SidebarNavComponent,
     SidebarFooterComponent,
     RouterLink,
     SidebarToggleDirective,
     SidebarComponent,
     ReactiveFormsModule,
     SidebarHeaderComponent,
     SidebarBrandComponent,
     SidebarTogglerDirective,],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss'
})
export class SendEmailComponent {
  sendEmailForm: FormGroup;
  public navItems: INavData[] | undefined;
  constructor(private translate: TranslateService,
    private dataService: DataService,
    private fb: FormBuilder,
    private localService: LocalService,
    private router: Router){
    //this.loadNavItems();
  }

  language: string;

  ngOnInit(): void {
    this.language =  localStorage.getItem('language')?? 'es';
    this.translate.use(this.language);
    this.sendEmailForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]], // Campo obligatorio
      language: [this.language, [Validators.required]]  // Campo obligatorio
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

  onScrollbarUpdate($event: any) {
    // this.getBrowserLang();
    // if ($event.verticalUsed) {
    // }
  }

  onSubmit(): void {
    if (this.sendEmailForm.valid) {
      const formData = this.sendEmailForm.value;
      let params =  {
        path: `${environment.apiUrl}${environment.path.accounts}/RecoverPassword`,
        model: formData,
      };
      this.dataService.addItemWithOutTable(params,this.translate);

      // Lógica adicional para enviar datos al servidor o al servicio
    } else {
      console.log('Formulario inválido');
    }

  }
}
