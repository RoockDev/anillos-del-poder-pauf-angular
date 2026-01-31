# Documentación técnica interna

> **Objetivo:** explicar la arquitectura, el flujo de datos y las decisiones técnicas del proyecto
> para que cualquier persona nueva (por ejemplo, alumnado en prácticas o compañeros de clase)
> pueda entenderlo rápido.

## 1) Visión general

El proyecto es una SPA Angular (componentes *standalone*) con temática de *Los Anillos de Poder*.
Se divide en tres dominios principales:

- **Anillos:** listado con filtro + formulario de creación (sin persistencia real).
- **Razas:** listado con filtro + formulario de creación (sin persistencia real).
- **Personajes:** listado y formulario de creación/edición conectado a una API local.

La navegación principal está en `app.html` con botones que enlazan a rutas definidas en
`app.routes.ts`.【F:src/app/app.html†L1-L19】【F:src/app/app.routes.ts†L1-L13】

## 2) Estructura de carpetas

```
src/
  app/
    anillo/                # UI de anillos (búsqueda + detalle)
    raza/                  # UI de razas (búsqueda + detalle)
    personajes/            # UI de personajes (listado + detalle)
    clases/                # Datos locales (anillos y razas)
    interfaces/            # Modelos TypeScript (Anillo, Raza)
    servicios/             # Servicios HTTP
    app.routes.ts          # Rutas de la SPA
    app.html               # Portada con navegación principal
  environments/
    evironment.development.ts  # Base URL de la API
```

## 3) Routing

Las rutas son simples y se basan en componentes *standalone*:

- `/buscar` → `Busqueda` (anillos)
- `/detalle` → `Detalle` (crear anillo)
- `/buscar-raza` → `BusquedaRaza`
- `/crear-raza` → `DetalleRaza`
- `/buscar-personajes` → `BuscarPersonaje`
- `/editar/:id` → `DetallePersonaje` (edición)
- `/crearPersonaje` → `DetallePersonaje` (creación)

Fuente: `src/app/app.routes.ts`.【F:src/app/app.routes.ts†L1-L13】

## 4) Modelo de datos

### 4.1 Interfaces

- `Anillo` → `nombre`, `portador`, `raza`, `poder`, `corrupcion`.【F:src/app/interfaces/anillo.ts†L1-L10】
- `Raza` → `id`, `nombre`, `descripcion`, `longevidad`, `regionPrincipal`, `afinidadMagica`, `nivelCorrupcion`.【F:src/app/interfaces/raza.ts†L1-L16】

### 4.2 Datos locales (sin backend)

- `Anillos` contiene un array predefinido de anillos. 【F:src/app/clases/anillos.ts†L1-L80】
- `RAZAS` contiene un array predefinido de razas. 【F:src/app/clases/razas.ts†L1-L80】

Estas colecciones se usan para búsquedas locales en las pantallas de anillos/razas.

## 5) Servicios y API

### 5.1 `PersonajesService`

Servicio central para personajes:

- `obtenerPersonajes()` → `GET /listaPersonajes`
- `actualizarPersonaje(id)` → `PUT /actualizarPersonaje/:id`
- `crearPersonaje()` → `POST /insertarPersonaje`

Base URL definida en `src/environments/evironment.development.ts`.【F:src/app/servicios/personajes-service.ts†L1-L28】【F:src/environments/evironment.development.ts†L1-L3】

### 5.2 Flujo de datos (personajes)

**Listado (`BuscarPersonaje`)**

1. `ngOnInit()` llama a `cargarPersonajes()`.
2. `PersonajesService.obtenerPersonajes()` trae la lista.
3. Se asigna a `this.personajes` y se actualiza la vista. 【F:src/app/personajes/buscar-personaje/buscar-personaje.ts†L20-L59】

**Detalle (`DetallePersonaje`)**

- Si llega `id` por ruta, se marca `esEdicion` y se cargan datos para prellenar el formulario.
- Si no hay `id`, se entiende como creación.
- `guardar()` decide entre `actualizarPersonaje` o `crearPersonaje`. 【F:src/app/personajes/detalle-personaje/detalle-personaje.ts†L20-L116】

## 6) Formularios

Todos los formularios usan **Reactive Forms** con validaciones.

### 6.1 Anillos (`Detalle`)

- `FormGroup` con validaciones de required y `minLength`.
- `guardar()` muestra alertas simples según validez.
- `limpiar()` resetea valores y estado de validación. 【F:src/app/anillo/detalle/detalle.ts†L12-L60】

### 6.2 Razas (`DetalleRaza`)

- Validaciones en `nombre`, `descripcion`, `longevidad`, `regionPrincipal`.
- `limpiar()` usa `patchValue()` y limpia estados. 【F:src/app/raza/detalle-raza/detalle-raza.ts†L18-L67】

### 6.3 Personajes (`DetallePersonaje`)

- Campos: `nombre`, `raza`, `fechaNacimiento`.
- En edición, se convierte `fechaNacimiento` a objeto `Date` para el calendario. 【F:src/app/personajes/detalle-personaje/detalle-personaje.ts†L26-L78】

## 7) Componentes UI (resumen)

- **Anillos**
  - `Busqueda`: filtro por nombre/portador/raza con un input. 【F:src/app/anillo/busqueda/busqueda.ts†L1-L36】
  - `Detalle`: formulario de alta de anillos. 【F:src/app/anillo/detalle/detalle.ts†L1-L60】
- **Razas**
  - `BusquedaRaza`: filtro por nombre/región/longevidad/desc. 【F:src/app/raza/busqueda-raza/busqueda-raza.ts†L1-L34】
  - `DetalleRaza`: formulario con select y textarea. 【F:src/app/raza/detalle-raza/detalle-raza.ts†L1-L67】
- **Personajes**
  - `BuscarPersonaje`: listado en tabla y acciones de editar/borrar. 【F:src/app/personajes/buscar-personaje/buscar-personaje.ts†L1-L60】
  - `DetallePersonaje`: edición/creación con API. 【F:src/app/personajes/detalle-personaje/detalle-personaje.ts†L1-L116】

## 8) Decisiones técnicas (y por qué)

- **Standalone components** para simplicidad y aprendizaje (sin NgModules).
- **PrimeNG** para UI rápida con botones, inputs y tablas.
- **Datos locales** en anillos/razas para prácticas sin backend.
- **Personajes con API** para practicar HTTP y rutas dinámicas.

## 9) Posibles mejoras futuras

- Persistencia real de anillos y razas.
- Tipado fuerte en `PersonajesService` (crear interfaz `Personaje`).
- Manejo de errores con UI más amigable.
- Tests unitarios para formularios y servicios.

---


