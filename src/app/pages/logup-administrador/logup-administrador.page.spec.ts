import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogupAdministradorPage } from './logup-administrador.page';

describe('LogupAdministradorPage', () => {
  let component: LogupAdministradorPage;
  let fixture: ComponentFixture<LogupAdministradorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogupAdministradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
