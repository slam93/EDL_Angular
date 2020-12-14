import { AuthButtonComponent } from './auth-button/auth-button.component';
import { NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { RecuperationComponent } from './recuperation/recuperation.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';



@NgModule({
  exports: [LoginComponent, InscriptionComponent, AuthButtonComponent],
  declarations: [LoginComponent, InscriptionComponent, RecuperationComponent, AuthButtonComponent],
  imports: [CommonModule, LoginRoutingModule, FormsModule, NgbDropdownModule, NgxIntlTelInputModule, ReactiveFormsModule, NgbAccordionModule ]
})
export class LoginModule { }
