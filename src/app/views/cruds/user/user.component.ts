import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';

import {CustomTableComponent} from '../../custom-table/custom-table.component';
import {environment} from '../../../../environments/environment';
import { ParamsCustomTable } from './../../../models/params-custom-table';


@Component({
  selector: 'app-user',
  standalone: true,  
  imports: [CustomTableComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  params: ParamsCustomTable = {
    title: 'USERS',
    path: `${environment.apiUrl}${environment.path.users}`,
    id: 'id',
    jsonColumns: [
      'id',
      'name',
      'email',
      'creationDate',
      'isActive'
    ],
    textHeaders: {
      id: 'Id',
      name: 'Name',
      email: 'Email',
      creationDate: 'Creation Date',
      isActive: 'Is Active'
    }
  };
}
