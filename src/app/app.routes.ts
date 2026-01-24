import { Routes } from '@angular/router';
import { Detalle } from './anillo/detalle/detalle';
import { Busqueda } from './anillo/busqueda/busqueda';
import {BusquedaRaza} from './raza/busqueda-raza/busqueda-raza';
import { DetalleRaza } from './raza/detalle-raza/detalle-raza';
import { BuscarPersonaje } from './personajes/buscar-personaje/buscar-personaje';
import { DetallePersonaje } from './personajes/detalle-personaje/detalle-personaje';

export const routes: Routes = [
    { path: 'detalle', component: Detalle },
    { path: 'buscar', component: Busqueda },
    {path: 'buscar-raza', component:BusquedaRaza},
    {path: 'crear-raza', component: DetalleRaza},
    {path: 'buscar-personajes', component:BuscarPersonaje},
    {path: 'editar/:id', component:DetallePersonaje},
    {path: 'crearPersonaje', component: DetallePersonaje}
];
