import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonListResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2';

  getPokemonList(limit = 20): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}`);
  }
}