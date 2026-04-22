/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductoDetallePage } from './producto-detalle.page';

describe('ProductoDetallePage', () => {
  let component: ProductoDetallePage;
  let fixture: ComponentFixture<ProductoDetallePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoDetallePage, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
