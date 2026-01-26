import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import {ActivatedRoute,Router, RouterLink} from "@angular/router";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DatePickerModule } from 'primeng/datepicker';
import { PersonajesService } from "../../servicios/personajes-service";

@Component({
  selector: 'app-detalle-personaje',
  standalone: true,
  imports : [ReactiveFormsModule,ButtonModule,InputTextModule,DatePickerModule, RouterLink],
  templateUrl: 'detalle-personaje.html',
  styleUrl: './detalle-personaje.css',

})
export class DetallePersonaje implements OnInit{

  //para saber si es para crear o para editar personaje
  esEdicion: boolean = false;
  idPersonaje: number | null = null;

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    raza: new FormControl('', [Validators.required]),
    //null para que salga calendario vacio al principio
    fechaNacimiento: new FormControl(null,[Validators.required])
  });

  constructor(
    private personajesService: PersonajesService,
    private routeActiva: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    // el + castea el id de string a numero
    const idParam = this.routeActiva.snapshot.paramMap.get('id')
    if(idParam){
      this.esEdicion = true;
      this.idPersonaje = +idParam;
      this.cargarDatosPersonaje(this.idPersonaje);
    }

    //si no hay id pues es para crear, el formulario esara vacio
  }

  cargarDatosPersonaje(id:number){
    this.personajesService.obtenerPersonajes().subscribe({
      next: (listaPersonajes) => {
        const personajeEncontrado = listaPersonajes.find((p:any) => p.id === id);
        if (personajeEncontrado) {

          //para el calendario
          let fecha = null;
          if (personajeEncontrado.fechaNacimiento) {
            fecha = new Date(personajeEncontrado.fechaNacimiento);
          }
          this.formulario.patchValue({
            nombre: personajeEncontrado.nombre,
            raza: personajeEncontrado.raza,
            fechaNacimiento: fecha
          });
        }
      },
      error:(error) => {
        console.error('Error al cargar los personajes', error);
        alert('No se pudo cargar el personaje');
      }
    });
  }


  guardar(){
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos = this.formulario.value
    if (this.esEdicion && this.idPersonaje) {
      this.personajesService.actualizarPersonaje(this.idPersonaje,datos).subscribe({
        next: (response) => {
          console.log('Personaje actualizado:', response)
          alert('Personaje actualizado con exito')
          this.router.navigate(['/buscar-personajes'])
        },
        error: (err) => {
          console.log('error al actualizar',err)
          alert('error al actualizar personaje')
        } 
      });
    }else{
      this.personajesService.crearPersonaje(datos).subscribe({
        next: (response) => {
          console.log('Personaje creado:', response)
          alert('personaje creado bien')
          this.router.navigate(['/buscar-personajes'])
        },
        error:(err) => {
          console.log('Error al crear', err)
          alert('error al crear')
        }
      })
    }
    
  }

  volver(){
    this.router.navigate(['/buscar-personajes']);
  }
}

