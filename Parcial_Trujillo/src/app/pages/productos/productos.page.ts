import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonIcon, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cart, cartOutline, receiptOutline, alertCircleOutline, eyeOutline, addCircleOutline } from 'ionicons/icons';
import { StoreService, Product } from '../../services/store.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonIcon, IonSpinner, IonTitle, IonToolbar, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductosPage implements OnInit {
  public products: Product[] = [];
  public loading = false;
  public errorMessage = '';
  public cartCount$: Observable<number>;
  public historyCount$: Observable<number>;

  constructor(
    private http: HttpClient,
    private store: StoreService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({cartOutline,receiptOutline,alertCircleOutline,eyeOutline,addCircleOutline,cart});
    this.cartCount$ = this.store.cart$.pipe(
      map(cart => cart.length),
      shareReplay(1)
    );
    this.historyCount$ = this.store.history$.pipe(
      map(history => history.length),
      shareReplay(1)
    );
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(event?: any) {
    this.loading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.http.get<Product[]>('https://fakestoreapi.com/products').subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
        this.cdr.markForCheck();
        event?.target?.complete();
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar los productos. Revisa tu conexión e intenta de nuevo.';
        this.loading = false;
        this.cdr.markForCheck();
        event?.target?.complete();
      },
    });
  }

  refresh(event: any) {
    this.loadProducts(event);
  }

  addToCart(product: Product) {
    this.store.addToCart(product);
  }

  goToDetail(product: Product) {
    this.router.navigate(['/producto-detalle', product.id]);
  }

  goToCart() {
    this.router.navigate(['/carrito']);
  }

  goToHistory() {
    this.router.navigate(['/historial']);
  }
}
