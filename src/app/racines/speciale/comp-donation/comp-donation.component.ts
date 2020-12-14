import { Component, OnInit } from '@angular/core';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-comp-donation',
  templateUrl: './comp-donation.component.html',
  styleUrls: ['./comp-donation.component.scss']
})
export class CompDonationComponent implements OnInit {

  public listeDonation = [];
  public entityWWF: any;
  public entityFemmeSolidarite: any;

  constructor(
    private donationApi: DonationService
  ) { }

  ngOnInit(): void {
    // Get all
    this.donationApi.getDonations().subscribe((resDonate: any) => {
      console.log(resDonate);
      this.listeDonation = resDonate.data;

      for (let value of this.listeDonation) {

        if (value.nom === 'WWF') {
          this.entityWWF = value;
        }

        if (value.nom === 'FemmeSolidarite') {
          this.entityFemmeSolidarite = value;
        }
      }

    });
  }


  public proc_update_femmeSolidarite() {
    console.log(['Update Solidatire', this.entityFemmeSolidarite] );
    this.entityFemmeSolidarite.click = this.entityFemmeSolidarite.click + 1;

    let updateSolidFemme = {
      id: this.entityFemmeSolidarite.id,
      nom: this.entityFemmeSolidarite.nom,
      description: this.entityFemmeSolidarite.description,
      click: (this.entityFemmeSolidarite.click + 1)
    };
    this.donationApi.updateDonation(updateSolidFemme).subscribe((resUpdateDonation)=> {
      console.log(resUpdateDonation);
    });

  }

  public proc_update_wwf() {

    console.log(['Update WWF', this.entityWWF] );
    this.entityWWF.click = this.entityWWF.click + 1;

    let updateWWF = {
      id: this.entityWWF.id,
      nom: this.entityWWF.nom,
      description: this.entityWWF.description,
      click: (this.entityWWF.click + 1)
    };

    this.donationApi.updateDonation(updateWWF).subscribe((resUpdateDonation) => {
      console.log(resUpdateDonation);
    });

  }

}
