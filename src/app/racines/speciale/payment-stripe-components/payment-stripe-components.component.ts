import { Payement } from 'src/app/interfaces/payement';
import { StripeService } from 'src/app/services/stripe.service';
import { PayementService } from 'src/app/services/payement.service';
import { InterventionService } from 'src/app/services/intervention.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';


@Component({
  selector: 'app-payment-stripe-components',
  templateUrl: './payment-stripe-components.component.html',
  styleUrls: ['./payment-stripe-components.component.scss'],
})
export class PaymentStripeComponentsComponent implements OnInit, OnChanges {

  @ViewChild('cardInfo') cardInfo: ElementRef;
  @Input() amount: any;
  @Input() type: any;         // Subscription |   Intervention
  @Output() afterUpdateIntervention: EventEmitter<any> = new EventEmitter();

  /* ########################################       VARIABLE         ######################################################## */

  public payement = new Payement();
  public _totalAmount: number;
  public card: any;
  public cardHandler = this.onChange.bind(this);
  public cardError: string;

  /* ########################################       CONSTRUCTOR         ######################################################## */
  constructor(
    private cd: ChangeDetectorRef,
    private stripeAPI: StripeService,
    private payementApi: PayementService,
    private interventionApi: InterventionService,
    private subscriptionApi: SubscriptionsService
  ) {
    this._totalAmount = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._totalAmount = this.amount;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.card) {
      // We remove event listener here to keep memory clean
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  ngAfterViewInit() {
    this.initiateCardElement();
  }


  /* ########################################       FUNCTION         ######################################################## */
  public initiateCardElement() {
    // Giving a base style here, but most of the style is in scss file
    const cardStyle = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    this.card = elements.create('card', { cardStyle });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
    console.log(this.card);
  }


  public onChange({ error }) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
    this.cd.detectChanges();
  }


  public async createStripeToken() {
    console.log(['Create token ', this.card]);
    const { token, error } = await stripe.createToken(this.card);
    if (token) {
      this.onSuccess(token);
    } else {
      this.onError(error);
    }
  }


  public onSuccess(token) {
    console.log(['Success Token ... ', token]);
    console.log('Avant payement stripe ... ');

    // Posssible de changer le fonctionnement de'appelation de processus
    const sendStripe = {
      stripeToken: token.id,
      prix: this._totalAmount
    };

    this.stripeAPI.createPayementOrder(sendStripe).subscribe((resStripe: any) => {
      console.log(resStripe);
      // Payement OK 

      this.payement.totalAmount = String(this._totalAmount);
      this.payement.status = resStripe.status === 'succeeded' ? 1 : 0;
      this.payement.userId = Number(localStorage.getItem('userId'));
      this.payement.createdOn = resStripe.created;
      this.payement.reference = resStripe.id;
      this.payement.comments = localStorage.getItem('commentairePayment');

      if (this.type === 'Subscription') {

        // Update Subscription
          let subscriptionUpdate = {
          id: Number(localStorage.getItem('subscriptionId')),
          status: 'PAYE'
        };

          this.subscriptionApi.updateSubscription(subscriptionUpdate).subscribe((resSubscription: any) => {
          console.log(resSubscription);
          this.payement.comments = 'Payment subscription ...';
          console.log(resSubscription, this.payement.comments);
          this.insertPayemenet();
        });
      }

      if (this.type === 'Intervention') {
        this.payement.interventionId = Number(localStorage.getItem('interventionId'));
        this.payement.comments = 'Payment intervention ...';
        this.insertPayemenet();
      }

      

      });

  }

  private insertPayemenet() {
    this.payementApi.savePayements(this.payement).subscribe((data) => {
      console.log('the data', data);

      // Update intervention status here
      if (this.type === 'Intervention') {
        let mstatus = 'EN ATTENTE';
        if (localStorage.getItem('commentairePayment') === 'Payement de la commission Girlandcars') {
          mstatus = 'EN COURS';
        } else {
          mstatus = 'EFFECTUE';
        }
        const updateInterv = { id: Number(localStorage.getItem('interventionId')), statePayment: mstatus };
        this.interventionApi.updateIntervention(updateInterv).subscribe((resUpdateInterv) => {
          console.log(resUpdateInterv);
          this.afterUpdateIntervention.emit(mstatus);
        });
      }
      if (this.type === 'Subscription') {
        this.afterUpdateIntervention.emit(data);
      }
    });
  }

  public onError(error) {
    if (error.message) {
      this.cardError = error.message;
    }
  }

}
