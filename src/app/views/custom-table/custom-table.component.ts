import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Input,  
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableDataService } from '../../services/table-data.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef, MatDialogModule, } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule, NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddDialogComponent } from '../dialogs/add/add.dialog.component';
import { EditDialogComponent } from '../dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete.dialog.component';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, ProgressBarDirective, ProgressComponent as ProgressComponent_1, ProgressBarComponent, ProgressStackedComponent } from '@coreui/angular';
import { ParamsCustomTable } from '../../models/params-custom-table';
import {BehaviorSubject, fromEvent, Observable} from 'rxjs';

export interface ApiResponse {
  data: any[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

@Component({
  selector: 'app-custom-table',
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
    DeleteDialogComponent,

    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective,
    //FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective
    ProgressBarDirective, ProgressComponent_1, ProgressBarComponent, ProgressStackedComponent
  ],  
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit, AfterViewInit {
  ngOnInit(): void { }

  @Input() params!: ParamsCustomTable;

  data: any[] = [];
  pageSizes = [5, 10, 20, 50];
  totalCount = 0;
  isLoading = true;
  textHeaders: any;
  columnsWithButtons: string[] = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public tableDataService: TableDataService, 
    private spinner: NgxSpinnerService, 
    private snackBar: MatSnackBar,
    public dialog: MatDialog,) { }

  searchKeywordFilter = new FormControl();

  buildHeaders() {
    let headers = [];
    for (var val  of this.params.jsonColumns) {      
      if(this.textHeaders.has(val)){
        headers.push(val);
      }
    }
    headers.push('__actions');
    return headers;
  }

  ngAfterViewInit() {
    //Prepare Headers
    this.textHeaders = new Map(Object.entries(this.params.textHeaders));    
    this.columnsWithButtons = this.buildHeaders();
    
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));   // on sort order change, reset back to the first page.

    merge(this.searchKeywordFilter.valueChanges.pipe(debounceTime(500)), this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          this.spinner.show();
          var filterValue = this.searchKeywordFilter.value == null ? '' : this.searchKeywordFilter.value;
          return this.tableDataService
            .fetchTableData(
              filterValue,
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex + 1,
              this.paginator.pageSize,
              this.params.path
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((result) => {
          this.isLoading = false;
          this.spinner.hide();
          /*
          this.snackBar.open('The API limit has been reached. Please try after a minute.', 'Close', {
            duration: 5000 
          });
          */
          if (result === null) {
            return [];
          }
          this.totalCount = result.total;
          return result.data;
        })
      )
      .subscribe((result) => (this.data = result));
  }
  
  add(row: any) {
    this.params.row = {};
    const dialogRef =  this.dialog.open(AddDialogComponent, {
      data: this.params,
    });
    /*
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
    */
  }

  edit(row: any) {
    this.params.row = {...row};
    const dialogRef =  this.dialog.open(EditDialogComponent, {
      data: this.params,
    });
    /*
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
    */
  }

  delete(row: any) {
    this.params.row = row;
    const dialogRef =  this.dialog.open(DeleteDialogComponent, {
      data: this.params,
    });

    /*
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id, title: title, state: state, url: url}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
    */
  }
}