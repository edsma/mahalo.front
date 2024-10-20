import { NgStyle, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';
import { NgScrollbar } from 'ngx-scrollbar';

import {ProfileDTO} from '../../../models/profileDto'
import { LocalService } from 'src/app/services/local.service';

import { IconDirective } from '@coreui/icons-angular';
import { DefaultHeaderComponent } from "../../../layout/default-layout/default-header/default-header.component";
import { DefaultFooterComponent } from 'src/app/layout';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getNavItems } from 'src/app/layout/default-layout/_nav';

import { TranslationModule } from 'src/app/services/Transalation.module';
import {environment} from '../../../../environments/environment';

import { ListDTO } from '../../../models/listDTO'

import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,
  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective,
  FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, ProgressBarDirective,
  ProgressComponent as ProgressComponent_1, ProgressBarComponent, ProgressStackedComponent,
  FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,
  ButtonGroupComponent,  ButtonToolbarComponent, InputGroupComponent, InputGroupTextDirective, ThemeDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective,
  FormFloatingDirective, FormSelectDirective, GutterDirective, INavData, ShadowOnScrollDirective, SidebarBrandComponent, SidebarComponent, SidebarFooterComponent, SidebarHeaderComponent, SidebarNavComponent, SidebarToggleDirective, SidebarTogglerDirective,
  ContainerComponent, CardGroupComponent,
} from '@coreui/angular';
import { TranslateService } from '@ngx-translate/core';
import { ListService } from 'src/app/services/list.service';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective,
    //FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective
    ProgressBarDirective, ProgressComponent_1, ProgressBarComponent, ProgressStackedComponent,
    FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective,
    ButtonGroupComponent,  ButtonToolbarComponent, InputGroupComponent, InputGroupTextDirective, ThemeDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective,
    FormFloatingDirective, FormSelectDirective, GutterDirective, ContainerComponent, CardGroupComponent,

    IconDirective, NgStyle, DefaultHeaderComponent,
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
     SidebarTogglerDirective,
     NgFor,
     NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements AfterViewInit {

  data: ProfileDTO;
  profileForm: FormGroup;

  cities: any[];
  pathCities: string;
  documentTypes: any[] = [];
  pathDocumentTypes: string;

  photo: string;

  public navItems: INavData[] | undefined;

  constructor(private translate: TranslateService,
    private profileService: ProfileService,
    private toasterService: ToastrService,
    private localService: LocalService,
    private listService: ListService,
    private router: Router
  ) {
    this.loadNavItems();
  }

  ngAfterViewInit(): void {
    this.fillCities();
    this.fillDocumentTypes();
    this.getPerfil();

  }

  ngOnInit(): void {
    this.validateSesion();
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      userType: new FormControl('', [Validators.required]),
      cityId: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required]),
      documentTypeId: new FormControl('', [Validators.required]),
      documentNumber: new FormControl('', [Validators.required]),
    });
  }

  validateSesion(){
    if(!this.localService.getData("email")){
      this.router.navigateByUrl("/login");
    }else{
      const screens: string = this.localService.getData("screens") || '';
      let options: string[] =  screens.split(',');
      if(!options.includes('Profiles')){
        this.router.navigateByUrl("/404");
      }
    }
  }

  update(){
    this.data = this.profileForm.value;
    this.profileService.updateProfile(this.data)
    .subscribe({
      next: (result: any) => {
        this.toasterService.success(`Profile updated successfully`, 'Mahalo');
      },
      error: (err) => {
          this.toasterService.error(`Error updating profile. Details: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
      },
    });
  }

  getProfile(){
    const email = ( this.localService.getData("email") || '' );
    this.profileService.getProfile(email)
    .subscribe({
      next: (result: any) => {
        this.data = result;
        //this.toasterService.success(`Profile updated successfully`, 'Mahalo');
      },
      error: (err) => {
          this.toasterService.error(`Error getting profile. Details: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
      },
    });
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

  getPerfil(){
    this.pathCities = `${environment.apiUrl}${environment.path.cities}`;
    const email = this.localService.getData("email");
    this.profileService.getProfile(email)
    .subscribe({
      next: (result: any) => {
        this.profileForm.patchValue(result);
        this.base64Output =  result.photo;
      }
    });
  }


  base64Output : string;

  onFileSelected(event) {
    if(event.target.files.length == 1){
      this.convertFile(event.target.files[0]).subscribe(base64 => {
        this.base64Output = "data:image/*;base64, " + base64;
        this.profileForm.get("photo").setValue(base64);
      });
    }else{
      this.profileForm.get("photo").setValue(null);
      this.base64Output = this.localService.getData("photo")?? "";
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
