import { SubscriptionsService } from './../../services/subscriptions.service';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-mecano-abonnement',
  templateUrl: './mecano-abonnement.component.html',
  styleUrls: ['./mecano-abonnement.component.scss']
})
export class MecanoAbonnementComponent implements OnInit {

  public showOffre: boolean = false;
  public listeCategorie = [];
  public categorie1: any;
  public categorie2: any;
  public existCategorieDb: boolean = false;
  public amountPrice: any;
  public containAb: any;
  public b_var: boolean = false;
  public containValue1 = false;
  public containValue2 = false;
  public containValuePayement = true;

  constructor(
    private categorieApi: CategoriesService,
    private subscriptionApi: SubscriptionsService
  ) { }

  ngOnInit(): void {

    this.amountPrice = 0;

    this.categorieApi.getAllCategories().subscribe((resCategorie: any) => {
      this.listeCategorie  = resCategorie.data;
      console.log(this.listeCategorie);

      if (this.listeCategorie.length < 2) {
        this.existCategorieDb = false;
      } else {
        this.categorie1 = this.listeCategorie[0];
        this.categorie2 = this.listeCategorie[1];
        console.log([this.categorie1, this.categorie2]);
      }
    });

  }

  public proc_show_abonnement() {
    this.showOffre = true;
  }

  public proc_show_offre() {
    this.showOffre = false;
  }

  public proc_emit_subscription1(paramSub) {
    this.containAb = 'container2'; // To hide this

    if ( paramSub.price !== 0 ) {
      this.containValue1 = false;
      this.containValue2 = true;
      this.containValuePayement = false;
      console.log(paramSub);
      this.amountPrice = paramSub.price;
    }
    this.insertSubscription();
  }

  public proc_emit_subscription2(paramSub) {
    this.containAb = 'container1';
    if ( paramSub.price !== 0 ) {
      this.containValue1 = true;
      this.containValue2 = false;
      this.containValuePayement = false;
      console.log(paramSub);
      this.amountPrice = paramSub.price;
    }
    this.insertSubscription();
  }


  public proc_emit_after_payement(paramPay) {
    console.log(paramPay);
  }


  public proc_retour_liste_abonnement() {
    this.containValue1 = false;
    this.containValue2 = false;
    this.containValuePayement = true;
  }


  private insertSubscription() {
    const dateStart = new Date();
    const dateEnd = new Date().setDate(dateStart.getDate() + 30);
    console.log(Number(localStorage.getItem('categorieId')));
    const subscriptionAdd = {
      dateBegin: dateStart,
      dateEnd: dateEnd,
      userId: Number(localStorage.getItem('userId')),
      categoryId: Number(localStorage.getItem('categorieId')),
      status: 'NONPAYE'
    };

    this.subscriptionApi.createSubscription(subscriptionAdd).subscribe((resSubscription: any) => {
      console.log(resSubscription);

      // Get lastest by userId
      this.subscriptionApi.getMaxIdByUserSubscription({ userId: Number(localStorage.getItem('userId')) })
        .subscribe((resMaxId: any) => {
          console.log(resMaxId);
          localStorage.setItem('subscriptionId', resMaxId.data);
        });

    });
  }

}
