import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero-interface';
import { HeroesService } from '../../services/heroes';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.html',
  styles: ``,
  standalone: false
})
export class NewPageComponent implements OnInit {

  constructor(
    private heroService: HeroesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  )
  {}

  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'},
  ]

  // Creamos un FormGroup e inicializamos los valores de cara a insertar un nuevo hero
  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', { nonNullable: true } ),
    publisher:        new FormControl<Publisher>(Publisher.MarvelComics),
    alter_ego:        new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters:       new FormControl<string>(''),
    alt_img:          new FormControl<string>(''),
  })

  ngOnInit(): void {
      // Sino estamos editando, no tenemos que hacer nada más
      if (!this.router.url.includes('edit')) return;

      // Si estamos editando, inicializamos en el momento de la carga
      this.activatedRoute.params
        .pipe(
          switchMap( ({id}) => this.heroService.getHeroById(id) ),

        ).subscribe(hero => {
          // Sino hay hero nos vamos al inicio
          if (!hero) return this.router.navigateByUrl('/');

          this.heroForm.reset(hero);
          return;
        })
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id ){
      this.heroService.updateHero(this.currentHero)
        .subscribe(hero =>{
          this.showSnackBar(`${ hero.superhero } updated!`)
        });
      return;
    }

    this.heroService.addHero(this.currentHero)
      .subscribe( hero => {
        // TODO: Navegar a /heroes/edit/hero.id
        this.showSnackBar(`${ hero.superhero } created!`)
      })
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 2500
    })
  }

  public onDeleteHero() {
    if (!this.currentHero.id) throw Error ('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.heroService.deleteHeroById(this.currentHero.id)
        .subscribe( wasDeleted => {
          if (wasDeleted) {
            this.showSnackBar(`Héroe ${ this.currentHero.superhero } eliminado satisfactoriamente`)
          } else {
            this.showSnackBar(`No ha sido posible eliminar el Héroe ${ this.currentHero.superhero }`)
          }
          this.router.navigate(['/heroes']);

        });    })
  }
}
