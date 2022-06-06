import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';
import { Credentials } from '../models/credentials.model';
import { Token } from '../models/token.models';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.connect()
  }

  connect(): void {
    this.authService.postLogin().subscribe(() => this.id = 1)
  }


  getChild(id : any){
    this.id = id
  }

  cred : Credentials = {email : environment.mail , password : environment.password}

  keptToken ?: Token

  id = 1

}
