import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoPreguntas } from './juego-preguntas';

describe('JuegoPreguntas', () => {
  let component: JuegoPreguntas;
  let fixture: ComponentFixture<JuegoPreguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoPreguntas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoPreguntas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
