import { Component, OnInit, inject } from '@angular/core';
import { F1Data } from '../servicioDATA/f1-data.service';
import { Carrera, PilotoResumen } from '../vistas/carrera.interface';
import { DiaCalendario } from '../vistas/dia-calendario.interface';
import { Piloto } from '../vistas/piloto.interface';

interface MesCalendario {
  titulo: string;
  celdasVaciasInicio: number[];
  dias: DiaCalendario[];
}

// Componente que muestra calendario mensual de carreras, listado de próximas fechas y detalle de la carrera seleccionada.
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  standalone: false
})
export class CalendarioComponent implements OnInit {
  // Servicio de datos para recuperar la lista de pilotos y construir la vista de carreras.
  private readonly f1Data = inject(F1Data);

  // Colección completa de carreras generadas para el calendario.
  carreras: Carrera[] = [];
  // Subconjunto de carreras futuras ordenadas por fecha.
  carrerasProximas: Carrera[] = [];
  // Carrera activa actualmente en el panel de detalle.
  carreraSeleccionada: Carrera | null = null;

  // Colección de meses visibles en el calendario anual.
  mesesCalendario: MesCalendario[] = [];

  // Etiquetas de los días de la semana iniciando en lunes.
  readonly diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  ngOnInit(): void {
    // Dispara la carga de pilotos desde el servicio.
    this.f1Data.getPilotos();

    // Con los pilotos cargados, arma carreras mock, calcula próximas y prepara el calendario anual.
    this.f1Data.pilotos$.subscribe((pilotos) => {
      if (!pilotos.length) {
        return;
      }

      this.carreras = this.crearCarrerasMock(pilotos);
      this.carrerasProximas = this.obtenerCarrerasProximas(this.carreras);
      this.carreraSeleccionada = this.carrerasProximas[0] ?? null;
      this.construirCalendarioAnual(this.carreras);
    });
  }

  // Selecciona una carrera desde la lista lateral.
  seleccionarCarrera(carrera: Carrera): void {
    this.carreraSeleccionada = carrera;
  }

  // Selecciona una carrera al hacer clic en un día del calendario.
  seleccionarDesdeDia(dia: DiaCalendario): void {
    if (!dia.carreraId) {
      return;
    }

    const encontrada = this.carreras.find((carrera) => carrera.id === dia.carreraId);
    if (encontrada) {
      this.carreraSeleccionada = encontrada;
    }
  }

  // Devuelve el estado temporal de una carrera respecto al día actual.
  obtenerEstadoCarrera(carrera: Carrera): 'hoy' | 'proxima' | 'pasada' {
    const fechaCarrera = new Date(carrera.fechaHora);
    const hoy = this.inicioDelDia(new Date());
    const fecha = this.inicioDelDia(fechaCarrera);

    if (fecha.getTime() === hoy.getTime()) {
      return 'hoy';
    }

    if (fecha.getTime() > hoy.getTime()) {
      return 'proxima';
    }

    return 'pasada';
  }

  // Indica si una carrera corresponde a la actualmente seleccionada.
  esCarreraSeleccionada(carrera: Carrera): boolean {
    return this.carreraSeleccionada?.id === carrera.id;
  }

  // Obtiene el estado visual de un día del calendario.
  estadoDia(dia: DiaCalendario): 'hoy' | 'proxima' | 'pasada' | 'normal' {
    if (!dia.tieneCarrera || !dia.carreraId) {
      return 'normal';
    }

    const carrera = this.carreras.find((item) => item.id === dia.carreraId);
    return carrera ? this.obtenerEstadoCarrera(carrera) : 'normal';
  }

  // Construye la estructura anual entre febrero y octubre de 2026.
  private construirCalendarioAnual(carreras: Carrera[]): void {
    const anio = 2026;
    const mesInicio = 1;
    const mesFin = 9;

    this.mesesCalendario = [];

    for (let mes = mesInicio; mes <= mesFin; mes += 1) {
      const inicioMes = new Date(anio, mes, 1);
      const finMes = new Date(anio, mes + 1, 0);

      const titulo = inicioMes.toLocaleDateString('es-ES', {
        month: 'long',
        year: 'numeric'
      });

      const primerDiaSemana = this.convertirSemanaLunesDomingo(inicioMes.getDay());
      const celdasVaciasInicio = Array.from({ length: primerDiaSemana }, (_, indice) => indice);
      const dias: DiaCalendario[] = [];

      for (let dia = 1; dia <= finMes.getDate(); dia += 1) {
        const fecha = new Date(anio, mes, dia);
        const carreraDia = carreras.find((carrera) => this.mismaFecha(new Date(carrera.fechaHora), fecha));

        dias.push({
          fecha,
          tieneCarrera: Boolean(carreraDia),
          carreraId: carreraDia?.id
        });
      }

      this.mesesCalendario.push({
        titulo,
        celdasVaciasInicio,
        dias
      });
    }
  }

  // Filtra y ordena únicamente las carreras cuya fecha aún no pasó.
  private obtenerCarrerasProximas(carreras: Carrera[]): Carrera[] {
    const ahora = new Date();

    return carreras
      .filter((carrera) => new Date(carrera.fechaHora).getTime() >= ahora.getTime())
      .sort((a, b) => new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime());
  }

