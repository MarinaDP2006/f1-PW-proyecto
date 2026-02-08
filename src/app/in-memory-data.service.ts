import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Piloto, Auto, Circuito } from './components/interfaces/f1-types';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  // Crea la base de datos en memoria con datos iniciales
  createDb() {
    const pilotos: Piloto[] = [
      {
        id: '1',
        nombre: 'Lewis Hamilton',
        descripcion: 'Siete veces campeón del mundo de Fórmula 1.',
        urlImagen: '/images/pilotos/hamilton.jpg',
        tipo: 'piloto',
        categoria: 'campeon',
        escuderia: 'mercedes',
        motor: 'mercedes',
        nacionalidad: 'Reino Unido'
      },
      {
        id: '2',
        nombre: 'Max Verstappen',
        descripcion: 'Campeón del mundo vigente, piloto de Red Bull Racing.',
        urlImagen: '/images/pilotos/verstappen.jpg',
        tipo: 'piloto',
        categoria: 'campeon',
        escuderia: 'red_bull',
        motor: 'red_bull_powertrains',
        nacionalidad: 'Países Bajos'
      },
      {
        id: '3',
        nombre: 'Charles Leclerc',
        descripcion: 'Piloto de Ferrari, talento joven de Mónaco.',
        urlImagen: '/images/pilotos/leclerc.jpg',
        tipo: 'piloto',
        categoria: 'experimentado',
        escuderia: 'ferrari',
        motor: 'ferrari',
        nacionalidad: 'Mónaco'
      },
      {
        id: '4',
        nombre: 'Lando Norris',
        descripcion: 'Piloto británico de McLaren, conocido por su velocidad.',
        urlImagen: '/images/pilotos/norris.jpg',
        tipo: 'piloto',
        categoria: 'experimentado',
        escuderia: 'mclaren',
        motor: 'mercedes',
        nacionalidad: 'Reino Unido'
      },
      {
        id: '5',
        nombre: 'Fernando Alonso',
        descripcion: 'Bicampeón del mundo español, veterano de la F1.',
        urlImagen: '/images/pilotos/alonso.jpg',
        tipo: 'piloto',
        categoria: 'veterano',
        escuderia: 'aston_martin',
        motor: 'mercedes',
        nacionalidad: 'España'
      }
    ];
    const autos: Auto[] = [
      {
        id: '11',
        nombre: 'Mercedes W15',
        descripcion: 'Monoplaza de Mercedes-AMG Petronas F1 Team.',
        urlImagen: '/images/coches/mercedes-w15.jpg',
        tipo: 'auto',
        tipoAuto: 'monoplaza',
        escuderia: 'mercedes',
        motor: 'mercedes',
        nacionalidad: 'Alemania'
      },
      {
        id: '12',
        nombre: 'Red Bull RB20',
        descripcion: 'Monoplaza campeón de Red Bull Racing.',
        urlImagen: '/images/coches/red-bull-rb20.jpg',
        tipo: 'auto',
        tipoAuto: 'monoplaza',
        escuderia: 'red_bull',
        motor: 'red_bull_powertrains',
        nacionalidad: 'Austria'
      },
      {
        id: '13',
        nombre: 'Ferrari SF-24',
        descripcion: 'El legendario monoplaza de la Scuderia Ferrari.',
        urlImagen: '/images/coches/ferrari-sf24.jpg',
        tipo: 'auto',
        tipoAuto: 'monoplaza',
        escuderia: 'ferrari',
        motor: 'ferrari',
        nacionalidad: 'Italia'
      }
    ];
    const circuitos: Circuito[] = [
      {
        id: '14',
        nombre: 'Circuito de Mónaco',
        descripcion: 'El circuito más glamuroso y desafiante de la F1.',
        urlImagen: '/images/circuitos/monaco.jpg',
        tipo: 'circuito',
        tipoCircuito: 'urbano',
        escuderia: 'ferrari',
        motor: 'ferrari',
        nacionalidad: 'Mónaco'
      },
      {
        id: '15',
        nombre: 'Silverstone',
        descripcion: 'El hogar del Gran Premio de Gran Bretaña.',
        urlImagen: '/images/circuitos/silverstone.jpg',
        tipo: 'circuito',
        tipoCircuito: 'permanente',
        escuderia: 'mercedes',
        motor: 'mercedes',
        nacionalidad: 'Reino Unido'
      },
      {
        id: '16',
        nombre: 'Spa-Francorchamps',
        descripcion: 'Uno de los circuitos más históricos y desafiantes.',
        urlImagen: '/images/circuitos/spa.jpg',
        tipo: 'circuito',
        tipoCircuito: 'permanente',
        escuderia: 'red_bull',
        motor: 'red_bull_powertrains',
        nacionalidad: 'Bélgica'
      }
    ];
    return {pilotos, autos, circuitos};
  }


  // Genera IDs únicos para nuevos elementos
  genId<T extends {id: string}>(collection: T[]): string {
    return collection.length > 0 ? String(Math.max(...collection.map(item => parseInt(item.id))) + 1) : '1';
  }
}
