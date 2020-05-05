import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pockemon } from './models/pokemon';
import { forkJoin  } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Pokedex';
  search = '';
  pokemonList = [];
  baseUrl = 'https://pokeapi.co/api/v2/pokemon?offset=00&limit=12';
  offset = 0;
  selectedPokemon: Pockemon;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPokemon(this.baseUrl);
  }

  loadPokemon(url) {
    this.http.get<any>(url).subscribe(pokemons => {
      const request = pokemons.results.map(x => this.http.get<any>(x.url));
      forkJoin(request).subscribe(res => {
        this.pokemonList = res;
      });
    });
  }

  loadMorePokemon() {
    this.offset += 12;
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=12`;
    this.loadPokemon(url);
    this.selectedPokemon = null;
  }

  selectPokemon(pokemon) {
    this.selectedPokemon = {
      Name : pokemon.name,
      Type : pokemon.types,
      Defens : pokemon.stats[3].base_stat,
      Attack : pokemon.stats[4].base_stat,
      Speed : pokemon.stats[0].base_stat,
      SPDefens : pokemon.stats[1].base_stat,
      SPAttack : pokemon.stats[2].base_stat,
      HP : pokemon.stats[5].base_stat,
      Weight : pokemon.weight,
      Moves : pokemon.moves.length,
      Id : pokemon.id,
      ImageUrl: pokemon.sprites.front_default
    };
  }
}
