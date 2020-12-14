import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { RecuperationComponent } from './recuperation/recuperation.component';

const appRoutes: Routes = [
  {
    path: 'connexion',
    component: LoginComponent
  },
  {
    path: 'inscription',
    component: InscriptionComponent
  },
  {
    path: 'recuperation',
    component: RecuperationComponent
  },
  { path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
