import { SpecialeModule } from './../racines/speciale/speciale.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { LoginModule } from './../racines/login/login.module';
import { ChatInboxModule } from './../racines/chat-inbox/chat-inbox.module';
import { InterventionModule } from './../racines/intervention/intervention.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AccueilOldComponent } from './accueil-old/accueil-old.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {NgbDropdownModule, NgbAccordionModule, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';
import { ListeMecanoOffreComponent } from './liste-mecano-offre/liste-mecano-offre.component';
import { StripePaymentModule } from '../racines/stripe-payment/stripe-payment.module';
import { EspaceClientModule } from '../espace-client/espace-client.module';
import { AccueilComponent } from './accueil/accueil.component';
import { ScanComponent } from './scan/scan.component';
import { ZXingScannerModule } from 'angular-weblineindia-qrcode-scanner';
import { AppartementComponent } from './appartement/appartement.component';
import { EtatLieuxComponent } from './etat-lieux/etat-lieux.component';
import { SignalisationComponent } from './signalisation/signalisation.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import {MatSliderModule} from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MenuSidenavComponent } from './menu-sidenav/menu-sidenav.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  exports: [AccueilOldComponent, HomeComponent],
  // tslint:disable-next-line:max-line-length
  declarations: [AccueilOldComponent, HomeComponent, TestComponent, ListeMecanoOffreComponent, AccueilComponent, ScanComponent, AppartementComponent, EtatLieuxComponent, SignalisationComponent, CertificationsComponent, MenuSidenavComponent],
  imports: [
    GooglePlaceModule,
    CommonModule,
    ChatInboxModule,
    NgbDropdownModule,
    NgbAccordionModule,
    BrowserModule,
    FormsModule,
    InterventionModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule,
    LoginModule,
    StripePaymentModule,
    SpecialeModule,
    EspaceClientModule,
    ZXingScannerModule,
    NgbDatepickerModule,
    SignaturePadModule,
    MatSliderModule,
    MatSidenavModule,
    MatIconModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PagesModule { }
