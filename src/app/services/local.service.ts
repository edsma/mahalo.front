import { Injectable } from '@angular/core';
import { CryptService } from './crypt.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private cryptService: CryptService) {}

  public saveData(key: string, value: string, encrypt: boolean = false) {
    const data = encrypt? this.cryptService.encrypt(value) : value; 
    localStorage.setItem(key, data);
  }

  public getData(key: string, decrypt: boolean = false) {
    if(localStorage.getItem(key)){      
      return decrypt? 
        this.cryptService.decrypt((localStorage.getItem(key) || '' ).toString()) :
        localStorage.getItem(key);
    }
    return null;
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
