
import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { DriverDetailComponent } from './components/driver-detail/driver-detail.component';
import { DriverFormComponent } from './components/driver-form/driver-form.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CircuitListComponent } from './components/circuit-list/circuit-list.component';
import { CalendarioComponent } from './components/calendario/calendario.component';

// Tabla de rutas principal de la aplicación. Son las vistas disponibles y sus títulos para cada URL.
export const APP_ROUTES: Routes = [
	// Página de inicio.
	{ path: '', component: InicioComponent, title: 'F1 Universe - Inicio' },
	// Listado general de pilotos.
	{ path: 'drivers', component: DriverListComponent, title: 'Pilotos - F1 Universe' },
	// Detalle de un piloto por ID.
	{ path: 'driver-detail/:id', component: DriverDetailComponent, title: 'Detalle del Piloto' },
	// Formulario para editar un piloto existente.
	{ path: 'driver-form/:id', component: DriverFormComponent, title: 'Editar Piloto' },
	// Formulario para crear un nuevo piloto.
	{ path: 'driver-form', component: DriverFormComponent, title: 'Nuevo Piloto' },
	// Vista de monoplazas.
	{ path: 'cars', component: CarListComponent, title: 'Monoplazas - F1 Universe' },
	// Vista de circuitos.
	{ path: 'circuits', component: CircuitListComponent, title: 'Circuitos - F1 Universe' },
	// Vista calendario en español.
	{ path: 'calendario', component: CalendarioComponent, title: 'Calendario - F1 Universe' },
	// Vista calendario de próximas carreras.
	{ path: 'calendar', redirectTo: 'calendario', pathMatch: 'full' },
	// Redirección para rutas no existentes.
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];
