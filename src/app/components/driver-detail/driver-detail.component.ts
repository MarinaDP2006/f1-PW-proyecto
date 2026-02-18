import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { F1Data } from '../servicioDATA/f1-data.service';
import { Piloto } from '../interfaces/piloto.interface';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css'],
  standalone: false
})
export class DriverDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private f1Data = inject(F1Data);
  piloto?: Piloto;

  ngOnInit() {
    // Método para cargar el detalle del piloto según el parámetro de ruta
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.f1Data.getPiloto(+id).subscribe(piloto => this.piloto = piloto);
    }
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
