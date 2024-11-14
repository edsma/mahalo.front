import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
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

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-confirm-account',
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
  templateUrl: './confirm-account.component.html',
  styleUrl: './confirm-account.component.scss'
})
export class ConfirmAccountComponent {
  changePasswordForm: FormGroup;
  token: string;
  idUser: string;
  public navItems: INavData[] | undefined;
  constructor(private translate: TranslateService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private localService: LocalService,
    private router: Router){
    //this.loadNavItems();
    }

    ngOnInit(): void {
      let language =  localStorage.getItem('language')?? 'es';
      this.translate.use(language);


      let params =  {
        path: `${environment.apiUrl}${environment.path.accounts}/ConfirmEmail`,
        model: {
          CurrentPassword: '',
          NewPassword: '',
          Confirm: '',
          Email : this.idUser,
          Token: this.token,
          ConfirmPassword : ''
        },
      };
           // Para obtener un parámetro específico, por ejemplo 'id':
           this.route.queryParamMap.subscribe(params => {
            this.idUser = params.get('userid');  // Obtén el valor de 'userid'
            this.token = params.get('token');  // Obtén el valor de 'userid'
          });
      console.log(params, this.idUser,this.token);
      this.dataService.getItemByParas(params,this.token,this.idUser, this.translate);


    }

    validateSesion(){
      if(!this.localService.getData("email")){
        this.router.navigateByUrl("/login");
      }else{
        const screens: string = this.localService.getData("screens") || '';
        let options: string[] =  screens.split(',');
        if(!options.includes('renew')){
          this.router.navigateByUrl("/404");
        }
      }
    }


    onScrollbarUpdate($event: any) {
      // this.getBrowserLang();
      // if ($event.verticalUsed) {
      // }
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

    onSubmit(): void {
      if (this.changePasswordForm.valid) {


        // Lógica adicional para enviar datos al servidor o al servicio
      } else {
      }

    }

}
