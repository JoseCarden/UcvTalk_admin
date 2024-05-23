import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogupPage } from './logup.page';

describe('LogupPage', () => {
  let component: LogupPage;
  let fixture: ComponentFixture<LogupPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
