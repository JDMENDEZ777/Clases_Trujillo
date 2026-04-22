
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { IonApp, IonMenu, IonContent, IonList, IonListHeader, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonButton, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, home, cart, receipt, logOut, personCircle } from 'ionicons/icons';
import { StoreService, User } from './services/store.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonImg
],
})
export class AppComponent {
  public appPages = [
    { title: 'Productos', url: '/productos', icon: 'home' },
    { title: 'Carrito', url: '/carrito', icon: 'cart' },
    { title: 'Historial', url: '/historial', icon: 'receipt' },
  ];
  
  public currentUser$: Observable<User | null>;
  
  constructor(private store: StoreService, private router: Router) {
    addIcons({ 
      mailOutline, 
      mailSharp, 
      paperPlaneOutline, 
      paperPlaneSharp, 
      heartOutline, 
      heartSharp, 
      archiveOutline, 
      archiveSharp, 
      trashOutline, 
      trashSharp, 
      warningOutline, 
      warningSharp, 
      bookmarkOutline, 
      bookmarkSharp,
      home,
      cart,
      receipt,
      logOut,
      personCircle
    });
    
    this.currentUser$ = this.store.currentUser$;
  }

  logout() {
    this.store.logout();
    this.router.navigate(['/login']);
  }
}
