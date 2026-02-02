# Anillos de Poder (Angular)

Proyecto académico (2DAW) para practicar Angular con temática de *El Señor de los Anillos*. Incluye
pantallas de consulta y edición de **anillos**, **razas** y **personajes** usando componentes standalone,
formularios reactivos y PrimeNG para UI. La sección de personajes consume una API local. 【F:src/app/app.routes.ts†L1-L13】【F:src/app/anillo/busqueda/busqueda.ts†L1-L36】【F:src/app/raza/busqueda-raza/busqueda-raza.ts†L1-L34】【F:src/app/personajes/buscar-personaje/buscar-personaje.ts†L1-L60】

## Índice

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Scripts útiles](#scripts-útiles)
- [Arquitectura rápida](#arquitectura-rápida)
- [Rutas](#rutas)
- [Datos y servicios](#datos-y-servicios)
- [Formularios](#formularios)
- [Recursos y documentación interna](#recursos-y-documentación-interna)

## Requisitos

- Node.js (LTS recomendado)
- Angular CLI

> Este proyecto se generó con Angular CLI 21.0.4. 【F:angular.json†L1-L4】

## Instalación

```bash
npm install
```

## Scripts útiles

- **Servidor de desarrollo**

  ```bash
  ng serve
  ```

  Abre `http://localhost:4200/` y verás recarga automática al cambiar archivos. 【F:angular.json†L1-L4】

- **Build de producción**

  ```bash
  ng build
  ```

- **Tests**

  ```bash
  ng test
  ```

## Arquitectura rápida

- **Componentes standalone** en `src/app/*` (no hay NgModules).
- **Routing** en `src/app/app.routes.ts`.
- **Servicios** en `src/app/servicios/` para llamadas HTTP.
- **Datos locales** para anillos y razas en `src/app/clases/`.

## Rutas

| Ruta | Pantalla | Descripción |
| ---- | -------- | ----------- |
| `/buscar` | Búsqueda de anillos | Filtro por nombre/portador/raza. |
| `/detalle` | Crear anillo | Formulario con validaciones básicas. |
| `/buscar-raza` | Búsqueda de razas | Filtro por nombre/región/longevidad/desc. |
| `/crear-raza` | Crear raza | Formulario con validación y selects. |
| `/buscar-personajes` | Listado de personajes | Tabla con acciones de crear/editar. |
| `/editar/:id` | Editar personaje | Carga desde API por `id`. |
| `/crearPersonaje` | Crear personaje | Usa la misma pantalla que editar. |

Referencia de rutas: `src/app/app.routes.ts`.【F:src/app/app.routes.ts†L1-L13】

## Datos y servicios

- **Anillos**: datos locales en `src/app/clases/anillos.ts`. 【F:src/app/clases/anillos.ts†L1-L80】
- **Razas**: datos locales en `src/app/clases/razas.ts`. 【F:src/app/clases/razas.ts†L1-L80】
- **Personajes**: API local con `PersonajesService` (`GET`, `POST`, `PUT`). 【F:src/app/servicios/personajes-service.ts†L1-L28】

Configura el endpoint en `src/environments/evironment.development.ts`:

```ts
export const environment = {
  apiESDLA: 'http://localhost:8082/api/'
};
```
【F:src/environments/evironment.development.ts†L1-L3】

## Formularios

- **Anillos** (`/detalle`): formulario reactivo con validaciones y método de limpieza. 【F:src/app/anillo/detalle/detalle.ts†L1-L61】
- **Razas** (`/crear-raza`): formulario reactivo con validación y selects. 【F:src/app/raza/detalle-raza/detalle-raza.ts†L1-L69】
- **Personajes** (`/editar/:id` o `/crearPersonaje`): formulario reactivo, con carga de datos para edición y llamadas al servicio. 【F:src/app/personajes/detalle-personaje/detalle-personaje.ts†L1-L123】

## Recursos y documentación interna

- 📄 **Documentación técnica interna**: `docs/TECHNICAL_DOCUMENTATION.md`
- 📄 **README ampliado (este documento)**: incluye guía de ejecución, rutas y estructura.

---

Para detalles técnicos más profundos (arquitectura, flujo de datos, diagramas textuales y decisiones),
consulta `docs/TECHNICAL_DOCUMENTATION.md`.
