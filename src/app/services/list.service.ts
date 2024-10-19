import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';

import { ParamsCustomTable } from '../models/params-custom-table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ListService {

    constructor (private httpClient: HttpClient,
        private toasterService: ToastrService
    ) {}
    /*
    path: `${environment.apiUrl}${environment.path.cities}`,
    path: `${environment.apiUrl}${environment.path.countries}`
    path: `${environment.apiUrl}${environment.path.states}`
    */
    /** CRUD METHODS */
    getList(path: string): Observable<any>{
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
       return this.httpClient.get(`${path}`, {headers});
       /*
       .subscribe({
            next: (result: any) => {
            //this.dataChange.next(result);
            this.toasterService.success('Records found!', 'Mahalo');
            },
            error: (err) => {
                this.toasterService.error(`Error occurred. Details: ${err.name} ${err.message}`, 'Mahalo');
            },
            complete() {
            },
        });
        */
  }
}