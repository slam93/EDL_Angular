import { StripePaymentModule } from './../racines/stripe-payment/stripe-payment.module';
import { SpecialeModule } from './../racines/speciale/speciale.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { GuiModule } from './../racines/gui/gui.module';
import { LoginModule } from './../racines/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { InterventionModule } from './../racines/intervention/intervention.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgbDropdownModule,
  NgbAccordionModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ClientAccueilComponent } from './client-accueil/client-accueil.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeOffreDisponibleComponent } from './liste-offre-disponible/liste-offre-disponible.component';
import { ClientReglageComponent } from './client-reglage/client-reglage.component';
import { ClientVoitureComponent } from './client-voiture/client-voiture.component';
import { DataTablesModule } from 'angular-datatables';
import { PaypalModule } from '../racines/paypal/paypal.module';
import { ClientHistoriqueComponent } from './client-historique/client-historique.component';
import { DtVoitureComponent } from './client-voiture/dt-voiture/dt-voiture.component';
import { DtHistoriqueComponent } from './client-historique/dt-historique/dt-historique.component';
import { ClientPaymentComponent } from './client-payment/client-payment.component';
import { DtPaymentComponent } from './client-payment/dt-payment/dt-payment.component';

// espace admin
import {
  AdminUserManagementComponent,
  AdminCategoryManagementComponent,
  AdminSubscriberListComponent,
  AdminSubscriptionManagementComponent,
  AdminVehiclesManagementComponent,
  AdminSectionManagementComponent,
  AdminDiagnostic2ManagementComponent,
  AdminChatComponent
} from "../espace-admin/";
import { ClientCropimageComponent } from './client-cropimage/client-cropimage.component'
import { ImageCropperModule } from 'ngx-image-cropper';
import { ClientChatComponent } from './client-chat/client-chat.component';
import { SectionManagementComponent } from './section-management/section-management.component';


@NgModule({
  exports: [
    ListeOffreDisponibleComponent,
    ClientAccueilComponent,
    ClientReglageComponent,
    ClientVoitureComponent,
    ClientHistoriqueComponent,
    DtVoitureComponent,
    DtHistoriqueComponent,
    AdminUserManagementComponent,
    AdminChatComponent,
    ClientPaymentComponent,
    DtPaymentComponent,
    AdminCategoryManagementComponent,
    AdminSubscriberListComponent,
    AdminSubscriptionManagementComponent,
    AdminVehiclesManagementComponent,
    AdminSectionManagementComponent,
    AdminDiagnostic2ManagementComponent,
    ClientCropimageComponent,
    SectionManagementComponent
  ],
  declarations: [
    ListeOffreDisponibleComponent,
    ClientAccueilComponent,
    ClientReglageComponent,
    ClientVoitureComponent,
    ClientHistoriqueComponent,
    DtVoitureComponent,
    DtHistoriqueComponent,
    AdminUserManagementComponent,
    AdminChatComponent,
    ClientPaymentComponent,
    DtPaymentComponent,
    AdminCategoryManagementComponent,
    AdminSubscriberListComponent,
    AdminSubscriptionManagementComponent,
    AdminVehiclesManagementComponent,
    AdminSectionManagementComponent,
    AdminDiagnostic2ManagementComponent,
    ClientCropimageComponent,
    ClientChatComponent,
    SectionManagementComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    NgbDropdownModule,
    NgbAccordionModule,
    BrowserModule,
    FormsModule,
    InterventionModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    AutocompleteLibModule,
    BrowserAnimationsModule,
    LoginModule,
    PaypalModule,
    GuiModule,
    SpecialeModule,
    ImageCropperModule,
    StripePaymentModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EspaceClientModule {}
