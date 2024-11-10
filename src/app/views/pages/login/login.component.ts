import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet, Router, } from '@angular/router';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { ToastrService } from 'ngx-toastr';
import { LocalService } from 'src/app/services/local.service';
import { LoginService } from 'src/app/services/login.service';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';


import { CommonModule, NgIf } from '@angular/common';

import {LoginDTO} from '../../../models/loginDto'
import { TranslationModule } from 'src/app/services/Transalation.module';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    providers: [provideNativeDateAdapter(),
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    ],
    imports: [ContainerComponent, RowComponent, ColComponent,
      TranslationModule,
      CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle,
      RouterModule, RouterOutlet, CommonModule, ReactiveFormsModule]
})
export class LoginComponent {

  data: LoginDTO;
  loginForm: FormGroup;

  constructor(private loginService: LoginService,
    private toasterService: ToastrService,
    private localService: LocalService,
    private translate: TranslateService,
    private router: Router) {
      let language =  localStorage.getItem('language')?? 'es';
      this.translate.use(language);

     }

    ngOnInit(): void {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.translate.use(event.lang);
      });

      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      });
    }

    login(){
      this.data = this.loginForm.value;
      this.loginService.login(this.data)
      .subscribe({
        next: (result: any) => {
          this.localService.saveData("email", this.data.email);
          this.localService.saveData("token", result.token, true);
          this.localService.saveData("expiration", result.expiration, true);
          this.localService.saveData("userType", result.userType!=undefined? result.userType.toString() : "-", true);
          this.localService.saveData("photo", result.photo);


          console.log("result.userType: ", result.userType);
          console.log("result.userType Decrypt: ", this.localService.getData("userType", true));
          let screens = '';
          console.log(result.userType);
          if(result.userType == 0){
            screens = 'Cities,Feeling,Countries,Disorders,Document Types,Notification History,Psychologists,States,Therapies,Users,Profiles,renew';
          }else{
              screens = 'Therapies,Profiles,renew';
          }
          this.localService.saveData("screens", screens);

          /*
          this.localService.saveData("email", "jperea@gmail.com");
          this.localService.saveData("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZWF0YW5nYWlmZUBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIkZpcnN0TmFtZSI6ImVkd2luIiwiTGFzdE5hbWUiOiJ0YW5nYXJpZmUiLCJQaG90byI6IiIsImV4cCI6MTczMTg5OTc0Nn0.W8oto-VbpkaPfBvg-wbgaGDciCPjd9ErRuSy0g6-mus", true);
          this.localService.saveData("expiration", "2024-11-18T03:15:46.3500983Z", true);
          this.localService.saveData("userType", "0", true);
          */

          this.router.navigateByUrl('/cruds/therapies');

          this.toasterService.success(`Successful login`, 'Mahalo');
        },
        error: (err) => {
            this.toasterService.error(`Failed login. Details: ${err.name} ${err.message}`, 'Mahalo');
        },
        complete() {
        },
      });
    }
}
