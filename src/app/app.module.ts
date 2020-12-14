import { EspaceClientModule } from './espace-client/espace-client.module';
import { InterventionModule } from './racines/intervention/intervention.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { LoginModule } from './racines/login/login.module';
import { ContainerModule } from './racines/container/container.module';
import { PagesModule } from './pages/pages.module';
import { ngxRatingModule } from 'ngx-rating-star';

// @ts-ignore
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
// @ts-ignore
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { environment } from '../environments/environment';

console.log('msi', environment.production);

import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { AsyncPipe, DatePipe, registerLocaleData } from '../../node_modules/@angular/common';

import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { HashLocationStrategy, LocationStrategy, CommonModule } from '@angular/common';

import { NgbModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatInboxModule } from './racines/chat-inbox/chat-inbox.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { DataTablesModule } from 'angular-datatables';
import { StripePaymentModule } from './racines/stripe-payment/stripe-payment.module';
import { PaypalModule } from './racines/paypal/paypal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ngx-image-cropper';


import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
// import { StarRatingModule } from 'angular-star-rating';
import { StarRatingModule } from 'libs/angular-star-rating';
import { MessagingService } from './services/messaging.service';
// import { AdminChatComponent } from './espace-admin/admin-chat/admin-chat.component';
registerLocaleData(localeFr, 'fr-FR', localeFrExtra);


@NgModule({
  // exports: [AdminUserListComponent],
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    StarRatingModule.forRoot(),
    ngxRatingModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    NgbNavModule,
    NgxIntlTelInputModule,
    AutocompleteLibModule,
    FormsModule,
    ReactiveFormsModule,
    ChatInboxModule,
    PaypalModule,
    StripePaymentModule,
    ContainerModule,
    InterventionModule,
    EspaceClientModule,
    LoginModule,
    PagesModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    NgbModule,
    NgbDropdownModule,
    SocialLoginModule,
    GooglePlaceModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    ImageCropperModule,
    HammerModule
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    MessagingService,
    AsyncPipe,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: ({
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            // provider: new GoogleLoginProvider('96471844888-rugfqd2fhe8okr56h0olo4mrj4b8u2um.apps.googleusercontent.com'),
            provider:
              environment.production === true
                ? new GoogleLoginProvider(
                  '985708204626-2pffbeqhklc4jbta5ts7eplpkrr1tt5b.apps.googleusercontent.com'
                )
                : new GoogleLoginProvider(
                  '96471844888-rugfqd2fhe8okr56h0olo4mrj4b8u2um.apps.googleusercontent.com'
                ),
            lazyLoad: true,
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            // provider: new FacebookLoginProvider('827891614689878'),
            provider: new FacebookLoginProvider(
              environment.production === true
                ? '827891614689878'
                : '726760201250673'
            ),
            lazyLoad: true,
          },
        ],
      } as unknown) as SocialAuthServiceConfig,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
