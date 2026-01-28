import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero-interface';
import { HeroesService } from '../../services/heroes';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.html',
  styles: ``,
  standalone: false
})
export class ListPageComponent implements OnInit {

  // variable para almacenar el listado de los héroes
  public listadoHeroes: Hero[] = [];

  // inyectar el servicio
  constructor(private heroesService: HeroesService) {}


  ngOnInit(): void {
    console.log("init list");

    this.heroesService.getHeroes().subscribe(response =>
      this.listadoHeroes = response
    );
  }
}
