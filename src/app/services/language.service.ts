import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Asegura que se registre en el root injector
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>('es');
  currentLang$ = this.currentLang.asObservable();

  constructor() {}

  setLanguage(language: string): void {
    this.currentLang.next(language);
  }
}
