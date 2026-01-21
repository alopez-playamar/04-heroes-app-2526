import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.html',
  styles: ``,
  standalone: false
})
export class HeroPageComponent implements OnInit {

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    console.log(this.activatedRoute.params);
    this.activatedRoute.params
      .pipe(

      ).subscribe(params => { console.log({params})})
  }

}
