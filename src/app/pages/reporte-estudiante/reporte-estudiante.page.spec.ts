import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteEstudiantePage } from './reporte-estudiante.page';

describe('ReporteEstudiantePage', () => {
  let component: ReporteEstudiantePage;
  let fixture: ComponentFixture<ReporteEstudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
