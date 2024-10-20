import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
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
import { Observable, ReplaySubject } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { TranslationModule } from 'src/app/services/Transalation.module';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [ContainerComponent,TranslationModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, ReactiveFormsModule, RouterModule, RouterOutlet ]
})
export class RegisterComponent implements AfterViewInit {

  data: RegisterDTO;
  registerForm: FormGroup;

  cities: any[] = [];
  pathCities: string;
  documentTypes: any[] = [];
  pathDocumentTypes: string;
  numbers: number[] = [];

  constructor(private registerService: RegisterService,
    private toasterService: ToastrService,

    private translate: TranslateService,
    private listService: ListService,
    private router: Router
  ) {
    //console.log(this.documentTypes);
    let language =  localStorage.getItem('language')?? 'es';
    this.translate.use(language);
    this.numbers = Array.from({ length: 10 }, (_, i) => i + 1);
   }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.use(event.lang);
    });
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

  ngAfterViewInit(): void {
    this.fillCities();
    this.fillDocumentTypes();
  }

  save(){
    this.data = this.registerForm.value;
    this.data.userType =  Number(this.data.userType);
    this.data.cityId = 1;
    this.data.documentTypeId = 1;
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
        this.cities = [...result];
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

  base64Output : string;

  onFileSelected(event) {
    if(event.target.files.length == 1){
      this.convertFile(event.target.files[0]).subscribe(base64 => {
        this.base64Output = "data:image/*;base64, "+ base64;
        this.registerForm.get("photo").setValue(base64);
      });
    }else{
      this.registerForm.get("photo").setValue(null);
      this.base64Output = "";
    }
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result?.toString()));
    return result;
  }
}
