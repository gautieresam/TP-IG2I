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
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatChipsModule
  ]
})
export class PokemonModule { }
