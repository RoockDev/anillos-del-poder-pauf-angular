import { Component } from '@angular/core';
 import { TableModule } from 'primeng/table';
 import { ButtonModule } from 'primeng/button';
 import { InputTextModule } from 'primeng/inputtext';
 import { CommonModule } from '@angular/common';
 import { FormsModule } from '@angular/forms';
 import { RAZAS } from '../clases/razas';
 import { Raza } from '../interfaces/raza';

@Component({
  selector: 'app-busqueda-raza',
  standalone:true,
  imports: [TableModule,ButtonModule,InputTextModule,CommonModule,FormsModule],
  templateUrl: './busqueda-raza.html',
  styleUrl: './busqueda-raza.css',
})
export class BusquedaRaza {
  razas = RAZAS;

  //se inicializa con todas las razas
  razasFiltradas: Raza[] = this.razas;

  camposBusqueda:string = '';

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
