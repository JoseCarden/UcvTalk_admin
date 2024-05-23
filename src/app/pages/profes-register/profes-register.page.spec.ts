import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesRegisterPage } from './profes-register.page';

describe('ProfesRegisterPage', () => {
  let component: ProfesRegisterPage;
  let fixture: ComponentFixture<ProfesRegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
