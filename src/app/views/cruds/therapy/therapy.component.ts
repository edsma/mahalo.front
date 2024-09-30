import { Component } from '@angular/core';

import {CustomTableComponent} from '../../custom-table/custom-table.component';
import {environment} from '../../../../environments/environment';
import { ParamsCustomTable } from './../../../models/params-custom-table';


@Component({
  selector: 'app-therapy',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './therapy.component.html',
  styleUrl: './therapy.component.scss'
})
export class TherapyComponent {

  params: ParamsCustomTable = {
    title: 'TERAPIES',
    path: `${environment.apiUrl}${environment.path.therapies}`,
    id: 'id',
    jsonColumns: [
      'id',
      'hourTerapy',
      'name',
      'isActive'
    ],
    textHeaders: {
      id: 'Id',
      hourTerapy: 'Hour Therapy',
      name: 'Name',
      isActive: 'Is Active'
    },
    dataType: {
      id: 'number',
      hourTerapy: 'dateTime',
      name: 'string',
      isActive: 'date'
    }
  };
}
