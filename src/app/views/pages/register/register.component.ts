import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';

import {RegisterService} from '../../../services/register.service';
import { ToastrService } from 'ngx-toastr';

import {environment} from '../../../../environments/environment';
import {RegisterDTO} from '../../../models/registerDto'

import { ActivatedRoute, RouterModule, RouterOutlet, Router, } from '@angular/router';

import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { LanguageVariant } from 'typescript';
import { ListService } from 'src/app/services/list.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, ReactiveFormsModule, RouterModule, RouterOutlet ]
})
export class RegisterComponent {

  data: RegisterDTO;
  registerForm: FormGroup;

  cities: any[];
  pathCities: string;
  documentTypes: any[];
  pathDocumentTypes: string;

  constructor(private registerService: RegisterService,
    private toasterService: ToastrService,
    private listService: ListService,
    private router: Router
  ) {

    this.fillCities();
    this.fillDocumentTypes();
    //console.log(this.documentTypes);
   }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      userType: new FormControl('', [Validators.required]),
      cityId: new FormControl(''),
      photo: new FormControl(''),
      documentTypeId: new FormControl(''),
      documentNumber: new FormControl('', [Validators.required]),
    });

  }

  save(){
    this.data = this.registerForm.value;
    this.data.userType =  Number(this.data.userType);
    this.data.cityId = 1;
    this.data.documentTypeId = 1;
    debugger;
    this.registerService.createUser(this.data)
    .subscribe({
      next: (result: any) => {
        this.router.navigateByUrl('/login');
        this.toasterService.success(`User created successfully`, 'Mahalo');
      },
      error: (err) => {
          this.toasterService.error(`Error creating user. Details: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
      },
    });
  }

  fillCities(){
    this.pathCities = `${environment.apiUrl}${environment.path.cities}`;
    this.listService.getList(this.pathCities)
    .subscribe({
      next: (result: any) => {
        this.cities = result;
      }
    });
  }

  fillDocumentTypes(){
    this.pathDocumentTypes = `${environment.apiUrl}${environment.path.documentsTypes}`;
    this.listService.getList(this.pathDocumentTypes)
    .subscribe({
      next: (result: any) => {
        this.documentTypes = [...result];
      }
    });
  }
}
