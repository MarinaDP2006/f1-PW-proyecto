import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { F1Data } from '../servicioDATA/f1-data.service';
import { Piloto } from '../vistas/piloto.interface';

// Componente de formulario para crear y editar pilotos. Usa Reactive Forms y el mismo flujo para alta y actualización.
@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css'],
  standalone: false
})
export class DriverFormComponent implements OnInit {
  // Constructor de formularios reactivos.
  private fb = inject(FormBuilder);
  // Acceso a parámetros de la ruta activa.
  private route = inject(ActivatedRoute);
  // Navegación programática al guardar/cancelar.
  private router = inject(Router);
  // Servicio de datos y estado compartido.
  private f1Data = inject(F1Data);

  // Formulario principal con los campos del piloto.
  form: FormGroup;
  // Señal que indica si el formulario está en modo edición.
  isEditMode = this.f1Data.isEditMode;
  // Señal de carga para operaciones HTTP.
  loading = this.f1Data.loading;
  // Señal de error para mostrar feedback al usuario.
  error = this.f1Data.error;
  // ID del piloto cuando se edita un registro existente.
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
      imagenUrl: ['']
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
    const imagenNormalizada = this.normalizarImagenUrl(datos.imagenUrl);

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
      imagenUrl: imagenNormalizada
    };

    if (this.isEditMode()) {
      this.f1Data.updatePiloto(piloto).subscribe(() => this.router.navigate(['/driver-detail', piloto.id]));
    } else {
      this.f1Data.addPiloto(piloto).subscribe((nuevoPiloto) => {
        this.router.navigate(['/driver-detail', nuevoPiloto.id]);
      });
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

  // Método para normalizar la URL de imagen (externa o local en /public)
  private normalizarImagenUrl(url: string | null | undefined): string {
    const valor = (url ?? '').trim();

    if (!valor) {
      return '';
    }

    if (valor.startsWith('/public/')) {
      return valor.replace('/public/', '/');
    }

    if (/^https?:\/\//i.test(valor) || valor.startsWith('/')) {
      return valor;
    }

    if (valor.startsWith('public/')) {
      return `/${valor.replace(/^public\//, '')}`;
    }

    return `/images/pilotos/${valor}`;
  }
}
