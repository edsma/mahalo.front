import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';

import { ParamsCustomTable } from '../models/params-custom-table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  translateMessages: { name: string, value: string }[] = []; // Inicializar como un arreglo vacío

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
  addItem(params: ParamsCustomTable, translate: TranslateService): void {
    params.row[params.id] = 0;
    delete params.row.creationDate;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.httpClient.post(`${params.path}`, params.row, {headers}).subscribe({
      next: (result: any) => {
        this.dialogData = params.row;
        this.toasterService.success(translate.instant('Added'), 'Mahalo');
      },
      error: (err) => {
          this.toasterService.error(`${translate.instant('ErrorDetails')}: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
      },
    });
  }

    // ADD, POST METHOD
    addItemWithOutTable(params: any, translate: TranslateService): void {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      console.log(params);
      this.httpClient.post(`${params.path}`, params.model, {headers}).subscribe({
        next: (result: any) => {
          this.dialogData = params.row;
          this.toasterService.success(translate.instant('success'), 'Mahalo');
        },
        error: (err) => {
            this.toasterService.error(`${translate.instant('ErrorDetails')}: ${err.name} ${err.message}`, 'Mahalo');
        },
        complete() {
        },
      });
    }



  // UPDATE, PUT METHOD
  updateItem(params: ParamsCustomTable, translate:TranslateService): void {
    delete params.row.creationDate;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.httpClient.put(`${params.path}`, params.row, {headers}).subscribe({
      next: (result: any) => {
        this.dialogData = params.row;
        this.toasterService.success(translate.instant('Updated'), 'Mahalo');
      },
      error: (err) => {
          this.toasterService.error(`${translate.instant('ErrorDetails')}: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
      },
    });
  }



  // DELETE METHOD
  deleteItem(params: ParamsCustomTable, translate: TranslateService): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.httpClient.delete(`${params.path}/${params.row?.id}`, {headers}).subscribe({
      next: (result: any) => {
        this.toasterService.success( translate.instant('Deleted'), 'Mahalo');
      },
      error: (err) => {
          this.toasterService.error(`${translate.instant('ErrorDetails')}: ${err.name} ${err.message}`, 'Mahalo');
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




