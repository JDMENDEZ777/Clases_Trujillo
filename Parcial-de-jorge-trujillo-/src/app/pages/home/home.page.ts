import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { addCircleOutline, cartOutline, receiptOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonIcon, IonCard, IonCardContent]
})
export class HomePage implements OnInit {

  constructor(private router: Router) {
    addIcons({ addCircleOutline, cartOutline, receiptOutline });
  }

  ngOnInit() {
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
