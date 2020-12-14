import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Diagnostic2Component } from './diagnostic2/diagnostic2.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { DetailComponent } from './detail/detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';



@NgModule({
  exports: [Diagnostic2Component, CommentaireComponent, DetailComponent],
  declarations: [Diagnostic2Component, CommentaireComponent, DetailComponent],
  imports: [
    CommonModule,
    NgbDropdownModule,
    BrowserModule,
    FormsModule,
	  ReactiveFormsModule,
    BrowserAnimationsModule
  ]
})
export class InterventionModule { }
