import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class CryptService {

    key: string = '*Mahalo-2024#';
    constructor() {}

    public encrypt(txt: string): string {
        return CryptoJS.AES.encrypt(txt, this.key).toString();
    }
    
    public decrypt(txtToDecrypt: string) {
        return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
    }
}