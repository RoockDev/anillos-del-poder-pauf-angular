import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidaHistorial } from '../../interfaces/partida-historial';

type ResumenPartidas = {
  jugadas: number;
  victorias: number;
  derrotas: number;
};

@Component({
  selector: 'app-estadisticas-partidas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadisticas-partidas.html',
  styleUrl: './estadisticas-partidas.css'
})
export class EstadisticasPartidas implements OnInit {
  readonly CLAVE_HISTORIAL = 'esdla_historial_partidas';
  readonly CLAVE_RESUMEN = 'esdla_resumen_partidas';

  historial: PartidaHistorial[] = [];
  resumen: ResumenPartidas = { jugadas: 0, victorias: 0, derrotas: 0 };

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.historial = this.leerHistorial();
    this.resumen = this.leerResumen();
  }

  limpiarHistorial(): void {
    localStorage.removeItem(this.CLAVE_HISTORIAL);
    localStorage.removeItem(this.CLAVE_RESUMEN);
    this.cargarDatos();
  }

  get porcentajeVictorias(): number {
    if (this.resumen.jugadas === 0) {
      return 0;
    }
    return Math.round((this.resumen.victorias / this.resumen.jugadas) * 100);
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

  private leerResumen(): ResumenPartidas {
    const otraFila = localStorage.getItem(this.CLAVE_RESUMEN);
    if (!otraFila) {
      return { jugadas: 0, victorias: 0, derrotas: 0 };
    }

    try {
      const data = JSON.parse(otraFila) as ResumenPartidas;
      return {
        jugadas: data.jugadas ?? 0,
        victorias: data.victorias ?? 0,
        derrotas: data.derrotas ?? 0
      };
    } catch {
      return { jugadas: 0, victorias: 0, derrotas: 0 };
    }
  }
}
