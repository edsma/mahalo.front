import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';

import {environment} from '../../environments/environment';
import { HeaderService } from './header.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService extends HeaderService {

    constructor (private httpClient: HttpClient,
        private toasterService: ToastrService,
        protected override localService: LocalService
    ) {
        super(localService);
    }
    
    createUser(body: any): Observable<any>{
        const path = `${environment.apiUrl}${environment.path.regiter}`
        const headers = this.getHeaders();
       return this.httpClient.post(`${path}`, body, {headers});       
    }
}