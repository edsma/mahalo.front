import { Component } from '@angular/core';

import {CustomTableComponent} from '../../custom-table/custom-table.component';
import {environment} from '../../../../environments/environment';
import { ParamsCustomTable } from './../../../models/params-custom-table';


@Component({
  selector: 'app-document-type',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './document-type.component.html',
  styleUrl: './document-type.component.scss'
})
export class DocumentTypeComponent {

  params: ParamsCustomTable = {
    title: 'DOCUMENT TYPES',
    path: `${environment.apiUrl}${environment.path.documentsTypes}`,
    id: 'id',
    jsonColumns: [
      'id',
      'name',
      'abbreviation',
      'isActive'
    ],
    textHeaders: {
      id: 'Id',
      name: 'Document Type',
      abbreviation: 'Abbreviation',
      isActive: 'Is Active'
    },
    dataType: {
      id: 'number',
      name: 'string',
      abbreviation: 'string',
      isActive: 'boolean'
    }
  };
}
