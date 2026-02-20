import { Component, OnInit, inject } from '@angular/core';
import { F1Data } from '../servicioDATA/f1-data.service';
import { Carrera, PilotoResumen } from '../vistas/carrera.interface';
import { DiaCalendario } from '../vistas/dia-calendario.interface';
import { Piloto } from '../vistas/piloto.interface';

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

  // Días visibles del mes actual (incluye marca de carrera cuando aplica).
  diasCalendario: DiaCalendario[] = [];
  // Celdas vacías iniciales para alinear el primer día del mes con el día de semana.
  celdasVaciasInicio: number[] = [];
  // Título visible del mes y año del calendario.
  tituloMes = '';

  // Etiquetas de los días de la semana iniciando en lunes.
  readonly diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  ngOnInit(): void {
    // Dispara la carga de pilotos desde el servicio.
    this.f1Data.getPilotos();

    // Con los pilotos cargados, arma carreras mock, calcula próximas y prepara el calendario del mes.
    this.f1Data.pilotos$.subscribe((pilotos) => {
      if (!pilotos.length) {
        return;
      }

      this.carreras = this.crearCarrerasMock(pilotos);
      this.carrerasProximas = this.obtenerCarrerasProximas(this.carreras);
      this.carreraSeleccionada = this.carrerasProximas[0] ?? null;

      const fechaBase = this.carreraSeleccionada ? new Date(this.carreraSeleccionada.fechaHora) : new Date();
      this.construirCalendarioMes(fechaBase, this.carreras);
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

  // Construye la estructura mensual del calendario y marca qué días tienen carrera.
  private construirCalendarioMes(fechaBase: Date, carreras: Carrera[]): void {
    const inicioMes = new Date(fechaBase.getFullYear(), fechaBase.getMonth(), 1);
    const finMes = new Date(fechaBase.getFullYear(), fechaBase.getMonth() + 1, 0);

    this.tituloMes = inicioMes.toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric'
    });
    const primerDiaSemana = this.convertirSemanaLunesDomingo(inicioMes.getDay());
    this.celdasVaciasInicio = Array.from({ length: primerDiaSemana }, (_, indice) => indice);
    this.diasCalendario = [];

    for (let dia = 1; dia <= finMes.getDate(); dia += 1) {
      const fecha = new Date(inicioMes.getFullYear(), inicioMes.getMonth(), dia);
      const carreraDia = carreras.find((carrera) => this.mismaFecha(new Date(carrera.fechaHora), fecha));

      this.diasCalendario.push({
        fecha,
        tieneCarrera: Boolean(carreraDia),
        carreraId: carreraDia?.id
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

    // Crea una fecha fija relativa al día actual usando hora y minutos específicos.
    const crearFecha = (diasOffset: number, hora: number, minutos = 0): string => {
      const base = new Date();
      base.setDate(base.getDate() + diasOffset);
      base.setHours(hora, minutos, 0, 0);
      return base.toISOString();
    };

    // Crea una fecha relativa moviendo días y horas desde el momento actual.
    const crearFechaRelativa = (diasOffset: number, horasOffset = 0): string => {
      const base = new Date();
      base.setDate(base.getDate() + diasOffset);
      base.setHours(base.getHours() + horasOffset);
      return base.toISOString();
    };

    // Retorna un listado de grandes premios de ejemplo para poblar la UI.
    return [
      {
        id: 1,
        granPremio: 'Gran Premio de Australia',
        fechaHora: crearFecha(-12, 4, 0),
        circuito: 'Albert Park',
        pais: 'Australia',
        pilotos: [resumenPiloto(1), resumenPiloto(7), resumenPiloto(5), resumenPiloto(3)]
      },
      {
        id: 2,
        granPremio: 'Gran Premio de Japón',
        fechaHora: crearFechaRelativa(0, 2),
        circuito: 'Suzuka',
        pais: 'Japón',
        pilotos: [resumenPiloto(1), resumenPiloto(4), resumenPiloto(6), resumenPiloto(9)]
      },
      {
        id: 3,
        granPremio: 'Gran Premio de China',
        fechaHora: crearFecha(8, 8, 0),
        circuito: 'Shanghai International Circuit',
        pais: 'China',
        pilotos: [resumenPiloto(2), resumenPiloto(8), resumenPiloto(10), resumenPiloto(11)]
      },
      {
        id: 4,
        granPremio: 'Gran Premio de Miami',
        fechaHora: crearFecha(16, 20, 0),
        circuito: 'Miami International Autodrome',
        pais: 'Estados Unidos',
        pilotos: [resumenPiloto(3), resumenPiloto(5), resumenPiloto(7), resumenPiloto(12)]
      },
      {
        id: 5,
        granPremio: 'Gran Premio de Emilia-Romaña',
        fechaHora: crearFecha(24, 14, 0),
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
