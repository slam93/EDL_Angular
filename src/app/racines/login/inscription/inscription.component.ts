import { MecanoService } from './../../../services/mechanics.service';
import { UtilisateurService } from './../../../services/utilisateur.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { COUNTRY } from 'src/app/interfdata/data-country';
import {
  SearchCountryField,
  TooltipLabel,
  CountryISO,
} from 'ngx-intl-tel-input';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
// import {  getCountries } from 'country-state-picker'; | Change en data date.json

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
  @Output() vaiderInscription: EventEmitter<any> = new EventEmitter();

  /* #################################    VARIABLE    ################################## */
  public surnom: string;
  public nom: string;
  public prenom: string;
  public phone: any;
  public email: any;
  public password: any;
  public errorSurnom: any;
  public errorNom: any;
  public errorPrenom: any;
  public errorPhone: any;
  public errorEmail: any;
  public errorPassword: any;

  public roleUserCreate: string;
  public idUserCreate: number;

  public listCountry = COUNTRY;
  public defaultCountry: any;

  public separateDialCode = true;
  // tslint:disable-next-line:indent
  public SearchCountryField = SearchCountryField;
  // tslint:disable-next-line:indent
  public TooltipLabel = TooltipLabel;
  public CountryISO = CountryISO;
  // tslint:disable-next-line:indent
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  // tslint:disable-next-line:indent
  public phoneForm = new FormGroup({
    // tslint:disable-next-line:indent
    phone: new FormControl(undefined, [Validators.required]),
    // tslint:disable-next-line:indent
  });

  public afficheNotifSuccee: any;
  public afficheChargement: any;

  public alertEmailExist: any

  /* #################################    CONSTRUCTOR    ################################## */
  constructor(
    private utilisateurApi: UtilisateurService,
    private mechanicApi: MecanoService,
    private router: Router
  ) {
    this.afficheNotifSuccee = false;
    this.afficheChargement = false;
    this.errorSurnom = false;
    this.errorNom = false;
    this.errorPrenom = false;
    this.errorPhone = false;
    this.errorEmail = false;
    this.errorPassword = false;
    this.alertEmailExist = false
  }

  ngOnInit(): void {
    // initialisation
    this.defaultCountry = this.listCountry[0];
    console.log(this.listCountry, this.defaultCountry);

    this.phone = new Subject<string>();
  }

  /* #################################    FUNCTION    ################################## */
  public proc_change_page(myroute: string) {
    console.log(myroute);
    this.router.navigate([myroute]);
  }

  public changePreferredCountries() {
    // tslint:disable-next-line:indent
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  public proc_inscription() {

    //Test role selected
    console.log(localStorage.getItem('role'))
    let role = 'CLIENT';
    this.roleUserCreate = 'CLIENT';
    if (localStorage.getItem('role') === 'MECANO') {
      role = 'MECANO';
      this.roleUserCreate = 'MECANO';
    }

    if (
      this.errorNom == true ||
      this.errorPrenom == true ||
      this.errorSurnom == true ||
      this.errorEmail == true ||
      this.errorPassword == true
    ) {
    } else if (this.phone.number.length < 8) {
      this.errorPhone = true;
    } else {
      this.errorPhone = false;
      this.afficheChargement = true;
      let inscript = {
        username: this.surnom,
        first_name: this.nom,
        last_name: this.prenom,
        email: this.email,
        password: this.password,
        role: role
      };

      // Test des valeurs ici |  à configurer
      console.log(inscript)

      this.utilisateurApi.getifemailexist(inscript.email)
        .subscribe((res) => {
          console.log('emailExist', res.emaillength)

          if (res.emaillength !== 0) {
            console.log('EMAIL EXIST DEJA')
            this.alertEmailExist = true
            this.afficheChargement = false
            return

          } else {
            this.alertEmailExist = false
            this.utilisateurApi.inscriptionUtilisateur(inscript)
              .subscribe((resultConnect: any) => {
                console.log(resultConnect);
                console.log('===> EMAIL INSCRIPTION : ' + inscript.email);

                // Ajout Mecano Si mecano
                if (this.roleUserCreate === 'MECANO') {
                  this.idUserCreate = resultConnect.data.insertId
                  let mechanicAdd = {
                    name: 'Mecano'+resultConnect.data.insertId,
                    hourOpen: '08:00',
                    hourClose: '18:00',
                    userId: resultConnect.data.insertId
                  };

                  this.mechanicApi.createMecano(mechanicAdd).subscribe((resCreateMecano: any) => {
                    console.log(resCreateMecano);
                  });
                }

                if (resultConnect.message === 'success') {
                  this.router.navigate(['connexion']);
                }
              })

            setTimeout(() => {
              this.afficheChargement = false
              this.afficheNotifSuccee = true
            }, 1000)

            setTimeout(() => {
              this.afficheNotifSuccee = false
              this.vaiderInscription.emit()
            }, 3000)
          }
        })
    }
  }

  public validateEmail() {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.email.match(mailformat)) {
      this.errorEmail = false;
      return true;
    } else {
      this.errorEmail = true;
      return false;
    }
  }

  public validateNom() {
    if (this.nom.length < 2) {
      this.errorNom = true;
      return true;
    } else {
      this.errorNom = false;
      return false;
    }
  }

  public validatePrenom() {
    if (this.prenom.length < 2) {
      this.errorPrenom = true;
      return true;
    } else {
      this.errorPrenom = false;
      return false;
    }
  }

  public validateSurnom() {
    if (this.surnom.length < 2) {
      this.errorSurnom = true;
      return true;
    } else {
      this.errorSurnom = false;
      return false;
    }
  }

  public validatePassword() {
    if (this.password.length < 6) {
      this.errorPassword = true;
      return true;
    } else {
      this.errorPassword = false;
      return false;
    }
  }

  public validatePhone() {
    if (this.phone.length < 10) {
      this.errorPhone = true;
      return true;
    } else {
      this.errorPhone = false;
      return false;
    }
  }

  public emitConfig(val) {
    this.phone.next(val);
    console.log(val);
  }
}
