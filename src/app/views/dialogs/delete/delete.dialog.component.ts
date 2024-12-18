import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {AfterViewInit, Component, Inject, OnInit, Optional} from '@angular/core';
import {DataService} from '../../../services/data.service';
import { ParamsCustomTable } from '../../../models/params-custom-table';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,
  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective,
  FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, ProgressBarDirective,
  ProgressComponent as ProgressComponent_1, ProgressBarComponent, ProgressStackedComponent,
  FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,

  ButtonGroupComponent,  ButtonToolbarComponent, InputGroupComponent, InputGroupTextDirective, ThemeDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective,

  FormFloatingDirective, FormSelectDirective, GutterDirective
} from '@coreui/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete.dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    TranslateModule,
    BrowserAnimationsModule,     // required animations module

    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective,
    //FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective
    ProgressBarDirective, ProgressComponent_1, ProgressBarComponent, ProgressStackedComponent,
    FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective,
    ButtonGroupComponent,  ButtonToolbarComponent, InputGroupComponent, InputGroupTextDirective, ThemeDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective,
    FormFloatingDirective, FormSelectDirective, GutterDirective,

    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
  ],
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})
export class DeleteDialogComponent implements OnInit, AfterViewInit {

  //x:string;

  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ParamsCustomTable,
    public dataService: DataService
  ) {}

  ngOnInit(): void { }

  ngAfterViewInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {

    this.translate.use(localStorage.getItem('language')?? 'es');
    this.dataService.deleteItem(this.data,this.translate);
  }
}
