import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Angular In-Memory Web API para simulación de backend
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './f1-memory-data.service';

// Configuración de rutas
import { routes } from './app.routes';

// Componentes de la aplicación
import { App } from './app';
import { Inicio } from './components/inicio/inicio';
import { Navbar } from './components/navbar/navbar';
import { DriverList } from './components/listaPilotos/driver-list';
import { DriverDetail } from './components/detallesPiloto/driver-detail';
import { DriverForm } from './components/formPiloto/driver-form';
import { CarList } from './components/listaAutos/car-list';
import { CircuitList } from './components/listaCircuitos/circuit-list';

@NgModule({
  declarations: [
    App,
    Inicio,
    DriverList,
    DriverDetail,
    DriverForm,
    CarList,
    CircuitList,
    Navbar
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      // Opciones de configuración del router
      enableTracing: false,
      scrollPositionRestoration: 'top'
    }),
   HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,
      {
        dataEncapsulation: false,
        delay: 300,
        passThruUnknownUrl: true
      }
    )
  ],
  providers: [
  ],
  bootstrap: [App]
})
export class AppModule {
  constructor() {
    console.log('// App Module initialized');
  }
}
