import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { SortDirection } from '@angular/material/sort';
import { ApiResponse } from '../views/custom-table/custom-table.component';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  constructor(private http: HttpClient) { }

  fetchTableData(
    search_filter: string,
    sort_field: string,
    sort_order: SortDirection,
    page1: number,
    limit_per_page: number,
    endpoint: string,
  ): Observable<ApiResponse> {
    //const requestUrl = `${endpoint}?q=${search_filter}+in:title+repo:angular/components&sort=${sort_field}&order=${sort_order}&page=${page}&per_page=${limit_per_page}`;
    const params = {      
      page: page1,
      recordsNumber: limit_per_page,
      filter: search_filter
  }
    const requestUrl = `${endpoint}`;
    return this.http.post<ApiResponse>(requestUrl, params);
  }

}
