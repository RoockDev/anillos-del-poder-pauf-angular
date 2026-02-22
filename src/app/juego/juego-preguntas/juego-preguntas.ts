import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegoService } from '../../servicios/juego-service';
import { PreguntaDto } from '../../interfaces/pregunta';
import { PartidaDto } from '../../interfaces/partida';
import { PartidaHistorial } from '../../interfaces/partida-historial';

@Component({
  selector: 'app-juego-preguntas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juego-preguntas.html',
  styleUrl: './juego-preguntas.css',
})
export class JuegoPreguntas {
  partidaActual: PartidaDto | null = null;
  preguntaActual: PreguntaDto | null = null;

  setPreguntasRespondidas: Set<number> = new Set<number>(); //para evitar repetir la misma pregunta
  idSiguiente = 1;

  partidaEnCurso = false;
  procesando = false; //para evitar llamandas duplicadass
  mensaje = '';
  mensajeTipo: 'info' | 'success' | 'error' = 'info';
                                                          //voy a usar local no session
  readonly CLAVE_HISTORIAL = 'esdla_historial_partidas'; //para el localsorage
  readonly CLAVE_RESUMEN = 'esdla_resumen_partidas';    //lo mismo 

  constructor(
    private juegoService: JuegoService,
    private cdr: ChangeDetectorRef
  ) {}

  get opcionesRespuesta(): string[] {
    if (!this.preguntaActual) {
      return [];
    }

    return [
      this.preguntaActual.respuesta1,
      this.preguntaActual.respuesta2,
      this.preguntaActual.respuesta3,
      this.preguntaActual.respuesta4,
    ];
  }

  get preguntaTexto(): string {
    const payload = this.preguntaActual as any;
    const texto = payload?.pregunta ?? payload?.enunciado ?? '';
    const limpio = String(texto).trim();
    if (limpio.length > 0) {
      return limpio;
    }
    return this.preguntaActual ? `Pregunta #${this.preguntaActual.id}` : '';
  }

  private setMensaje(texto: string, tipo: 'info' | 'success' | 'error' = 'info'): void {
    this.mensaje = texto;
    this.mensajeTipo = tipo;
  }

  empezarPartida(): void {
    if (this.procesando) {
      return;
    }

    this.procesando = true;
    this.setMensaje('Iniciando partida...', 'info');

    this.juegoService.empezarPartida().subscribe({
      next: (partida) => {
        this.partidaActual = partida;
        this.partidaEnCurso = true;

        // se resetea todo estado para una partida nueva
        this.setPreguntasRespondidas.clear();
        this.idSiguiente = 1;
        this.preguntaActual = null;

        
        this.procesando = false;
        this.cargarSiguientePregunta();
        this.cdr.detectChanges();
      },
      error: () => {
        this.procesando = false;
        this.partidaEnCurso = false;
        this.partidaActual = null;
        this.setMensaje('No se pudo iniciar la partida.', 'error');
        this.cdr.detectChanges();
      },
    });
  }

