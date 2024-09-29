import {AfterViewInit, Component, Inject, OnInit, Optional} from '@angular/core';
import {DataService} from '../../../services/data.service';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ParamsCustomTable } from '../../../models/params-custom-table';


import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef, MatDialogModule, } from '@angular/material/dialog';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { merge, of as observableOf } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule, NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-add.dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CommonModule,
    NgIf,
    MatDialogModule,

    MatDialogModule, 
    MatButtonModule,
    BrowserAnimationsModule,     // required animations module
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent implements OnInit, AfterViewInit{

  //ngOnInit(): void { }
  //ngAfterViewInit() {}
  
  textHeaders: any;
  columnsWithButtons: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ParamsCustomTable,
    public dataService: DataService
  ) {}

  ngOnInit(): void { }
  
  

  ngAfterViewInit() {
    //Prepare Headers
    this.textHeaders = new Map(Object.entries(this.data.textHeaders));    
    this.columnsWithButtons = this.buildHeaders();
    console.log("this.columnsWithButtons: ", this.columnsWithButtons);
    console.log("DATA: ", this.data);
  }

  buildHeaders() {
    let headers: string[] = [];
    for (var val  of this.data.jsonColumns) {      
      if(this.textHeaders.has(val)){
        headers.push(val);
      }
    }    
    return [...headers];
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.addItem(this.data);
  }
  
}
