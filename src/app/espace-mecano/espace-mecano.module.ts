import { EspaceClientModule } from './../espace-client/espace-client.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MecanoAccueilComponent } from './mecano-accueil/mecano-accueil.component';
import { MecanoChatComponent } from './mecano-chat/mecano-chat.component';
import { MecanoAgendaComponent } from './mecano-agenda/mecano-agenda.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SpecialeModule } from '../racines/speciale/speciale.module';
import { MecanoAbonnementComponent } from './mecano-abonnement/mecano-abonnement.component';
import { DtAbonnementComponent } from './mecano-abonnement/dt-abonnement/dt-abonnement.component';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  exports: [MecanoAccueilComponent, MecanoAgendaComponent, MecanoAbonnementComponent, DtAbonnementComponent],
  declarations: [MecanoAccueilComponent, MecanoAgendaComponent, MecanoAbonnementComponent, DtAbonnementComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    NgbNavModule,
    EspaceClientModule,
    SpecialeModule
  ]
})
export class EspaceMecanoModule { }
