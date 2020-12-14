import { VehiclesService } from 'src/app/services/vehicles.service';
import { CarService } from './../../../services/cars.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comp-immatriculation',
  templateUrl: './comp-immatriculation.component.html',
  styleUrls: ['./comp-immatriculation.component.scss'],
})
export class CompImmatriculationComponent implements OnInit {

  @Output() selectImmatriculation: EventEmitter<any> = new EventEmitter();

  /* #################################    VARIABLE    ################################## */
  public keyword = 'immatriculation';
  public data: any;


  /* #################################    CONSTRUCTOR    ################################## */
  constructor(
    private carApi: CarService
  ) {}

  ngOnInit(): void {
    // Get all cars
    this.carApi.getCarsPublic().subscribe((resCars: any) => {
      console.log(resCars);
      this.data = resCars.data;
    } );

  }

  /* #################################    FUNCTION    ################################## */

  // Function pour auto complete
  selectEvent(item) {
    console.log(['Select value input ...', item]);
    this.selectImmatriculation.emit(item);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log(['Change action input ...', val]);
  }

  onFocused(e) {
    // do something when input is focused
  }
}
