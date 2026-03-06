import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Data, Pokemon } from './servicios/data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Pokedex');
  protected readonly pokemons = signal<Pokemon[]>([]);
  protected readonly cargando = signal(false);

  constructor(private dataService: Data) {}

  ngOnInit(): void {
    this.cargarPokemons();
  }

  cargarPokemons(): void {
    this.cargando.set(true);
    this.dataService.obtenerPokemons(20).subscribe({
      next: (datos) => {
        this.pokemons.set(datos);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error al obtener pokémons:', error);
        this.cargando.set(false);
      },
    });
  }
}
