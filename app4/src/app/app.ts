import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router'; // 1. Importar esto

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet], // 2. Agregar RouterOutlet aquí
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class AppComponent {
  nuevaTarea: string = '';
  listaTareas: { texto: string; completada: boolean }[] = [];

  agregarTarea() {
    if (this.nuevaTarea.trim() === '') {
      alert("Escribe una tarea");
      return;
    }
    this.listaTareas.push({
      texto: this.nuevaTarea,
      completada: false
    });
    this.nuevaTarea = ''; // Limpia el input
  }

  toggleTarea(tarea: any) {
    tarea.completada = !tarea.completada;
  }
}