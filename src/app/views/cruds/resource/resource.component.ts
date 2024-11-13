import { Component } from '@angular/core';
import {CustomTableComponent} from '../../custom-table/custom-table.component';
import { ParamsCustomTable } from './../../../models/params-custom-table';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-resource',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.scss'
})
export class ResourceComponent {
  params: ParamsCustomTable = {
    type: 'Resources',
    title: 'RESOURCES',
    path: `${environment.apiUrl}${environment.path.resources}`,
    id: 'id',
    jsonColumns: [
      'id',
      'name',
      'location',
      'creationDate',
      'modifiedDate',
      'status',
      'isActive'
    ],
    textHeaders: {
      id: 'Id',
      name: 'Name',
      location: 'Location',
      creationDate: 'CreationDate',
      modifiedDate: 'ModifiedDate',
      status: 'Status',
      isActive: 'Is Active'
    },
    dataType: {
      id: 'number',
      name: 'string',
      location: 'string',
      creationDate: 'dateTime',
      modifiedDate: 'dateTime',
      status: 'string',
      isActive: 'boolean'
    }
  };
}
