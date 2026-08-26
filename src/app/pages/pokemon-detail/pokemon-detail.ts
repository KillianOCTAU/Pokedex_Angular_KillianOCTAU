import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../services/pokemon';
import { PokemonDetail } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  imports: [RouterLink],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
})
export class PokemonDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);

  loading = signal(true);
  error = signal(false);
  pokemon = signal<PokemonDetail | null>(null);

  ngOnInit(): void {
    // On recupere l'id depuis l'URL /pokemon/:id
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.pokemonService.getPokemonDetail(id).subscribe({
      next: (detail) => {
        this.pokemon.set(detail);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}