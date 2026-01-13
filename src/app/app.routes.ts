import { Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then(m=>m.AuthModule)
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes-module').then(m=>m.HeroesModule)
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }


  // {
  //   path: 'home',
  //   component: HomePageComponent
  // },
  // {
  //   path: 'about',
  //   component: AboutPageComponent
  // },
  // {
  //   path: '**',
  //   redirectTo: 'home'
  // }
];
