import { DataTableDirective } from 'angular-datatables';
import { FrenchDataTables } from './../../../interfdata/data-french-dt';
import { CarService } from 'src/app/services/cars.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Component, Input, OnInit, OnChanges, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dt-voiture',
  templateUrl: './dt-voiture.component.html',
  styleUrls: ['./dt-voiture.component.scss']
})
export class DtVoitureComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() changeLoad: any;
  @Output() afterDelete: EventEmitter<any> = new EventEmitter();
  @Output() afterEdit: EventEmitter<any> = new EventEmitter();
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;

  /* #################################  VARIABLE  ################################## */

  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();
  public frenchDT: any;
  public ListeVoiture: any;


  /* #################################  CONSCTRUCTOR  ################################## */
  constructor(
    private http: HttpClient,
    private carApi: CarService,
  ) { }

  ngAfterViewInit(): void {
    console.log("Call ON AFTERINIT ....."+this.changeLoad);
  }

  ngOnChanges() {
    console.log("Call ON CHANGE ....."+this.changeLoad);
    this.rerender();
  }

  ngOnInit(): void {
    
    console.log("Call ON INIT ....."+this.changeLoad);
    this.frenchDT = FrenchDataTables;
    this.dtOptions = {language: this.frenchDT, destroy: true };

    this.carApi.getCarsByUser({userId: localStorage.getItem('userId')}).subscribe((listeCars: any) => {
      this.ListeVoiture = listeCars.data;
      this.dtTrigger.next();
    });
  }

  

  /* #################################  FUNCTION  ################################## */

  public proc_delete_car(idCar) {
    console.log('Delete : ' + idCar);
    // let deleteCar = { id: idCar };
    // this.carApi.deleteCar(deleteCar).subscribe((resCar) => {
    // });
    // this.rerender();
    this.afterDelete.emit(idCar);
  }

  public proc_edit_car(Car) {
    console.log(['Edit : ', Car]);
    this.afterEdit.emit(Car);
  }

  public click() {
    console.log(['click']);
  }

  // FUnction reload datatable
  public rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.carApi.getCarsByUser({userId: localStorage.getItem('userId')}).subscribe((listeCars: any) => {
        this.ListeVoiture = listeCars.data;
        this.dtTrigger.next();
      });
      console.log('Fin rerender datatable');
    });
  }

}
