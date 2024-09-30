import { Component } from '@angular/core';

import {CustomTableComponent} from '../../custom-table/custom-table.component';
import {environment} from '../../../../environments/environment';
import { ParamsCustomTable } from './../../../models/params-custom-table';

@Component({
  selector: 'app-notification-history',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './notification-history.component.html',
  styleUrl: './notification-history.component.scss'
})
export class NotificationHistoryComponent {

  params: ParamsCustomTable = {
    title: 'NOTIFICATION HISTORY',
    path: `${environment.apiUrl}${environment.path.documentsTypes}`,
    id: 'id',
    jsonColumns: [
      'id',
      'creationDate',
      'isActive'
    ],
    textHeaders: {
      id: 'Id',
      creationDate: 'Creation Date',
      isActive: 'Is Active'
    },
    dataType: {
      id: 'number',      
      creationDate: 'date',
      isActive: 'boolean'
    }
  };
}
