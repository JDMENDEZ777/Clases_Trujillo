import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Clase2Page } from './clase2.page';

describe('Clase2Page', () => {
  let component: Clase2Page;
  let fixture: ComponentFixture<Clase2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Clase2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
