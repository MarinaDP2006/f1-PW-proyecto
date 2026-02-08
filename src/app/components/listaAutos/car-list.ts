import { Component, signal, inject, OnInit } from '@angular/core';
import { Auto } from '../interfaces/f1-types';
import { F1Data } from '../servicioDATA/f1-data';

@Component({
  selector: 'app-car-list',
  standalone: false,
  templateUrl: './car-list.html',
  styleUrl: './car-list.css',
})
export class CarList implements OnInit {
  private f1Data = inject(F1Data);

  cars = signal<Auto[]>([]);

  ngOnInit() {
    this.loadCars();
  }

  private loadCars() {
    this.f1Data.getAutos().subscribe((autos: Auto[]) => {
      this.cars.set(autos);
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
