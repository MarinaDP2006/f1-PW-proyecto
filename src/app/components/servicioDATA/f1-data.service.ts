import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { Piloto } from '../vistas/piloto.interface';
import { Auto } from '../vistas/auto.interface';
import { Circuito } from '../vistas/circuito.interface';

// Servicio central de acceso a datos de la aplicación. Gestiona pilotos, autos y circuitos consumiendo la API en memoria.
@Injectable({ providedIn: 'root' })
export class F1Data {
  // Señales para el estado reactivo
  isEditMode = signal<boolean>(false);
  loading = signal<boolean>(false);
  error = signal<string>('');

  // Para el estado global
  private pilotosSubject = new BehaviorSubject<Piloto[]>([]);
  public readonly pilotos$ = this.pilotosSubject.asObservable();

  // Fuente reactiva para el catálogo de autos.
  private autosSubject = new BehaviorSubject<Auto[]>([]);
  public readonly autos$ = this.autosSubject.asObservable();

  // Fuente reactiva para el catálogo de circuitos.
  private circuitosSubject = new BehaviorSubject<Circuito[]>([]);
  public readonly circuitos$ = this.circuitosSubject.asObservable();

  // Endpoints usados por la API mock del proyecto.
  private readonly pilotosUrl = 'api/pilotos';
  private readonly autosUrl = 'api/autos';
  private readonly circuitosUrl = 'api/circuitos';

  // Opciones HTTP comunes para todas las peticiones.
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Custom-Header': 'F1Universe' })
  };

  constructor(private http: HttpClient) {}

  // Método para obtener todos los pilotos
  getPilotos(): void {
    // Activa estado de carga y refresca la colección completa.
    this.loading.set(true);
    this.http.get<Piloto[]>(this.pilotosUrl, this.httpOptions)
      .pipe(
        map((pilotos) => this.normalizarPilotos(pilotos)),
        tap(() => this.loading.set(false)),
        catchError(this.handleError<Piloto[]>('getPilotos', []))
      )
      .subscribe(pilotos => this.pilotosSubject.next(pilotos));
  }

  // Método para obtener piloto por ID
  getPiloto(id: number): Observable<Piloto | undefined> {
    // Consulta directa por endpoint individual.
    return this.http.get<Piloto>(`${this.pilotosUrl}/${id}`, this.httpOptions)
      .pipe(
        map((piloto) => this.normalizarPiloto(piloto)),
        catchError(this.handleError<Piloto>('getPiloto'))
      );
  }

  // Método para obtener piloto por ID consultando la colección completa
  getPilotoDesdeLista(id: number): Observable<Piloto | undefined> {
    // Estrategia alternativa: descarga lista y filtra localmente.
    return this.http.get<Piloto[]>(this.pilotosUrl, this.httpOptions)
      .pipe(
        map((pilotos) => this.normalizarPilotos(pilotos)),
        tap((pilotos) => this.pilotosSubject.next(pilotos)),
        map((pilotos) => pilotos.find((piloto) => piloto.id === id)),
        catchError(this.handleError<Piloto | undefined>('getPilotoDesdeLista', undefined))
      );
  }

  // Método para buscar piloto en caché local
  getPilotoEnCache(id: number): Piloto | undefined {
    // Evita una llamada HTTP si ya está cargado en memoria.
    return this.pilotosSubject.value.find((piloto) => piloto.id === id);
  }

  // Método para agregar un piloto
  addPiloto(piloto: Piloto): Observable<Piloto> {
    // Tras crear, recarga el listado para mantener sincronizada la vista.
    return this.http.post<Piloto>(this.pilotosUrl, piloto, this.httpOptions)
      .pipe(
        tap(() => this.getPilotos()),
        catchError(this.handleError<Piloto>('addPiloto'))
      );
  }

  // Método para actualizar un piloto
  updatePiloto(piloto: Piloto): Observable<any> {
    // Tras editar, vuelve a solicitar la lista completa.
    return this.http.put(`${this.pilotosUrl}/${piloto.id}`, piloto, this.httpOptions)
      .pipe(
        tap(() => this.getPilotos()),
        catchError(this.handleError<any>('updatePiloto'))
      );
  }

  // Método para eliminar un piloto
  deletePiloto(id: number): Observable<any> {
    // Tras borrar, refresca el estado global de pilotos.
    return this.http.delete(`${this.pilotosUrl}/${id}`, this.httpOptions)
      .pipe(
        tap(() => this.getPilotos()),
        catchError(this.handleError<any>('deletePiloto'))
      );
  }

  // Método para obtener todos los autos
  getAutos(): void {
    // Carga simple de autos (sin estado de carga dedicado).
    this.http.get<Auto[]>(this.autosUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Auto[]>('getAutos', []))
      )
      .subscribe(autos => this.autosSubject.next(autos));
  }

  // Método para obtener todos los circuitos
  getCircuitos(): void {
    // Carga simple de circuitos (sin estado de carga dedicado).
    this.http.get<Circuito[]>(this.circuitosUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Circuito[]>('getCircuitos', []))
      )
      .subscribe(circuitos => this.circuitosSubject.next(circuitos));
  }

  // Método para manejar errores HTTP
  private handleError<T>(operation = 'operación desconocida', result?: T) {
    return (error: any): Observable<T> => {
      // Traduce códigos HTTP a mensajes legibles para la interfaz.
      let mensaje = '';
      if (error.status === 0) {
        mensaje = 'Sin conexión con el servidor.';
      } else if (error.status === 404) {
        mensaje = 'Recurso no encontrado.';
      } else if (error.status === 500) {
        mensaje = 'Error interno del servidor.';
      } else {
        mensaje = `Error en ${operation}: ${error.message}`;
      }
      this.error.set(mensaje);
      // Limpia el mensaje tras unos segundos para no dejar estado persistente.
      setTimeout(() => this.error.set(''), 4000);
      this.loading.set(false);
      return of(result as T);
    };
  }

  // Método para normalizar rutas de imágenes de pilotos
  private normalizarImagenPiloto(imagenUrl: string): string {
    // Convierte rutas heredadas con /public a la ruta pública real en Angular.
    const ruta = (imagenUrl ?? '').trim();

    if (!ruta || /^https?:\/\//i.test(ruta)) {
      return ruta;
    }

    if (ruta.startsWith('/public/')) {
      return ruta.replace('/public/', '/');
    }

    if (ruta.startsWith('public/')) {
      return `/${ruta.replace(/^public\//, '')}`;
    }

    return ruta;
  }

  // Método para normalizar un piloto
  private normalizarPiloto(piloto: Piloto): Piloto {
    return {
      ...piloto,
      imagenUrl: this.normalizarImagenPiloto(piloto.imagenUrl)
    };
  }

  // Método para normalizar una lista de pilotos
  private normalizarPilotos(pilotos: Piloto[]): Piloto[] {
    return pilotos.map((piloto) => this.normalizarPiloto(piloto));
  }
}
