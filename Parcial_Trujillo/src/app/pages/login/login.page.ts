import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonText, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  public credentials = {
    email: '',
    password: '',
  };

  public errorMessage = '';

  constructor(private router: Router, private storeService: StoreService) {}

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
