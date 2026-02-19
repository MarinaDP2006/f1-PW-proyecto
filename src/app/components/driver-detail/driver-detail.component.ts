import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { F1Data } from '../servicioDATA/f1-data.service';
import { Piloto } from '../vistas/piloto.interface';
import { catchError, finalize, of } from 'rxjs';

// Componente de detalle de un piloto.
// Resuelve el ID desde la ruta, carga datos y controla estados de carga/error.
@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css'],
  standalone: false
})
export class DriverDetailComponent implements OnInit {
  // Servicio de rutas activas para leer parámetros (ej. id).
  private route = inject(ActivatedRoute);
  // Servicio de navegación de Angular.
  private router = inject(Router);
  // Servicio de datos de la aplicación.
  private f1Data = inject(F1Data);
  // Piloto actualmente mostrado en la pantalla.
  piloto?: Piloto;
  // Indicador de carga para renderizar estado de espera.
  cargando = true;
  // Bandera para estado de recurso inexistente o inválido.
  pilotoNoEncontrado = false;

  ngOnInit() {
    // Método para cargar el detalle del piloto según el parámetro de ruta
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {
      this.cargando = false;
      this.pilotoNoEncontrado = true;
      return;
    }
    this.cargando = true;
    this.pilotoNoEncontrado = false;

    const pilotoEnCache = this.f1Data.getPilotoEnCache(id);
    if (pilotoEnCache) {
      this.piloto = pilotoEnCache;
      this.cargando = false;
      return;
    }

    this.f1Data.getPiloto(id)
      .pipe(
        catchError(() => of(undefined)),
        finalize(() => {
          this.cargando = false;
          this.pilotoNoEncontrado = !this.piloto;
        })
      )
      .subscribe((piloto) => {
        this.piloto = piloto;
      });
  }

  // Método para volver a la lista de pilotos
  volver() {
    this.router.navigate(['/drivers']);
  }

  // Método para navegar al formulario de edición
  editarPiloto() {
    if (this.piloto) {
      this.router.navigate(['/driver-form', this.piloto.id]);
    }
  }

  // Método para eliminar el piloto con confirmación
  eliminarPiloto() {
    if (this.piloto && confirm('¿Seguro que deseas eliminar este piloto?')) {
      this.f1Data.deletePiloto(this.piloto.id).subscribe(() => this.volver());
    }
  }
}
