import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonajesService } from '../../servicios/personajes-service';
import { Router } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-buscar-personaje',
  standalone: true,
  imports: [ButtonModule, TableModule],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
})


export class BuscarPersonaje implements OnInit  {
  personajes: any [] = [];
  error = ''

  constructor(private personajesService: PersonajesService, private cdr:ChangeDetectorRef, private route:Router){
    
  }

  editar(id:number){
    
    this.route.navigate(["/editar",id]);
  }

  crearPersonaje(){
    this.route.navigate(["/crearPersonaje"])
  }

  ngOnInit(): void {
    this.cargarPersonajes();
    
  }

  borrar(id:number){
    if (confirm("Quieres borrar el personaje?")) {
      alert("Borrado personaje" + id);
    }
  }


  cargarPersonajes(){
    this.personajesService.obtenerPersonajes().subscribe({
      next:data => {
        console.log(data)
        this.personajes=data
        this.cdr.detectChanges()
      }, error:err => {
        this.error = 'Se ha producido un error'
      }
    })
  }

}
