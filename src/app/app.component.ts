import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Pokemons {
  name: string;
  urlPhoto?: string;
  type?: [];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pokedex';

  pokemonsArr = [];
  data = [];
  pokemons: Pokemons[] = [];


  constructor(private http: HttpClient) {}

  ngOnInit() {
      this.loadPokemon();
  }

  loadPokemon() {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?offset=00&limit=12')
      .subscribe(pokemons => {
        this.pokemonsArr = pokemons.results;

        for ( let i = 0; i < this.pokemonsArr.length; i++) {
         this.http.get<any>(this.pokemonsArr[i].url).subscribe(data => {
          this.data[i] = data;
         });
        }

        console.log('Data: ', this.data);

      });
  }


}
