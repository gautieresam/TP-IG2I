import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import {FormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { PokedexComponent } from './pokedex/pokedex.component';
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokedexComponent
  ],
  exports: [
    PokemonListComponent,
    PokedexComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        MatListModule,
        RouterModule,
        MatCardModule,
        MatGridListModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatButtonModule,
        InfiniteScrollModule,
        MatSidenavModule
    ]
})
export class PokemonModule { }
