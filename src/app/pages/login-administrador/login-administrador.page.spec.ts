import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginAdministradorPage } from './login-administrador.page';

describe('LoginAdministradorPage', () => {
  let component: LoginAdministradorPage;
  let fixture: ComponentFixture<LoginAdministradorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAdministradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
