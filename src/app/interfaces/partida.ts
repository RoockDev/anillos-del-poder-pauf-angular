export interface PartidaDto {
  id: number;
  fechaInicio: string | null;
  fechaFin: string | null;
  numeroCorrectas: number;
  finPartida: boolean;
}
