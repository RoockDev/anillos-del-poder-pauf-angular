import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/evironment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  
    constructor(private http: HttpClient){}

    private baseUrl = environment.apiESDLA;

    obtenerPersonajes(): Observable<any []>{
      return this.http.get<any []>(`${this.baseUrl}listaPersonajes`)
    }

    actualizarPersonaje(id:number, personaje:any):Observable<any>{
      return this.http.put<any>(`${this.baseUrl}actualizarPersonaje/${id}`, personaje)
    }

    crearPersonaje(personaje:any): Observable<any>{
      return this.http.post<any>(`${this.baseUrl}insertarPersonaje`, personaje)
    }




}
