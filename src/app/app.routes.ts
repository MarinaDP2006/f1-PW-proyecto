import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { DriverList } from './components/listaPilotos/driver-list';
import { CarList } from './components/listaAutos/car-list';
import { CircuitList } from './components/listaCircuitos/circuit-list';
import { DriverForm } from './components/formPiloto/driver-form';
import { DriverDetail } from './components/detallesPiloto/driver-detail';

// Configuración de rutas de la aplicación F1 Universe
export const routes: Routes = [
  // Ruta raíz - redirige al inicio
  {
    path: '',
    component: Inicio,
    title: 'F1 Universe - Inicio'
  },
  {
    path: 'inicio',
    component: Inicio,
    title: 'F1 Universe - Inicio'
  },
  {
    path: 'drivers',
    component: DriverList,
    title: 'Pilotos - F1 Universe'
  },
  {
    path: 'driver-detail/:id',
    component: DriverDetail,
    title: 'Detalle del Piloto - F1 Universe'
  },
  {
    path: 'driver-form',
    component: DriverForm,
    title: 'Nuevo Piloto - F1 Universe'
  },
  {
    path: 'driver-form/:id',
    component: DriverForm,
    title: 'Editar Piloto - F1 Universe'
  },
  {
    path: 'cars',
    component: CarList,
    title: 'Autos - F1 Universe'
  },
  {
    path: 'circuits',
    component: CircuitList,
    title: 'Circuitos - F1 Universe'
  },
  // Ruta wildcard: captura cualquier ruta no definida arriba. Redirige a la lista de personajes como página por defecto
  {
    path: '**',
    redirectTo: '/characters',
    pathMatch: 'full'
  }
];
