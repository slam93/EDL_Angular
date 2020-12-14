import { AccueilComponent } from './pages/accueil/accueil.component';
import { ListeMecanoOffreComponent } from './pages/liste-mecano-offre/liste-mecano-offre.component';
import { TestComponent } from './pages/test/test.component';
import { ContainerComponent } from './racines/container/container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientAccueilComponent } from './espace-client/client-accueil/client-accueil.component';
import { ScanComponent } from './pages/scan/scan.component';
import { AppartementComponent } from './pages/appartement/appartement.component';
import { EtatLieuxComponent } from './pages/etat-lieux/etat-lieux.component';
import { CertificationsComponent } from './pages/certifications/certifications.component';

const appRoutes: Routes = [
  // { path: 'login', loadChildren: './racines/login/login.module#LoginModule' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'scan', component: ScanComponent },
  { path: 'appartement', component: AppartementComponent },
  { path: 'etatLieux', component: EtatLieuxComponent },
  { path: 'certification', component: CertificationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
