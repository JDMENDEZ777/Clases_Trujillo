import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonToast, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { StoreService, Product } from '../../services/store.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonToast, IonIcon, CommonModule]
})
export class CarritoPage implements OnInit {
  public cart: Product[] = [];
  public showToast = false;
  public toastMessage = '';

  constructor(private store: StoreService) {
    addIcons({ trashOutline, checkmarkCircleOutline });
  }

  ngOnInit() {
    this.store.cart$.subscribe((items) => {
      this.cart = items;
    });
  }

  get total() {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  removeItem(index: number) {
    this.store.removeFromCart(index);
  }

  clearCart() {
    this.store.clearCart();
  }

  confirmPurchase() {
    if (!this.cart.length) {
      return;
    }

    this.store.confirmPurchase();
    this.toastMessage = 'Compra confirmada. Se agregó al historial de compras.';
    this.showToast = true;
  }
}
