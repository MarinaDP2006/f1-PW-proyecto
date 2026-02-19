import { Component, inject, OnInit } from '@angular/core';
import { F1Data } from '../servicioDATA/f1-data.service';
import { Circuito } from '../vistas/circuito.interface';

// Componente que muestra el listado de circuitos de la temporada. Carga la información desde el servicio central de datos.
@Component({
  selector: 'app-circuit-list',
  templateUrl: './circuit-list.component.html',
  styleUrls: ['./circuit-list.component.css'],
  standalone: false
})
export class CircuitListComponent implements OnInit {
  private f1Data = inject(F1Data);
  // Lista de circuitos disponible para la tabla.
  circuitos: Circuito[] = [];

  ngOnInit() {
    // Método para cargar la lista de circuitos al iniciar
    this.f1Data.getCircuitos();
    this.f1Data.circuitos$.subscribe(circuitos => this.circuitos = circuitos);
  }
}
