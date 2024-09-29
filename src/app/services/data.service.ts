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
    this.httpClient.get(`${params.path}`).subscribe({
      next: (result: any) => {
        console.log("Your code ...");
        //this.dataChange.next(result);
        this.toasterService.success('Records found!', 'Mahalo');
      },
      error: (err) => {
          console.error(err);
          this.toasterService.error(`Error occurred. Details: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
        console.log("is completed");
      },
    });
  }

  getItemById(params: ParamsCustomTable): void {
    this.httpClient.get(`${params.path}/${params.id}`).subscribe({
      next: (result: any) => {
        console.log("Result: ", result);
        //this.dataChange.next(result);
        if (result.length == 0){
          this.toasterService.warning('Record not found!', 'Mahalo');
        }else{
          this.toasterService.success('Record found!', 'Mahalo');
        }
      },
      error: (err) => {
          console.error(err);
          this.toasterService.error(`Error occurred. Details: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
        console.log("is completed");
      },
    });
  }

  // ADD, POST METHOD
  addItem(params: ParamsCustomTable): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  // Indica que el contenido es JSON
      'Accept': 'application/json'          // Espera respuesta en formato JSON
    });
    params.row.isActive  = true;
    this.httpClient.post(`${params.path}`, params.row, {headers}).subscribe({
      next: (result: any) => {
        console.log("Result: ", result);
        this.dialogData = params.row;
        this.toasterService.success('Added Record!', 'Mahalo');
      },
      error: (err) => {
          console.error(err);
          this.toasterService.error(`Error occurred. Details: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
        console.log("is completed");
      },
    });
  }

  // UPDATE, PUT METHOD
  updateItem(params: ParamsCustomTable): void {
    this.httpClient.put(`${params.path}/${params.row?.id}`, params.row).subscribe({
      next: (result: any) => {
        console.log("Result: ", result);
        this.dialogData = params.row;
        this.toasterService.success('Updated Record!', 'Mahalo');
      },
      error: (err) => {
          console.error(err);
          this.toasterService.error(`Error occurred. Details: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
        console.log("is completed");
      },
    });
  }

  // DELETE METHOD
  deleteItem(params: ParamsCustomTable): void {
    this.httpClient.delete(`${params.path}/${params.row?.id}`).subscribe({
      next: (result: any) => {
        console.log("Result: ", result);
        this.toasterService.success('Deleted Record!', 'Mahalo');
      },
      error: (err) => {
          console.error(err);
          this.toasterService.error(`Error occurred. Details: ${err.name} ${err.message}`, 'Mahalo');
      },
      complete() {
        console.log("is completed");
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
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




