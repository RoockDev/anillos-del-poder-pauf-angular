export interface PartidaHistorial {
  idPartida: number;
  fechaInicio: string | null;
  fechaFin: string | null;
  correctas: number;
  resultado: 'VICTORIA' | 'DERROTA' | 'SIN_PREGUNTAS';
}
