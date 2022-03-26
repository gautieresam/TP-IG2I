import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from '../models/token.models';
import { Credentials } from '../models/credentials.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  pokemonUrl = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io"

  token ?: Token

  cred : Credentials = {email : environment.mail , password : environment.password}

  private log(message: string): void {
    console.log(`HeroService: ${message}`);
  }



  postLogin(): any {
    const url = this.pokemonUrl + "/auth/login"
    this.httpClient.post<Token>(url, this.cred , httpOptions).pipe(
      tap(() => this.log("connecté")),
      catchError(this.handleError<Token>('getPokemons'))
    ).subscribe(rep => this.token = rep)
  }

  getToken(): any{
    return this.token
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
