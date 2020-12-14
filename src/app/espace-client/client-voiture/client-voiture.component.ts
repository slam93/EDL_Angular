import { VehiclesService } from 'src/app/services/vehicles.service';
import { ListeTypeVoiture } from './../../interfdata/data-typevoiture';
import { FormGroup, FormControl } from '@angular/forms';
import { ListeVehicule } from './../../interfdata/data-vehicule';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListeVoiture } from './../../interfdata/data-voiture';
import { FrenchDataTables } from './../../interfdata/data-french-dt';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import FrenchJson from '../../../assets/json/dataTableFrench.json';
import { CarService } from 'src/app/services/cars.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-client-voiture',
  templateUrl: './client-voiture.component.html',
  styleUrls: ['./client-voiture.component.scss'],
})
export class ClientVoitureComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {


  @ViewChild('cars') cars: any;
  @ViewChild('deleteCars') deleteCars: any;
  @ViewChild(DataTableDirective, { static: false })

  /* #################################    VARIABLE    ################################## */
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();
  public frenchDT: any;
  public ListeVoiture: any = [];
  public userId: any;

  // Property cars : traitement
  public vehiculeImmatriculation: any;
  public vehiculeMarque: any;
  public selectMarque: any;
  public vehiculeModele: any;
  public selectModele: any;
  public selectType: any;
  public DataVehicule: any;
  public DataMarque: any;
  public DataModele: any;
  public DataType: any;
  public loadedMarque = true;
  public deleteCarId: number;
  public titleDelete: any;
  public messageDelete: any;
  public optionAction: any; // [     add / edit      ]
  public updateCar: any;
  public listeFilterModel: any;
  public vehiculeType: any;
  public changeLoad: any

  public formMarque = new FormGroup({
    vehiculeMarque: new FormControl(),
  });

  public formModele = new FormGroup({
    vehiculeModele: new FormControl(),
  });

  public formType = new FormGroup({
    vehiculeType: new FormControl(),
  });

  states = [
    { name: 'Arizona', abbrev: 'AZ' },
    { name: 'California', abbrev: 'CA' },
    { name: 'Colorado', abbrev: 'CO' },
    { name: 'New York', abbrev: 'NY' },
    { name: 'Pennsylvania', abbrev: 'PA' },
  ];

  form = new FormGroup({
    state: new FormControl(this.states[3]),
  });

  /* #################################    CONSTRUCTOR    ################################## */

  constructor(
    private http: HttpClient,
    private carApi: CarService,
    private modalService: NgbModal,
    private vehicleApi: VehiclesService
  ) {
    this.optionAction = 'add';
  }

  async ngOnInit() {

    console.log('Appel connexion ONINIT ');
    this.changeLoad = 0;

    // Configuration langage datatable
    this.frenchDT = FrenchDataTables;
    this.dtOptions = { language: this.frenchDT, destroy: true };

    // Call API via DB
    this.carApi
      .getCarsByUser({ userId: localStorage.getItem('userId') })
      .subscribe((listeCars: any) => {
        this.ListeVoiture = listeCars.data;
        this.dtTrigger.next();
      });

    this.DataVehicule = ListeVehicule;
    this.DataType = ListeTypeVoiture;


    this.vehicleApi.getAllVehiclesPublic().subscribe(async (resVehicles: any) => {
      console.log(resVehicles.data);
      this.DataModele = resVehicles.data;
      this.DataMarque = await this.filtreMarque(resVehicles.data);
      this.listeFilterModel = this.DataModele;
      this.vehiculeMarque = this.DataMarque[0];
      this.selectModele = this.DataMarque[0].model;
      console.log(this.DataMarque, this.vehiculeMarque);
    });


    this.selectMarque = '';
    //this.selectModele = '';
    console.log(this.DataMarque[0]);
    this.userId = localStorage.getItem('userId');
    this.deleteCarId = 0;

    // Check reactive form change
    this.formMarque.valueChanges.subscribe((val) => {
      console.log(val);
      this.onChangeMarque(null, val.vehiculeMarque.marque);
    });

    this.formModele.valueChanges.subscribe((val) => {
      console.log(val);
      this.onChangeModele(null, val.vehiculeModele.modele);
    });

    this.formType.valueChanges.subscribe((val) => {
      console.log(val);
      this.onChangeType(null, val.vehiculeType.description);
    });
    //this.onChanges();
  }

  /* #################################    FUNCTIONS    ################################## */

  public onChanges(): void {


  }

