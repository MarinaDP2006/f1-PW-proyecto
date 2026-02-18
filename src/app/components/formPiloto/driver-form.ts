import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Piloto, TipoEntidad, TipoEscuderia, TipoMotor } from '../interfaces/f1-types';
import { F1Data } from '../servicioDATA/f1-data';

@Component({
  selector: 'app-driver-form',
  standalone: false,
  templateUrl: './driver-form.html',
  styleUrl: './driver-form.css',
})
export class DriverForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private f1Data = inject(F1Data);

  driverForm!: FormGroup;

  isEditMode = signal<boolean>(false);
  loading = signal<boolean>(false);
  error = signal<string>('');
  logros = signal<string[]>([]);
  caracteristicas_piloto = signal<string[]>([]);

  // Opciones para los selectores del formulario
  categorias: string[] = ['campeon', 'experimentado', 'veterano', 'novato'];
  escuderias: string[] = ['red_bull', 'mercedes', 'ferrari', 'mclaren', 'aston_martin', 'alpine', 'williams', 'alfa_romeo', 'haas', 'alphatauri'];
  motores: string[] = ['red_bull_powertrains', 'mercedes', 'ferrari', 'renault'];

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit() {
    this.driverForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      categoria: ['', Validators.required],
      escuderia: ['', Validators.required],
      motor: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.loadDriver(id);
    }
  }

  // Carga los datos del piloto en el formulario para edición
  loadDriver(id: string) {
    this.f1Data.getPiloto(id).subscribe((piloto: Piloto | undefined) => {
      if (piloto) {
        this.driverForm.patchValue({
          nombre: piloto.nombre,
          categoria: piloto.categoria,
          escuderia: piloto.escuderia,
          motor: piloto.motor,
          descripcion: piloto.descripcion
        });
      }
    });
  }

  // Procesa el envío del formulario para crear o actualizar un piloto
  onSubmit() {
    if (this.driverForm.valid) {
      const formData = this.driverForm.value;
      const piloto: Piloto = {
        id: this.isEditMode() ? this.route.snapshot.paramMap.get('id')! : '',
        nombre: formData.nombre,
        categoria: formData.categoria,
        escuderia: formData.escuderia,
        motor: formData.motor,
        descripcion: formData.descripcion,
        urlImagen: '',
        tipo: 'piloto' as const,
        nacionalidad: 'Internacional',
        numeroCoche: Math.floor(Math.random() * 99) + 1,
        victorias: 0,
        podios: 0,
        poles: 0,
        vueltas_rapidas: 0,
        puntos_carrera: 0
      };

      if (this.isEditMode()) {
        this.f1Data.actualizarPiloto(piloto);
      } else {
        this.f1Data.agregarPiloto(piloto);
      }
      this.router.navigate(['/drivers']);
    }
  }

  onCancel() {
    this.router.navigate(['/drivers']);
  }

  goBack() {
    this.router.navigate(['/drivers']);
  }
}
