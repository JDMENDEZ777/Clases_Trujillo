import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Clase1Page } from './clase1.page';

describe('Clase1Page', () => {
  let component: Clase1Page;
  let fixture: ComponentFixture<Clase1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Clase1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
