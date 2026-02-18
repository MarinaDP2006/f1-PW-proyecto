import { Component, inject, OnInit } from '@angular/core';
import { F1Data } from '../servicioDATA/f1-data.service';
import { Auto } from '../interfaces/auto.interface';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
  standalone: false
})
export class CarListComponent implements OnInit {
  private f1Data = inject(F1Data);
  autos: Auto[] = [];

  ngOnInit() {
    // Método para cargar la lista de autos al iniciar
    this.f1Data.getAutos();
    this.f1Data.autos$.subscribe(autos => this.autos = autos);
  }
}
