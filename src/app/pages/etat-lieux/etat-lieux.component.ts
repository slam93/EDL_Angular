import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationService} from '../../services/location.service';
import * as _ from 'lodash';

import {
  NgbModalConfig,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import {HelpersService} from '../../services/helpers.service';
import {CONFIGURATION} from '../../interfdata/data-configuration';
import {Router} from "@angular/router";

@Component({
  selector: 'app-etat-lieux',
  templateUrl: './etat-lieux.component.html',
  styleUrls: ['./etat-lieux.component.scss']
})
export class EtatLieuxComponent implements OnInit {

  @ViewChild('childModal') childModal: any;
  public dataAppartement: any;
  public pieces: any;
  public pieceSelect: any;
  public equipement: any;
  public location: any;
  public langue: any;
  public user: any;
  public type: any;
  public numAppart: any;
  public index: any;
  public signalisation: any;
  apiURL = CONFIGURATION.apiURL;
  constructor(
    public locationService: LocationService,
    private modalService: NgbModal,
    public helpersService: HelpersService,
    private router: Router,
  ) {
    this.location = this.locationService.getLocation();
    this.type = 'ENTREE';
    this.index = 0;
  }

  ngOnInit(): void {
    this.dataAppartement = JSON.parse(localStorage.getItem('dataAppartement'));
    this.user = JSON.parse(localStorage.getItem('dataUser'));
    this.numAppart = localStorage.getItem('numAppartement');
    this.langue = (localStorage.getItem('langue') == null ? 'FR' : localStorage.getItem('langue'));
    this.pieces = this.dataAppartement.pieces;
    this.pieceSelect = this.dataAppartement.pieces[this.index];
    this.equipement = this.dataAppartement.pieces[this.index].equipments;
    this.signalisation = [];
    this.getSignalisation();
  }

  selectPiece(idPiece){
    const index = this.pieces.findIndex((items) => items.id == idPiece);
    this.index = index;
    this.pieceSelect = this.dataAppartement.pieces[this.index];
    this.equipement = this.dataAppartement.pieces[this.index].equipments;
  }

  public open_siganlisaton() {
    this.modalService.open(this.childModal, { windowClass: 'my-modal-sm' });
  }

  public valide(){
    this.index = this.index + 1;
    if(this.index >= this.dataAppartement.pieces.length){
      this.router.navigateByUrl('certification');
    }else{
      this.pieceSelect = this.dataAppartement.pieces[this.index];
      this.equipement = this.dataAppartement.pieces[this.index].equipments;
    }
  }

  public close_modal(){
    this.modalService.dismissAll();
  }

  public singals(event: any){
    this.modalService.dismissAll();
    this.getSignalisation();
  }
  private getSignalisation(){
    const url = this.apiURL + 'getSignalisationType';
    const params = {type: this.type, userId: this.user.id , appartmentId: this.dataAppartement.id};
    this.helpersService.postHelper(params, url).subscribe((data) => {
      if (data && data.length !== 0){
        const groupSignal =
          _(data.data)
            .groupBy('pieceId')
            .map((objs, key) => ({
              pieceId: key,
              incident: objs.length }))
            .value();
        console.log("groupSignal",groupSignal);
        this.signalisation = groupSignal;
      }
    });
  }

}
