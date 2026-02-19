import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app';
import { RouterModule } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './components/servicioDATA/in-memory-data.service';
// Importar componentes
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { DriverDetailComponent } from './components/driver-detail/driver-detail.component';
import { DriverFormComponent } from './components/driver-form/driver-form.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CircuitListComponent } from './components/circuit-list/circuit-list.component';
import { APP_ROUTES } from './app.routes';

// Módulo raíz de Angular. Se registran componentes, dependencias y configuración de rutas.
@NgModule({
  // Componentes de la app disponibles dentro de este módulo.
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    DriverListComponent,
    DriverDetailComponent,
    DriverFormComponent,
    CarListComponent,
    CircuitListComponent
  ],
  // Módulos externos necesarios para formularios, HTTP, enrutamiento y mock de API.
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 }),
    RouterModule.forRoot(APP_ROUTES, {
      enableTracing: false,
      scrollPositionRestoration: 'top'
    })
  ],
  // Proveedores globales.
  providers: [],
  // Componente inicial que Angular monta al arrancar.
  bootstrap: [AppComponent]
})
export class AppModule {}
