export type TipoEntidad = 'piloto' | 'auto' | 'circuito';
export type TipoCategoria = 'novato' | 'experimentado' | 'veterano' | 'campeon';
export type TipoMotor = 'mercedes' | 'ferrari' | 'renault' | 'honda' | 'red_bull_powertrains';
export type TipoEscuderia = 'mercedes' | 'ferrari' | 'red_bull' | 'mclaren' | 'alpine' | 'aston_martin' | 'alfa_romeo' | 'haas' | 'alphatauri' | 'williams';


// Interfaz base para todas las entidades del mundo de Fórmula 1
export interface EntidadF1 {
  id: string;
  nombre: string;
  descripcion: string;
  urlImagen: string;
  tipo: TipoEntidad;
  escuderia: TipoEscuderia;
  motor: TipoMotor;
  nacionalidad?: string;
  estadisticas?: string[];
  logros?: string[];
  fechaCreacion?: Date;
  fechaActualizacion?: Date;

  // Alias en inglés
  name?: string;
  description?: string;
  imageUrl?: string;
  nationality?: string;
  statistics?: string[];
  achievements?: string[];
  team?: TipoEscuderia;
  engine?: TipoMotor;
}

// Interfaz para pilotos de Fórmula 1
export interface Piloto extends EntidadF1 {
  tipo: 'piloto';
  categoria: TipoCategoria;
  numeroCoche?: number;
  fechaNacimiento?: string;
  lugarNacimiento?: string;
  experiencia?: string;
  victorias?: number;
  podios?: number;
  poles?: number;
  vueltas_rapidas?: number;
  puntos_carrera?: number;

  // Alias en inglés
  carNumber?: number;
  birthDate?: string;
  birthPlace?: string;
  wins?: number;
  podiums?: number;
  polePositions?: number;
  fastestLaps?: number;
  careerPoints?: number;
}

// Interfaz para autos de Fórmula 1
export interface Auto extends EntidadF1 {
  tipo: 'auto';
  tipoAuto: 'monoplaza' | 'coche_seguridad' | 'coche_medico' | 'coche_virtual';
  piloto?: string;
  anioFabricacion?: number;
  chasis?: string;
  aerodinamica?: string[];
  especificaciones?: string;
  peso?: string;
  potencia?: string;

  // Alias en inglés
  carType?: string;
  driver?: string;
  manufacturingYear?: number;
  chassis?: string;
  aerodynamics?: string[];
  specifications?: string;
  weight?: string;
  power?: string;
}

// Interfaz para circuitos de Fórmula 1
export interface Circuito extends EntidadF1 {
  tipo: 'circuito';
  tipoCircuito: 'urbano' | 'permanente' | 'mixto' | 'oval' | 'carretera';
  longitud?: string;
  curvas?: number;
  record_vuelta?: string;
  record_piloto?: string;
  capacidad_espectadores?: number;
  caracteristicas?: string[];
  dificultad?: string;
  superficie?: string;

  // Alias en inglés
  circuitType?: string;
  length?: string;
  corners?: number;
  lapRecord?: string;
  recordHolder?: string;
  spectatorCapacity?: number;
  characteristics?: string[];
  difficulty?: string;
  surface?: string;
}

// Union type para cualquier entidad del mundo de Fórmula 1
export type EntidadF1_Union = Piloto | Auto | Circuito;

// Alias en inglés para compatibilidad
export type Driver = Piloto;
export type Car = Auto;
export type Circuit = Circuito;
export type F1Entity = EntidadF1_Union;

// Opciones de filtrado para búsquedas y consultas
export interface OpcionesFiltro {
  tipo?: TipoEntidad;
  escuderia?: TipoEscuderia;
  motor?: TipoMotor;
  categoria?: TipoCategoria;
  busqueda?: string;

  // Alias en inglés
  type?: 'driver' | 'car' | 'circuit' | 'piloto' | 'auto' | 'circuito';
  team?: TipoEscuderia;
  engine?: TipoMotor;
  category?: TipoCategoria;
  search?: string;
}

// Alias en inglés para opciones de filtrado
export type FilterOptions = OpcionesFiltro;
