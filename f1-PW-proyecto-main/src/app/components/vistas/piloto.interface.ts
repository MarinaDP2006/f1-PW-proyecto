// Interfaz para el modelo de Piloto
export interface Piloto {
  // Identificador único del piloto.
  id: number;
  // Nombre completo del piloto.
  nombre: string;
  // Escudería del piloto.
  equipo: string;
  // Número de competición.
  numero: number;
  // Nacionalidad del piloto.
  nacionalidad: string;
  // Conjunto de estadísticas deportivas.
  estadisticas: EstadisticasPiloto;
  // Ruta o URL de la imagen del piloto.
  imagenUrl: string;
}

// Interfaz para las estadísticas del piloto
export interface EstadisticasPiloto {
  // Total de carreras disputadas.
  carreras: number;
  // Total de victorias obtenidas.
  victorias: number;
  // Total de podios logrados.
  podios: number;
  // Total de poles position.
  poles: number;
  // Puntos acumulados en su carrera.
  puntos: number;
}
