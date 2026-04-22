import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonSpinner, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { StoreService, Product } from '../../services/store.service';
import { arrowBackOutline, cartOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.page.html',
  styleUrls: ['./producto-detalle.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonSpinner, IonText, IonTitle, IonToolbar, CommonModule]
})
export class ProductoDetallePage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private store: StoreService
  ) {
    addIcons({ arrowBackOutline, cartOutline });
  }

  public product?: Product;
  public loading = false;
  public errorMessage = '';

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id || Number.isNaN(id)) {
      this.errorMessage = 'Producto no válido';
      return;
    }

    this.loadProduct(id);
  }

  loadProduct(id: number) {
    this.loading = true;
    this.errorMessage = '';

    this.http.get<Product>(`https://fakestoreapi.com/products/${id}`).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el producto. Intenta de nuevo.';
        this.loading = false;
      },
    });
  }

  addToCart() {
    if (!this.product) {
      return;
    }
    this.store.addToCart(this.product);
  }

  goBack() {
    this.router.navigate(['/productos']);
  }
}
