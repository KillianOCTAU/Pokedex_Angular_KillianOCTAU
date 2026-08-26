import { Component, input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  id = input.required<number>();
  name = input.required<string>();
  spriteUrl = input.required<string>();
}