  private cargarSiguientePregunta(): void {
  if (!this.partidaEnCurso) {
    return;
  }

  this.procesando = true;
  this.setMensaje('Buscando siguiente pregunta disponible...', 'info');

  this.buscarPreguntaDisponible(this.idSiguiente, 0);
}

private buscarPreguntaDisponible(idActual: number, intentos: number): void {
  const MAX_INTENTOS = 100;

  if (intentos >= MAX_INTENTOS) {
    this.procesando = false;
    this.preguntaActual = null;

    if (this.partidaActual) {
      this.finalizarPartidaLocal(
        'SIN_PREGUNTAS',
        this.partidaActual,
        'No hay mas preguntas disponibles. La partida termina.'
      );
    } else {
      this.partidaEnCurso = false;
      this.setMensaje('No hay mas preguntas disponibles.', 'error');
    }
    return;
  }

  this.juegoService.obtenerPregunta(idActual).subscribe({
    next: (pregunta) => {
      const payload = (pregunta as any) ?? null;
      const idPregunta = Number(payload?.id ?? payload?.idPregunta ?? idActual);

      // Si backend devuelve null, saltamos a la siguiente
      if (!payload) {
        this.idSiguiente = idActual + 1;
        this.buscarPreguntaDisponible(this.idSiguiente, intentos + 1);
        return;
      }

      const preguntaLista: PreguntaDto = {
        ...payload,
        id: Number.isNaN(idPregunta) ? idActual : idPregunta,
        pregunta: String(payload.pregunta ?? payload.enunciado ?? '').trim(),
        respuesta1: payload.respuesta1 ?? '',
        respuesta2: payload.respuesta2 ?? '',
        respuesta3: payload.respuesta3 ?? '',
        respuesta4: payload.respuesta4 ?? '',
        respuestaCorrecta: Number(payload.respuestaCorrecta ?? 0)
      };

      if (this.setPreguntasRespondidas.has(preguntaLista.id)) {
        this.idSiguiente = idActual + 1;
        this.buscarPreguntaDisponible(this.idSiguiente, intentos + 1);
        return;
      }

      this.preguntaActual = preguntaLista;
      this.idSiguiente = idActual + 1;
      this.procesando = false;
      this.setMensaje('Partida en curso. Elige una respuesta.', 'info');
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error obteniendo pregunta id', idActual, err);
      this.idSiguiente = idActual + 1;
      this.buscarPreguntaDisponible(this.idSiguiente, intentos + 1);
      this.cdr.detectChanges();
    }
  });
}


responder(opcion: number): void {
  if (this.procesando || !this.partidaEnCurso || !this.partidaActual || !this.preguntaActual) {
    return;
  }

  this.procesando = true;

  const idPregunta = this.preguntaActual.id;
  const idPartida = this.partidaActual.id;

  // se marca esta pregunta como ya respondida en la partida actual
  this.setPreguntasRespondidas.add(idPregunta);

  this.juegoService.comprobarRespuesta(idPregunta, opcion).subscribe({
    next: (esCorrecta) => {
      if (esCorrecta) {
        this.setMensaje('Respuesta correcta.', 'success');
        this.gestionarRespuestaCorrecta(idPartida);
      } else {
        this.setMensaje('Respuesta incorrecta. Fin de la partida.', 'error');
        this.gestionarRespuestaIncorrecta(idPartida);
      }
    },
    error: () => {
      this.procesando = false;
      this.setMensaje('Error al comprobar la respuesta.', 'error');
      this.cdr.detectChanges();
    }
  });
}

private gestionarRespuestaCorrecta(idPartida: number): void {
  this.juegoService.sumarCorrecta(idPartida).subscribe({
    next: (partidaActualizada) => {
      this.partidaActual = partidaActualizada;

      const ganaPorPuntuacion = partidaActualizada.numeroCorrectas >= 5;
      const backendIndicaFin = partidaActualizada.finPartida === true;

      if (ganaPorPuntuacion || backendIndicaFin) {
        this.finalizarPartidaLocal('VICTORIA', partidaActualizada, 'Has acertado 4 + 1 veces y has ganado, muy bien ti@');
        return;
      }

      
      this.procesando = false;
      this.cargarSiguientePregunta();
      this.cdr.detectChanges();
    },
    error: () => {
      this.procesando = false;
      this.setMensaje('Error al actualizar aciertos.', 'error');
      this.cdr.detectChanges();
    }
  });
}

private gestionarRespuestaIncorrecta(idPartida: number): void {
  this.juegoService.finalizarPartida(idPartida).subscribe({
    next: (partidaFinalizada) => {
      this.partidaActual = partidaFinalizada;
      this.finalizarPartidaLocal('DERROTA', partidaFinalizada, 'aqui no existen las segundas oportunidades, perdiste');
    },
    error: () => {
      this.procesando = false;
      this.setMensaje('Error al finalizar la partida.', 'error');
      this.cdr.detectChanges();
    }
  });
}

private finalizarPartidaLocal(
  resultado: 'VICTORIA' | 'DERROTA' | 'SIN_PREGUNTAS',
  partida: PartidaDto,
  mensajeFinal: string
): void {
  this.guardarEstadistica(partida, resultado);

  this.partidaEnCurso = false;
  this.procesando = false;
  this.preguntaActual = null;
  this.setMensaje(mensajeFinal, resultado === 'VICTORIA' ? 'success' : 'error');
  this.cdr.detectChanges();
}

private guardarEstadistica(
  partida: PartidaDto,
  resultado: 'VICTORIA' | 'DERROTA' | 'SIN_PREGUNTAS'
): void {
  const historialActual = this.leerHistorial();

  const registro: PartidaHistorial = {
    idPartida: partida.id,
    fechaInicio: partida.fechaInicio ?? null,
    fechaFin: partida.fechaFin ?? null,
    correctas: partida.numeroCorrectas,
    resultado
  };

  historialActual.push(registro);
  localStorage.setItem(this.CLAVE_HISTORIAL, JSON.stringify(historialActual));

  const resumen = this.construirResumen(historialActual);
  localStorage.setItem(this.CLAVE_RESUMEN, JSON.stringify(resumen));
}

private leerHistorial(): PartidaHistorial[] {
  const fila = localStorage.getItem(this.CLAVE_HISTORIAL);
  if (!fila) {
    return [];
  }

  try {
    const data = JSON.parse(fila) as PartidaHistorial[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

private construirResumen(historial: PartidaHistorial[]): {
  jugadas: number;
  victorias: number;
  derrotas: number;
} {
  const jugadas = historial.length;
  const victorias = historial.filter((p) => p.resultado === 'VICTORIA').length;
  const derrotas = historial.filter((p) => p.resultado === 'DERROTA' || p.resultado === 'SIN_PREGUNTAS').length;

  return { jugadas, victorias, derrotas };
}



  
}
