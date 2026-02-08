import { Component, signal, inject, OnInit } from '@angular/core';
import { Circuito } from '../interfaces/f1-types';
import { F1Data } from '../servicioDATA/f1-data';

@Component({
  selector: 'app-circuit-list',
  standalone: false,
  templateUrl: './circuit-list.html',
  styleUrl: './circuit-list.css',
})
export class CircuitList implements OnInit {
  private f1Data = inject(F1Data);
  circuits = signal<Circuito[]>([]);

  ngOnInit() {
    this.loadCircuits();
  }
  // Carga la lista de circuitos desde el servicio de datos
  private loadCircuits() {
    this.f1Data.getCircuitos().subscribe((circuitos: Circuito[]) => {
      this.circuits.set(circuitos);
    });
  }

  // Maneja errores de carga de imágenes
  onImageError(event: any) {
    event.target.style.display = 'none';
    if (event.target.parentElement) {
      event.target.parentElement.style.backgroundColor = '#e9ecef';
      event.target.parentElement.innerHTML += '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #6c757d; font-size: 12px;">Sin imagen</div>';
    }
  }
}
