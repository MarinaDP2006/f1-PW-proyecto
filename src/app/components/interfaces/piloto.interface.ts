// Interfaz para el modelo de Piloto
export interface Piloto {
  id: number;
  nombre: string;
  equipo: string;
  numero: number;
  nacionalidad: string;
  estadisticas: EstadisticasPiloto;
  imagenUrl: string;
}

// Interfaz para las estadísticas del piloto
export interface EstadisticasPiloto {
  carreras: number;
  victorias: number;
  podios: number;
  poles: number;
  puntos: number;
}
