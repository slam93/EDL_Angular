import {Component, Input, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {CONFIGURATION} from '../../interfdata/data-configuration';
import {HelpersService} from '../../services/helpers.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent implements OnInit {
  @Input() isOpen: boolean;
  public location: any;
  public user: any;
  public dataAppartement: any;
  public isEntrer: boolean;
  apiURL = CONFIGURATION.apiURL;
  constructor(
    public locationService: LocationService,
    public helpersService: HelpersService,
    private router: Router,
  ) {
    this.location = this.locationService.getLocation();
    this.user = JSON.parse(localStorage.getItem('dataUser'));
    this.dataAppartement = JSON.parse(localStorage.getItem('dataAppartement'));
  }

  ngOnInit(): void {
    if (this.isOpen){
      setTimeout(() => {
        document.getElementById('nav').style.width = '100%';
      }, 1000);
    }
    this.getCertification('ENTREE');
    this.isEntrer = false;
  }

  public openNav() {
    document.getElementById('nav').style.width = '100%';
  }

  public closeNav() {
    document.getElementById('nav').style.width = '0';
  }
  getCertification(type){
    const url = this.apiURL + 'getCertificationType';
    const params = { type: type, userId: this.user.id , appartmentId: this.dataAppartement.id};
    this.helpersService.postHelper(params, url).subscribe((data) => {
      console.log(data.data)
      if (data.data == null){
        this.isEntrer = true;
      }
    });
  }

  getEtatLieux(type){
    switch (type) {
      case 'ENTREE':
        if (this.isEntrer){
          this.router.navigateByUrl('appartement');
        }
        break;
    }
  }

}
