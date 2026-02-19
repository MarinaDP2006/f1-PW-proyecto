import { Component, inject, OnInit } from '@angular/core';
import { F1Data } from '../servicioDATA/f1-data.service';
import { Piloto } from '../interfaces/piloto.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css'],
  standalone: false
})
export class DriverListComponent implements OnInit {
  public f1Data = inject(F1Data);
  private router = inject(Router);
  pilotos: Piloto[] = [];
  filtro: string = '';
  private imagenesConError = new Set<number>();

  ngOnInit() {
    // Método para cargar la lista de pilotos al iniciar
    this.f1Data.getPilotos();
    this.f1Data.pilotos$.subscribe(pilotos => this.pilotos = pilotos);
  }

  // Método para filtrar pilotos por nombre o equipo
  get pilotosFiltrados(): Piloto[] {
    return this.pilotos.filter(p =>
      p.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      p.equipo.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  // Método para navegar al detalle de un piloto
  verDetalle(id: number) {
    this.router.navigate(['/driver-detail', id]);
  }

  // Método para navegar al formulario de edición
  editarPiloto(id: number) {
    this.router.navigate(['/driver-form', id]);
  }

  // Método para eliminar un piloto con confirmación
  eliminarPiloto(id: number) {
    if (confirm('¿Seguro que deseas eliminar este piloto?')) {
      this.f1Data.deletePiloto(id).subscribe();
    }
  }

  // Método para marcar una imagen fallida y mostrar placeholder
  marcarImagenConError(id: number) {
    this.imagenesConError.add(id);
  }

  // Método para validar si la imagen del piloto falló
  imagenConError(id: number): boolean {
    return this.imagenesConError.has(id);
  }
}
