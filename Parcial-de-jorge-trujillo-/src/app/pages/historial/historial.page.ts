import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { StoreService, Product } from '../../services/store.service';
import { receiptOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonIcon]
})
export class HistorialPage implements OnInit {
  public history$: Observable<Product[]>;

  constructor(private store: StoreService) {
    addIcons({ receiptOutline });
    this.history$ = this.store.history$;
  }

  ngOnInit() {
  }
}
