import { VehiclesService } from 'src/app/services/vehicles.service';
import { CarService } from 'src/app/services/cars.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-comp-select-marque',
  templateUrl: './comp-select-marque.component.html',
  styleUrls: ['./comp-select-marque.component.scss']
})
export class CompSelectMarqueComponent implements OnInit {

  @Output() changeMarque: EventEmitter<any> = new EventEmitter();

  /* #################################    VARIABLE    ################################## */
  public DataMarque: any;
  public DataModele: any = []
  public DataVehicule: any;
  public loadedMarque = true;
  public vehiculeMarque: any;
  // schemes = [
  //   {
  //     name: 'test1'
  //   },

  //   {
  //     name: 'test2'
  //   },
  // ];

  // scheme = 
  //   {
  //     name: 'test2'
  //   };

  /* #################################    CONSTRUCTOR    ################################## */
  constructor(
    private carApi: CarService,
    private vehicleApi: VehiclesService
  ) { }

  ngOnInit(): void {

    // Get liste via Database
    this.carApi.getCarsPublic().subscribe((resCar: any) => {
      console.log(resCar);
      this.DataVehicule = resCar;
    });

    this.vehicleApi.getAllVehiclesPublic().subscribe(async (resVehicles: any) => {
      console.log(resVehicles.data);
      this.DataModele = resVehicles.data;
      this.DataMarque = await this.filtreMarque(resVehicles.data);
      this.vehiculeMarque = this.DataMarque[0];
      console.log(this.DataMarque, this.vehiculeMarque);
    });

  }


  /* #################################    FONCTION    ################################## */
  public async onChangeMarque($event, deviceValue) {
    let tempDataModele = await this.filtreModele(
      deviceValue.value,
      this.DataModele
    );
    localStorage.setItem('selectBand', this.vehiculeMarque);
    console.log([this.vehiculeMarque, tempDataModele]);
    this.changeMarque.emit(tempDataModele);
  }

  // Callback Function filtre marque
  public async filtreModele(marqueValue, liste) {
    console.log(marqueValue, liste);
    const listeFiltre = [];
    for (const modele of liste) {
      if (modele.band === marqueValue) {
        listeFiltre.push(modele);
      }
    }
    return listeFiltre;
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


  public compareFn(a,b) {
    return a && b && a.model === b.model;
  }

}
