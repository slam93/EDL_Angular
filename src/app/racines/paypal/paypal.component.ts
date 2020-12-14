import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Intervention } from 'src/app/interfaces/intervention';
import { Payement } from 'src/app/interfaces/payement';
import { PayementService } from 'src/app/services/payement.service';
declare let paypal: any;
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
})
export class PaypalComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() intervention: any;
  @Output() newItemEvent = new EventEmitter<Payement>();
  public payement = new Payement();

  constructor(private payementApi: PayementService) {}

  // Check action : OnChanges
  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges ...');
    this.loadMyScript();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('OnChanges ...');
    this.loadMyScript();
  }

  public checkout(details) {

    this.payement.totalAmount = details.purchase_units[0].amount.value;
    this.payement.status = details.status === 'COMPLETED' ? 1 : 0;
    this.payement.userId = Number(localStorage.getItem('userId'));
    // this.payement.userCli = 1;
    this.payement.authCode = details.purchase_units[0].amount.currency_code;
    this.payement.createdOn = details.create_time;
    this.payement.reference = details.id;
    this.payement.customerEmail = details.payer.email_address;
    this.payement.comments = details.payer.name.given_name + ' ' + details.payer.name.surname;

    this.payementApi.savePayements(this.payement).subscribe((data) => {
      console.log('the data', data);
      this.newItemEvent.emit(data);
    });

  }

  private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  public loadMyScript() {
    let payValue: string = this.intervention.price;
    let payReference: string = this.intervention.id;
    let prix = this.intervention;
    console.log(payValue, payReference, prix);
    this.loadExternalScript(
      'https://www.paypal.com/sdk/js?currency=EUR&client-id=AQFtvLXYvmWUr6-QAwp5iGK6yyVNnLhm2jMyt2I0KeAk8rWg01vUK20OVy8xJSi9_d3CVYZTkDRnTnRH'
    ).then(() => {
      paypal
        .Buttons({
          createOrder: function (data, actions) {
            // Set up the transaction
            console.log(payValue, payReference, prix);

            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: 'EUR',
                    value: payValue,
                  },
                  reference_id: payReference,
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              console.log('detail transaction', details);
              this.checkout(details);
            });
          },
        })
        .render('#paypal-button');
    });
  }

}
