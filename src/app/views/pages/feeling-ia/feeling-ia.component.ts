import { Component, OnInit } from '@angular/core';
import {  NgFor, NgIf } from '@angular/common';

import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí

import { TranslateService } from '@ngx-translate/core';
import { TranslationModule } from 'src/app/services/Transalation.module';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';
import { ChatgptService } from '../../../services/chatgpt.service';

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
    private languageService: LanguageService,
    private chatgptService: ChatgptService){
      this.translate.use(localStorage.getItem('language')?? 'es');
  }

  //userMessage: string = '';
  messages: { role: string, content: string }[] = [
    { role: 'assistant', content: 'Hola, Soy Mahalo, ¿quieres hablar conmigo?' }
  ];
  responseMessage: string = '';

  ngOnInit(): void {
    this.langSubscription = this.languageService.currentLang$.subscribe(lang => {
      this.translate.use(lang);
    });
  }

  sendMessage() {
    if (!this.analysysIaValor.trim()) {
      return;
    }
    // Agregar mensaje del usuario a la historia del chat
    this.messages.push({ role: 'user', content: this.analysysIaValor });

    // Llamar al servicio de OpenAI
    this.chatgptService.getChatOpenAIResponse(this.messages).subscribe({
      next: (response: any) => {
        // Respuesta de la IA
        const assistantMessage = response.choices[0].message.content;
        this.messages[this.messages.length-1].content = assistantMessage;
        this.responseMessage = assistantMessage;
      },
      error: (err) => {
        console.error('Error al obtener la respuesta de la API', err);
      }
    });
    this.messages.push({ role: 'assistant', content: '' });
    this.analysysIaValor = '';  // Limpiar mensaje del usuario
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      console.log(event);
      this.sendMessage2();
    }
  }

  sendMessage2() {
    if (!this.analysysIaValor.trim()) {
      return;
    }
    // Agregar mensaje del usuario a la historia del chat
    this.messages.push({ role: 'user', content: this.analysysIaValor });
    // Llamar al servicio de OpenAI
    this.chatgptService.getChatGeminisResponse(this.messages).subscribe({
      next: (response: any) => {
        //console.log("La respuesta ... ", response);
        // Respuesta de la IA
        const assistantMessage = response;
        this.messages[this.messages.length-1].content = assistantMessage;
        this.responseMessage = assistantMessage;
      },
      error: (err) => {
        console.error('Error al obtener la respuesta de la API', err);
      }
    });
    this.messages.push({ role: 'assistant', content: '' });
    this.analysysIaValor = '';  // Limpiar mensaje del usuario
  }
}
