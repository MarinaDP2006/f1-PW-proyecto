import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Piloto } from '../interfaces/f1-types';
import { F1Data } from '../servicioDATA/f1-data';

@Component({
  selector: 'app-driver-detail',
  standalone: false,
  templateUrl: './driver-detail.html',
  styleUrl: './driver-detail.css',
})
export class DriverDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private f1Data = inject(F1Data);

  driver = signal<Piloto | null>(null);
  loading = signal<boolean>(false);
  error = signal<string>('');
  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.f1Data.filtrarEntidades({ tipo: 'piloto' }).subscribe((entidades: any[]) => {
        const pilotos = entidades as Piloto[];
        const piloto = pilotos.find(p => p.id === id);
        this.driver.set(piloto || null);
      });
    }
  }
  editDriver() {
    if (this.driver()) {
      this.router.navigate(['/driver-form', this.driver()!.id]);
    }
  }
  // Elimina el piloto actual después de confirmación del usuario
  deleteDriver() {
    if (this.driver() && confirm('¿Estás seguro de que quieres eliminar este piloto?')) {
      this.f1Data.eliminarEntidad(this.driver()!.id);
      this.router.navigate(['/drivers']);
    }
  }
  // Navega de vuelta a la lista de pilotos
  goBack() {
    this.router.navigate(['/drivers']);
  }
  // Método que retorna un icono para la escudería del piloto
  getTeamIcon(escuderia: string): string {
    switch (escuderia) {
      case 'red_bull': return '🏁';
      case 'mercedes': return '⭐';
      case 'ferrari': return '🐎';
      case 'mclaren': return '🧡';
      case 'aston_martin': return '💚';
      default: return '🏎️';
    }
  }
  // Método que retorna un icono para la categoría del piloto
  getCategoryIcon(categoria: string): string {
    switch (categoria) {
      case 'campeon': return '🏆';
      case 'experimentado': return '⚡';
      case 'veterano': return '👨‍🦳';
      case 'novato': return '🌟';
      default: return '🏎️';
    }
  }

  // Maneja errores de carga de imágenes
  onImageError(event: any) {
    event.target.style.display = 'none';
    if (event.target.parentElement) {
      event.target.parentElement.style.backgroundColor = '#e9ecef';
      event.target.parentElement.innerHTML += '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #6c757d; font-size: 14px;">Sin imagen disponible</div>';
    }
  }
}
