import { Component, signal, inject, computed, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Piloto } from '../interfaces/f1-types';
import { F1Data } from '../servicioDATA/f1-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-driver-list',
  standalone: false,
  templateUrl: './driver-list.html',
  styleUrl: './driver-list.css',
})
export class DriverList implements OnInit, OnDestroy {
  private router = inject(Router);
  private f1Data = inject(F1Data);

  drivers = signal<Piloto[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');

  private subscriptions: Subscription[] = [];

  filteredDrivers = computed(() => {
    return this.drivers();
  });

  ngOnInit() {
    this.loadDrivers();
    this.subscribeToServiceData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private subscribeToServiceData() {
    // Suscribirse a los datos de pilotos
    this.subscriptions.push(
      this.f1Data.pilotos$.subscribe(pilotos => {
        this.drivers.set(pilotos);
      })
    );

    // Suscribirse al estado de carga
    this.subscriptions.push(
      this.f1Data.loading$.subscribe(loading => {
        this.loading.set(loading);
      })
    );

    // Suscribirse a errores
    this.subscriptions.push(
      this.f1Data.error$.subscribe(error => {
        this.error.set(error);
      })
    );
  }

  private loadDrivers() {
    this.f1Data.getPilotos().subscribe();
  }

  viewDriver(id: string) {
    this.router.navigate(['/driver-detail', id]);
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
