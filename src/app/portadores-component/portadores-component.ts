import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portadores-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './portadores-component.html',
  styleUrl: './portadores-component.css',
})
export class PortadoresComponent implements OnInit {
  nombreAnillo = '';
  nombrePortador = '';
  raza = '';
  nivel = 0;

  ngOnInit(): void {
    this.nombreAnillo = localStorage.getItem('nombreAnillo') ?? '';
    this.nombrePortador = localStorage.getItem('nombrePortador') ?? '';
    this.raza = localStorage.getItem('raza') ?? '';

    const nivelGuardado = localStorage.getItem('nivel');
    this.nivel = nivelGuardado ? Number(nivelGuardado) : 0;
  }

  guardarDatos(): void {
    localStorage.setItem('nombreAnillo', this.nombreAnillo);
    localStorage.setItem('nombrePortador', this.nombrePortador);
    localStorage.setItem('raza', this.raza);
    localStorage.setItem('nivel', String(this.nivel));
    alert('Se han guardado los datos correctamente');
  }

  limpiarDatos(): void {
    this.nombreAnillo = '';
    this.nombrePortador = '';
    this.raza = '';
    this.nivel = 0;

    localStorage.removeItem('nombreAnillo');
    localStorage.removeItem('nombrePortador');
    localStorage.removeItem('raza');
    localStorage.removeItem('nivel');
  }
}
