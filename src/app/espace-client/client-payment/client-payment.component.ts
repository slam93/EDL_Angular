import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.scss']
})
export class ClientPaymentComponent implements OnInit {

  @ViewChild('detailPayement') detailPayement: any;

  /* #################################    VARIABLE    ################################## */
  public ListePayment: any;
  public selectPayment: any;


  /* #################################    CONSTRUCTOR    ################################## */
  constructor(private modalService: NgbModal) {

  }

  ngOnInit(): void {
  }


  /* #################################    FUNCTION    ################################## */
  public proc_close() {
    this.modalService.dismissAll();
  }

  public proc_emit_view_payement(param) {
    this.selectPayment = param;
    console.log(this.selectPayment);
    this.open_lg_detailPayement();
  }

  public open_lg_detailPayement() {
    this.modalService.open(this.detailPayement, {
      windowClass: 'my-modal-sm',
    });
  }

}
