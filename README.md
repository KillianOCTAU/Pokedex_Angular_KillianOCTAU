# Pokédex — Angular & PokeAPI

**Auteur : Killian OCTAU**

## Description

Application Angular qui affiche la liste des 151 premiers Pokémon en
consommant l'API publique [PokeAPI](https://pokeapi.co), avec une
recherche par nom en direct et une page de détail (bonus) affichant
les types et les statistiques de base de chaque Pokémon.

## Installation et lancement

```bash
npm install
ng serve
```

Puis ouvrir http://localhost:4200 dans le navigateur.

## Choix techniques

- **Architecture** : séparation stricte entre le service (`PokemonService`,
  seul à utiliser HttpClient), les composants (affichage) et le modèle
  (interfaces TypeScript, aucun `any`).
- **Un seul appel HTTP pour la liste** : l'id de chaque Pokémon est extrait
  de l'URL renvoyée par l'API, et l'image est construite à partir du dépôt
  officiel de sprites — pas de requête détaillée par carte.
- **Recherche en direct** : RxJS (`Subject` + `debounceTime(300)` +
  `distinctUntilChanged`) pour filtrer sans surcharger à chaque frappe.
- **Signals** : l'application étant zoneless, tout l'état lu par le template
  (`loading`, `error`, listes) est déclaré avec `signal()` et mis à jour
  avec `.set()`.
- **Barres de statistiques** : simples div CSS avec `[style.width.%]`,
  sans librairie de graphiques.

## Difficultés rencontrées

- Conflit de nom entre l'interface `PokemonDetail` (modèle) et le composant
  de la page détail, résolu en nommant la classe `PokemonDetailPage`.
- Configuration initiale du dépôt Git (historiques distants et locaux
  divergents), résolue par un merge.