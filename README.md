Una aplicación web donde puedes explorar el fascinante mundo de la Fórmula 1. Descubre pilotos, autos y circuitos con toda la información que necesitas.

## ¿Qué puedes hacer en esta aplicación?
### Gestión de Pilotos
- **Ver todos los pilotos**: Lista completa con fotos y datos básicos
- **Crear nuevo piloto**: Agrega pilotos personalizados con toda su información
- **Ver detalles**: Información completa de cada piloto (estadísticas, logros, equipo)
- **Editar piloto**: Modifica la información de cualquier piloto
- **Eliminar piloto**: Borra pilotos de la base de datos

### Ver Circuitos y Pistas
- **Explorar circuitos**: Lista de todas las pistas de Fórmula 1
- **Información técnica**: Longitud, número de curvas, récord de vuelta
- **Detalles especiales**: Capacidad de espectadores, tipo de superficie
- **Características**: Nivel de dificultad y particularidades de cada pista

### Catálogo de Coches
- **Ver todos los monoplazas**: Lista completa de autos de F1
- **Datos técnicos**: Motor, potencia, peso, chasis
- **Especificaciones**: Aerodinámica y características técnicas
- **Información del equipo**: Escudería y año de fabricación

### Pasos para ejecutar
1. **Descargar el proyecto**
   ```
   git clone https://github.com/MarinaDP2006/FINAL-PWANGULAR-Marina.git
   cd FINAL-PWANGULAR-Marina
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
   - Abre tu navegador favorito
   - Ve a: http://localhost:4200

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
