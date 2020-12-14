import { Router } from '@angular/router';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  surnom;
  nom;
  prenom;
  phone;
  email;
  password;

    public separateDialCode = true;
    public SearchCountryField = SearchCountryField;
    public TooltipLabel = TooltipLabel;
    public CountryISO = CountryISO;
    public preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
    public phoneForm = new FormGroup({
      phone: new FormControl(undefined, [Validators.required])
    });

  constructor(
    private utilisateurApi: UtilisateurService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  /* #################################    FUNCTION    ################################## */
  public proc_change_page(myroute: string) {
    console.log(myroute);
    this.router.navigate([myroute]);
  }

  public changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  public proc_inscription() {
    console.log([this.surnom, this.nom, this.prenom, this.email, this.password]);

    let inscript = {
      // username: this.surnom,
      username: "myuser",
      first_name: this.nom,
      last_name: this.prenom,
      email: this.email,
      password: this.password
    };

    // Test des valeurs ici
    this.utilisateurApi.inscriptionUtilisateur(inscript).subscribe((resultConnect: any) => {
      if (resultConnect.message === 'success') {
          this.router.navigate(['connexion']);
      }
    });

  }

}
