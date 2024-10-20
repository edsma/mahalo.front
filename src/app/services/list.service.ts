import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';

import { ParamsCustomTable } from '../models/params-custom-table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderService } from './header.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class ListService extends HeaderService {

    constructor (private httpClient: HttpClient,
        private toasterService: ToastrService,
        protected override localService: LocalService
    ) {
        super(localService);
    }

    getList(path: string): Observable<any>{
        const headers = this.getHeaders();
       return this.httpClient.get(`${path}`, {headers});
    }
}