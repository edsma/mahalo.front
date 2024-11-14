import { Component, OnInit } from '@angular/core';
import {  NgFor, NgIf } from '@angular/common';

import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí

import { TranslateService } from '@ngx-translate/core';
import { TranslationModule } from 'src/app/services/Transalation.module';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feeling-ia',
  standalone: true,
  imports: [ NgFor,NgIf,TranslationModule,FormsModule],
  templateUrl: './feeling-ia.component.html',
  styleUrl: './feeling-ia.component.scss'
})
export class FeelingIAComponent {

   analysysIaValor = '';
   language = '';
   private langSubscription: Subscription;
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService){
      this.translate.use(localStorage.getItem('language')?? 'es');
  }

  ngOnInit(): void {
    this.langSubscription = this.languageService.currentLang$.subscribe(lang => {
      this.translate.use(lang);
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
