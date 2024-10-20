import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonDirective, CardBodyComponent, CardComponent, CardGroupComponent, ColComponent, ContainerComponent, FormControlDirective, FormDirective, INavData, InputGroupComponent, InputGroupTextDirective, RowComponent, ShadowOnScrollDirective, SidebarBrandComponent, SidebarComponent, SidebarFooterComponent, SidebarHeaderComponent, SidebarNavComponent, SidebarToggleDirective, SidebarTogglerDirective, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { NgScrollbar } from 'ngx-scrollbar';
import { DefaultHeaderComponent } from "../../../../layout/default-layout/default-header/default-header.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { DefaultFooterComponent } from 'src/app/layout';
import { TranslateService } from '@ngx-translate/core';
import { getNavItems } from 'src/app/layout/default-layout/_nav';

import { TranslationModule } from 'src/app/services/Transalation.module';
import { ParamsCustomTable } from '../../../../models/params-custom-table';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-recover-password',
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

  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss',

})
export class RecoverPasswordComponent {
  changePasswordForm: FormGroup;
  public navItems: INavData[] | undefined;
  constructor(private translate: TranslateService,
    private dataService: DataService,
    private fb: FormBuilder){
    this.loadNavItems();
  }


  ngOnInit(): void {
    let language =  localStorage.getItem('language')?? 'es';
    this.translate.use(language);
    // Inicializar el formulario con los controles de 'oldPassword' y 'newPassword'
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]], // Campo obligatorio
      newPassword: ['', [Validators.required]]  // Campo obligatorio
    });
  }

  loadNavItems(): void {
    this.navItems = getNavItems(this.translate);  // Regenera el menú con el idioma actual
  }

  onScrollbarUpdate($event: any) {
    // this.getBrowserLang();
    // if ($event.verticalUsed) {
    // }
  }

  onSubmit(): void {
    debugger;
    if (this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value;
      let params =  {
        path: `${environment.apiUrl}${environment.path.accounts}/changePassword`,
        model: {
          CurrentPassword: formData.oldPassword,
          NewPassword: formData.newPassword,
          Confirm: ''
        },
      };
      this.dataService.addItemWithOutTable(params,this.translate);

      // Lógica adicional para enviar datos al servidor o al servicio
    } else {
      console.log('Formulario inválido');
    }

  }
}
