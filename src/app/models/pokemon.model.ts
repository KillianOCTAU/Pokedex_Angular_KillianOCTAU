export interface PokemonListEntry {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: PokemonListEntry[];
}