  public myformOnChanges() {
    this.formMarque.get('vehiculeMarque').valueChanges.subscribe((val) => {
      console.log(val);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  public open_md(content) {
    this.modalService.open(content, { windowClass: 'my-modal-md' });
    console.log(content);
  }

  public create_open_md(content) {
    this.optionAction = 'add';
    this.vehiculeImmatriculation = '';
    this.modalService.open(content, { windowClass: 'my-modal-md' });
    console.log([content, this.DataModele]);
  }

  // Callback Function filtre marque
  public async filtreMarque(liste) {
    const listeFiltre = [];
    for (const marque of liste) {
      // tslint:disable-next-line:triple-equals
      if (listeFiltre.length == 0) {
        listeFiltre.push(marque);
      } else {
        let exist = false;
        for (const filtre of listeFiltre) {
          // tslint:disable-next-line:triple-equals
          if (marque.band == filtre.band) {
            exist = true;
          }
        }
        // tslint:disable-next-line:triple-equals
        if (exist == false) {
          listeFiltre.push(marque);
        }
      }
    }
    this.loadedMarque = false;
    return listeFiltre;
  }

  public async onChangeMarque($event, deviceValue) {
    console.log([$event.value, deviceValue, this.vehiculeMarque]);
    this.DataModele = await this.filtreModele(deviceValue, this.DataVehicule);
    this.selectMarque = deviceValue;
    localStorage.setItem('SelectMarque', this.vehiculeMarque);
  }


  // Callback Function filtre marque
  public async filtreModele(marqueValue, liste) {
    const listeFiltre = [];
    for (const modele of liste) {
      if (modele.band === marqueValue) {
        listeFiltre.push(modele);
      }
    }
    return listeFiltre;
  }


  public async onChangeModele($event, deviceValue) {
    // console.log(this.vehiculeModele);
    this.selectModele = deviceValue;
    localStorage.setItem('SelectModele', deviceValue);
  }

  public onChangeType($event, deviceValue) {
    console.log(deviceValue.value);
    this.selectType = deviceValue.value;
    localStorage.setItem('SelectType', deviceValue.value);
  }


  public proc_close() {
    this.modalService.dismissAll();
  }


  public proc_save_cars() {

    console.log([
      this.vehiculeImmatriculation,
      this.selectMarque,
      this.selectModele,
      this.userId,
    ]);

    let createCar = {
      immatriculation: this.vehiculeImmatriculation,
      type: this.selectType,
      band: this.selectMarque,
      model: this.selectModele,
      userId: localStorage.getItem('userId'),
    };

    console.log(createCar);

    this.carApi.createCar(createCar).subscribe((resCar) => {
      console.log(resCar, 'affiche notification succcès ...');
      this.modalService.dismissAll();
      this.changeLoad += 1;
    });
  }


  public proc_edit_cars() {

    console.log('Call edition Cars ...');
    let carUpdate = { 
      id: this.updateCar.id,
      immatriculation: this.vehiculeImmatriculation,
      type: this.selectType,
      band: this.selectMarque,
      model: this.selectModele,
      userId: this.userId
    };

    // call api edit cars 
    this.carApi.updateCar(carUpdate).subscribe((resUpdate) => {
      console.log(resUpdate);
      this.modalService.dismissAll();
      this.changeLoad += 1;
    });

  }

  // Show message Prompt 
  public proc_delete_car(param) {
    console.log('Call event emitter ..');
    this.deleteCarId = param;
    this.titleDelete = 'Suppression';
    this.messageDelete =  ' Voulez-vous vraiment supprimer cette voiture  ?';

    setTimeout(() => {
      this.modalService.open(this.deleteCars);
    }, 500);
  }


  public proc_emit_edit_car(param) {
    this.optionAction = 'edit';
    console.log(param);
    this.updateCar = param;
    this.vehiculeImmatriculation = param.immatriculation;

    // Initialisation Marque / Modele / Type
    this.selectMarque = param.band;
    let valueMarque = this.getMarqueByName(param.band, this.DataMarque);
    console.log(valueMarque);
    this.formMarque.get('vehiculeMarque').setValue(valueMarque);

    let valueModele = this.getModeleByName(param.model, this.DataModele);
    console.log(valueModele);
    this.formModele.get('vehiculeModele').setValue(valueModele);

    let valueType = this.getTypeByName(param.type, this.DataType);
    console.log(valueType);
    this.formType.get('vehiculeType').setValue(valueType);

    this.selectModele = param.model;
    this.modalService.open(this.cars);
  }


  public proc_emit_delete_mclose(event) {
    console.log('Click close ...');
    this.modalService.dismissAll();
  }


  public proc_emit_delete_yes(event) {
    console.log('Click yes ...');
    this.modalService.dismissAll();
    let deleteCar = { id: this.deleteCarId };
    this.carApi.deleteCar(deleteCar).subscribe((resCar) => {
      console.log(resCar);
      this.changeLoad += 1;
    });
    
  }


  public proc_emit_delete_no(event) {
    console.log('Click no ...');
    this.modalService.dismissAll();
  }


  public getMarqueByName(paramName, paramListe) {
    for (let marque of paramListe) {
      if (paramName === marque.marque) {
        return marque;
      }
    }
  }

  public getModeleByName(paramName, paramListe) {
    for (let voiture of paramListe) {
      // console.log([paramName, voiture]);
      if (paramName === voiture.modele) {
        return voiture;
      }
    }
  }

  public getTypeByName(paramName, paramListe) {
    for (let voiture of paramListe) {
      console.log([paramName, voiture]);
      if (paramName === voiture.description) {
        return voiture;
      }
    }
  }

  public async proc_emit_change_marque(deviceValue) {
    this.listeFilterModel = deviceValue;
    this.selectMarque = deviceValue[0].band;
    localStorage.setItem('SelectMarque', this.selectMarque);

  }

  public proc_emit_change_modele(deviceValue) {
    console.log(deviceValue);
    this.selectModele = deviceValue;
    localStorage.setItem('SelectModele', deviceValue);
  }

  public proc_reload_value() {
    
  }


}
