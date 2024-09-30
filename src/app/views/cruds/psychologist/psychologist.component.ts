import { Component } from '@angular/core';

import {CustomTableComponent} from '../../custom-table/custom-table.component';
import {environment} from '../../../../environments/environment';
import { ParamsCustomTable } from './../../../models/params-custom-table';


@Component({
  selector: 'app-psychologist',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './psychologist.component.html',
  styleUrl: './psychologist.component.scss'
})
export class PsychologistComponent {

  params: ParamsCustomTable = {
    title: 'PSYCHOLOGISTS',
    path: `${environment.apiUrl}${environment.path.psychologists}`,
    id: 'id',
    jsonColumns: [
      'id',
      'name',
      'address',
      'xCoordinate',
      'yCoordinate',
      'officeStart',
      'officeEnd',
      'terapyPrice',
      'isActive',
      'creationDate'
    ],
    textHeaders: {
      id: 'Id',
      name: 'Psychologist',
      address: 'Address',
      xCoordinate: 'X Coordinate',
      yCoordinate: 'Y Coordinate',
      officeStart: 'Office Start',
      officeEnd: 'Office End',
      terapyPrice: 'Therapy Price',
      isActive: 'Is Active',
      creationDate: 'Creation Date'
    },
    dataType: {
      id: 'number',
      name: 'string',
      address: 'string',
      xCoordinate: 'number',
      yCoordinate: 'number',
      officeStart: 'dateTime',
      officeEnd: 'dateTime',
      terapyPrice: 'number',
      isActive: 'boolean',
      creationDate: 'date'
    }
  };
}
