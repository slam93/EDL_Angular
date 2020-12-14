import { AutoLogoutService } from './services/autoLogout.service';
import { Component } from '@angular/core';

import { LocationService } from './services/location.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Etat des lieux';
  public location;
  constructor(
  ) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {}
}
