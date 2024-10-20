import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable } from 'rxjs';
import { SortDirection } from '@angular/material/sort';
import { ApiResponse } from '../views/custom-table/custom-table.component';
import {environment} from '../../environments/environment'
import {PaginationDTO} from '../models/paginationDto';
import { HeaderService } from './header.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class TableDataService extends HeaderService {
  constructor(private http: HttpClient,
    protected override localService: LocalService
  ) {
    super(localService);
  }

  fetchTableData(
    search_filter: string,
    sort_field: string,
    sort_order: SortDirection,
    page1: number,
    limit_per_page: number,
    endpoint: string,
  ): Observable<ApiResponse> {

    if(environment.isLocal){
      const requestUrl = `${endpoint}?q=${search_filter}+in:title+repo:angular/components&sort=${sort_field}&order=${sort_order}&page=${page1}&per_page=${limit_per_page}`;
      return this.http.get<ApiResponse>(requestUrl);
    }else{
      let params = new HttpParams()
        .set('Page', page1)
        .set('RecordsNumber', limit_per_page  )
        .set('Filter', search_filter.toString());
      const requestUrl = `${endpoint}/paginated`;
      const headers = this.getHeaders();
      return this.http.get<ApiResponse>(requestUrl, { params });
    }
    
  }
}