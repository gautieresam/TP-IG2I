import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {Pokemon} from "../models/pokemon.model";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons : Pokemon[]=[];

  constructor(private pokemonService : PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(pokemons => this.pokemons = pokemons.data)
  }

}
