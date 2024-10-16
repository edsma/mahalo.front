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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { TranslationModule } from 'src/app/services/Transalation.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add.dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatIconModule,
    TranslationModule,
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
    MatCheckboxModule,
    MatDatepickerModule,
  ],
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {

  //ngOnInit(): void { }
  //ngAfterViewInit() {}

  textHeaders: any;
  dataType: any;
  columnsWithButtons: string[] = [];

  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ParamsCustomTable,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getBrowserLang();
   }
  
  isType(types:string[], column: string){    
    return types.includes(this.dataType.get(column));
  }

  ngAfterViewInit() {
    //Prepare Headers
    this.textHeaders = new Map(Object.entries(this.data.textHeaders)); 
    this.dataType = new Map(Object.entries(this.data.dataType));   
    this.columnsWithButtons = this.buildHeaders();
  }


  private getBrowserLang() {
    const lang = navigator.language || navigator.languages[0]; // Obtener el idioma del navegador
    let result =  lang.split('-')[0]; // Retorna solo el código del idioma (por ejemplo, "en" en lugar de "en-US")
    //this.translate.use(result); // Cambia esto si deseas otro idioma por defecto
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

  public confirmEdit(): void {
    this.dataService.updateItem(this.data);
  }
}
