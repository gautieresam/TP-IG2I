import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Pokemon} from "./models/pokemon.model";
import {HttpClient} from "@angular/common/http";
import {PagedData} from "./models/paged-data.model";
import {PokemonDetail} from "./models/pokemon-detail.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonApiUrl ="http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io";

  constructor(private http:HttpClient ) { }

  @Output() idpokquiestclique: EventEmitter<number> = new EventEmitter();


  getPokemons(): Observable<PagedData<Pokemon>> {
    return this.http.get<PagedData<Pokemon>>(this.pokemonApiUrl+'/pokemons?limit=20');
  }

  getPokemonsscroll(offset:number, limit:number): Observable<PagedData<Pokemon>> {
    return this.http.get<PagedData<Pokemon>>(this.pokemonApiUrl+'/pokemons?limit'+limit+'&offset='+offset);
  }

  // Cette fonction va permettre de faire un appel vers un pokemon pour GET les details
  getPokemonsById(id:number): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.pokemonApiUrl}/pokemons/${id}`);
  }

}
