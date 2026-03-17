import { Component, inject, OnInit } from '@angular/core';
import { F1Data } from '../servicioDATA/f1-data.service';
import { Auto } from '../vistas/auto.interface';

// Componente encargado de mostrar el garaje de monoplazas. Obtiene la lista de autos desde el servicio de datos.
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
  standalone: false
})
export class CarListComponent implements OnInit {
  private f1Data = inject(F1Data);
  // Colección de autos que se renderiza en la vista.
  autos: Auto[] = [];

  ngOnInit() {
    // Método para cargar la lista de autos al iniciar
    this.f1Data.getAutos();
    this.f1Data.autos$.subscribe(autos => this.autos = autos);
  }
}
