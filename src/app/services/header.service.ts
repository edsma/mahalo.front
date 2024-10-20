import { HttpHeaders } from "@angular/common/http";
import { LocalService } from './local.service';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export abstract class HeaderService {

    constructor (protected localService: LocalService) {}

    getHeaders(){        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',  // Indica que el contenido es JSON
            'Accept': 'application/json'          // Espera respuesta en formato JSON
        });
        const token = this.localService.getData("token", true);
        if(token){
            return headers.append("Authorization", "Bearer "+ (token || '') );
        }        
        return headers;
    }
}