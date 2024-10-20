import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';

import { ParamsCustomTable } from '../models/params-custom-table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import {environment} from '../../environments/environment';
import { HeaderService } from './header.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends HeaderService{

    constructor (private httpClient: HttpClient,
        private toasterService: ToastrService,
        protected override localService: LocalService
    ) {
        super(localService);
    }

    getProfile(id: any): Observable<any>{
        const path = `${environment.apiUrl}${environment.path.accounts}`;
        const headers = this.getHeaders();
       return this.httpClient.get(`${path}`, {headers});
    }

    updateProfile(body: any): Observable<any>{
        const path = `${environment.apiUrl}${environment.path.accounts}`
        const headers = this.getHeaders();
       return this.httpClient.put(`${path}`, body, {headers});
    }

}
