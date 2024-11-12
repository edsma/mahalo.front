import { Component } from '@angular/core';
import {CustomTableComponent} from '../../custom-table/custom-table.component';
import { ParamsCustomTable } from './../../../models/params-custom-table';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-resources-disorder',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './resources-disorder.component.html',
  styleUrl: './resources-disorder.component.scss'
})
export class ResourcesDisorderComponent {
  params: ParamsCustomTable = {
    type: 'ResourcesDisorder',
    title: 'RESOURCESDISORDER',
    path: `${environment.apiUrl}${environment.path.resourcesDisorder}`,
    id: 'id',
    jsonColumns: [
      'id',
      'name',
      'creationDate', 
      'isActive',
      'disorder',
      'resource'
    ],
    textHeaders: {
      id: 'Id',
      name: 'Name',
      creationDate: 'CreationDate',
      isActive: 'Is Active',
      disorder: 'Disorder',
      resource: 'Resource'
    },
    dataType: {
      id: 'number',
      name: 'string',
      creationDate: 'dateTime',
      isActive: 'boolean',
      disorder: 'string',
      resource: 'string'
    }
  };
}
