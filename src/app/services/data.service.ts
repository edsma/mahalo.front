import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';

import { ParamsCustomTable } from '../models/params-custom-table';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',  // Indica que el contenido es JSON
    'Accept': 'application/json'          // Espera respuesta en formato JSON
  });

  constructor (private httpClient: HttpClient,
    private toasterService: ToastrService
  ) {}

  get data(): any[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllItems(params: ParamsCustomTable): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.httpClient.get(`${params.path}`, {headers}).subscribe({
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
  }

  getItemById(params: ParamsCustomTable): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.httpClient.get(`${params.path}/${params.id}`, {headers}).subscribe({
      next: (result: any) => {
        //this.dataChange.next(result);
        if (result.length == 0){
          this.toasterService.warning('Record not found!', 'Mahalo');
        }else{
          this.toasterService.success('Record found!', 'Mahalo');
        }
      },
      error: (err) => {
          this.toasterService.error(`Error occurred. Details: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
      },
    });
  }

  // ADD, POST METHOD
  addItem(params: ParamsCustomTable): void {
    params.row[params.id] = 0;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.httpClient.post(`${params.path}`, params.row, {headers}).subscribe({
      next: (result: any) => {
        this.dialogData = params.row;
        this.toasterService.success('Added Record!', 'Mahalo');
      },
      error: (err) => {
          this.toasterService.error(`Error occurred. Details: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
      },
    });
  }

  // UPDATE, PUT METHOD
  updateItem(params: ParamsCustomTable): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.httpClient.put(`${params.path}/${params.row?.id}`, params.row, {headers}).subscribe({
      next: (result: any) => {
        this.dialogData = params.row;
        this.toasterService.success('Updated Record!', 'Mahalo');
      },
      error: (err) => {
          this.toasterService.error(`Error occurred. Details: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
      },
    });
  }

  // DELETE METHOD
  deleteItem(params: ParamsCustomTable): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.httpClient.delete(`${params.path}/${params.row?.id}`, {headers}).subscribe({
      next: (result: any) => {
        this.toasterService.success('Deleted Record!', 'Mahalo');
      },
      error: (err) => {
          this.toasterService.error(`Error occurred. Details: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
      },
    });
  }
}



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {

        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




