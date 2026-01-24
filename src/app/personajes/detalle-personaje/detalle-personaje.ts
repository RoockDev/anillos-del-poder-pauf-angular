import { Component, OnInit } from '@angular/core';
import { PersonajesService } from '../../servicios/personajes-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-personaje',
  imports: [],
  templateUrl: './detalle-personaje.html',
  styleUrl: './detalle-personaje.css',
})
export class DetallePersonaje {

  constructor(private personajeService: PersonajesService,private routeActiva: ActivatedRoute){
    const id = this.routeActiva.snapshot.paramMap.get("id");
    alert("Tengo el id: " + id)
  }

  

}
