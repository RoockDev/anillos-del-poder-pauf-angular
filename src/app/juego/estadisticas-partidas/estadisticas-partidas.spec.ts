import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasPartidas } from './estadisticas-partidas';

describe('EstadisticasPartidas', () => {
  let component: EstadisticasPartidas;
  let fixture: ComponentFixture<EstadisticasPartidas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticasPartidas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasPartidas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
