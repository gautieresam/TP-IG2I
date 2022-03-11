import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {Pokemon} from "../models/pokemon.model";
import {concat} from "rxjs";
import {PagedData} from "../models/paged-data.model";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons ?: PagedData<Pokemon>;

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(pokemons => this.pokemons = pokemons)
  }

  display_detail(id: number) :void{
    console.log("Identifiant du pokemeon clik : "+id)
    this.pokemonService.idpokquiestclique.emit(id);
  }

  recherche(): void {
    console.log("Recherche");

  }

  onScroll(): void {
    //console.log(this.pokemons);
    this.pokemonService.getPokemonsscroll(this.pokemons!.offset + this.pokemons!.limit, this.pokemons!.limit).subscribe(pokemons => {
      this.pokemons!.data = this.pokemons!.data.concat(pokemons.data);
      this.pokemons!.offset = pokemons.offset;
      this.pokemons!.limit = pokemons.limit;

    });
  }
}
