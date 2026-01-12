import { Component } from '@angular/core';
 import { TableModule } from 'primeng/table';
 import { ButtonModule } from 'primeng/button';
 import { InputTextModule } from 'primeng/inputtext';
 import { CommonModule } from '@angular/common';
 import { RAZAS } from '../clases/razas';
 import { Raza } from '../interfaces/raza';

@Component({
  selector: 'app-busqueda-raza',
  imports: [TableModule,ButtonModule,InputTextModule,CommonModule],
  templateUrl: './busqueda-raza.html',
  styleUrl: './busqueda-raza.css',
})
export class BusquedaRaza {
  razas = RAZAS;

  razasFiltradas: Raza[] = this.razas
  camposBusqueda: string = 'Elfo';
  buscar(){
    const t = this.camposBusqueda.toLowerCase();
    this.razasFiltradas = this.razas.filter(r => 
      r.nombre.toLowerCase().includes(t) ||
      r.regionPrincipal.toLowerCase().includes(t) ||
      r.longevidad.toLowerCase().includes(t) ||
      r.descripcion.toLowerCase().includes(t)
    );
  }

}
