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
    if (this.esEdicion) {
      //aqui se llamará al back para updatear
      console.log('Actualizando datos', this.idPersonaje,datos);
      alert('perosonaje actualizado (no back aun)');
    }else{
      //aqui se llamará al back para crear
      console.log('Creando', datos);
      alert('Personaje creado (no back aún)');
    }
    this.router.navigate(['/buscar-personaje']);
  }

  volver(){
    this.router.navigate(['/buscar-personajes']);
  }
}

