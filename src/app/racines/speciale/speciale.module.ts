
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompImmatriculationComponent } from './comp-immatriculation/comp-immatriculation.component';
import { CompImageCropperComponent } from './comp-image-cropper/comp-image-cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CompSelectMarqueComponent } from './comp-select-marque/comp-select-marque.component';
import { CompSelectModeleComponent } from './comp-select-modele/comp-select-modele.component';
import { PaymentStripeComponentsComponent } from './payment-stripe-components/payment-stripe-components.component';
import { StarComponent } from './star/star.component';
import { ImageCropperSectionComponent } from './image-cropper-section/image-cropper-section.component';
import { CompCalendarComponent } from './comp-calendar/comp-calendar.component';
import { CompCategorieComponent } from './comp-categorie/comp-categorie.component';
import { CompDonationComponent } from './comp-donation/comp-donation.component';

@NgModule({
  exports: [
    CompImmatriculationComponent,
    CompImageCropperComponent,
    CompSelectMarqueComponent,
    CompSelectModeleComponent,
    PaymentStripeComponentsComponent,
    StarComponent,
    ImageCropperSectionComponent,
    CompCalendarComponent,
    CompCategorieComponent,
    CompDonationComponent
  ],
  declarations: [
    CompImmatriculationComponent,
    CompImageCropperComponent,
    CompSelectMarqueComponent,
    CompSelectModeleComponent,
    PaymentStripeComponentsComponent,
    StarComponent,
    ImageCropperSectionComponent,
    CompCalendarComponent,
    CompCategorieComponent,
    CompDonationComponent
  ],
  imports: [
    CommonModule,
    AutocompleteLibModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule
  ],
})

export class SpecialeModule {}
