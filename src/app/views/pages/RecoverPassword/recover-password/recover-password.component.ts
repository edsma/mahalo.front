import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonDirective, CardBodyComponent, CardComponent, CardGroupComponent, ColComponent, ContainerComponent, FormControlDirective, FormDirective, INavData, InputGroupComponent, InputGroupTextDirective, RowComponent, ShadowOnScrollDirective, SidebarBrandComponent, SidebarComponent, SidebarFooterComponent, SidebarHeaderComponent, SidebarNavComponent, SidebarToggleDirective, SidebarTogglerDirective, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { NgScrollbar } from 'ngx-scrollbar';
import { DefaultHeaderComponent } from "../../../../layout/default-layout/default-header/default-header.component";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DefaultFooterComponent } from 'src/app/layout';
import { TranslateService } from '@ngx-translate/core';
import { getNavItems } from 'src/app/layout/default-layout/_nav';

import { TranslationModule } from 'src/app/services/Transalation.module';
import { ParamsCustomTable } from '../../../../models/params-custom-table';
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
    private fb: FormBuilder,
    private localService: LocalService,
    private router: Router){
    this.loadNavItems();
  }


  ngOnInit(): void {
    // Inicializar el formulario con los controles de 'oldPassword' y 'newPassword'
    this.validateSesion();
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]], // Campo obligatorio
      newPassword: ['', [Validators.required]]  // Campo obligatorio
    });
  }

  validateSesion(){
    if(!this.localService.getData("email")){
      this.router.navigateByUrl("/login");
    }else{
      const screens: string = this.localService.getData("screens") || '';
      let options: string[] =  screens.split(','); 
      if(!options.includes('Renews')){
        this.router.navigateByUrl("/404");
      }
    }
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
