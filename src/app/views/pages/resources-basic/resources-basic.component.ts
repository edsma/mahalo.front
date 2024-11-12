import { Component, ElementRef, ViewChild } from '@angular/core';

import {CustomViewerComponent} from '../../custom-viewer/custom-viewer.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ParamsCustomViewer } from './../../../models/params-custom-viewer';
import { environment } from '../../../../environments/environment';
import { Params } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { MatSelectModule } from '@angular/material/select'; 

@Component({
  selector: 'app-resources-basic',
  standalone: true,
  imports: [
    MatExpansionModule, 
    MatIconModule, 
    MatButtonToggleModule, 
    MatInputModule, 
    MatButton, 
    MatSelectModule, 
    FormsModule,
    BrowserModule],
  templateUrl: './resources-basic.component.html',
  styleUrl: './resources-basic.component.scss'
})
export class ResourcesBasicComponent {
  /*params: ParamsCustomViewer = {
    type: 'Resources',
    title: 'RESOURCES',
    path: `${environment.apiUrl}${environment.path.resources}`,
    id: 'id',
    jsonColumns: [
      'id',
      'name',
      'location',
      'creationDate',
      'modifiedDate',
      'status',
      'isActive'
    ],
    textHeaders: {
      id: 'Id',
      name: 'Name',
      location: 'Location',
      creationDate: 'CreationDate',
      modifiedDate: 'ModifiedDate',
      status: 'Status',
      isActive: 'Is Active'
    },
    dataType: {
      id: 'number',
      name: 'string',
      location: 'string',
      creationDate: 'dateTime',
      modifiedDate: 'dateTime',
      status: 'string',
      isActive: 'boolean'
    }
  };*/

  @ViewChild('fileInput') fileInput!: ElementRef;

  categories: string[] = ['Ansiedad', 'Depresión', 'Estrés'];

  // Categoría seleccionada para filtrar
  selectedCategory: string = '';

  // Lista de recursos con categoría asignada
  resources = [
    { title: 'Recurso sobre ansiedad', category: 'Ansiedad', 
      content: 'La ansiedad es una emoción natural que todos experimentamos en ciertos momentos de nuestra vida. Se trata de una respuesta del cuerpo ante situaciones percibidas como amenazantes o estresantes, activando un mecanismo de “lucha o huida” que prepara al organismo para enfrentar posibles peligros. Sin embargo, cuando la ansiedad se vuelve persistente o desproporcionada, puede afectar de manera negativa el bienestar y el funcionamiento diario de una persona. La ansiedad puede manifestarse en diferentes formas y niveles. Puede ser una respuesta leve y momentánea, como el nerviosismo antes de una presentación, o un estado más intenso y continuo, como en los trastornos de ansiedad. Los síntomas suelen incluir preocupaciones excesivas, inquietud, tensión muscular, dificultad para concentrarse y alteraciones del sueño. Además, en casos severos, la ansiedad puede provocar síntomas físicos como palpitaciones, sudoración y dificultad para respirar. Existen varios factores que pueden contribuir al desarrollo de la ansiedad, como la genética, el entorno y experiencias de vida, y las presiones o responsabilidades diarias. Los estilos de vida modernos, caracterizados por un ritmo acelerado y expectativas elevadas, también influyen en el incremento de problemas de ansiedad en la población, especialmente entre los jóvenes y estudiantes. Afortunadamente, existen herramientas y enfoques efectivos para manejar la ansiedad. Entre las estrategias comunes se encuentran la terapia cognitivo-conductual (TCC), la práctica de mindfulness, técnicas de relajación y el ejercicio físico. En algunos casos, los profesionales de la salud mental pueden recomendar medicación para ayudar a reducir los síntomas de la ansiedad. También, el uso de aplicaciones de salud mental y otras herramientas digitales se ha mostrado efectivo para complementar los tratamientos tradicionales, proporcionando apoyo inmediato, ejercicios de respiración, diarios de emociones y otros recursos para mejorar la autoconciencia y el manejo de la ansiedad.', 
      fileName: 'Documento_Ansiedad.docx ',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Word_%282019%E2%80%93present%29.svg.png',
      altImage: 'Documento_Ansiedad'
    },
    { title: 'Recurso sobre depresión', category: 'Depresión', 
      content: 'La depresión es un trastorno mental común y grave que afecta negativamente cómo te sientes, piensas y actúas. A diferencia de la tristeza, que es una respuesta natural a los eventos difíciles de la vida, la depresión persiste y puede durar semanas, meses o incluso años, interfiriendo en la capacidad de una persona para llevar una vida normal.Los síntomas de la depresión incluyen sentimientos persistentes de tristeza, vacío, desesperanza y pérdida de interés en actividades que antes eran placenteras. También puede manifestarse con cambios en el apetito, problemas para dormir, fatiga constante, dificultad para concentrarse y, en casos más graves, pensamientos de autolesión o suicidio. Las causas de la depresión son multifactoriales y pueden incluir una combinación de factores biológicos, genéticos, psicológicos y sociales. Factores como el desequilibrio químico en el cerebro, antecedentes familiares de trastornos mentales, experiencias traumáticas, estrés crónico y problemas de salud física pueden aumentar el riesgo de desarrollar depresión. El tratamiento de la depresión generalmente incluye terapia psicológica, medicación o una combinación de ambas. La psicoterapia, como la terapia cognitivo-conductual, ayuda a las personas a reconocer y cambiar patrones de pensamiento negativos y desarrollar habilidades de afrontamiento. Los medicamentos antidepresivos también pueden ser útiles en casos donde se necesita una intervención adicional para corregir desequilibrios químicos. Es importante recordar que la depresión es tratable y que buscar ayuda puede marcar una gran diferencia. Hablar con un profesional de la salud mental, como un psicólogo o psiquiatra, y contar con el apoyo de seres queridos puede ser el primer paso hacia la recuperación.', 
      fileName: 'Documento_Depresion.pdf ',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png',
      altImage: 'Documento_Depresion'
    },
  ];

  // Filtrar recursos según la categoría seleccionada
  get filteredResources() {
    return this.selectedCategory
    ? this.resources.filter((resource) => resource.category === this.selectedCategory)    : this.resources;
  }

  triggerFileUpload(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      console.log('Archivo seleccionado:', file.name);
    }
  }
}
