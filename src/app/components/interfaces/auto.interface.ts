// Interfaz para el modelo de Auto F1
export interface Auto {
  // Identificador único del auto.
  id: number;
  // Nombre de la escudería.
  equipo: string;
  // Modelo del monoplaza.
  modelo: string;
  // Especificación del motor usado.
  motor: string;
  // Potencia aproximada del vehículo.
  potencia: string;
  // Año de la temporada del auto.
  anio: number;
  // Ruta o URL de la imagen del auto.
  imagenUrl: string;
}
