import { SubscriptionsService } from './../../../services/subscriptions.service';
import { PayementService } from './../../../services/payement.service';
import { FrenchDataTables } from './../../../interfdata/data-french-dt';
import { CarService } from './../../../services/cars.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-dt-abonnement',
  templateUrl: './dt-abonnement.component.html',
  styleUrls: ['./dt-abonnement.component.scss'],
})
export class DtAbonnementComponent implements OnInit {
  
  @Output() emitView: EventEmitter<any> = new EventEmitter();
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;

  /* #################################  VARIABLE  ################################## */

  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();
  public frenchDT: any;

  public listeAbonnement: any;


  /* #################################  CONSCTRUCTOR  ################################## */
  constructor(
    private subscriptionApi: SubscriptionsService
  ) {}

  ngOnChanges() {
    
  }

  ngOnInit(): void {
    this.subscriptionApi
      .getByUserSubscription({ userId: localStorage.getItem('userId') })
      .subscribe((resAbonnement: any) => {
        this.listeAbonnement = resAbonnement.data;
        this.dtTrigger.next();
        
      });
  }

  // FUnction reload datatable
  public rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.subscriptionApi
      .getByUserSubscription({ userId: localStorage.getItem('userId') })
      .subscribe((resAbonnement: any) => {
        this.listeAbonnement = resAbonnement.data;
        this.dtTrigger.next();
      });
      console.log('Fin rerender datatable');
    });
  }


  public proc_reload_table() {
    this.rerender();
  }

}
