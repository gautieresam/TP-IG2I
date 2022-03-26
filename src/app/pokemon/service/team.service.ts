import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from '../models/token.models';
import { Credentials } from '../models/credentials.model';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

// TODO : ajouter le token dans les httpOptions

@Injectable({
  providedIn: 'root'
})

export class TeamService {

  constructor(
    private pokemonService: PokemonService,
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  pokemonUrl = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io"

  private log(message: string): void {
    console.log(`HeroService: ${message}`);
  }

  // TODO : CES 2 FONCTIONS NE SONT PAS TERMINEES, LES FAIRES
  getTeam(): Observable<number[]> {
    const token = this.authService.getToken()
    const httpOptionsLocal = {
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${token.access_token}`
      })
    };
    const url = this.pokemonUrl + "/trainers/me/team"

    return this.httpClient.get<number[]>(url, httpOptionsLocal).pipe(
      tap(() => this.log("fetched ids")),
    )

  }

  setTeam(team : number[]): Observable<Token> {
    const token = this.authService.getToken()
    const httpOptionsLocal = {
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${token.access_token}`
      })
    };
    const url = this.pokemonUrl + "/trainers/me/team"
    return this.httpClient.put<any>(url, team , httpOptionsLocal).pipe(
      tap(() => this.log("fetched pokemons")),
      catchError(this.handleError<any>('getPokemons'))
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
