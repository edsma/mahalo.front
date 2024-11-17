import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';
import { CryptService } from './crypt.service'
import { GoogleGenerativeAI } from '@google/generative-ai';

import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  private openIAUrl = environment.openaiUrl
  private openIaApiKey = environment.openaiApiKey
  private geminiApiKey = environment.geminisApiKey;
  
  readonly #TOPIC = 'Salud mental';
  readonly #API_KEY = this.cryptService.decrypt(this.geminiApiKey);
  readonly #genAI = new GoogleGenerativeAI(this.#API_KEY);
  readonly #model = this.#genAI.getGenerativeModel({ model: 'gemini-pro' });//gemini-1.5-flash-latest


  constructor(private http: HttpClient, 
    private cryptService: CryptService,
    ){}

  getChatOpenAIResponse(messages: any[]): Observable<any> {    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.cryptService.decrypt(this.openIaApiKey)}`,
      'Content-Type': 'application/json'
    });
    const body = {
      model: 'gpt-3.5-turbo',  //"gpt-4"
      messages: messages,
      temperature: 0.7
    };
    return this.http.post(this.openIAUrl, body, { headers });
  }

  getChatGeminisResponse(messages: any[]): Observable<any> {
    let question: string = messages[messages.length-1].content;
    question = this.refineQuestion(question, this.#TOPIC)    
    return from(this.#model.generateContent(question))
    .pipe(
      map(response => response.response.text()),
      catchError(error => {
        console.error('Error al generar texto:', error);
        return from('Ha ocurrido un error. Por favor, intenta de nuevo.');
      })
    );
  }

  refineQuestion(question: string, topic: string): string {    
    const refinedQuestion = `Sobre el tema de ${topic}, ${question} y recuerda que si preguntan tu nombre, te llamas Mahalo.`;
    return refinedQuestion;
  }
}