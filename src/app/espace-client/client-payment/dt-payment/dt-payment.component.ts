import { PayementService } from 'src/app/services/payement.service';
import { HttpClient } from '@angular/common/http';
import { FrenchDataTables } from './../../../interfdata/data-french-dt';
import { Subject } from 'rxjs';
import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dt-payment',
  templateUrl: './dt-payment.component.html',
  styleUrls: ['./dt-payment.component.scss'],
})
export class DtPaymentComponent implements OnInit, OnChanges {

  @Input() ListePayment: any = [];
  @Output() emitView: EventEmitter<any> = new EventEmitter();

  /* #################################  VARIABLE  ################################## */

  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();
  public frenchDT: any;

  /* #################################  CONSCTRUCTOR  ################################## */
  constructor(private http: HttpClient, private paymentApi: PayementService) {}

  ngOnChanges() {
  }

  ngOnInit(): void {
    // Call API via DB
    this.frenchDT = FrenchDataTables;
    this.dtOptions = { language: this.frenchDT, destroy: true };

    console.log(this.ListePayment);
    this.paymentApi
      .getByUserPayment({ userId: localStorage.getItem('userId') })
      .subscribe((listeCars: any) => {
        this.ListePayment = listeCars.data;
        this.dtTrigger.next();
        console.log([listeCars.data, this.ListePayment]);
      });
  }

  /* #################################  FUNCTION   ################################## */

  public proc_open_lg_detail_payment(payment) {
    // Traitement à faire
    console.log(payment);
    this.emitView.emit(payment);
  }

}
