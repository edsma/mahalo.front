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
import { merge, of as observableOf, Subscription } from 'rxjs';
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
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,
  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective,
  FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, ProgressBarDirective,
  ProgressComponent as ProgressComponent_1, ProgressBarComponent, ProgressStackedComponent,
  FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,

  ButtonGroupComponent,  ButtonToolbarComponent, InputGroupComponent, InputGroupTextDirective, ThemeDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective,

  FormFloatingDirective, FormSelectDirective, GutterDirective
} from '@coreui/angular';

import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { ParamsCustomTable } from '../../models/params-custom-table';
import {BehaviorSubject, fromEvent, Observable} from 'rxjs';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslationModule } from 'src/app/services/Transalation.module';
import { LocalService } from 'src/app/services/local.service';
import { LanguageService } from 'src/app/services/language.service';

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
    TranslationModule,

    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective,
    //FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective
    ProgressBarDirective, ProgressComponent_1, ProgressBarComponent, ProgressStackedComponent,
    FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective,
    ButtonGroupComponent,  ButtonToolbarComponent, InputGroupComponent, InputGroupTextDirective, ThemeDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective,
    FormFloatingDirective, FormSelectDirective, GutterDirective,

    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements AfterViewInit {

  @Input() params!: ParamsCustomTable;

  data: any[] = [];
  pageSizes = [5, 10, 20, 50];
  totalCount = 0;
  isLoading = true;
  textHeaders: any;
  columnsWithButtons: string[] = [];

  private langSubscription: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public tableDataService: TableDataService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,

    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private localService: LocalService,
    private languageService: LanguageService,
    private router: Router) {
      let language =  localStorage.getItem('language')?? 'es';
      this.translate.use(language);
    }

  searchKeywordFilter = new FormControl();

  ngOnInit(): void {
    this.validateSesion();
    this.langSubscription = this.languageService.currentLang$.subscribe(lang => {
      console.log(lang);
      this.translate.use(lang);
    });
  }

  ngAfterViewInit() {
    //Prepare Headers
    this.textHeaders = new Map(Object.entries(this.params.textHeaders));
    this.columnsWithButtons = this.buildHeaders();
    let originalPath =   this.params.path;

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
              originalPath
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
          this.params.path = originalPath;
          return result.data;
        })
      )
      .subscribe((result) => (this.data = result));

      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        console.log("LANG: ", event.lang);
        this.translate.use(event.lang);
      });
  }

  buildHeaders() {
    /*
    this.translate.onLangChange.subscribe(() => {
    });
    */
    let headers = [];
    for (var val  of this.params.jsonColumns) {
      if(this.textHeaders.has(val)){
        headers.push(this.translate.instant(val));
      }
    }
    const userType = this.localService.getData("userType", true) || '-1';

    if(parseInt(userType) == 0){
      headers.push('__actions');
    }
    return headers;
  }

  validateSesion(){
    if(!this.localService.getData("email")){
      this.router.navigateByUrl("/login");
    }else{
      const screens: string = this.localService.getData("screens") || '';
      let options: string[] =  screens.split(',');
      console.log(options);
      if(!options.includes(this.params.type || '')){
        this.router.navigateByUrl("/404");
      }
    }
  }

  add(row: any) {

    this.params.row = {};
    this.params.language = this.translate.currentLang;
    const dialogRef =  this.dialog.open(AddDialogComponent, {
      data: this.params,
      maxHeight: '500px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        /*
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        */
        this.refreshTable();
      }
    });
  }





  edit(row: any) {
    this.params.row = {...row};
    const dialogRef =  this.dialog.open(EditDialogComponent, {
      data: this.params,
      maxHeight: '500px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        /*
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        */
        this.refreshTable();
      }
    });
  }

  delete(row: any) {
    this.params.row = row;
    const dialogRef =  this.dialog.open(DeleteDialogComponent, {
      data: this.params,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        /*
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        */
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
