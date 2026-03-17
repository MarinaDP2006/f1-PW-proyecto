import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Punto de entrada principal de la aplicación Angular. Inicia el módulo raíz y arranca el renderizado en el navegador.
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
