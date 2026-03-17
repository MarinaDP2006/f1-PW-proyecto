export interface PilotoResumen {
  id: number;
  nombre: string;
  equipo: string;
  numero?: number;
  imagen?: string;
}

export interface Carrera {
  id: number;
  granPremio: string;
  fechaHora: string;
  circuito: string;
  pais: string;
  pilotos: PilotoResumen[];
}
