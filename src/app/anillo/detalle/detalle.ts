import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle {

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    portador: new FormControl('', [
      Validators.required
    ]),
    raza: new FormControl('', [
      Validators.required
    ]),
    poder: new FormControl('', [
      Validators.required
    ])
  });

  guardar() {
    if (this.formulario.valid) {
      alert('Anillo guardado');
    } else {
      alert('El formulario no es válido');
    }
  }

  
  limpiar() {
    
    this.formulario.setValue({
      nombre: '',
      portador: '',
      raza: '',
      poder: 'Asombroso'
    });

    
     //esto quita el touched a todos los campos porque si no despues de limpiar se quedaba en rojo con los avisos
    this.formulario.markAsUntouched();
    this.formulario.markAsPristine();
   
  }
}