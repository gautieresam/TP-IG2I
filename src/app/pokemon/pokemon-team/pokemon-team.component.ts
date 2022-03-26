import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../service/pokemon.service';
import { TeamService } from '../service/team.service';

@Component({
  selector: 'app-pokemon-team',
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.scss']
})
export class PokemonTeamComponent implements OnInit {

  constructor(
    private teamService: TeamService,
    private pokemonService: PokemonService
  ) { }

  @Output() newItemEvent = new EventEmitter<string>();

  sendFather(value : any) {
    this.newItemEvent.emit(value);
  }

  // init
  ngOnInit(): void {
    this.teamService.getTeam().subscribe(ids => {
      forkJoin(ids.map(id =>
        this.pokemonService.getPokemon(id)
      )).subscribe(obj => {
        this.equipe = obj
        this.equipe = this.normaliseToSix(this.equipe)
      })
    })
  }

  // pour l'affichage [1, 2, 0, 3] => [1, 2, 3, 0, 0, 0]
  normaliseToSix(tab : Pokemon[]) : Pokemon[] {
    this.equipe = this.removeItemAll(this.equipe, 0)
    if(tab.length < 6){
      const toAdd = 6 - tab.length
      tab = tab.concat(new Array(toAdd).fill(this.dummyPokemon))
    }
    this.emptySlot = tab.indexOf(this.dummyPokemon)
    if(this.emptySlot == -1) this.emptySlot = 6
    return tab
  }

  // retirer le pokemon à un index de l'équipe
  removeFromTeam(index : number): void {
    this.equipe[index] = this.dummyPokemon;
    this.equipe = this.normaliseToSix(this.equipe)
    this.putEquipe()
  }

  // ajouter le pokémon courant à l'équipe
  addToTeam(index : number): void {
    this.showSpinner = true
    this.pokemonService.getPokemon(this.id).subscribe(poke => {
      this.equipe[index] = poke
      this.equipe = this.normaliseToSix(this.equipe)
      this.putEquipe()
    })

  }

  // sauvegarder l'équipe à l'API
  putEquipe(){
    this.showSpinner = true
    this.teamService.setTeam(this.equipe.map(poke => poke.id).slice(0,this.emptySlot)).subscribe(ids => {
      this.showSpinner = false
    })
  }

  // honteusement volé sur stackoverflow
  // retirer tout les valeurs d'un tableau
  removeItemAll(arr: Pokemon[], value : number) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i].id === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  dummyPokemon : Pokemon = {
    id : 0,
    name : 'dummy',
    description : 'dummy',
    height : 1,
    weight : 1,
    types : []
  }

  @Input() id = 1

  equipe : Pokemon[] = new Array(6).fill(this.dummyPokemon)

  emptySlot : number = 0

  showSpinner = false

}
