import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalificaProfesPage } from './califica-profes.page';

describe('CalificaProfesPage', () => {
  let component: CalificaProfesPage;
  let fixture: ComponentFixture<CalificaProfesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificaProfesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
