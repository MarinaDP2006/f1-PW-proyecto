
import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { DriverDetailComponent } from './components/driver-detail/driver-detail.component';
import { DriverFormComponent } from './components/driver-form/driver-form.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CircuitListComponent } from './components/circuit-list/circuit-list.component';

export const APP_ROUTES: Routes = [
	{ path: '', component: InicioComponent, title: 'F1 Universe - Inicio' },
	{ path: 'drivers', component: DriverListComponent, title: 'Pilotos - F1 Universe' },
	{ path: 'driver-detail/:id', component: DriverDetailComponent, title: 'Detalle del Piloto' },
	{ path: 'driver-form/:id', component: DriverFormComponent, title: 'Editar Piloto' },
	{ path: 'driver-form', component: DriverFormComponent, title: 'Nuevo Piloto' },
	{ path: 'cars', component: CarListComponent, title: 'Monoplazas - F1 Universe' },
	{ path: 'circuits', component: CircuitListComponent, title: 'Circuitos - F1 Universe' },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];
