import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';
import { NgScrollbar } from 'ngx-scrollbar';

import {ProfileDTO} from '../../../models/profileDto'
import { LocalService } from 'src/app/services/local.service';

import { IconDirective } from '@coreui/icons-angular';
import { DefaultHeaderComponent } from "../../../layout/default-layout/default-header/default-header.component";
import { DefaultFooterComponent } from 'src/app/layout';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getNavItems } from 'src/app/layout/default-layout/_nav';

import { TranslationModule } from 'src/app/services/Transalation.module';

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
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  data: ProfileDTO;

  public navItems: INavData[] | undefined;

  constructor(private translate: TranslateService,
    private profileService: ProfileService,
    private toasterService: ToastrService,
    private localService: LocalService
  ) {
    this.loadNavItems();
  }

  ngOnInit(): void {
  }

  update(){
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
}
