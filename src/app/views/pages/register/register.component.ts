import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';

import {RegisterService} from '../../../services/register.service';
import { ToastrService } from 'ngx-toastr';

import {environment} from '../../../../environments/environment';
import {RegisterDTO} from '../../../models/registerDto'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class RegisterComponent {

  data: RegisterDTO;

  constructor(private registerService: RegisterService,
    private toasterService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  save(){
    this.registerService.createUser(this.data)
    .subscribe({
      next: (result: any) => {
        this.toasterService.success(`User created successfully`, 'Mahalo');
      },
      error: (err) => {
          this.toasterService.error(`Error creating user. Details: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
      },
    });
  }
}
