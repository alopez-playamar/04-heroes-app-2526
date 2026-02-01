import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material-module';

import { HeroPageComponent } from './pages/hero-page/hero-page';
import { LayoutPageComponent } from './pages/layout-page/layout-page';
import { ListPageComponent } from './pages/list-page/list-page';
import { NewPageComponent } from './pages/new-page/new-page';
import { SearchPageComponent } from './pages/search-page/search-page';
import { CardComponent } from './components/card/card';

import { HeroImagePipe } from './pipes/hero-image-pipe';


@NgModule({
  declarations: [
    HeroPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    CardComponent,
    HeroImagePipe
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HeroesModule { }
