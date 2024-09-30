import { Component } from '@angular/core';

import {CustomTableComponent} from '../../custom-table/custom-table.component';
import {environment} from '../../../../environments/environment';
import { ParamsCustomTable } from './../../../models/params-custom-table';

@Component({
  selector: 'app-disorder',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './disorder.component.html',
  styleUrl: './disorder.component.scss'
})
export class DisorderComponent {

  params: ParamsCustomTable = {
    title: 'DISORDERS',
    path: `${environment.apiUrl}${environment.path.disorders}`,
    id: 'id',
    jsonColumns: [
      'id',
      'name',
      'isActive',
      'creationDate'
    ],
    textHeaders: {
      id: 'Id',
      name: 'Disorder',
      isActive: 'Is Active',
      creationDate: 'Creation Date'
    },
    dataType: {
      id: 'number',
      name: 'string',
      isActive: 'boolean',
      creationDate: 'date'
    }
  };
}
