import {AfterViewInit, Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {DataService} from '../../../services/data.service';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ParamsCustomTable } from '../../../models/params-custom-table';

import { TranslateService } from '@ngx-translate/core';


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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter, ThemePalette} from '@angular/material/core';
//import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule, NgxMatDateAdapter,  } from '@angular-material-components/datetime-picker';
//import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule, NgxMatDateAdapter } from 'ngx-mat-datetime-picker';
//import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import * as moment from 'moment';
import { TranslationModule } from 'src/app/services/Transalation.module';

@Component({
  selector: 'app-add.dialog',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TranslationModule,
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
    MatCheckboxModule,
    MatDatepickerModule,

    //NgxMatNativeDateModule,
    //NgxMatTimepickerModule,
    //NgxMatDatetimePickerModule,
    //NgxMatMomentModule,

  ],
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent implements OnInit, AfterViewInit{

  @ViewChild('picker') picker: any;
  
  //ngOnInit(): void { }
  //ngAfterViewInit() {}

  textHeaders: any;
  dataType: any;
  columnsWithButtons: string[] = [];

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public disableMinute: boolean = false;
  public hideTime: boolean = false;

  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ParamsCustomTable,
    public dataService: DataService
  ) {
    //this.translate.use(data.language? data.language: 'en');

  }

  ngOnInit(): void { }
  
  isType(types:string[], column: string){    
    return types.includes(this.dataType.get(column));
  }

  ngAfterViewInit() {
    //Prepare Headers
    this.textHeaders = new Map(Object.entries(this.data.textHeaders));
    this.dataType = new Map(Object.entries(this.data.dataType));
    this.columnsWithButtons = this.buildHeaders();
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
