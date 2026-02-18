import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { F1Data } from '../servicioDATA/f1-data.service';
import { Piloto } from '../interfaces/piloto.interface';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css'],
  standalone: false
})
export class DriverFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private f1Data = inject(F1Data);

  form: FormGroup;
  isEditMode = this.f1Data.isEditMode;
  loading = this.f1Data.loading;
  error = this.f1Data.error;
  pilotoId?: number;

  constructor() {
    // Método para construir el formulario reactivo
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      equipo: ['', Validators.required],
      numero: [null, [Validators.required, Validators.min(1)]],
      nacionalidad: ['', Validators.required],
      carreras: [0, [Validators.required, Validators.min(0)]],
      victorias: [0, [Validators.required, Validators.min(0)]],
      podios: [0, [Validators.required, Validators.min(0)]],
      poles: [0, [Validators.required, Validators.min(0)]],
      puntos: [0, [Validators.required, Validators.min(0)]],
      imagenUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Método para cargar datos si es edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.pilotoId = +id;
      this.f1Data.getPiloto(+id).subscribe(piloto => {
        if (piloto) {
          this.form.patchValue({
            nombre: piloto.nombre,
            equipo: piloto.equipo,
            numero: piloto.numero,
            nacionalidad: piloto.nacionalidad,
            carreras: piloto.estadisticas.carreras,
            victorias: piloto.estadisticas.victorias,
            podios: piloto.estadisticas.podios,
            poles: piloto.estadisticas.poles,
            puntos: piloto.estadisticas.puntos,
            imagenUrl: piloto.imagenUrl
          });
        }
      });
    } else {
      this.isEditMode.set(false);
    }
  }

  // Método para guardar el piloto (crear o actualizar)
  guardar() {
    if (this.form.invalid) return;
    const datos = this.form.value;
    const piloto: Piloto = {
      id: this.pilotoId ?? 0,
      nombre: datos.nombre,
      equipo: datos.equipo,
      numero: datos.numero,
      nacionalidad: datos.nacionalidad,
      estadisticas: {
        carreras: datos.carreras,
        victorias: datos.victorias,
        podios: datos.podios,
        poles: datos.poles,
        puntos: datos.puntos
      },
      imagenUrl: datos.imagenUrl
    };
    if (this.isEditMode()) {
      this.f1Data.updatePiloto(piloto).subscribe(() => this.router.navigate(['/drivers']));
    } else {
      this.f1Data.addPiloto(piloto).subscribe(() => this.router.navigate(['/drivers']));
    }
  }

  // Método para cancelar y volver a la lista
  cancelar() {
    this.router.navigate(['/drivers']);
  }

  // Método para obtener el control del formulario con tipado seguro
  get f() {
    return this.form.controls as { [key: string]: any };
  }
}
