import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from './../../services/location.service';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  public innerWidth: any;
  constructor(
    private router: Router,
    private locationService: LocationService
  ) {
  }

  ngOnInit(): void {
    this.innerWidth = window.innerHeight;
  }
  clickLanguage(langue: any){
    this.locationService.setLocation(langue);
    this.router.navigateByUrl('scan');
  }


}
