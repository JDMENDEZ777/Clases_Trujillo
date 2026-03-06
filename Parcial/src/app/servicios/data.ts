import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Pokemon {
  name: string;
  image: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class Data {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  obtenerPokemons(limite: number = 20): Observable<Pokemon[]> {
    return this.http.get<any>(`${this.apiUrl}?limit=${limite}`).pipe(
      map((response) =>
        response.results.map((pokemon: any) => ({
          name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
          url: pokemon.url,
          image: this.extraerImagenUrl(pokemon.url),
        }))
      )
    );
  }

  private extraerImagenUrl(url: string): string {
    const id = url.split('/').filter((x) => x).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
