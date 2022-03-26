import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../service/pokemon.service';
import { Location } from '@angular/common'
import { TeamService } from '../service/team.service';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location : Location,
    private teamService: TeamService,
  ) { }

  ngOnInit(): void {
    this.getPokemon(1)
  }

  getPokemon(id : number) : void {
    this.pokemonService.getPokemon(id).subscribe(obj => this.pokemon = obj)
  }

  goBack() : void {
    this.location.back()
  }

  ngOnChanges(): void {
    this.getPokemon(this.id)
  }


  @Input() id = 1

  pokemon ?: Pokemon

  inTeam = false

}
