import {Component, Input, OnInit} from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {ActivatedRoute} from "@angular/router";
import {PokemonDetail} from "../models/pokemon-detail.model";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  @Input() pokemons : PokemonDetail | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonservice: PokemonService,
  ) { }

  ngOnInit(): void {
    console.log("toto")      ;

    this.getPokemonsById();
  }

  getPokemonsById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonservice.getPokemonsById(id)
      .subscribe(pokemons => this.pokemons=pokemons);
  }
}
