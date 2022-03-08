import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import {FormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent
  ],
  exports: [
    PokemonListComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        MatListModule,
        RouterModule,
        MatCardModule
    ]
})
export class PokemonModule { }
