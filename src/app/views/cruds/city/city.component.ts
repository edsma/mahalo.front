import { Component } from '@angular/core';

import {CustomTableComponent} from '../../custom-table/custom-table.component';
import {environment} from '../../../../environments/environment';
import { ParamsCustomTable } from './../../../models/params-custom-table';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})
export class CityComponent {

  params: ParamsCustomTable = {
    title: 'CITIES',
    path: `${environment.apiUrl}${environment.path.cities}`,
    id: 'id',
    jsonColumns: [
      'id',
      'name',
      'isActive',
      'creationDate',
    ],
    textHeaders: {
      id: 'id',
      name: 'Name',
      isActive: 'Is Active',
      creationDate: 'Creation Date',      
    },
    dataType: {
      id: 'number',
      name: 'string',
      isActive: 'boolean',
      creationDate: 'date',      
    },
  };

  /*
  params: ParamsCustomTable = {
    title: 'CITIES',
    path: `${environment.apiUrl}${environment.path.cities}`,
    id: 'id',
    jsonColumns: [
      'id',
      'name',
      'year',
      'color',
      'pantone_value',
    ],
    textHeaders: {
      name: 'Name',
      year: 'Year',
      color: 'Color',
      pantone_value: 'Pantone',
    },
  };
  */
}