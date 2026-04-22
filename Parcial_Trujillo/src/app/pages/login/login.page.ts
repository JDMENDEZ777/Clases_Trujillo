import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonButton, IonContent, IonHeader, IonInput, IonItem, 
  IonLabel, IonText, IonTitle, IonToolbar, 
  MenuController // <-- 1. Importamos MenuController
} from '@ionic/angular/standalone';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton, IonContent, IonHeader, IonInput, IonItem, 
    IonLabel, IonText, IonTitle, IonToolbar, 
    CommonModule, FormsModule
  ]
})
export class LoginPage implements OnInit {
  public credentials = {
    email: '',
    password: '',
  };

  public errorMessage = '';

  // 2. Inyectamos menuCtrl en el constructor
  constructor(
    private router: Router, 
    private storeService: StoreService,
    private menuCtrl: MenuController 
  ) {}

  // 3. Este evento se dispara justo antes de que la página sea visible
  async ionViewWillEnter() {
    await this.menuCtrl.enable(false); // Desactiva el menú lateral
  }

  // 4. Este evento se dispara cuando sales del login hacia otra página
  async ionViewWillLeave() {
    await this.menuCtrl.enable(true); // Activa el menú para que funcione en 'productos'
  }

  ngOnInit() {}

  login() {
    this.errorMessage = '';
    const email = this.credentials.email?.trim();

    const result = this.storeService.login(email, this.credentials.password);
    if (result.success) {
      this.router.navigate(['/productos']);
      return;
    }

    this.errorMessage = result.message;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}