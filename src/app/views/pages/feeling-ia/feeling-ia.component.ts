import { Component } from '@angular/core';
import { NgStyle, NgFor, NgIf } from '@angular/common';

import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { TranslationModule } from 'src/app/services/Transalation.module';
import { LocalService } from 'src/app/services/local.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-feeling-ia',
  standalone: true,
  imports: [ NgFor,NgIf,TranslationModule,FormsModule],
  templateUrl: './feeling-ia.component.html',
  styleUrl: './feeling-ia.component.scss'
})
export class FeelingIAComponent {
   language = '';
   analysysIaValor = '';
  constructor(
    private translate: TranslateService){
    this.language =  localStorage.getItem('language')?? 'es';
    this.translate.use(this.language)
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {

    this.language =  localStorage.getItem('language')?? 'es';
      this.translate.use(this.language);
    });
  }

  messages = [
    { sender: 'me', text: 'Hoy me siento... ' },
    { sender: 'other', text: '...' },
  ];

  newMessage = '';

  sendMessage() {
    if (this.analysysIaValor.trim()) {
      this.messages.push({ sender: 'me', text: this.analysysIaValor });
      this.analysysIaValor = '';
      this.messages.push({ sender: 'other', text: '...' });
    }
  }
}
