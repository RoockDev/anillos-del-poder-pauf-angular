import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/evironment.development';
import { PreguntaDto } from '../interfaces/pregunta';
import { PartidaDto } from '../interfaces/partida';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private baseUrl = environment.apiESDLA;

  constructor(private http: HttpClient) {}

  empezarPartida(): Observable<PartidaDto> {
    return this.http.get<PartidaDto>(`${this.baseUrl}empezarPartida/`);
  }

  obtenerPregunta(id: number): Observable<PreguntaDto> {
    return this.http.get<PreguntaDto>(`${this.baseUrl}obtenerPregunta/${id}`);
  }

  comprobarRespuesta(idPregunta: number, respuestaUsuario: number): Observable<boolean> {
    const params = new HttpParams().set('respuestaUsuario', respuestaUsuario);
    return this.http.get<boolean>(`${this.baseUrl}respuesta/${idPregunta}/`, { params });
  }

  sumarCorrecta(idPartida: number): Observable<PartidaDto> {
    return this.http.put<PartidaDto>(`${this.baseUrl}correcta/${idPartida}/`, {});
  }

  finalizarPartida(idPartida: number): Observable<PartidaDto> {
    return this.http.put<PartidaDto>(`${this.baseUrl}finalizar/${idPartida}/`, {});
  }
}
