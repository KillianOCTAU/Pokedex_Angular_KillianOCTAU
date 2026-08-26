import { Component, OnInit, inject, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PokemonService } from '../../services/pokemon';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';

interface PokemonItem {
  id: number;
  name: string;
  spriteUrl: string;
}

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList implements OnInit {
  private pokemonService = inject(PokemonService);

  loading = signal(true);
  pokemons = signal<PokemonItem[]>([]);
  filtered = signal<PokemonItem[]>([]);
  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    // Recherche en direct : on attend 300ms apres la derniere frappe
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        const q = query.trim().toLowerCase();
        this.filtered.set(
          this.pokemons().filter((p) => p.name.includes(q))
        );
      });

    this.pokemonService.getPokemonList(151).subscribe((response) => {
      const items = response.results.map((entry) => {
        const segments = entry.url.split('/').filter(Boolean);
        const id = Number(segments[segments.length - 1]);
        return {
          id,
          name: entry.name,
          spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
        };
      });
      this.pokemons.set(items);
      this.filtered.set(items); // au depart, tout est affiche
      this.loading.set(false);
    });
  }

  onSearch(query: string): void {
    this.searchSubject.next(query);
  }
}