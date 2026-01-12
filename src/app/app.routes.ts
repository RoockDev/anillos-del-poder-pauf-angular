import { Routes } from '@angular/router';
import { Detalle } from './anillo/detalle/detalle';
import { Busqueda } from './anillo/busqueda/busqueda';
import {BusquedaRaza} from './busqueda-raza/busqueda-raza';

export const routes: Routes = [
    { path: 'detalle', component: Detalle },
    { path: 'buscar', component: Busqueda },
    {path: 'buscar-raza', component:BusquedaRaza},
];
