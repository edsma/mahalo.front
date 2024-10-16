import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {AfterViewInit, Component, Inject, OnInit, Optional} from '@angular/core';
import {DataService} from '../../../services/data.service';
import { ParamsCustomTable } from '../../../models/params-custom-table';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-delete.dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,     // required animations module
  ],
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})
export class DeleteDialogComponent implements OnInit, AfterViewInit {

  //x:string;

  constructor(
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
    this.dataService.deleteItem(this.data);
  }
}
