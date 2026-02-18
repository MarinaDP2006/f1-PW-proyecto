# F1 Universe - Aplicación Angular

## Descripción
Es una aplicación Angular completa que permite explorar, gestionar y descubrir el universo de la Fórmula 1. Los usuarios pueden navegar por un catálogo interactivo de pilotos, monoplazas y circuitos con funcionalidades CRUD completas para pilotos.

## Temática
La aplicación está dedicada al mundo de la **Fórmula 1**, el deporte del automovilismo más prestigioso del mundo. Permite a los fans y usuarios gestionar información detallada sobre:

- **Pilotos**: Información completa de los drivers actuales y históricos
- **Monoplazas**: Especificaciones técnicas de los autos F1
- **Circuitos**: Detalles de los trazados más emblemáticos

## Qué hace la aplicación
1. **Gestión completa de Pilotos** (CRUD): Los usuarios pueden crear, leer, actualizar y eliminar información de pilotos
2. **Catálogo de Monoplazas**: Visualización de especificaciones técnicas y características de los autos F1
3. **Exploración de Circuitos**: Información detallada de los trazados más importantes del campeonato
4. **Navegación intuitiva**: Sistema de navegación fluido entre todas las secciones
5. **Interfaz moderna**: Diseño responsive inspirado en la estética F1

## Funcionalidades Principales

### Gestión de Pilotos (CRUD Completo)
- **Crear**: Agregar nuevos pilotos con formularios reactivos y validaciones
- **Leer**: Visualizar lista completa de pilotos con filtros por nombre/equipo
- **Actualizar**: Editar información de pilotos existentes
- **Eliminar**: Remover pilotos con confirmaciones de seguridad
- **Estadísticas**: Carreras, victorias, podios, poles y puntos

### Catálogo de Monoplazas
- Visualización de todos los monoplazas por equipo
- Especificaciones técnicas: motor, potencia, año
- Imágenes de los vehículos
- Solo lectura (edición desde VSCode)

### Directorio de Circuitos
- Circuitos más importantes del calendario F1
- Características: longitud, tipo, país
- Descripciones detalladas de cada trazado
- Solo lectura (edición desde VSCode)

### Sistema de Navegación
- **Página de Inicio**: Presentación del proyecto F1 Universe
- **Menú Principal**: Acceso rápido a todas las secciones
- **Rutas Dinámicas**: Navegación con parámetros para detalles y edición
- **Flujo Intuitivo**: Transiciones suaves entre vistas

### Características Técnicas
- **Responsive Design**: Adaptable a cualquier dispositivo
- **Angular Signals**: Estado reactivo con `signal<boolean>`
- **Dependency Injection**: Uso de `inject()` moderno
- **Formularios Reactivos**: Validaciones integradas y personalizadas
- **HttpClient**: Comunicación con backend simulado
- **BehaviorSubjects**: Estado global reactivo
- **TypeScript**: Tipado estricto con interfaces definidas

## Instalación y Ejecución
1. **Clonar el repositorio**
```bash
git clone [url-del-repositorio]
cd f1-proyectoAngular
```

2. **Ir a la carpeta del proyecto**
   ```
   cd proyecto
   ```

3. **Instalar dependencias**
   ```
   npm install
   ```

4. **Ejecutar la aplicación**
   ```
   npm start
   ```

5. **Abrir en el navegador**
- http://localhost:4200

## Navegación - Rutas disponibles
| Página | Dirección | Descripción |
|--------|-----------|-------------|
| Inicio | `/` o `/inicio` | Página principal |
| Lista de Pilotos | `/drivers` | Ver todos los pilotos |
| Detalles de Piloto | `/driver-detail/:id` | Información completa de un piloto |
| Crear Piloto | `/driver-form` | Formulario para nuevo piloto |
| Editar Piloto | `/driver-form/:id` | Modificar información de piloto |
| Lista de Autos | `/cars` | Ver todos los monoplazas |
| Lista de Circuitos | `/circuits` | Ver todas las pistas |

## Características técnicas
- Aplicación moderna construida con Angular 21
- Interfaz responsive (se adapta a móviles y tablets)
- Bootstrap para estilos elegantes
- Datos almacenados localmente (simula base de datos)
- Navegación fluida entre páginas
