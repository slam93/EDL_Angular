import { LoginRoutingModule } from './../login/login-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaypalComponent } from './paypal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';



@NgModule({
  exports: [PaypalComponent],
  declarations: [PaypalComponent],
  imports: [
    CommonModule, LoginRoutingModule, FormsModule, NgbDropdownModule, NgxIntlTelInputModule, ReactiveFormsModule
  ]
})
export class PaypalModule { }
