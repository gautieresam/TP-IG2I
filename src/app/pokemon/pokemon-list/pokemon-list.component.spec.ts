import { Component, OnInit } from '@angular/core';
import { PagedData } from '../models/paged-data.model';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../service/pokemon.service';
import { Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap, forkJoin } from 'rxjs';
import { TeamService } from '../service/team.service';
import { AuthService } from '../service/auth.service';
import { Credentials } from '../models/credentials.model';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token.models';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})


export class PokemonListComponent implements OnInit {

  constructor(
    private pokemonService: PokemonService
  ) { }

  @Output() newItemEvent = new EventEmitter<string>();

  sendFather(value : any) {
    this.newItemEvent.emit(value);
  }

  ngOnInit(): void {
    this.initFetch()
  }

  initFetch(): void {
    this.offset = 0
    this.limit = 20
    this.pokemonService.getPokemonsParams(this.offset, this.limit).subscribe(obj => this.pokemons = obj.data)
  }

  onScroll(): void {
    if(this.offset == 0)
      this.offset = 20
    else
      this.offset += 5
    this.pokemonService.getPokemonsParams(this.offset, 5).subscribe(obj => this.pokemons = this.pokemons?.concat(obj.data))
  }

  search(event : any){
    if(this.searchValue === '')
      this.initFetch()
    else
      this.pokemonService.getPokemonsSearch(this.searchValue).subscribe(obj => this.pokemons = obj.data)
  }

  offset = 0

  limit = 20

  pokemons ?: Pokemon[]

  equipe ?: Pokemon[]

  searchValue = ''

  affTeam = false

}
