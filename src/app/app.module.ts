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

@NgModule({
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
