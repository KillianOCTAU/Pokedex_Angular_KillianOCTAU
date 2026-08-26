import { Component, OnInit, inject, signal } from '@angular/core';
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

  ngOnInit(): void {
    this.pokemonService.getPokemonList(151).subscribe((response) => {
      const items = response.results.map((entry) => {
        // L'id est le dernier segment de l'URL : .../pokemon/25/ -> 25
        const segments = entry.url.split('/').filter(Boolean);
        const id = Number(segments[segments.length - 1]);
        return {
          id,
          name: entry.name,
          spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });
      this.pokemons.set(items);
      this.loading.set(false);
    });
  }
}