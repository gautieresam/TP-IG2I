import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { PagedData } from '../models/paged-data.model';
import { Pokemon } from '../models/pokemon.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private httpClient: HttpClient
  ) { }

  pokemonUrl = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io"

  private log(message: string): void {
    console.log(`HeroService: ${message}`);
  }

  getPokemons(): Observable<PagedData<Pokemon>> {
    const url = this.pokemonUrl + "/pokemons"
    return this.httpClient.get<PagedData<Pokemon>>(url).pipe(
      tap(() => this.log("fetched pokemons")),
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons'))
    );
  }

  getPokemonsParams(offset : number, limit : number): Observable<PagedData<Pokemon>> {
    const url = this.pokemonUrl + "/pokemons?offset=" + offset + "&limit=" + limit
    return this.httpClient.get<PagedData<Pokemon>>(url).pipe(
      tap(() => this.log("fetched pokemons")),
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons'))
    );
  }

  getPokemon(id : number): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(this.pokemonUrl + `/pokemons/${id}`).pipe(
      tap(() => this.log("fetched pokemons")),
      catchError(this.handleError<Pokemon>('getPokemon'))
    );
  }

  getPokemonsSearch(search : string): Observable<PagedData<Pokemon>> {
    const url = this.pokemonUrl + `/pokemons?search=${search}`
    return this.httpClient.get<PagedData<Pokemon>>(url).pipe(
      tap(() => this.log("fetched pokemons")),
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
