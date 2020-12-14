import { Injectable } from '@angular/core';
import { langue } from '../interfdata/data-langue';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private location: any;
  private locationString: any;
  constructor() {
  }

  public getLocation(){
    this.locationString = localStorage.getItem('langue');
    if (this.locationString === null){
      this.location = langue.FR;
    }else{
      this.location = langue[this.locationString];
    }
    return this.location;
  }
  // tslint:disable-next-line:no-shadowed-variable
  public async setLocation(langue){
    await localStorage.setItem('langue', langue);
    this.getLocation();
  }

}
