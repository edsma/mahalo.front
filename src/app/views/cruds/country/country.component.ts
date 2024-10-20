import { Component } from '@angular/core';


import {CustomTableComponent} from '../../custom-table/custom-table.component';
import {environment} from '../../../../environments/environment';
import { ParamsCustomTable } from './../../../models/params-custom-table';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {

  params:  ParamsCustomTable = {
    type: 'Countries',
    title: 'COUNTRIES', // Cambié a 'COUNTRIES' según la entidad
    path: `${environment.apiUrl}${environment.path.countries}`, // Asegúrate de que la URL sea correcta
    id: 'id',
    jsonColumns: [
      'id',
      'name', // Cambié a 'name' según la propiedad de Country
      'isActive', // Cambié a 'isActive'
      'creationDate' // Cambié a 'creationDate'
    ],
    textHeaders: {
      id: 'Id',
      name: 'Country', // Cambié a 'Country' según el atributo Display
      isActive: 'Is Active', // Cambié a 'Is Active'
      creationDate: 'Creation Date' // Cambié a 'Creation Date'
    },
    dataType: {
      id: 'number',
      name: 'string',
      isActive: 'boolean',
      creationDate: 'date'
    }
  };
}
