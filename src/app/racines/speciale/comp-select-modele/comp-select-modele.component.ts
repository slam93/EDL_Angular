import { VehiclesService } from 'src/app/services/vehicles.service';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-comp-select-modele',
  templateUrl: './comp-select-modele.component.html',
  styleUrls: ['./comp-select-modele.component.scss']
})
export class CompSelectModeleComponent implements OnInit, OnChanges {

  @Input() listeFilterModel: any;
  @Output() changeModele: EventEmitter<any> = new EventEmitter();

  /* #################################    VARIABLE    ################################## */
  public DataMarque: any;
  public DataModele: any = []
  public DataVehicule: any;
  public loadedMarque = true;
  public vehiculeMarque: any;
  public vehiculeModele: any;
  public selectModele: any;


  /* #################################    CONSTRUCTOR    ################################## */
  constructor(
    private vehicleApi: VehiclesService
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.listeFilterModel);
    this.DataModele = this.listeFilterModel;
    console.log('DataModele', this.DataModele)
    for (let model of this.DataModele) {
      console.log('model', model)
      localStorage.setItem('selectModel', model.model)
    }
  }


  ngOnInit(): void {

    this.vehicleApi.getAllVehiclesPublic().subscribe(async (resVehicles: any) => {
      console.log(resVehicles.data);
      this.DataModele = resVehicles.data;
      // this.DataMarque = await this.filtreMarque(resVehicles.data);
      //console.log(this.DataMarque);
    });

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


  public async onChangeModele($event, deviceValue) {
    console.log(deviceValue.value);
    localStorage.setItem('selectModel', deviceValue.value);
    this.selectModele = deviceValue.value;
    this.changeModele.emit(deviceValue.value);
  }

  public compareFn(a,b) {
    return a && b && a.model === b.model;
  }

}
