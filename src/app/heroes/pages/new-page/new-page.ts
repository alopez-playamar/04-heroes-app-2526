import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher } from '../../interfaces/hero-interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.html',
  styles: ``,
  standalone: false
})
export class NewPageComponent {
  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'},
  ]

  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', { nonNullable: true } ),
    publisher:        new FormControl<Publisher>(Publisher.MarvelComics),
    alter_ego:        new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters:       new FormControl<string>(''),
    alt_img:          new FormControl<string>(''),
  })

  onSubmit(): void {
    console.log({
      formIsValid: this.heroForm.valid,
      value: this.heroForm.value,
    });
    
  }
}
