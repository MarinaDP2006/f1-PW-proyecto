import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Piloto } from '../interfaces/piloto.interface';
import { Auto } from '../interfaces/auto.interface';
import { Circuito } from '../interfaces/circuito.interface';

export class InMemoryDataService implements InMemoryDbService {
  // Método para crear la base de datos en memoria
  createDb() {
    const pilotos: Piloto[] = [
      {
        id: 1,
        nombre: 'Max Verstappen',
        equipo: 'Red Bull Racing',
        numero: 1,
        nacionalidad: 'Holandés',
        estadisticas: {
          carreras: 199,
          victorias: 61,
          podios: 107,
          poles: 32,
          puntos: 2797
        },
        imagenUrl: '/public/pi'
      },
      {
        id: 2,
        nombre: 'Sergio Pérez',
        equipo: 'Red Bull Racing',
        numero: 11,
        nacionalidad: 'Mexicano',
        estadisticas: {
          carreras: 268,
          victorias: 6,
          podios: 39,
          poles: 3,
          puntos: 1614
        },
        imagenUrl: 'https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=SP'
      },
      {
        id: 3,
        nombre: 'Lewis Hamilton',
        equipo: 'Mercedes',
        numero: 44,
        nacionalidad: 'Británico',
        estadisticas: {
          carreras: 347,
          victorias: 105,
          podios: 201,
          poles: 104,
          puntos: 4623
        },
        imagenUrl: 'https://via.placeholder.com/150x150/00D2BE/FFFFFF?text=LH'
      },
      {
        id: 4,
        nombre: 'George Russell',
        equipo: 'Mercedes',
        numero: 63,
        nacionalidad: 'Británico',
        estadisticas: {
          carreras: 125,
          victorias: 2,
          podios: 13,
          poles: 3,
          puntos: 461
        },
        imagenUrl: 'https://via.placeholder.com/150x150/00D2BE/FFFFFF?text=GR'
      },
      {
        id: 5,
        nombre: 'Charles Leclerc',
        equipo: 'Ferrari',
        numero: 16,
        nacionalidad: 'Monegasco',
        estadisticas: {
          carreras: 147,
          victorias: 6,
          podios: 29,
          poles: 26,
          puntos: 1204
        },
        imagenUrl: 'https://via.placeholder.com/150x150/DC143C/FFFFFF?text=CL'
      },
      {
        id: 6,
        nombre: 'Carlos Sainz Jr.',
        equipo: 'Ferrari',
        numero: 55,
        nacionalidad: 'Español',
        estadisticas: {
          carreras: 203,
          victorias: 4,
          podios: 23,
          poles: 6,
          puntos: 1169
        },
        imagenUrl: 'https://via.placeholder.com/150x150/DC143C/FFFFFF?text=CS'
      },
      {
        id: 7,
        nombre: 'Lando Norris',
        equipo: 'McLaren',
        numero: 4,
        nacionalidad: 'Británico',
        estadisticas: {
          carreras: 125,
          victorias: 1,
          podios: 9,
          poles: 1,
          puntos: 634
        },
        imagenUrl: 'https://via.placeholder.com/150x150/FF8700/FFFFFF?text=LN'
      },
      {
        id: 8,
        nombre: 'Oscar Piastri',
        equipo: 'McLaren',
        numero: 81,
        nacionalidad: 'Australiano',
        estadisticas: {
          carreras: 46,
          victorias: 2,
          podios: 5,
          poles: 0,
          puntos: 235
        },
        imagenUrl: 'https://via.placeholder.com/150x150/FF8700/FFFFFF?text=OP'
      },
      {
        id: 9,
        nombre: 'Fernando Alonso',
        equipo: 'Aston Martin',
        numero: 14,
        nacionalidad: 'Español',
        estadisticas: {
          carreras: 400,
          victorias: 32,
          podios: 106,
          poles: 22,
          puntos: 2323
        },
        imagenUrl: 'https://via.placeholder.com/150x150/229971/FFFFFF?text=FA'
      },
      {
        id: 10,
        nombre: 'Lance Stroll',
        equipo: 'Aston Martin',
        numero: 18,
        nacionalidad: 'Canadiense',
        estadisticas: {
          carreras: 168,
          victorias: 0,
          podios: 3,
          poles: 1,
          puntos: 283
        },
        imagenUrl: 'https://via.placeholder.com/150x150/229971/FFFFFF?text=LS'
      },
      {
        id: 11,
        nombre: 'Pierre Gasly',
        equipo: 'Alpine',
        numero: 10,
        nacionalidad: 'Francés',
        estadisticas: {
          carreras: 147,
          victorias: 1,
          podios: 4,
          poles: 0,
          puntos: 394
        },
        imagenUrl: 'https://via.placeholder.com/150x150/0090FF/FFFFFF?text=PG'
      },
      {
        id: 12,
        nombre: 'Esteban Ocon',
        equipo: 'Alpine',
        numero: 31,
        nacionalidad: 'Francés',
        estadisticas: {
          carreras: 147,
          victorias: 1,
          podios: 2,
          poles: 0,
          puntos: 395
        },
        imagenUrl: 'https://via.placeholder.com/150x150/0090FF/FFFFFF?text=EO'
      },
      {
        id: 13,
        nombre: 'Alex Albon',
        equipo: 'Williams',
        numero: 23,
        nacionalidad: 'Tailandés',
        estadisticas: {
          carreras: 104,
          victorias: 0,
          podios: 2,
          poles: 0,
          puntos: 246
        },
        imagenUrl: 'https://via.placeholder.com/150x150/005AFF/FFFFFF?text=AA'
      },
      {
        id: 14,
        nombre: 'Franco Colapinto',
        equipo: 'Williams',
        numero: 43,
        nacionalidad: 'Argentino',
        estadisticas: {
          carreras: 24,
          victorias: 0,
          podios: 0,
          poles: 0,
          puntos: 5
        },
        imagenUrl: 'https://via.placeholder.com/150x150/005AFF/FFFFFF?text=FC'
      },
      {
        id: 15,
        nombre: 'Yuki Tsunoda',
        equipo: 'RB',
        numero: 22,
        nacionalidad: 'Japonés',
        estadisticas: {
          carreras: 88,
          victorias: 0,
          podios: 0,
          poles: 0,
          puntos: 64
        },
        imagenUrl: 'https://via.placeholder.com/150x150/2B4562/FFFFFF?text=YT'
      },
      {
        id: 16,
        nombre: 'Daniel Ricciardo',
        equipo: 'RB',
        numero: 3,
        nacionalidad: 'Australiano',
        estadisticas: {
          carreras: 257,
          victorias: 8,
          podios: 32,
          poles: 3,
          puntos: 1339
        },
        imagenUrl: 'https://via.placeholder.com/150x150/2B4562/FFFFFF?text=DR'
      },
      {
        id: 17,
        nombre: 'Valtteri Bottas',
        equipo: 'Kick Sauber',
        numero: 77,
        nacionalidad: 'Finlandés',
        estadisticas: {
          carreras: 238,
          victorias: 10,
          podios: 67,
          poles: 20,
          puntos: 1797
        },
        imagenUrl: 'https://via.placeholder.com/150x150/900000/FFFFFF?text=VB'
      },
      {
        id: 18,
        nombre: 'Zhou Guanyu',
        equipo: 'Kick Sauber',
        numero: 24,
        nacionalidad: 'Chino',
        estadisticas: {
          carreras: 70,
          victorias: 0,
          podios: 0,
          poles: 0,
          puntos: 12
        },
        imagenUrl: 'https://via.placeholder.com/150x150/900000/FFFFFF?text=GZ'
      },
      {
        id: 19,
        nombre: 'Kevin Magnussen',
        equipo: 'Haas',
        numero: 20,
        nacionalidad: 'Danés',
        estadisticas: {
          carreras: 181,
          victorias: 0,
          podios: 1,
          poles: 1,
          puntos: 185
        },
        imagenUrl: 'https://via.placeholder.com/150x150/B6BABD/000000?text=KM'
      },
      {
        id: 20,
        nombre: 'Nico Hülkenberg',
        equipo: 'Haas',
        numero: 27,
        nacionalidad: 'Alemán',
        estadisticas: {
          carreras: 230,
          victorias: 0,
          podios: 0,
          poles: 1,
          puntos: 541
        },
        imagenUrl: 'https://via.placeholder.com/150x150/B6BABD/000000?text=NH'
      }
    ];

    const autos: Auto[] = [
      {
        id: 1,
        equipo: 'Red Bull Racing',
        modelo: 'RB21',
        motor: 'Honda RBPT H002',
        potencia: '1060+ HP',
        anio: 2025,
        imagenUrl: 'https://via.placeholder.com/200x120/FF6B35/FFFFFF?text=RB21'
      },
      {
        id: 2,
        equipo: 'Mercedes-AMG',
        modelo: 'W16',
        motor: 'Mercedes-AMG F1 M16 E Performance',
        potencia: '1055+ HP',
        anio: 2025,
        imagenUrl: 'https://via.placeholder.com/200x120/00D2BE/FFFFFF?text=W16'
      },
      {
        id: 3,
        equipo: 'Scuderia Ferrari',
        modelo: 'SF-25',
        motor: 'Ferrari 067/1',
        potencia: '1050+ HP',
        anio: 2025,
        imagenUrl: 'https://via.placeholder.com/200x120/DC143C/FFFFFF?text=SF25'
      },
      {
        id: 4,
        equipo: 'McLaren',
        modelo: 'MCL39',
        motor: 'Mercedes-AMG F1 M16 E Performance',
        potencia: '1055+ HP',
        anio: 2025,
        imagenUrl: 'https://via.placeholder.com/200x120/FF8700/FFFFFF?text=MCL39'
      },
      {
        id: 5,
        equipo: 'Aston Martin',
        modelo: 'AMR25',
        motor: 'Mercedes-AMG F1 M16 E Performance',
        potencia: '1055+ HP',
        anio: 2025,
        imagenUrl: 'https://via.placeholder.com/200x120/229971/FFFFFF?text=AMR25'
      },
      {
        id: 6,
        equipo: 'Alpine',
        modelo: 'A525',
        motor: 'Renault E-TECH RE25',
        potencia: '1040+ HP',
        anio: 2025,
        imagenUrl: 'https://via.placeholder.com/200x120/0090FF/FFFFFF?text=A525'
      },
      {
        id: 7,
        equipo: 'Williams Racing',
        modelo: 'FW47',
        motor: 'Mercedes-AMG F1 M16 E Performance',
        potencia: '1055+ HP',
        anio: 2025,
        imagenUrl: 'https://via.placeholder.com/200x120/005AFF/FFFFFF?text=FW47'
      },
      {
        id: 8,
        equipo: 'RB',
        modelo: 'VCARB 02',
        motor: 'Honda RBPT H002',
        potencia: '1060+ HP',
        anio: 2025,
        imagenUrl: 'https://via.placeholder.com/200x120/2B4562/FFFFFF?text=VCARB02'
      },
      {
        id: 9,
        equipo: 'Kick Sauber',
        modelo: 'C45',
        motor: 'Ferrari 067/1',
        potencia: '1050+ HP',
        anio: 2025,
        imagenUrl: 'https://via.placeholder.com/200x120/900000/FFFFFF?text=C45'
      },
      {
        id: 10,
        equipo: 'Haas F1 Team',
        modelo: 'VF-25',
        motor: 'Ferrari 067/1',
        potencia: '1050+ HP',
        anio: 2025,
        imagenUrl: 'https://via.placeholder.com/200x120/B6BABD/000000?text=VF25'
      }
    ];

    const circuitos: Circuito[] = [
      {
        id: 1,
        nombre: 'Bahrain International Circuit',
        pais: 'Bahrein',
        descripcion: 'Circuito moderno ubicado en el desierto, sede del Gran Premio inaugural de cada temporada desde 2022.',
        tipo: 'Permanente',
        longitud: '5.412 km'
      },
      {
        id: 2,
        nombre: 'Jeddah Corniche Circuit',
        pais: 'Arabia Saudí',
        descripcion: 'El circuito callejero más rápido del mundo, famoso por sus muros cercanos y corridas nocturnas.',
        tipo: 'Urbano - Nocturno',
        longitud: '6.174 km'
      },
      {
        id: 3,
        nombre: 'Albert Park Circuit',
        pais: 'Australia',
        descripcion: 'Circuito semi-permanente en Melbourne, conocido por su ambiente único y desafíos técnicos.',
        tipo: 'Semi-permanente',
        longitud: '5.278 km'
      },
      {
        id: 4,
        nombre: 'Suzuka International Racing Course',
        pais: 'Japón',
        descripcion: 'Icónico circuito en forma de ocho diseñado por Honda, famoso por su sección técnica compleja.',
        tipo: 'Permanente',
        longitud: '5.807 km'
      },
      {
        id: 5,
        nombre: 'Shanghai International Circuit',
        pais: 'China',
        descripcion: 'Circuito moderno con características únicas, regresa al calendario después del paréntesis por COVID.',
        tipo: 'Permanente',
        longitud: '5.451 km'
      },
      {
        id: 6,
        nombre: 'Miami International Autodrome',
        pais: 'Estados Unidos',
        descripcion: 'Circuito construido alrededor del Hard Rock Stadium, conocido por su ambiente festivo.',
        tipo: 'Permanente',
        longitud: '5.412 km'
      },
      {
        id: 7,
        nombre: 'Autodromo Enzo e Dino Ferrari',
        pais: 'Italia',
        descripcion: 'Histórico circuito de Imola, hogar del Gran Premio de Emilia-Romaña y lugar emblemático.',
        tipo: 'Permanente',
        longitud: '4.909 km'
      },
      {
        id: 8,
        nombre: 'Circuit de Monaco',
        pais: 'Mónaco',
        descripcion: 'El circuito urbano más prestigioso y desafiante de la F1, símbolo de glamour y precisión.',
        tipo: 'Urbano',
        longitud: '3.337 km'
      },
      {
        id: 9,
        nombre: 'Circuit Gilles Villeneuve',
        pais: 'Canadá',
        descripcion: 'Ubicado en la isla artificial Île Notre-Dame en Montreal, famoso por su ambiente único.',
        tipo: 'Semi-permanente',
        longitud: '4.361 km'
      },
      {
        id: 10,
        nombre: 'Circuit de Barcelona-Catalunya',
        pais: 'España',
        descripcion: 'Tradicional sede de pruebas de pretemporada, circuito técnico completo para evaluar monoplazas.',
        tipo: 'Permanente',
        longitud: '4.675 km'
      },
      {
        id: 11,
        nombre: 'Red Bull Ring',
        pais: 'Austria',
        descripcion: 'Circuito corto y rápido en los Alpes austríacos, conocido por sus elevaciones y overtaking.',
        tipo: 'Permanente',
        longitud: '4.318 km'
      },
      {
        id: 12,
        nombre: 'Silverstone Circuit',
        pais: 'Reino Unido',
        descripcion: 'Cuna de la Fórmula 1, hogar del primer Gran Premio mundial en 1950, famoso por Copse y Maggotts.',
        tipo: 'Permanente',
        longitud: '5.891 km'
      },
      {
        id: 13,
        nombre: 'Hungaroring',
        pais: 'Hungría',
        descripcion: 'Circuito twisty y técnico, primer Gran Premio detrás del Telón de Acero en 1986.',
        tipo: 'Permanente',
        longitud: '4.381 km'
      },
      {
        id: 14,
        nombre: 'Circuit de Spa-Francorchamps',
        pais: 'Bélgica',
        descripcion: 'Legendario por Eau Rouge y Raidillon, considerado uno de los circuitos más desafiantes del mundo.',
        tipo: 'Permanente',
        longitud: '7.004 km'
      },
      {
        id: 15,
        nombre: 'Circuit Zandvoort',
        pais: 'Países Bajos',
        descripcion: 'Regreso histórico en 2021, famoso por sus curvas peraltadas y la pasión de los aficionados naranjas.',
        tipo: 'Permanente',
        longitud: '4.259 km'
      },
      {
        id: 16,
        nombre: 'Autodromo Nazionale Monza',
        pais: 'Italia',
        descripcion: 'El Templo de la Velocidad, hogar del Gran Premio de Italia desde 1950, famoso por sus rectas.',
        tipo: 'Permanente',
        longitud: '5.793 km'
      },
      {
        id: 17,
        nombre: 'Baku City Circuit',
        pais: 'Azerbaiyán',
        descripcion: 'Circuito urbano con la recta más larga del calendario, famoso por su zona técnica en la ciudad vieja.',
        tipo: 'Urbano',
        longitud: '6.003 km'
      },
      {
        id: 18,
        nombre: 'Marina Bay Street Circuit',
        pais: 'Singapur',
        descripcion: 'Pionero de las carreras nocturnas en F1, circuito urbano bajo impresionante iluminación artificial.',
        tipo: 'Urbano - Nocturno',
        longitud: '5.063 km'
      },
      {
        id: 19,
        nombre: 'Circuit of the Americas',
        pais: 'Estados Unidos',
        descripcion: 'Moderno circuito en Austin, Texas, famoso por su curva 1 elevada y sección técnica variada.',
        tipo: 'Permanente',
        longitud: '5.513 km'
      },
      {
        id: 20,
        nombre: 'Autódromo Hermanos Rodríguez',
        pais: 'México',
        descripcion: 'Circuito de gran altitud en Ciudad de México, famoso por su ambiente electoral y Foro Sol.',
        tipo: 'Permanente',
        longitud: '4.304 km'
      },
      {
        id: 21,
        nombre: 'Autódromo José Carlos Pace',
        pais: 'Brasil',
        descripcion: 'Interlagos, famoso por carreras emocionantes y condiciones climáticas cambiantes en São Paulo.',
        tipo: 'Permanente',
        longitud: '4.309 km'
      },
      {
        id: 22,
        nombre: 'Las Vegas Strip Circuit',
        pais: 'Estados Unidos',
        descripcion: 'Espectacular circuito nocturno en el Strip de Las Vegas, combinando velocidad y entretenimiento.',
        tipo: 'Urbano - Nocturno',
        longitud: '6.201 km'
      },
      {
        id: 23,
        nombre: 'Losail International Circuit',
        pais: 'Qatar',
        descripcion: 'Circuito del desierto con carreras nocturnas, conocido por sus largas curvas de alta velocidad.',
        tipo: 'Permanente - Nocturno',
        longitud: '5.380 km'
      },
      {
        id: 24,
        nombre: 'Yas Marina Circuit',
        pais: 'Emiratos Árabes Unidos',
        descripcion: 'Moderno circuito en Abu Dhabi que cierra la temporada, famoso por su hotel Viceroy y carrera nocturna.',
        tipo: 'Permanente - Nocturno',
        longitud: '5.281 km'
      }
    ];

    return { pilotos, autos, circuitos };
  }

  // Método para generar un ID único para nuevos pilotos
  genId<T extends Piloto | Auto | Circuito>(collection: T[]): number {
    return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 1;
  }
}
