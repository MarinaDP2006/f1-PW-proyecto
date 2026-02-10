Esta aplicación web permite explorar pilotos, vehiculos y pistas.

## Temática del Proyecto
Es una enciclopedia interactiva y gestible sobre la Fórmula 1, donde se puede:

- **Descubrir**: Explorar información detallada sobre los pilotos más veloces del mundo, desde leyendas como Lewis Hamilton hasta nuevas estrellas como Max Verstappen
- **Explorar**: Conocer los monoplazas más avanzados tecnológicamente que compiten en la parrilla actual de F1
- **Recorrer**: Ver virtualmente por los circuitos.
- **Gestionar**: Crear y editar información sobre los pilotos favoritos con el sistema de gestión integrado


## Rutas Disponibles
La aplicación está organizada en:

| Ruta | Descripción |
|------|-------------|
| `/` o `/inicio` | Página principal con bienvenida y navegación |
| `/drivers` | Lista completa de pilotos de F1 |
| `/driver-detail/:id` | Información detallada de un piloto específico |
| `/driver-form` | Formulario para agregar un nuevo piloto |
| `/driver-form/:id` | Formulario para editar información de un piloto |
| `/cars` | Galería de monoplazas y sus especificaciones |
| `/circuits` | Catálogo de circuitos legendarios de F1 |

## Funcionalidades Principales

### Gestión de Pilotos
- **Ver lista completa** de pilotos con información básica
- **Ver detalles específicos** de cada piloto (estadísticas, logros, carrera)
- **Agregar nuevos pilotos** con formulario completo
- **Editar información existente** de cualquier piloto
- **Navegación fluida** entre diferentes vistas

### Exploración de Monoplazas
- **Catálogo visual** de los autos más avanzados de F1
- **Información técnica** y características de cada monoplaza
- **Diseño atractivo** inspirado en la estética de la F1

### Descubrimiento de Circuitos
- **Galería de circuitos** más emblemáticos del mundo
- **Información detallada** sobre cada pista y su historia
- **Experiencia inmersiva** con datos fascinantes

### Experiencia de Usuario
- **Diseño responsive** que se adapta a cualquier dispositivo
- **Interfaz intuitiva** con navegación clara y accesible
- **Carga rápida** con gestión eficiente de datos
- **Tema visual** inspirado en la velocidad y adrenalina de la F1

## Instrucciones para Ejecutar la Aplicación

### Prerrequisitos
Asegúrate de tener instalado:
- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)

### Pasos de Instalación

1. **Clonar o descargar** el proyecto en tu computadora

2. **Abrir terminal** y navegar al directorio del proyecto:
   ```bash
   cd proyecto
   ```

3. **Instalar dependencias**:
   ```bash
   npm install
   ```

4. **Ejecutar la aplicación**:
   ```bash
   npm start
   ```
   o alternativamente:
   ```bash
   ng serve
   ```

5. **Abrir navegador** y visitar:
   ```
   http://localhost:4200
   ```

### Comandos Adicionales
- **Construir para producción**:
  ```bash
  npm run build
  ```

- **Ejecutar en modo de desarrollo con recarga automática**:
  ```bash
  npm run watch
  ```

- **Ejecutar pruebas**:
  ```bash
  npm test
  ```
