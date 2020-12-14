import { Component, OnInit } from '@angular/core';
import { langue } from './../../interfdata/data-langue';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
NgbDate,
} from '@ng-bootstrap/ng-bootstrap';
import {LocationService} from '../../services/location.service';
import {HelpersService} from '../../services/helpers.service';
import {FormatDatePickerService} from '../../services/format-date-picker.service';
import {CONFIGURATION} from '../../interfdata/data-configuration';

@Component({
  selector: 'app-appartement',
  templateUrl: './appartement.component.html',
  styleUrls: ['./appartement.component.scss']
})
export class AppartementComponent implements OnInit {
  public location: any;
  public registerForm: FormGroup;
  public submitted = false;
  public afficheChargement: any;
  public afficheNotifDanger: any;
  public messageErreur: string;
  public numeros: any;
  public now: Date = new Date();
  public minDate: any;
  apiURL = CONFIGURATION.apiURL;
  constructor(
    private formBuilder: FormBuilder,
    public locationService: LocationService,
    public helpersService: HelpersService,
    public formatDatePickerService: FormatDatePickerService,
  ) {
    this.afficheChargement = false;
    this.afficheNotifDanger = false;
    this.messageErreur = '';
    this.minDate = { year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate() };
    this.location = this.locationService.getLocation();
    this.numeros = localStorage.getItem('numAppartement');
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      appartmentId: [this.numeros, Validators.required],
      date_end_sejour: ['', Validators.required],
    });
  }

  public envoie(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.afficheChargement = true;
    const params = {
      first_name: this.registerForm.value.first_name,
      last_name: this.registerForm.value.last_name,
      email: this.registerForm.value.email,
      appartmentId: this.registerForm.value.appartmentId,
      date_end_sejour: this.formatDatePickerService.formatDate(
        this.registerForm.value.date_end_sejour.year, this.registerForm.value.date_end_sejour.month,
        this.registerForm.value.date_end_sejour.day)
    };
    const url = this.apiURL + 'inscription';
    this.helpersService.postHelper(params, url).subscribe((response) => {
      this.afficheChargement = false;
      console.log(response.data);
      if (response.success){
        localStorage.setItem('dataAppartement', JSON.stringify(response.data) );
        localStorage.setItem('dataUser', JSON.stringify(response.users) );
        this.registerForm.reset();
      }else {
        this.messageErreur = response.message;
        this.afficheNotifDanger = true;
        setTimeout(() => {
          this.afficheNotifDanger = false;
        }, 2000);
      }
    });
  }

}
