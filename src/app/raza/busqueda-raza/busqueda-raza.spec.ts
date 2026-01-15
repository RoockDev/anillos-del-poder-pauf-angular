import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaRaza } from './busqueda-raza';

describe('BusquedaRaza', () => {
  let component: BusquedaRaza;
  let fixture: ComponentFixture<BusquedaRaza>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaRaza]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaRaza);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