  // Genera carreras de ejemplo tomando pilotos cargados desde el servicio.
  private crearCarrerasMock(pilotos: Piloto[]): Carrera[] {
    // Busca un piloto por su identificador.
    const buscarPiloto = (id: number) => pilotos.find((piloto) => piloto.id === id);

    // Construye el resumen que se muestra para cada piloto dentro de una carrera.
    const resumenPiloto = (id: number): PilotoResumen => {
      const piloto = buscarPiloto(id);
      return {
        id,
        nombre: piloto?.nombre ?? 'Piloto por confirmar',
        equipo: piloto?.equipo ?? 'Equipo por confirmar',
        numero: piloto?.numero,
        imagen: piloto?.imagenUrl
      };
    };

    // Crea una fecha fija dentro del calendario anual 2026.
    const crearFecha2026 = (mes: number, dia: number, hora: number, minutos = 0): string => {
      const fecha = new Date(2026, mes - 1, dia, hora, minutos, 0, 0);
      return fecha.toISOString();
    };

    // Retorna un listado de grandes premios de ejemplo entre febrero y octubre de 2026.
    return [
      {
        id: 1,
        granPremio: 'Gran Premio de Bahréin',
        fechaHora: crearFecha2026(2, 28, 18, 0),
        circuito: 'Sakhir',
        pais: 'Bahréin',
        pilotos: [resumenPiloto(1), resumenPiloto(7), resumenPiloto(5), resumenPiloto(3)]
      },
      {
        id: 2,
        granPremio: 'Gran Premio de Arabia Saudí',
        fechaHora: crearFecha2026(3, 21, 20, 0),
        circuito: 'Jeddah Corniche Circuit',
        pais: 'Arabia Saudí',
        pilotos: [resumenPiloto(1), resumenPiloto(4), resumenPiloto(6), resumenPiloto(9)]
      },
      {
        id: 3,
        granPremio: 'Gran Premio de Japón',
        fechaHora: crearFecha2026(4, 5, 14, 0),
        circuito: 'Suzuka',
        pais: 'Japón',
        pilotos: [resumenPiloto(1), resumenPiloto(4), resumenPiloto(6), resumenPiloto(9)]
      },
      {
        id: 4,
        granPremio: 'Gran Premio de China',
        fechaHora: crearFecha2026(5, 3, 15, 0),
        circuito: 'Shanghai International Circuit',
        pais: 'China',
        pilotos: [resumenPiloto(2), resumenPiloto(8), resumenPiloto(10), resumenPiloto(11)]
      },
      {
        id: 5,
        granPremio: 'Gran Premio de Miami',
        fechaHora: crearFecha2026(6, 14, 19, 30),
        circuito: 'Miami International Autodrome',
        pais: 'Estados Unidos',
        pilotos: [resumenPiloto(3), resumenPiloto(5), resumenPiloto(7), resumenPiloto(12)]
      },
      {
        id: 6,
        granPremio: 'Gran Premio de Gran Bretaña',
        fechaHora: crearFecha2026(7, 12, 16, 0),
        circuito: 'Silverstone',
        pais: 'Reino Unido',
        pilotos: [resumenPiloto(6), resumenPiloto(9), resumenPiloto(13), resumenPiloto(15)]
      },
      {
        id: 7,
        granPremio: 'Gran Premio de Bélgica',
        fechaHora: crearFecha2026(8, 30, 15, 0),
        circuito: 'Spa-Francorchamps',
        pais: 'Bélgica',
        pilotos: [resumenPiloto(2), resumenPiloto(4), resumenPiloto(8), resumenPiloto(11)]
      },
      {
        id: 8,
        granPremio: 'Gran Premio de Italia',
        fechaHora: crearFecha2026(9, 13, 15, 0),
        circuito: 'Monza',
        pais: 'Italia',
        pilotos: [resumenPiloto(1), resumenPiloto(3), resumenPiloto(7), resumenPiloto(10)]
      },
      {
        id: 9,
        granPremio: 'Gran Premio de Estados Unidos',
        fechaHora: crearFecha2026(10, 18, 20, 0),
        circuito: 'Circuit of the Americas',
        pais: 'Estados Unidos',
        pilotos: [resumenPiloto(5), resumenPiloto(6), resumenPiloto(12), resumenPiloto(14)]
      },
      {
        id: 10,
        granPremio: 'Gran Premio de Emilia-Romaña',
        fechaHora: crearFecha2026(10, 25, 14, 0),
        circuito: 'Imola',
        pais: 'Italia',
        pilotos: [resumenPiloto(6), resumenPiloto(9), resumenPiloto(13), resumenPiloto(15)]
      }
    ];
  }

  // Compara si dos fechas corresponden exactamente al mismo día calendario.
  private mismaFecha(fechaA: Date, fechaB: Date): boolean {
    return fechaA.getFullYear() === fechaB.getFullYear()
      && fechaA.getMonth() === fechaB.getMonth()
      && fechaA.getDate() === fechaB.getDate();
  }

  // Normaliza una fecha al inicio del día para comparaciones sin hora.
  private inicioDelDia(fecha: Date): Date {
    return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  }

  // Convierte índice semanal JS (domingo=0) a formato lunes-domingo.
  private convertirSemanaLunesDomingo(diaSemana: number): number {
    return diaSemana === 0 ? 6 : diaSemana - 1;
  }
}
