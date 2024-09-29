import { Component } from '@angular/core';

import {CustomTableComponent} from '../../custom-table/custom-table.component';
import {environment} from '../../../../environments/environment';
import { ParamsCustomTable } from './../../../models/params-custom-table';

@Component({
  selector: 'app-state',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss'
})
export class StateComponent {

  params: ParamsCustomTable = {
    title: 'STATES',
    path: `${environment.apiUrl}${environment.path.states}`,
    id: 'id',
    jsonColumns: [
      'id',
      'name',
      'isActive',
      'creationDate'
    ],
    textHeaders: {
      id: 'Id',
      name: 'State',
      isActive: 'Is Active',
      creationDate: 'Creation Date'
    }
  };
}
