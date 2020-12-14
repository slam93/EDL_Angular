import { VehiclesService } from 'src/app/services/vehicles.service';
import { MecanoService } from './../../../services/mechanics.service';
import { InterventionService } from './../../../services/intervention.service';
import { FrenchDataTables } from './../../../interfdata/data-french-dt';
import { CarService } from './../../../services/cars.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dt-historique',
  templateUrl: './dt-historique.component.html',
  styleUrls: ['./dt-historique.component.scss'],
})
export class DtHistoriqueComponent implements OnInit {
  @Input() ListeHistorique: any = [];
  @Input() type: any;      // byUser   |  byMechanic
  @Output() afterDetailIntervention: EventEmitter<any> = new EventEmitter();

  /* #################################    VARIABLE    ################################## */

  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();
  public frenchDT: any;
  public ListeHistoriqueOrder: any;
  public reqListeHistorique: any;
  public mecanoActual: any;

  /* #################################    CONSTRUCTOR    ################################## */
  constructor(
    private http: HttpClient,
    private interventionApi: InterventionService,
    private mecanoApi: MecanoService,
    private vehicleApi: VehiclesService
  ) {}

  OnChanges() {
    // Call API via DB
    this.frenchDT = FrenchDataTables;
    this.dtOptions = { language: this.frenchDT, destroy: true };

    if (this.type === 'byUser') {
      this.interventionApi
      .getByUserInterventions({ userId: localStorage.getItem('userId') })
      .subscribe((resIntervention: any) => {
        this.reqListeHistorique = resIntervention.data;
        this.ListeHistoriqueOrder = this.reorderDataVue(resIntervention.data);
        console.log(
          this.ListeHistorique,
          this.ListeHistoriqueOrder,
          this.reqListeHistorique
        );
        this.dtTrigger.next();
      });
    } else {
      this.mecanoApi.getMecanoByUserId({userId: localStorage.getItem('userId')}).subscribe((resMecano: any) => {
        console.log(resMecano);
        this.mecanoActual = resMecano.data[0];
    
        this.interventionApi.getByMechanicIdInterventions({mechanicId: this.mecanoActual.id}).subscribe((resIntervention: any) => {
          this.reqListeHistorique = resIntervention.data;
          this.ListeHistoriqueOrder = this.reorderDataVue(resIntervention.data);
          console.log(this.reqListeHistorique);
          for ( const interv of this.reqListeHistorique ) {
            this.vehicleApi.getByIdVehicles({id: interv.vehicleId }).subscribe((resVehicle: any) => {
              interv.vehicle = resVehicle.data[0];
            });
          }
          console.log(
            this.ListeHistorique,
            this.ListeHistoriqueOrder,
            this.reqListeHistorique
          );
          this.dtTrigger.next();
        });

      });

    }
    
  }

  ngOnInit(): void {
    // Call API via DB
    this.frenchDT = FrenchDataTables;
    this.dtOptions = { 
      language: this.frenchDT, 
      destroy: true,
      lengthMenu: [[5, 10, 50, -1], [5, 10, 50, 'All']]
    };

    if (this.type === 'byUser') {
    this.interventionApi
      .getByUserInterventions({ userId: localStorage.getItem('userId') })
      .subscribe((resIntervention: any) => {
        this.reqListeHistorique = resIntervention.data;
        this.ListeHistoriqueOrder = this.reorderDataVue(resIntervention.data);
        console.log(
          this.ListeHistorique,
          this.ListeHistoriqueOrder,
          this.reqListeHistorique
        );
        this.dtTrigger.next();
      });

    } else {
      this.mecanoApi.getMecanoByUserId({userId: localStorage.getItem('userId')}).subscribe((resMecano: any) => {

        console.log(resMecano);
        this.mecanoActual = resMecano.data[0];

        this.interventionApi.getByMechanicIdInterventions({mechanicId: this.mecanoActual.id}).subscribe((resIntervention: any) => {
          this.reqListeHistorique = resIntervention.data;
          this.ListeHistoriqueOrder = this.reorderDataVue(resIntervention.data);
          console.log(this.reqListeHistorique);
          for ( const interv of this.reqListeHistorique ) {
            this.vehicleApi.getByIdVehicles({id: interv.vehicleId }).subscribe((resVehicle: any) => {
              interv.vehicle = resVehicle.data[0];
            });
          }
          console.log(
            this.ListeHistorique,
            this.ListeHistoriqueOrder,
            this.reqListeHistorique
          );
          this.dtTrigger.next();
        });

      });

    }

  }

  /* #################################    FUNCTION    ################################## */
  public proc_open_lg_detailIntervention(interv) {
    // Emit action correspondant
    this.afterDetailIntervention.emit(interv);
    console.log(interv);
  }

  public reorderDataVue(paramData) {
    let newListeOrder = [];

    for (let data of paramData) {
      console.log(data);
      //traitement du données ici
      if (data.car !== null) {
        data.vehicle = data.car;
      }

      if (data.vehicle !== null) {
        data.car = data.vehicle;
      }

      newListeOrder.push(data);
    }

    return newListeOrder;
  }

}
