import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Piloto, Auto, Circuito, EntidadF1_Union, OpcionesFiltro, TipoEntidad } from '../interfaces/f1-types';

@Injectable({ providedIn: 'root' })
export class F1Data {

  // CONFIGURACIÓN HTTP
  private http = inject(HttpClient);
  private readonly pilotosUrl = 'api/pilotos';
  private readonly autosUrl = 'api/autos';
  private readonly circuitosUrl = 'api/circuitos';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

 // BehaviorSubjects para manejo de estado global
  private pilotosSubject = new BehaviorSubject<Piloto[]>([]);
  private autosSubject = new BehaviorSubject<Auto[]>([]);
  private circuitosSubject = new BehaviorSubject<Circuito[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string>('');

  public readonly pilotos$ = this.pilotosSubject.asObservable();
  public readonly autos$ = this.autosSubject.asObservable();
  public readonly circuitos$ = this.circuitosSubject.asObservable();
  public readonly loading$ = this.loadingSubject.asObservable();
  public readonly error$ = this.errorSubject.asObservable();

  constructor() {
    console.log('// Inicializando servicio F1 Data...');
    this.initializeData();
  }

  // === GESTIÓN DE ERRORES Y ESTADO ===
  private handleError<T>(operation = 'operación desconocida', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Error en ${operation}:`, {
        message: error.message,
        status: error.status,
        url: error.url,
        timestamp: new Date().toISOString()
      });

      const userMessage = this.getUserFriendlyErrorMessage(error, operation);
      this.errorSubject.next(userMessage);
      this.loadingSubject.next(false);
      return of(result as T);
    };
  }

  private getUserFriendlyErrorMessage(error: any, operation: string): string {
    if (error.status === 0) {
      return 'Sin conexión a internet. Verifica tu conectividad.';
    }
    if (error.status === 404) {
      return `No se encontró el recurso solicitado en ${operation}.`;
    }
    if (error.status === 500) {
      return 'Error del servidor. Intenta nuevamente en unos minutos.';
    }
    return `Error en ${operation}: ${error.message || 'Error desconocido'}`;
  }

  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
    if (!loading) {
      setTimeout(() => {
        if (!this.loadingSubject.value) {
          this.errorSubject.next('');
        }
      }, 3000);
    }
  }

  // === INICIALIZACIÓN ===
  private initializeData(): void {
    console.log('// Cargando datos iniciales F1...');
    Promise.all([
      this.loadPilotos(),
      this.loadAutos(),
      this.loadCircuitos()
    ]).then(() => {
      console.log('Datos F1 cargados exitosamente');
    }).catch(error => {
      console.error('Error cargando datos F1:', error);
    });
  }

  private loadPilotos(): Promise<void> {
    return new Promise((resolve) => {
      this.getPilotos().subscribe(() => resolve());
    });
  }

  private loadAutos(): Promise<void> {
    return new Promise((resolve) => {
      this.getAutos().subscribe(() => resolve());
    });
  }

  private loadCircuitos(): Promise<void> {
    return new Promise((resolve) => {
      this.getCircuitos().subscribe(() => resolve());
    });
  }

  // === MÉTODOS PILOTOS ===
  getPilotos(): Observable<Piloto[]> {
    this.setLoading(true);
    return this.http.get<Piloto[]>(this.pilotosUrl)
      .pipe(
        tap(pilotos => {
          console.log(`Obtenidos ${pilotos.length} pilotos`);
          this.pilotosSubject.next(pilotos);
          this.setLoading(false);
        }),
        catchError(this.handleError<Piloto[]>('getPilotos', []))
      );
  }

  getPiloto(id: string): Observable<Piloto> {
    const cached = this.pilotosSubject.value.find(p => p.id === id);
    if (cached) {
      console.log(`Piloto ${id} obtenido desde cache`);
      return of(cached);
    }

    this.setLoading(true);
    const url = `${this.pilotosUrl}/${id}`;
    return this.http.get<Piloto>(url)
      .pipe(
        tap(piloto => {
          console.log(`Piloto ${piloto.nombre} obtenido desde API`);
          this.setLoading(false);
        }),
        catchError(this.handleError<Piloto>(`getPiloto id=${id}`))
      );
  }

  addPiloto(piloto: Piloto): Observable<Piloto> {
    this.setLoading(true);
    return this.http.post<Piloto>(this.pilotosUrl, piloto, this.httpOptions)
      .pipe(
        tap((newPiloto: Piloto) => {
          console.log(`Piloto ${newPiloto.nombre} creado con ID ${newPiloto.id}`);
          const currentList = this.pilotosSubject.value;
          this.pilotosSubject.next([...currentList, newPiloto]);
          this.setLoading(false);
        }),
        catchError(this.handleError<Piloto>('addPiloto'))
      );
  }

  updatePiloto(piloto: Piloto): Observable<any> {
    this.setLoading(true);
    return this.http.put(this.pilotosUrl, piloto, this.httpOptions)
      .pipe(
        tap(_ => {
          console.log(`Piloto ${piloto.nombre} actualizado`);
          const currentList = this.pilotosSubject.value;
          const index = currentList.findIndex(p => p.id === piloto.id);
          if (index !== -1) {
            const updatedList = [...currentList];
            updatedList[index] = piloto;
            this.pilotosSubject.next(updatedList);
          }
          this.setLoading(false);
        }),
        catchError(this.handleError<any>('updatePiloto'))
      );
  }

  deletePiloto(id: string): Observable<Piloto> {
    this.setLoading(true);
    const url = `${this.pilotosUrl}/${id}`;
    return this.http.delete<Piloto>(url, this.httpOptions)
      .pipe(
        tap(deletedPiloto => {
          console.log(`Piloto con ID ${id} eliminado`);
          const currentList = this.pilotosSubject.value;
          const filteredList = currentList.filter(p => p.id !== id);
          this.pilotosSubject.next(filteredList);
          this.setLoading(false);
        }),
        catchError(this.handleError<Piloto>('deletePiloto'))
      );
  }

  // === MÉTODOS AUTOS ===
  getAutos(): Observable<Auto[]> {
    this.setLoading(true);
    return this.http.get<Auto[]>(this.autosUrl)
      .pipe(
        tap(autos => {
          console.log(`Obtenidos ${autos.length} autos`);
          this.autosSubject.next(autos);
          this.setLoading(false);
        }),
        catchError(this.handleError<Auto[]>('getAutos', []))
      );
  }

  getAuto(id: string): Observable<Auto> {
    const cached = this.autosSubject.value.find(a => a.id === id);
    if (cached) {
      return of(cached);
    }

    this.setLoading(true);
    const url = `${this.autosUrl}/${id}`;
    return this.http.get<Auto>(url)
      .pipe(
        tap(auto => {
          console.log(`Auto ${auto.nombre} obtenido desde API`);
          this.setLoading(false);
        }),
        catchError(this.handleError<Auto>(`getAuto id=${id}`))
      );
  }

  // === MÉTODOS CIRCUITOS ===
  getCircuitos(): Observable<Circuito[]> {
    this.setLoading(true);
    return this.http.get<Circuito[]>(this.circuitosUrl)
      .pipe(
        tap(circuitos => {
          console.log(`Obtenidos ${circuitos.length} circuitos`);
          this.circuitosSubject.next(circuitos);
          this.setLoading(false);
        }),
        catchError(this.handleError<Circuito[]>('getCircuitos', []))
      );
  }

  getCircuito(id: string): Observable<Circuito> {
    const cached = this.circuitosSubject.value.find(c => c.id === id);
    if (cached) {
      return of(cached);
    }

    this.setLoading(true);
    const url = `${this.circuitosUrl}/${id}`;
    return this.http.get<Circuito>(url)
      .pipe(
        tap(circuito => {
          console.log(`Circuito ${circuito.nombre} obtenido desde API`);
          this.setLoading(false);
        }),
        catchError(this.handleError<Circuito>(`getCircuito id=${id}`))
      );
  }

  // === MÉTODOS DE BÚSQUEDA ===
  searchPilotos(term: string): Observable<Piloto[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Piloto[]>(`${this.pilotosUrl}/?name=${term}`)
      .pipe(
        tap(_ => console.log(`Búsqueda de pilotos: "${term}"`)),
        catchError(this.handleError<Piloto[]>('searchPilotos', []))
      );
  }

  // === MÉTODOS DE FILTRADO LOCAL ===
  filtrarPilotosPorEscuderia(escuderia: string): Piloto[] {
    return this.pilotosSubject.value.filter(piloto =>
      piloto.escuderia.toLowerCase().includes(escuderia.toLowerCase())
    );
  }

  filtrarAutosPorMotor(motor: string): Auto[] {
    return this.autosSubject.value.filter(auto =>
      auto.motor.toLowerCase().includes(motor.toLowerCase())
    );
  }

  // === MÉTODOS DE FILTRADO GENÉRICO ===
  filtrarEntidades(opciones: { tipo: TipoEntidad }): Observable<EntidadF1_Union[]> {
    switch (opciones.tipo) {
      case 'piloto':
        return this.pilotos$ as Observable<EntidadF1_Union[]>;
      case 'auto':
        return this.autos$ as Observable<EntidadF1_Union[]>;
      case 'circuito':
        return this.circuitos$ as Observable<EntidadF1_Union[]>;
      default:
        return of([]);
    }
  }

  // Alias para compatibilidad
  agregarPiloto(piloto: Piloto): Observable<Piloto> {
    return this.addPiloto(piloto);
  }

  actualizarPiloto(piloto: Piloto): Observable<any> {
    return this.updatePiloto(piloto);
  }

  eliminarEntidad(id: string): Observable<any> {
    return this.deletePiloto(id);
  }
}
