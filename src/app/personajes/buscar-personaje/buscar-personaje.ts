import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- IMPORTANTE PARA [ngClass]
import { Router } from '@angular/router';
import { PersonajesService } from '../../servicios/personajes-service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-buscar-personaje',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonModule, 
    TableModule, 
    ConfirmDialogModule, 
    ToastModule,
    TooltipModule
  ],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
  providers: [ConfirmationService, MessageService]
})
export class BuscarPersonaje implements OnInit {
  
  personajes: any[] = [];
  
  constructor(
    private personajesService: PersonajesService,
    private cdr: ChangeDetectorRef,
    private route: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  cargarPersonajes() {
    this.personajesService.obtenerPersonajes().subscribe({
      next: (data) => {
        this.personajes = data;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los personajes.' });
      },
    });
  }

  crearPersonaje() {
    this.route.navigate(['/crearPersonaje']);
  }

  editar(id: number) {
    this.route.navigate(['/editar', id]);
  }

  
  confirmarBajaFisica(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Se va a borrar de forma definitiva el registro ¿Estás seguro que deseas borrarlo?',
      header: 'Borrado Definitivo',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, borrar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      
      accept: () => {
        this.personajesService.borrarFisico(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Personaje borrado de la base de datos.' });
            this.cargarPersonajes();
          },
          error: (err) => {
            console.error('Error al borrar:', err);
            
            this.messageService.add({ 
              severity: 'error', 
              summary: 'Error al borrar', 
              detail: 'No se puede borrar: Es posible que sea portador de un anillo ' 
            });
          }
        });
      }
    });
  }


  confirmarAccionLogica(event: Event, personaje: any) {
    // se mira en el back la baja
    const estaDeBaja = personaje.fechaBaja != null;
    
   
    const mensaje = estaDeBaja 
      ? '¿Deseas reactivar el personaje?' 
      : 'Se va a dar de baja el personaje ¿Estás seguro?';
    
    const titulo = estaDeBaja ? 'Reactivar' : 'Baja Lógica';
    const icono = estaDeBaja ? 'pi pi-refresh' : 'pi pi-ban';
    
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: mensaje,
      header: titulo,
      icon: icono,
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      
      accept: () => {
        if (estaDeBaja) {
          
          this.personajesService.reactivar(personaje.id).subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Reactivado', detail: 'El personaje ha vuelto a casa por navidad, está de vuelta' });
              this.cargarPersonajes();
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede reactivar' })
          });

        } else {
          
          this.personajesService.borrarLogico(personaje.id).subscribe({
            next: () => {
              this.messageService.add({ severity: 'info', summary: 'Baja Lógica', detail: 'Personaje desactivado bien' });
              this.cargarPersonajes();
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede dar de baja' })
          });
        }
      }
    });
  }
}