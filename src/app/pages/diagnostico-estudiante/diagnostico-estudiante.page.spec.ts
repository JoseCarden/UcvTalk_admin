import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagnosticoEstudiantePage } from './diagnostico-estudiante.page';

describe('DiagnosticoEstudiantePage', () => {
  let component: DiagnosticoEstudiantePage;
  let fixture: ComponentFixture<DiagnosticoEstudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticoEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
