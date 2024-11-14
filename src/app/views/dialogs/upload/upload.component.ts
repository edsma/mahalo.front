import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { TranslationModule } from 'src/app/services/Transalation.module';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [    
    NgFor,
    NgIf,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    TranslationModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class DialogUploadComponent {

  language = '';
  categories: any[] = [];
  fileImage: string = '';


  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<DialogUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.loadCategories();
    this.language = localStorage.getItem('language') ?? 'es';
    this.translate.use(this.language);

  }
  ngOnInit(): void {
    this.loadCategories();
    this.fileImage = this.getFileImage(this.data.path);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.language = localStorage.getItem('language') ?? 'es';
      this.translate.use(this.language);
    });
  }

  loadCategories(): void {
    this.categories = [
      { value: 'Ansiedad', viewValue: 'Ansiedad' },
      { value: 'Depresión', viewValue: 'Depresión' },
      { value: 'Estrés', viewValue: 'Estrés' },
    ];
  }

  getFileImage(filePath: string): string {
    const fileExtension = filePath.split('.').pop()?.toLowerCase();
    console.log(fileExtension);
    switch (fileExtension) {
      case 'jpg':
        return 'https://cdn-icons-png.flaticon.com/512/29/29264.png';
      case 'jpeg':
        return 'https://cdn-icons-png.flaticon.com/512/29/29531.png';
      case 'png':
        return 'https://cdn-icons-png.flaticon.com/512/29/29072.png';
      case 'gif':
        return 'https://cdn-icons-png.flaticon.com/512/29/29579.png';
      case 'pdf':
        return  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png';
      case 'doc':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Word_%282019%E2%80%93present%29.svg.png';
      case 'docx':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Word_%282019%E2%80%93present%29.svg.png';
      case 'xls':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/800px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png';
      case 'xlsx':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/800px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png';
      default:
        return 'https://cdn-icons-png.flaticon.com/512/813/813728.png';
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close({ ...this.data, image: this.fileImage });
  }
}
