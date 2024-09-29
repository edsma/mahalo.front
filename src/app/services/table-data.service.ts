import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable } from 'rxjs';
import { SortDirection } from '@angular/material/sort';
import { ApiResponse } from '../views/custom-table/custom-table.component';
import {environment} from '../../environments/environment'
import {PaginationDTO} from '../models/paginationDto';

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

    let params = new HttpParams()
      .set('Page', page1)
      .set('RecordsNumber', limit_per_page  )
      .set('Filter', search_filter.toString());
    const requestUrl = `${endpoint}/paginated`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  // Indica que el contenido es JSON
      'Accept': 'application/json'          // Espera respuesta en formato JSON
    });

    return this.http.get<ApiResponse>(requestUrl, { params });
  }

}
