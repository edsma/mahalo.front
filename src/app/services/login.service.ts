import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ActivatedRoute, RouterModule, RouterOutlet, Router, } from '@angular/router';

import {environment} from '../../environments/environment';
import { HeaderService } from './header.service';
import { LocalService } from './local.service';

@Injectable({
    providedIn: 'root'
  })
export class LoginService extends HeaderService {
    
    constructor (private httpClient: HttpClient,
        private toasterService: ToastrService,
        protected override localService: LocalService,        
        private router: Router
    ) {
        super(localService);
    }
    
    login(body: any): Observable<any>{
        const path = `${environment.apiUrl}${environment.path.login}`
        const headers = this.getHeaders();
       return this.httpClient.post(`${path}`, body, {headers});       
    }
    
    logout(){

        this.localService.clearData();
        this.router.navigateByUrl('/login');
    }
}