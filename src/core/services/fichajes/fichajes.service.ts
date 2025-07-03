// fichajes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/environment';

@Injectable({
  providedIn: 'root',
})
export class FichajesService {
  constructor(private http: HttpClient) {}

  setFichajeEntrada(registro: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}fichajes`, registro);
  }

  getFichajesByUser(idUsuario: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}fichajes/${idUsuario}`);
  }
}
