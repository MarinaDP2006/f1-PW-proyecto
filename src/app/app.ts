import { Component } from '@angular/core';

// Componente raíz de la aplicación. Carga el navbar y el contenido por rutas.
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: false
})
export class AppComponent {
  title = 'f1-proyectoAngular';
}
