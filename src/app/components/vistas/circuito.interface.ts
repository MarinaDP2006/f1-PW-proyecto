// Interfaz para el modelo de Circuito
export interface Circuito {
  // Identificador único del circuito.
  id: number;
  // Nombre oficial del circuito.
  nombre: string;
  // País donde se ubica el circuito.
  pais: string;
  // Descripción breve del trazado.
  descripcion: string;
  // Tipo de circuito (urbano, permanente, etc.).
  tipo: string;
  // Longitud total de la vuelta.
  longitud: string;
}
