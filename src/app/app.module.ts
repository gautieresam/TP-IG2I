import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PokemonListComponent} from "./pokemon/pokemon-list/pokemon-list.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {PokemonModule} from "./pokemon/pokemon.module";

import {Location} from "@angular/common";
import {PokemonDetailComponent} from "./pokemon/pokemon-detail/pokemon-detail.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PokemonModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
