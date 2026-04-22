import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonText, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {
  public formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  public successMessage = '';
  public errorMessage = '';

  constructor(private router: Router, private storeService: StoreService) {}

  ngOnInit() {}

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    // Validar que todos los campos estén llenos
    if (!this.formData.name || !this.formData.email || !this.formData.password || !this.formData.confirmPassword) {
      this.errorMessage = 'Todos los campos son requeridos';
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    // Registrar usuario
    const result = this.storeService.register(
      this.formData.name,
      this.formData.email,
      this.formData.password
    );

    if (result.success) {
      this.successMessage = result.message;
      // Limpiar formulario
      this.formData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.errorMessage = result.message;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
